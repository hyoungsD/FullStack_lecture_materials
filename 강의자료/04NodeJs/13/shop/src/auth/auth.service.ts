import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService, // 회원가임 및 찾기 this.prisma.user 
        private readonly jwtService: JwtService // AuthModule 
    ) {}

    async register(dto : RegisterDto) {
        // 1) 이메일 중복 확인 - 있으면 409 컨플릭트 
        const exists = await this.usersService.findByEmail(dto.email); // 기존 유저체크
        if(exists) throw new ConflictException(`이미 가입된 이메일입니다.`)
        // 2) 평문 비밀번호를 암호화 -> bcrypt 해시 (salt round 10) DB 해시만 저장 
        const hashed = await bcrypt.hash(dto.password, 10); // 비밀번호 암호하 
        // 3) UserService. createUser 저장 
        const user = await this.usersService.createUser({
            email: dto.email,
            name: dto.name,
            password: hashed,
            role: dto.role ?? "BUYER"
        }); // 유저생성 
        // 4) 응답에 password 필드를 제외한 값을 클라이언트에게 전달 
        const {password, ...result} = user; // 비밀번호를 빼고 나머지 데이터 반환 
        return result;
    }

    async login(dto: LoginDto) {
        // 1) 이메일로 회원이 있는지 검사 
        const user = await this.usersService.findByEmail(dto.email)
        // 2) 회원이 있으면 평문암호와 DB에 저장된 해시를 비교 bcrypt.compare 
        if(!user) {
            throw new UnauthorizedException(`비밀번호 암호가 틀려요`)
        }
        // const isRight = await bcrypt.compare(dto.password, user.password);
        // !user -> 유저가 없으면 true  -> throw new Excpetion 
        // 
        // if(!user || !(await bcrypt.compare(dto.password, user.password))) {
        //     throw new UnauthorizedException(`이메일 또는 비번이틀려요`)
        // }
        const payload = { 
            sub: user.id, email: user.email, role: user.role
        }
        return {
            access_token : this.jwtService.sign(payload)
        }
    }
}
