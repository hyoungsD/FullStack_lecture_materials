# BackEnd 구성 (node.js - scottdb)

### 실습폴더 생성
mkdir AzureDB
cd AzureDB

### node.js - PostgreSQL 구성
mkdir dept-be
cd dept-be
npm install express pg cors

### azure pgdb 연결 테스트

- node pgdbconn01.js

### BackEnd 구성
- node app.js
    <- 01 ~ 02 순차적 코드 구성

> psql -h pgsql25hsw.postgres.database.azure.com -p 5432 -U pgadmin00 postgres
> Pa55w.rdazSW

### 부서 Data 확인
전체 부서 조회: http://localhost:3000/api/dept
단일 부서 조회: http://localhost:3000/api/dept/10

