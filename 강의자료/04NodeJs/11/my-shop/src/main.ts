import "dotenv/config"; // from .env 를 읽어서 환경 변수를 process.env 넣어줍니다.
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));
  // Swagger - 전역설정
  const config = new DocumentBuilder()
    .setTitle("쇼핑몰 API")
    .setDescription("11장 - 분류/상품 CRUD")
    .setVersion("1.0")
    .build()

  SwaggerModule.setup("docs", app, SwaggerModule.createDocument(app, config))
  // SwaggerModule.createDocument 
  // Nest app에 등록된 모든 모듈과 컨틀롤러 라우터를 훑는다.
  // DTO 에 @ApiProperty , 컨트롤러 @ApiTags 읽어
  // Open API 스펙으로 반환 

  // SwaggerModule.setup 
  // "docs" : http://localhost:3000/docs 문서로 접속하면 스웨거 문서 
  // app  : Nest JS Express app   
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Prisma 기초(쇼핑몰) 시작 http://localhost:${process.env.PORT}`);
}
bootstrap();
