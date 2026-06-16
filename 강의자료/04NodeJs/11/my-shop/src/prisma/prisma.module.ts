import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// @Global : 한번 등록하면 모든 모듈이 PrismaService 주입받을 수 있다.
// DB 커넥션은 앱 전체가 공유하는 자원이라 전역을 둔다.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
