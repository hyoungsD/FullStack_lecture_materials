import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

// /POST /auth/register 요청 본문 email, passowrd, name ROLE ADMIN
export class RegisterDto {
    @ApiProperty({example: "seller@demo.com"})
    @IsEmail()
    email: string;

    @ApiProperty({example: "secret123"})
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({example: "판매자"})
    @IsString()
    @MinLength(2)
    name: string;

    // 가입 시 구매자/판매자를 고를 수 있게
    // ADMIN 은 여기서 못만들어요 
    @ApiProperty({enum: ["BUYER", "SELLER"], default: "BUYER"})
    @IsOptional()
    @IsIn(["BUYER", "SELLER"])
    role?: "BUYER" | "SELLER"
}