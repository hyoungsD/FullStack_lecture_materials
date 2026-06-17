import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StatsService {
  private readonly logger = new Logger(StatsService.name);

  constructor(private readonly prisma: PrismaService) {}

  // 데모라 1분마다 돈다. 실무라면 EVERY_DAY_AT_MIDNIGHT 정도가 적당하다.
  @Cron(CronExpression.EVERY_MINUTE)
  async scheduledSnapshot() {
    const stat = await this.snapshot();
    this.logger.log(
      `[cron] 스냅샷 저장 — ${stat.day}: 상품 ${stat.productCount}개, 총재고 ${stat.totalStock}`
    );
  }

  // 오늘 날짜로 상품 수·총재고를 집계해 한 줄로 적재한다.
  // day가 @unique라 같은 날 여러 번 돌아도 한 줄을 갱신(upsert)한다.
  async snapshot() {
    const [productCount, aggregate] = await Promise.all([
      this.prisma.product.count(),
      this.prisma.product.aggregate({ _sum: { stock: true } }),
    ]);
    const totalStock = aggregate._sum.stock ?? 0;
    const day = new Date().toISOString().slice(0, 10); // "2026-06-09"

    return this.prisma.dailyStat.upsert({
      where: { day },
      update: { productCount, totalStock },
      create: { day, productCount, totalStock },
    });
  }

  findAll() {
    return this.prisma.dailyStat.findMany({ orderBy: { day: "desc" } });
  }
}
