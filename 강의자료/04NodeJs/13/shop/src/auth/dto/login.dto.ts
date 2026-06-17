import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

// /POST /auth/login 요청 본문  이메일과, 패스워드 
export class LoginDto {
    @ApiProperty({example: "seller@example.com"})
    @IsEmail()    
    email: string;

    @ApiProperty({example: "secret123"})
    @IsString()
    password: string;
}