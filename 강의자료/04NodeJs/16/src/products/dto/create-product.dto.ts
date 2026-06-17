import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsString, Min, MinLength } from "class-validator";

// 12장에 있던 sellerId가 사라졌다 — 이제 판매자는 본문이 아니라 토큰에서 온다.
export class CreateProductDto {
  @ApiProperty({ example: "무선 이어폰" })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: "노이즈 캔슬링" })
  @IsString()
  description: string;

  @ApiProperty({ example: 89000 })
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ type: [Number], example: [1, 2] })
  @IsArray()
  @IsInt({ each: true })
  categoryIds: number[];
}
