import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// @UseGuard(JwtAuthGuard) 
// AuthGuard("jwt") --> JwtStrategy 찾아서 jwt 전략을 돌린다 
// 성공 req.user 채워지고 실패 하면 401 Unauthorizated
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt"){}