import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// PrismaClient를 NESTJS 생명주기에 연결 
// 모듈이 뜰 때 (Prisma) DB 연결하고, 모듈이 내려갈때 DB 연결을 닫는다.
@Injectable()
export class PrismaService extends PrismaClient 
 implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect(); // prismaclient 가 커넥션풀링을 관리
    }

    async onModuleDestroy() {
        await this.$disconnect(); 
    }
 } 
