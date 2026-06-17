// JWT 시크릿을 환경변수에서 가지와서 단일 출처로 사용하기 위해서
// 운영에서 dev-secret-change-me .env 에서 바꿔서 사용
export const jwtContants = {
    secret: process.env.JWT_SECRET ?? "dev-secret-change-me"
}