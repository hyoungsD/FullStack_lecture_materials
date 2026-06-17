import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";

export class PayDto {
  // 실제 PG 연동은 없다. 어떤 수단으로 결제했다고 기록만 남기는 모의 결제다.
  @ApiProperty({ enum: ["CARD", "BANK", "POINT"], example: "CARD" })
  @IsIn(["CARD", "BANK", "POINT"])
  method: string;
}
