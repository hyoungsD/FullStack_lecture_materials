import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: "seller@example.com"})
    @IsEmail()
    email: string;

    @ApiProperty({example: "판매자1"})
    @IsString()
    @MinLength(2)
    name: string;
}
