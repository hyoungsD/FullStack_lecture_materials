백엔드 개발 컨벤션 문서

#### 📚 목차

* [📁 프로젝트 구조](#-프로젝트-구조)
* [📂 디렉토리 규칙](#-디렉토리-규칙)
* [📄 파일명 규칙](#-파일명-규칙)
* [🏷️ 네이밍 규칙](#%EF%B8%8F-네이밍-규칙)
* [🎮 Controller 규칙](#-controller-규칙)
* [🔧 Service 규칙](#-service-규칙)
* [🔗 Module 규칙](#-module-규칙)
* [📦 DTO 규칙](#-dto-규칙)
* [🗄️ Prisma 규칙](#%EF%B8%8F-prisma-규칙)
* [🎯 Prisma Select 규칙](#-prisma-select-규칙)
* [🔄 Transaction 규칙](#-transaction-규칙)
* [🚨 예외 처리 규칙](#-예외-처리-규칙)
* [🔐 환경 변수 규칙](#-환경-변수-규칙)
* [⛔ 금지 사항](#-금지-사항)

<br><br><br>

---

# 📁 프로젝트 구조

```txt
project-root/
├─ prisma/
├─ uploads/
│
├─ src/
│  ├─ auth/
│  ├─ common/
│  ├─ prisma/
│  └─ config/
```

<br><br><br>

---

# 📂 디렉토리 규칙

### prisma (Root)

Prisma 스키마 및 마이그레이션 관리

### uploads (Root)

업로드 파일 저장 (정적 파일 저장소)

### auth

인증 및 인가 관리

```txt
auth/
├─ auth.controller.ts
├─ auth.service.ts
├─ auth.module.ts
├─ dto/
└─ guards/
```

### common

공통 기능 관리

```txt
common/
├─ dto/
├─ decorators/
├─ guards/
└─ interceptors/
```

### prisma(src)

PrismaService 및 PrismaModule 관리

### config

환경 변수 관리

```txt
config/
├─ env.validation.ts
└─ configuration.ts
```

<br><br><br>

---

# 📄 파일명 규칙

### Controller

```txt
auth.controller.ts
users.controller.ts
posts.controller.ts
```

### Service

```txt
auth.service.ts
users.service.ts
posts.service.ts
```

### Module

```txt
auth.module.ts
users.module.ts
posts.module.ts
```

### DTO

```txt
create-post.dto.ts
update-post.dto.ts
login.dto.ts
register.dto.ts
```

### Guard

```txt
jwt-auth.guard.ts
roles.guard.ts
```

### Decorator

```txt
current-auth.decorator.ts
roles.decorator.ts
```

<br><br><br>

---

# 🏷️ 네이밍 규칙

### 변수

camelCase 사용

```ts
const user;
const post;
const postList;
```

### 함수

동사로 시작

```ts
createPost();
findAllPosts();
findOnePost();
updatePost();
deletePost();
```

### Boolean

is / has / can 사용

```ts
isAdmin
isOwner
hasPermission
canDelete
```

### 상수

SCREAMING_SNAKE_CASE 사용

```ts
const JWT_EXPIRES_IN = '7d';
const MAX_FILE_SIZE = 5000000;
```

<br><br><br>

---

# 🎮 Controller 규칙

### Controller는 요청 처리만 담당

⭕

```ts
@Get(':id')
findOne(@Param('id') id: string) {
  return this.postsService.findOne(id);
}
```

❌

```ts
@Get(':id')
async findOne(@Param('id') id: string) {
  const post = await this.prisma.post.findUnique(...);
  return post;
}
```

### DB 접근은 Service에서만 수행

Controller에서 Prisma 사용 금지

<br><br><br>

---

# 🔧 Service 규칙

### 비즈니스 로직은 Service에서 처리

⭕

```ts
async create(dto: CreatePostDto) {
  return this.prisma.post.create({
    data: dto,
  });
}
```

### Service 간 직접 호출 허용

```ts
UsersService
PostsService
AuthService
```

<br><br><br>

---

# 🔗 Module 규칙

### 모듈 간 순환 참조 발생 시 forwardRef 사용

순환 참조(Circular Dependency)가 발생하는 경우 `forwardRef()`를 사용한다.

### 순환 참조 최소화

`forwardRef()`는 순환 참조 해결을 위한 수단으로 사용한다.

가능한 경우 공통 로직을 별도 Module 또는 Service로 분리한다.


### Pull Request 규칙

`forwardRef()` 사용 시 Pull Request 설명에 사용 이유를 작성한다.

예시

```txt
UsersService와 AuthService 간 상호 참조가 필요하여
forwardRef() 적용
```

### 금지 사항

* 순환 참조 오류 무시 ❌
* 모든 Module에 무분별한 forwardRef 사용 ❌
* Service 직접 생성(new)으로 순환 참조 해결 ❌

<br><br><br>

---

# 📦 DTO 규칙

### Request DTO 작성 필수

```txt
create-post.dto.ts
update-post.dto.ts
login.dto.ts
```

### Validation 적용

```ts
export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
```

### Entity 직접 사용 금지

❌

```ts
create(@Body() body: Post)
```

⭕

```ts
create(@Body() dto: CreatePostDto)
```

<br><br><br>

---

# 🗄️ Prisma 규칙

### Model명

PascalCase 사용

```prisma
model User

model Post

model Comment
```

### Field명

camelCase 사용

```prisma
createdAt
updatedAt
profileImage
```

### 공통 컬럼

필요시 Model에 추가 (권장 사항)

```prisma
id String @id @default(uuid())

createdAt DateTime @default(now())

updatedAt DateTime @updatedAt
```

### Prisma 접근 위치

Service에서만 사용

❌

```ts
controller → prisma
```

⭕

```ts
controller → service → prisma
```

<br><br><br>

---

# 🎯 Prisma Select 규칙

### Select 사용 권장

조회 시 필요한 컬럼만 조회한다.

❌

```ts
const user = await this.prisma.user.findUnique({
  where: { id },
});
```

⭕

```ts
const user = await this.prisma.user.findUnique({
  where: { id },
  select: USER_SELECT,
});
```

### 공통 Select 상수 관리

반복 사용되는 Select는 상수로 관리한다.

```txt
users/
├─ constants/
│  └─ user-select.constant.ts
```

```ts
export const USER_SELECT = {
  id: true,
  email: true,
  username: true,
  profileImage: true,
  createdAt: true,
} as const;
```

### 민감 정보 반환 금지

다음 정보는 API 응답에 포함하지 않는다.

```txt
password
refreshToken
```

### 금지 사항

* Select 없이 전체 데이터 조회 ❌
* 민감 정보 반환 ❌
* 동일 Select 중복 작성 ❌

<br><br><br>

---

# 🔄 Transaction 규칙

### 다중 DB 작업 시 Transaction 사용

2개 이상의 DB 작업이 하나의 작업 단위인 경우 Transaction을 사용한다.

❌

```ts
await this.prisma.product.update(...);

await this.prisma.order.create(...);
```

⭕

```ts
await this.prisma.$transaction(async (tx) => {
  await tx.product.update(...);

  await tx.order.create(...);
});
```

### 조회 전용 로직에는 사용 금지

❌

```ts
await this.prisma.$transaction(async (tx) => {
  return tx.user.findMany();
});
```

### 금지 사항

* Transaction 내부에서 prisma 사용 ❌
* 다중 DB 작업을 Transaction 없이 처리 ❌
* 조회 전용 로직에 Transaction 사용 ❌

<br><br><br>

---

# 🚨 예외 처리 규칙

### NestJS HttpException 사용

반복 사용되는 예외 메시지는 상수로 관리한다.

```ts
throw new UnauthorizedException(
  ERROR_MESSAGE.AUTH.UNAUTHORIZED,
);
```

```ts
throw new NotFoundException(
  ERROR_MESSAGE.POST.NOT_FOUND,
);
```

<br><br><br>

---

# 🔐 환경 변수 규칙

### 환경 변수는 ConfigModule 사용

❌

```ts
process.env.JWT_SECRET
```

⭕

```ts
configService.get('JWT_SECRET')
```

<br><br><br>

---

# ⛔ 금지 사항

* any 사용 ❌
* console.log 커밋 ❌
* 주석 처리된 코드 커밋 ❌
* Controller에서 Prisma 접근 ❌
* DTO 없이 Request 처리 ❌
* Entity 직접 사용 ❌
* process.env 직접 접근 ❌
* 사용하지 않는 import 방치 ❌

<br><br><br>

---
