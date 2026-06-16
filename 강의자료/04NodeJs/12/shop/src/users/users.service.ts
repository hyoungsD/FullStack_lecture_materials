import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService){

  }
  async create(createUserDto: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({
      where : {email : createUserDto.email}
    });
    if (exists) throw new ConflictException(`이미 가입된 이메일 입니다`)
    return this.prisma.user.create({data: createUserDto})
  }

  findAll() {
    return this.prisma.user.findMany({
      orderBy: {id: "asc"}
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where : {id }
    })
    if(!user) throw new NotFoundException(`사용자 아이디 ${id} 찾을수 없습니다`)
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
