import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({example: "전자기기"})
    @IsString()
    @MinLength(1)
    name : string;
}
