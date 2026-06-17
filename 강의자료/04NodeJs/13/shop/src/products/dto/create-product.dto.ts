import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @ApiProperty({example: "무선 이어폰"})
    @IsString()
    @MinLength(1)
    name : string;

    @ApiProperty({example: "노이즈 캔슬링"})
    @IsString()
    @MinLength(1)
    description: string;

    @ApiProperty({example: 89000, description: "원단위"})
    @IsInt()
    @Min(0)
    price: number;

    @ApiProperty({example: 10})
    @IsInt()
    @Min(0)
    stock: number;

    @ApiProperty({example: 1, description: "User ID"})
    @IsInt()
    sellerId: number;

    @ApiProperty({type: [Number], example: [1,2], description: "분류 id 배열"})
    @IsArray()
    @IsInt({each: true})
    categoryIds: number[];
}
