import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {

  constructor(private readonly prisma: PrismaService){}

  async create(createCategoryDto: CreateCategoryDto) {
    const exists = await this.prisma.category.findUnique({
      where : { name : createCategoryDto.name}
    });
    
    if(exists) throw new ConflictException(`이미 있는 분류입니다. ${createCategoryDto.name}`)
    return this.prisma.category.create({data: {name : createCategoryDto.name}})
  }

  findAll() {
    // select * from category order by id asc 
    return this.prisma.category.findMany({orderBy: {id: "asc"}}) 
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({where: {id: id}});
    if(!category) throw new NotFoundException(`분류 ${id}를 찾을 수 없습니다.`);
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    // postman body {} 
    if(Object.keys(updateCategoryDto).length < 1) {
      throw new BadRequestException(`수정할 필드가 없습니다.`)
    }
    if(updateCategoryDto.name !== undefined) {
      const exists = await this.prisma.category.findUnique({
        where : {name: updateCategoryDto.name}
      });
      if(exists && exists.id !== id) {
        throw new ConflictException(`이미 존재하는 분류 입니다 ${updateCategoryDto.name}`)
      }
    }
    return this.prisma.category.update({where : {id: id}, data: updateCategoryDto});
    // update category set name = ?, careted = ? where id = ? 
    // data: dto
  }

  async remove(id: number) {
    // product 가 category 하위에 있을 경우 해당 제품의 존재여부 체크로직 들어가야함.
    await this.findOne(id);
    await this.prisma.category.delete({where : {id: id}});
    return {deleted : id}
  }
}
