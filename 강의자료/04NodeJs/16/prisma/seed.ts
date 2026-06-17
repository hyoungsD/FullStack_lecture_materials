// 관리자 계정과 기본 분류를 넣는 시드.
// 회원가입(/auth/register)으로는 ADMIN을 만들 수 없게 막아 뒀으므로,
// 관리자는 이 스크립트로만 생긴다. 실행: npm run seed
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password,
      name: "관리자",
      role: "ADMIN",
    },
  });

  const categoryNames = ["전자기기", "도서", "생활용품"];
  for (const name of categoryNames) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log(`시드 완료 — 관리자(${admin.email} / admin123), 분류 ${categoryNames.length}건`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
