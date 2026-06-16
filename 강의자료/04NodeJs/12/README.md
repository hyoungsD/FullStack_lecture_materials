## 1. 프로젝트 생성
nest new shop --skip-git

cd shop 

## 2. 모듈 생성
nest g resource categories --no-spec
nest g resource products --no-spec
nest g resource users --no-spec


## 3. 패키지설치 
npm i class-validator class-transformer dotenv
npm i @prisma/client@6
npm i -D prisma@6
npm i @nestjs/swagger


##  prisma generate
npx prisma init 

npx prisma format


psql -U postgres postgres;
create database shop;
grant all PRIVILEGES on database shop to postgres
/c shop 
grant all on schema public to postgres

DATABASE_URL="postgresql://<사용자계정>:<비밀번호>@localhost:5432/shop?schema=public"

## 터미털 bash 
npx prisma migrate dev --name init 
npx prisma generate

## prisma Service 
nest g module prisma
nest g service prisma --no-spec