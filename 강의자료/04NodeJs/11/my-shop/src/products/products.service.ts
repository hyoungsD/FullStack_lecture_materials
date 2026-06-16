import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly categoriesService: CategoriesService
  ){}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({data: createProductDto})
  }

  async findAll(query: QueryProductDto) {
    const { page, limit } = query;
    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        skip: (page - 1) * limit , // offset
        take: limit, //limit 
        orderBy: { id: "desc"}
      }),
      this.prisma.product.count() //select count(*) from products
    ]);
    return { items, total, page, limit, totalPage: Math.ceil(total / limit)}
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({where : {id}})
    if(!product) throw new NotFoundException(`상품 ${id}를 찾을 수 없습니다`)
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id); // 없으면 그냥 404
    // update products set ... where id = 3
    return await this.prisma.product.update({where : {id}, data: updateProductDto})
  }

  async remove(id: number) {
    await this.findOne(id) ;
    await this.prisma.product.delete({where : {id}});
    return {deleted : id}
  }
}
