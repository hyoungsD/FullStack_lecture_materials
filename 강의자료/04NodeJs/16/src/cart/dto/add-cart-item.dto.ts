import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

export class AddCartItemDto {
  @ApiProperty({ example: 1, description: "담을 상품 id" })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 2, description: "수량(1 이상)" })
  @IsInt()
  @Min(1)
  quantity: number;
}
