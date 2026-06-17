import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtContants } from "../constants";

export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(){
        super({
            // Authorization : Bearer <토근>  -> 헤더에서 jwt 추출 
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // 만료된 토큰은 거부 (AuthModule signOption.expiresIn)
            ignoreExpiration: false,
            // 로그인 시에 sign()에 쓴 secret 과 동일해야 검증 성공 
            secretOrKey: jwtContants.secret
        });
    }
    // passport-jwt가 서명 완료된거 확인한 뒤에 payload 넘긴다 
    // 반환값은 req.user 된다  req.user 뽑아쓰면 아래 return 고대로 볼 수 있다.
    validate(payload: any) {
        return {id: payload.sub, email: payload.email, role: payload.role}
    }

}