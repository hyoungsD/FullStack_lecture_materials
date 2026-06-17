import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Role } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // 비밀번호 해시는 AuthService가 끝내고 넘겨준다. 여기선 저장만.
  create(data: { email: string; name: string; password: string; role: Role }) {
    return this.prisma.user.create({ data });
  }

  // 로그인 검증용 — password(해시)까지 포함해 가져온다.
  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  // 내 정보·존재 확인용 — 비밀번호는 빼고 돌려준다.
  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    if (!user) throw new NotFoundException(`사용자 ${id}를 찾을 수 없습니다.`);
    return user;
  }
}
