import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CartService } from "./cart.service";
import { AddCartItemDto } from "./dto/add-cart-item.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../common/current-user.decorator";

// 장바구니는 로그인만 하면 누구나 쓴다(역할 제한 없음). 본인 것만 보고 고친다.
@ApiTags("cart")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post("items")
  addItem(@Body() dto: AddCartItemDto, @CurrentUser("id") userId: number) {
    return this.cartService.addItem(userId, dto);
  }

  @Get()
  getCart(@CurrentUser("id") userId: number) {
    return this.cartService.getCart(userId);
  }

  @Patch("items/:id")
  updateQuantity(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateCartItemDto,
    @CurrentUser("id") userId: number
  ) {
    return this.cartService.updateQuantity(userId, id, dto);
  }

  @Delete("items/:id")
  removeItem(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser("id") userId: number
  ) {
    return this.cartService.removeItem(userId, id);
  }
}
