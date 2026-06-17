// JWT 시크릿 단일 출처 (서명=검증 동일 값). 운영에선 .env로 분리.
export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? "dev-secret-change-me",
};
