import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // 반환값이 req.user가 된다. payload = { sub, email, role }.
  // role을 여기서 함께 풀어 둔다 — 컨트롤러의 역할 검사(if)에 쓴다.
  async validate(payload: any) {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
