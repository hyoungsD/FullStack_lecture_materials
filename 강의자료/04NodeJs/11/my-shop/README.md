
nest new my-shop 
cd my-shop 

nest g resource categories
npm i class-validator class-transformer dotenv
npm i @prisma/client@6
npm i -D prisma@6


npx prisma init --datasource-provider sqlite

nest g module prisma
nest g service prisma --no-spec


npx prisma generate  # client 를 만들어주고 

npm run start:dev

npx prisma format # schema 파일을 정렬 깨끗하게 

## npx prisma generate 의 역할
스키마(모델 파일) 을 실제 사용할 수있는 DB 클라이언트 코드로 바꿔줍니다.

```javascript
model Category {
    id Int @id 
    name String @unique
}

```

npx prisma generate 
@prisma/client 에 다음과 같은 API 
```javascript
    this.prisma.category.create();
    this.prisma.category.findMany();
```

schema.prisma : DB 구조 설계도 (사람이 작성)
npx prisma migrate : DB 테이블 실제 생성 
npx prisma generate : 애플리케이션 코드에서 사용할 클라이언트 API(메소드)를 생성 


만약에  모델이 추가/삭제, 필드가 추가/삭제 변경 되면
반드시 npx prisma generate 

prisma@6 를 사용하기 때문에 

generator client {
    provider = "prisma-client-js"
}

node_modules/.prisma/client  -> @priam/client


npx prisma studio # GUI 웹 화면 데이터 조작이 가능 

nest g resource products --no-spec

npx prisma migrate dev --name add_product

npx prisma generate

# 스웨거 설치 
npm i @nestjs/swagger

# 스웨거 설치시 변경할 파일
main.ts
*Controller.ts
*DTO.ts