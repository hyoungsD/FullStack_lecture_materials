import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { OrderStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { PayDto } from "./dto/pay.dto";
import { AuthUser } from "../common/current-user.decorator";
import { nextShippingStatus } from "./order-status";

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  // 배송 상태 변경 — 관리자 전용(컨트롤러가 간단한 if로 막는다).
  // 상태머신 표에 정의된 한 칸 전진만 허용한다(PAID→SHIPPED→DONE).
  async updateShippingStatus(orderId: number, target: OrderStatus) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, status: true },
    });
    if (!order) throw new NotFoundException(`주문 ${orderId}를 찾을 수 없습니다.`);

    const allowed = nextShippingStatus(order.status);
    if (allowed !== target) {
      throw new ConflictException(
        `${order.status} → ${target} 로는 바꿀 수 없습니다. ` +
          `(현재 가능한 다음 단계: ${allowed ?? "없음"})`
      );
    }
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: target },
    });
  }

  // 주문 생성 — 15장에서 가장 중요한 자리.
  // 장바구니의 모든 줄에 대해 재고를 차감하고, 주문과 주문항목을 만들고, 장바구니를 비운다.
  // 이 셋은 "전부 되거나 전부 안 되거나"여야 한다. 그래서 한 트랜잭션으로 묶는다.
  async checkout(userId: number) {
    const cart = await this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: { select: { id: true, name: true, price: true } } },
    });
    if (cart.length === 0) {
      throw new BadRequestException("장바구니가 비어 있어 주문할 수 없습니다.");
    }

    return this.prisma.$transaction(async (tx) => {
      let total = 0;
      const itemsData: {
        productId: number;
        quantity: number;
        unitPrice: number;
      }[] = [];

      for (const item of cart) {
        // 조건부 차감이 핵심이다. "재고가 수량 이상일 때만" 줄인다.
        // 같은 상품에 동시 주문이 들어와도 DB가 한 번에 하나씩 처리하므로,
        // 재고를 넘겨 파는 일(oversell)이 생기지 않는다.
        const updated = await tx.product.updateMany({
          where: { id: item.productId, stock: { gte: item.quantity } },
          data: { stock: { decrement: item.quantity } },
        });

        if (updated.count === 0) {
          // WHERE에 안 걸렸다 = 재고가 모자란다. 예외를 던지면 트랜잭션 전체가 롤백되어
          // 앞서 차감한 다른 상품의 재고까지 원래대로 돌아간다.
          throw new ConflictException(`재고가 부족합니다: ${item.product.name}`);
        }

        total += item.product.price * item.quantity;
        itemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.product.price, // 지금 가격을 주문에 박아 둔다.
        });
      }

      const order = await tx.order.create({
        data: {
          buyerId: userId,
          totalPrice: total,
          items: { create: itemsData },
        },
        include: { items: true },
      });

      await tx.cartItem.deleteMany({ where: { userId } });
      return order;
    });
  }

  // 결제(모의) — 본인의 PENDING 주문만. 결제 기록을 남기고 상태를 PAID로.
  async pay(orderId: number, userId: number, dto: PayDto) {
    const order = await this.getBuyerOrder(orderId, userId);
    if (order.status !== "PENDING") {
      throw new ConflictException(`결제할 수 없는 상태입니다: ${order.status}`);
    }
    return this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: { orderId, amount: order.totalPrice, method: dto.method },
      });
      await tx.order.update({ where: { id: orderId }, data: { status: "PAID" } });
      return { paid: true, payment };
    });
  }

  // 취소 — 결제 전(PENDING)만. 차감했던 재고를 되돌린다.
  async cancel(orderId: number, user: AuthUser) {
    const order = await this.getViewableOrder(orderId, user);
    if (order.status !== "PENDING") {
      throw new ConflictException("결제 전(PENDING) 주문만 취소할 수 있습니다.");
    }
    await this.prisma.$transaction(async (tx) => {
      const items = await tx.orderItem.findMany({
        where: { orderId },
        select: { productId: true, quantity: true },
      });
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
      await tx.order.update({
        where: { id: orderId },
        data: { status: "CANCELLED" },
      });
    });
    return { cancelled: orderId };
  }

  findMine(userId: number) {
    return this.prisma.order.findMany({
      where: { buyerId: userId },
      orderBy: { id: "desc" },
      include: {
        items: { include: { product: { select: { id: true, name: true } } } },
        payment: true,
      },
    });
  }

  async findOne(id: number, user: AuthUser) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        buyer: { select: { id: true, name: true } },
        items: { include: { product: { select: { id: true, name: true } } } },
        payment: true,
      },
    });
    if (!order) throw new NotFoundException(`주문 ${id}를 찾을 수 없습니다.`);
    if (order.buyerId !== user.id && user.role !== "ADMIN") {
      throw new ForbiddenException("본인 주문만 조회할 수 있습니다.");
    }
    return order;
  }

  // 결제는 주문 주인(구매자)만 — 관리자도 남의 결제는 못 한다.
  private async getBuyerOrder(orderId: number, userId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, status: true, buyerId: true, totalPrice: true },
    });
    if (!order) throw new NotFoundException(`주문 ${orderId}를 찾을 수 없습니다.`);
    if (order.buyerId !== userId) {
      throw new ForbiddenException("본인 주문만 결제할 수 있습니다.");
    }
    return order;
  }

  // 조회·취소는 주문 주인 또는 관리자.
  private async getViewableOrder(orderId: number, user: AuthUser) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, status: true, buyerId: true },
    });
    if (!order) throw new NotFoundException(`주문 ${orderId}를 찾을 수 없습니다.`);
    if (order.buyerId !== user.id && user.role !== "ADMIN") {
      throw new ForbiddenException("본인 주문만 다룰 수 있습니다.");
    }
    return order;
  }
}
