import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // whitelist는 dto 에 없는 필드 자동 제거 만약 dto 에 isAdmin 이 없는데.. 클라이언트에서 isAdmin 보내면 자동 미시
  // transform :  ?page=2 2 문자열인데  숫자 2로 자동변환  service 에서 Number 로 형변화 
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform:  true}))

  const config = new DocumentBuilder()
    .setTitle("쇼피몰 API (Relation 추가) ")
    .setDescription("12장 판매자 1: N, 분류 M:N ")
    .setVersion("1.0")
    .build();
  
  SwaggerModule.setup("docs", app, SwaggerModule.createDocument(app, config));
    
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Prisma 관계형 쇼핑몰 시작 : http://localhost:${process.env.PORT} (Swagger 문서 : /docs)`)
}
bootstrap();
