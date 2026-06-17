import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({ example: "seller@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "secret123" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "판매자" })
  @IsString()
  @MinLength(2)
  name: string;

  // 가입 시 구매자/판매자를 고를 수 있다(데모 편의).
  // ADMIN은 여기서 못 만든다 — 권한 상승을 막으려고 시드로만 생성한다.
  @ApiPropertyOptional({ enum: ["BUYER", "SELLER"], default: "BUYER" })
  @IsOptional()
  @IsIn(["BUYER", "SELLER"])
  role?: "BUYER" | "SELLER";
}
