import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AddCartItemDto } from "./dto/add-cart-item.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  // 담기 — 같은 상품을 또 담으면 새 줄을 만들지 않고 수량을 더한다.
  // (userId, productId) 유니크 제약 덕에 upsert 한 번으로 처리된다.
  // 여기서 재고는 참고만 한다. 진짜 차감과 확인은 주문(checkout)에서 한다.
  async addItem(userId: number, dto: AddCartItemDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
      select: { id: true },
    });
    if (!product) throw new NotFoundException(`상품 ${dto.productId}가 없습니다.`);

    return this.prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId: dto.productId } },
      update: { quantity: { increment: dto.quantity } },
      create: { userId, productId: dto.productId, quantity: dto.quantity },
    });
  }

  // 내 장바구니 — 줄마다 소계를 내고 전체 합계를 붙여 준다.
  async getCart(userId: number) {
    const items = await this.prisma.cartItem.findMany({
      where: { userId },
      orderBy: { id: "asc" },
      include: {
        product: { select: { id: true, name: true, price: true, stock: true } },
      },
    });

    const lines = items.map((item) => ({
      cartItemId: item.id,
      productId: item.product.id,
      name: item.product.name,
      unitPrice: item.product.price,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity,
      stock: item.product.stock,
    }));
    const total = lines.reduce((sum, line) => sum + line.subtotal, 0);
    return { items: lines, total };
  }

  async updateQuantity(userId: number, cartItemId: number, dto: UpdateCartItemDto) {
    await this.ensureOwner(userId, cartItemId);
    return this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: dto.quantity },
    });
  }

  async removeItem(userId: number, cartItemId: number) {
    await this.ensureOwner(userId, cartItemId);
    await this.prisma.cartItem.delete({ where: { id: cartItemId } });
    return { deleted: cartItemId };
  }

  private async ensureOwner(userId: number, cartItemId: number) {
    const item = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
      select: { userId: true },
    });
    if (!item) throw new NotFoundException(`장바구니 항목 ${cartItemId}가 없습니다.`);
    if (item.userId !== userId) {
      throw new ForbiddenException("본인 장바구니만 수정할 수 있습니다.");
    }
  }
}
