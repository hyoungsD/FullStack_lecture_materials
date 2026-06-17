import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Role } from "@prisma/client";

// JwtStrategy.validate가 돌려준 값이 req.user에 담긴다.
// 권한 판단에 role이 쓰이므로 토큰에서 함께 풀어 둔다.
export interface AuthUser {
  id: number;
  email: string;
  role: Role;
}

// @CurrentUser() user        → { id, email, role }
// @CurrentUser("id") userId  → user.id
export const CurrentUser = createParamDecorator(
  (field: keyof AuthUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: AuthUser = request.user;
    return field ? user?.[field] : user;
  }
);
