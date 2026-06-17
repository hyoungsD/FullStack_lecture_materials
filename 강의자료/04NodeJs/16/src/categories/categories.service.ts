import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    const exists = await this.prisma.category.findUnique({
      where: { name: dto.name },
    });
    if (exists) throw new ConflictException(`이미 있는 분류입니다: ${dto.name}`);
    return this.prisma.category.create({ data: { name: dto.name } });
  }

  findAll() {
    return this.prisma.category.findMany({
      orderBy: { id: "asc" },
      include: { _count: { select: { products: true } } },
    });
  }

  async ensureAllExist(ids: number[]) {
    if (ids.length === 0) return;
    const count = await this.prisma.category.count({
      where: { id: { in: ids } },
    });
    if (count !== new Set(ids).size) {
      throw new BadRequestException("존재하지 않는 분류 id가 있습니다.");
    }
  }
}
