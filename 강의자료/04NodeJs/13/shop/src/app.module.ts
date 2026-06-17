import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { CartsModule } from './carts/carts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UPLOAD_DIR } from './common/upload.config';

@Module({
  imports: [CategoriesModule, ProductsModule, UsersModule, PrismaModule, AuthModule, OrdersModule, CartsModule,
    // 업로드한 이미지를 그대로 내여주는 주는 모듈 uploads/ -> /uploads 
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), UPLOAD_DIR), // .../shop/uploads 
      serveRoot: "/uploads"
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
