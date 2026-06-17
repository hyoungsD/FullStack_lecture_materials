import "dotenv/config"; // .env(JWT_SECRET·DATABASE_URL)를 모듈 로드보다 먼저 읽는다
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { mkdirSync } from "fs";
import { AppModule } from "./app.module";
import { UPLOAD_DIR } from "./common/upload.config";

async function bootstrap() {
  // 업로드 폴더가 없으면 multer가 첫 저장에서 실패한다. 시작할 때 한 번 만든다.
  mkdirSync(UPLOAD_DIR, { recursive: true });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger 자동 문서 — DTO/데코레이터를 읽어 /docs 에 API 문서를 만든다.
  const config = new DocumentBuilder()
    .setTitle("쇼핑몰 API (이미지·배송)")
    .setDescription("16장 — 상품 이미지 업로드 + 배송 상태머신(PAID→SHIPPED→DONE)")
    .setVersion("1.0")
    .addBearerAuth() // 보호 라우트 테스트용 토큰 입력
    .build();
  SwaggerModule.setup("docs", app, SwaggerModule.createDocument(app, config));

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log(`쇼핑몰 API(이미지·배송) 시작: http://localhost:${port}  (Swagger 문서: /docs)`);
}
bootstrap();
