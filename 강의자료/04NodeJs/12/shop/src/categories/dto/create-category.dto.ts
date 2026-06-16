import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({example: "모바일폰"})
    @IsString()
    @MinLength(1)
    name : string;
}
