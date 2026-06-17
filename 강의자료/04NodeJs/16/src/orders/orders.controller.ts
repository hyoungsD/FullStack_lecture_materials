import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { OrdersService } from "./orders.service";
import { PayDto } from "./dto/pay.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser, AuthUser } from "../common/current-user.decorator";

@ApiTags("orders")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) // 클래스 전체: 로그인 필수.
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // 주문 — 내 장바구니를 통째로 주문으로 바꾼다(트랜잭션).
  @Post("checkout")
  checkout(@CurrentUser("id") userId: number) {
    return this.ordersService.checkout(userId);
  }

  @Get() // 내 주문 목록
  findMine(@CurrentUser("id") userId: number) {
    return this.ordersService.findMine(userId);
  }

  @Get(":id") // 본인 또는 관리자
  findOne(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser
  ) {
    return this.ordersService.findOne(id, user);
  }

  // 결제(모의) — 본인 주문만.
  @Post(":id/pay")
  pay(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: PayDto,
    @CurrentUser("id") userId: number
  ) {
    return this.ordersService.pay(id, userId, dto);
  }

  // 취소 — 본인 또는 관리자. 결제 전 주문만 취소되고 재고가 복구된다.
  @Post(":id/cancel")
  cancel(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser
  ) {
    return this.ordersService.cancel(id, user);
  }

  // 배송 상태 변경 — 관리자만(간단한 if). PAID → SHIPPED → DONE 순서로만 넘어간다.
  @Patch(":id/status")
  updateStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
    @CurrentUser() user: AuthUser
  ) {
    if (user.role !== "ADMIN") {
      throw new ForbiddenException("관리자만 배송 상태를 변경할 수 있습니다.");
    }
    return this.ordersService.updateShippingStatus(id, dto.status);
  }
}
