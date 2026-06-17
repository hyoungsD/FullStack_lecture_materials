import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUser } from 'src/common/current-user.decorator';
import { UPLOAD_DIR } from 'src/common/upload.config';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService
  ){}
  async create(createProductDto: CreateProductDto, sellerId: number) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        stock: createProductDto.stock,
        sellerId: sellerId, // req.user.id 
        // M:N -> [1,2,3]
        // connect -> 새 프로덕트가 들어오면, product insert 새로하고, 기존
        // 기존 카테고리에 연결해줘(connect ) 라는 의미 
        // (id) => ({id})) 
        // connect : [ {id: 1} , {id: 2} ]
        // (id) => ({id}) {id: 1}
        categories: { connect: createProductDto.categoryIds.map((id) => ({id}))}
      }
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        seller : {
          select: {id: true, name: true}
        }, categories: true
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where : {id}, 
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        price: updateProductDto.price,
        stock: updateProductDto.stock,
        // set : 이 상품 분류 연결을 전달 해준 목록으로 전부 다시 정해라 
        //       기존 연결된 목록 에 없는것은 중간테이블 삭제
        //       목록에 있는것 -> 이미 연결되어 있으면 유지, 없으면 insert 
        //       기존 [1,2]. > 신규 [2,3]     1은 지우고, 2번은 그대로두고, 3번은 연결추가 
        ...( updateProductDto.categoryIds ? {
          categories : { set : updateProductDto.categoryIds.map((cid) => ({id: cid}))}
        } : {})
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async addImage(productId: number, user: AuthUser, file: Express.Multer.File) {
    const product = await this.prisma.product.findUnique({
      where : {id: productId},
      select: {id: true, sellerId: true}
    });
    // npx prisma migrate dev --name add-product-iamge
    // npx prisma generate
    const image = await this.prisma.productImage.create({
      data: {productId, storedName: file.filename}
    });
    return {id: image.id, url: `${UPLOAD_DIR}/${image.storedName}`}
  }
}
