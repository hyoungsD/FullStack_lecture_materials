import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";

// 관리자가 배송 상태를 넘길 때 쓴다. 결제(PAID)·취소(CANCELLED)는 여기로 못 바꾼다.
export class UpdateStatusDto {
  @ApiProperty({ enum: ["SHIPPED", "DONE"], example: "SHIPPED" })
  @IsIn(["SHIPPED", "DONE"])
  status: "SHIPPED" | "DONE";
}
