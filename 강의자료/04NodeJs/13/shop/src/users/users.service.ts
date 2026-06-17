import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RouterModule } from '@nestjs/core';
import { Role } from '@prisma/client';

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

  async update(id: number, updateUserDto: UpdateUserDto) {
    await  this.findOne(id);
    // const exists = await this.prisma.user.findUnique({
    //   where : {email : updateUserDto.email}
    // })
    
    return this.prisma.user.update({where: {id}, data: updateUserDto})

  }

  async remove(id: number) {
    await this.findOne(id);
    const deleted = this.prisma.user.delete({where: {id}})
    return {deleted: deleted}
  }

  // 회원가입 시 사용 목적 
  async createUser(data: {email: string, name: string, password: string, role: Role}) {
    return this.prisma.user.create({data});
  }

  // 로그인 시 사용 목적 
  async findByEmail(email: string){
    return this.prisma.user.findUnique({where: {email}})
  }
}
