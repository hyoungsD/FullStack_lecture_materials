import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(
    private readonly prisma: PrismaService
  ){}

  // 장바구니에 아이템 담기 
  // 같은 상품을 답으면 새 로운 로우를 추가하지 않고 수량만 업데이트 1) 
  // 상품이 없으면 새로운 로우를 추가한다.  
  async create(createCartDto: CreateCartDto, userId: number) {
    const product = await this.prisma.product.findUnique({
      where : {id: createCartDto.productId}
    })
    if(!product) throw new NotFoundException(`상품 ${createCartDto.productId}이 없어요`);
    return this.prisma.cartItem.upsert({
      where : {userId_productId: {userId: userId, productId: createCartDto.productId}},
      update: {quantity: {increment : createCartDto.quantity}}, 
      // update cartitem set quantity = quantity +1  where userId =? and productId = ?
      create: {userId, productId: createCartDto.productId, quantity: createCartDto.quantity}
      // insert into cartItem(userId, productId, quantity) values ( ? , ? , ?)
    });
  }

  findAll() {
    return `This action returns all carts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
