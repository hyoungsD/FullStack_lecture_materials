import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { unlink } from "fs/promises";
import { join } from "path";
import { PrismaService } from "../prisma/prisma.service";
import { CategoriesService } from "../categories/categories.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { QueryProductDto } from "./dto/query-product.dto";
import { AuthUser } from "../common/current-user.decorator";
import { UPLOAD_DIR } from "../common/upload.config";

const withRelations = {
  seller: { select: { id: true, name: true } },
  categories: { select: { id: true, name: true } },
  images: { select: { id: true, storedName: true } },
};

const POPULAR_KEY = "products:popular";
const detailKey = (id: number) => `product:${id}`;

@Injectable()
export class ProductsService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly prisma: PrismaService,
    private readonly categoriesService: CategoriesService
  ) {}

  async create(dto: CreateProductDto, sellerId: number) {
    await this.categoriesService.ensureAllExist(dto.categoryIds);
    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        sellerId,
        categories: { connect: dto.categoryIds.map((id) => ({ id })) },
      },
      include: withRelations,
    });
    await this.cache.del(POPULAR_KEY);
    return this.withImageUrls(product);
  }

  async findAll(query: QueryProductDto) {
    const { page, limit, categoryId } = query;
    const where = categoryId
      ? { categories: { some: { id: categoryId } } }
      : {};
    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: "desc" },
        include: withRelations,
      }),
      this.prisma.product.count({ where }),
    ]);
    return {
      items: items.map((p) => this.withImageUrls(p)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async popular() {
    const cached = await this.cache.get(POPULAR_KEY);
    if (cached) return { source: "cache", items: cached };

    const products = await this.prisma.product.findMany({
      orderBy: { viewCount: "desc" },
      take: 5,
      include: withRelations,
    });
    const items = products.map((p) => this.withImageUrls(p));
    await this.cache.set(POPULAR_KEY, items, 30_000);
    return { source: "db", items };
  }

  async findOne(id: number) {
    const cached = await this.cache.get(detailKey(id));
    if (cached) return cached;

    const product = await this.prisma.product.findUnique({
      where: { id },
      include: withRelations,
    });
    if (!product) throw new NotFoundException(`상품 ${id}를 찾을 수 없습니다.`);
    const result = this.withImageUrls(product);
    await this.cache.set(detailKey(id), result, 30_000);
    return result;
  }

  async incrementView(id: number) {
    await this.findExisting(id);
    const updated = await this.prisma.product.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
      select: { id: true, viewCount: true },
    });
    await this.invalidate(id);
    return updated;
  }

  async update(id: number, dto: UpdateProductDto, user: AuthUser) {
    await this.getManageable(id, user);
    if (dto.categoryIds !== undefined) {
      await this.categoriesService.ensureAllExist(dto.categoryIds);
    }
    const updated = await this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        ...(dto.categoryIds
          ? { categories: { set: dto.categoryIds.map((cid) => ({ id: cid })) } }
          : {}),
      },
      include: withRelations,
    });
    await this.invalidate(id);
    return this.withImageUrls(updated);
  }

  async remove(id: number, user: AuthUser) {
    await this.getManageable(id, user);
    await this.prisma.product.delete({ where: { id } });
    await this.invalidate(id);
    return { deleted: id };
  }

  // 상품에 이미지 첨부 — 판매자 본인/관리자만. file은 multer가 이미 디스크에 저장한 것.
  // 권한 검사에 걸리면 방금 저장한 파일이 고아로 남으니 직접 지운다.
  async addImage(productId: number, user: AuthUser, file: Express.Multer.File) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, sellerId: true },
    });
    if (!product || !this.canManage(product.sellerId, user)) {
      await this.removeFile(file.filename);
      if (!product) throw new NotFoundException(`상품 ${productId}가 없습니다.`);
      throw new ForbiddenException("본인 상품에만 이미지를 올릴 수 있습니다.");
    }

    const image = await this.prisma.productImage.create({
      data: { productId, storedName: file.filename },
    });
    await this.invalidate(productId);
    return { id: image.id, url: `/uploads/${image.storedName}` };
  }

  async removeImage(imageId: number, user: AuthUser) {
    const image = await this.prisma.productImage.findUnique({
      where: { id: imageId },
      include: { product: { select: { sellerId: true } } },
    });
    if (!image) throw new NotFoundException(`이미지 ${imageId}를 찾을 수 없습니다.`);
    if (!this.canManage(image.product.sellerId, user)) {
      throw new ForbiddenException("본인 상품의 이미지만 삭제할 수 있습니다.");
    }

    await this.prisma.productImage.delete({ where: { id: imageId } });
    await this.removeFile(image.storedName);
    await this.invalidate(image.productId);
    return { deleted: imageId };
  }

  // --- 내부 도우미 ---

  private canManage(sellerId: number, user: AuthUser) {
    return user.role === "ADMIN" || sellerId === user.id;
  }

  private async invalidate(id: number) {
    await this.cache.del(detailKey(id));
    await this.cache.del(POPULAR_KEY);
  }

  private async findExisting(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!product) throw new NotFoundException(`상품 ${id}를 찾을 수 없습니다.`);
    return product;
  }

  private async getManageable(id: number, user: AuthUser) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true, sellerId: true },
    });
    if (!product) throw new NotFoundException(`상품 ${id}를 찾을 수 없습니다.`);
    if (!this.canManage(product.sellerId, user)) {
      throw new ForbiddenException("본인 상품만 수정하거나 삭제할 수 있습니다.");
    }
    return product;
  }

  // 이미지 메타에 다운로드 경로(url)를 붙인다. /uploads 정적 서빙으로 열려 있다.
  private withImageUrls<T extends { images: { storedName: string }[] }>(
    product: T
  ) {
    return {
      ...product,
      images: product.images.map((img) => ({
        ...img,
        url: `/uploads/${img.storedName}`,
      })),
    };
  }

  private async removeFile(storedName: string) {
    try {
      await unlink(join(UPLOAD_DIR, storedName));
    } catch {
      // 파일이 이미 없으면 무시한다.
    }
  }
}
