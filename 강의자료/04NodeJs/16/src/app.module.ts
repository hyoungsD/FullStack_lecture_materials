import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { createKeyv } from "@keyv/redis";
import { join } from "path";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { CategoriesModule } from "./categories/categories.module";
import { ProductsModule } from "./products/products.module";
import { StatsModule } from "./stats/stats.module";
import { CartModule } from "./cart/cart.module";
import { OrdersModule } from "./orders/orders.module";
import { UPLOAD_DIR } from "./common/upload.config";

// 15장 대비 ServeStaticModule(업로드 이미지 정적 서빙)이 더해졌다.
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        // Keyv의 Redis 어댑터를 꽂는다. stores를 빼면 기본 저장소(프로세스 메모리)로 동작한다.
        stores: [
          createKeyv(
            `redis://${process.env.REDIS_HOST ?? "localhost"}:${process.env.REDIS_PORT ?? 6379}`,
          ),
        ],
        ttl: 30_000, // 기본 TTL(ms) — set()에서 개별 지정한 값이 우선
      }),
    }),
    ScheduleModule.forRoot(),
    // 업로드한 이미지를 그대로 내려준다. uploads/ → /uploads 경로.
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), UPLOAD_DIR),
      serveRoot: "/uploads",
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    StatsModule,
    CartModule,
    OrdersModule,
  ],
})
export class AppModule {}
