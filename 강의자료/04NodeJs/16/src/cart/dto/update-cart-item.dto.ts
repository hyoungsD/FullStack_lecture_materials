import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

export class UpdateCartItemDto {
  @ApiProperty({ example: 3, description: "바꿀 수량(1 이상)" })
  @IsInt()
  @Min(1)
  quantity: number;
}
