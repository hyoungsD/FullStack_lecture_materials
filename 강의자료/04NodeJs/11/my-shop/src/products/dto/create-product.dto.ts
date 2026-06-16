import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    
    @ApiProperty({example: "무선이어폰"})
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty({example: "노이즈캔슬링"})
    @IsString()
    description: string

    @ApiProperty({example: 89000, description:"원 단위"})
    @IsInt()
    @Min(0)
    price: number;

    @ApiProperty({example: 10})
    @IsInt()
    @Min(0)
    stock: number;

    @ApiProperty({example: 1, description: "분류 ID "})
    @IsInt()
    categoryId: number;
}
