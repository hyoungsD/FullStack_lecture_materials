import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

export class CreateCartDto {
    @ApiProperty({example: 1, description: "상품 ID"})
    @IsInt()
    productId: number;

    @ApiProperty({example: 1, description: "수량은 1개 이상"})
    @IsInt()
    @Min(1)
    quantity: number; 
}
