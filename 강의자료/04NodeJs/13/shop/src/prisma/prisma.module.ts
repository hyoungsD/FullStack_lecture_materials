import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 앱 전역에서 다 쓸수 있어 
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 외부에서 사용하려면 프리즈마서비스만
})
export class PrismaModule {}
