# Azure Postgresql 설치 및 구성

# Provision an Azure Database for PostgreSQL resource
- 리소스 만들기(Create a resource)
 / 데이터베이스 / Azure Database for PostgreSQL Flexible Server

> 유연한 서버(Flexible Server)
> 고급만들기

- 기본
구독: ~~~
Resource group: ~~~

Server name: pgsql25<이니셜>
Region: Korea Central

PostgreSQL Version: 18
Workload type: 개발 

컴퓨팅 + 스토리지: Leave unchanged.
가용성 영역: Leave unchanged.
고가용성 사용: Leave unchanged.

인증 방법: PostgreSQL 인증만
Admin username: pgadmin00
Password and Confirm password: Pa55w.rdazSW

- 네트워킹

네트워크 연결
	연결방법: 공용 액세스(허용된 IP 주소) 및 프라이빗 엔드포인트

방화벽 규칙 추가
	[선택] Azure 내의 모든 Azure 서비스의 이 서버에 대한 퍼블릭 액세스 허용
	: 작업 PC IP 또는 VM의 IP


#. 완료 후, 확인
/설정 
  / 네트워킹 
  > [v] Azure 내의 모든 Azure 서비스의 이 서버에 대한 퍼블릭 액세스 허용
  > 방화벽 규칙 : 작업 PC IP 또는 VM의 IP

   / 데이터베이스 

   / 연결

   > 포트: 5432

#. 연결 & Test
- Azure Cloud Shell / (PowerShell , Bash)
> psql -h pgsql25<이니셜>.postgres.database.azure.com -p 5432 -U pgadmin00 postgres
> Pa55w.rdazSW

- DB & Table 생성
postgres=>
> help
> create database testdb;
> \c testdb;
> create table t1(tno integer, tname varchar(10));
> insert into t1 values (10,'Tom'), (20,'Jane'), (30,'Alice');
> select * from t1;

#. 연결 & Test
- pgadmin 다운로드 및 설치

> pgadmin4-9.6-x64.exe

- Select install mode
 > Install for me only(recommended)

#. pgAdmin 4를 사용
> Azure Database for PostgreSQL 유연한 서버에 연결


pgAdmin 4 열기: 컴퓨터에서 pgAdmin 4 애플리케이션을 시작합니다.

- 새 서버 등록: pgAdmin 4 인터페이스의 왼쪽 브라우저 트리에서 "서버"를 마우스 오른쪽 단추로 클릭하고 "등록" -> "서버"를 선택
- 서버 세부 정보 구성: "등록 - 서버" 창에 "일반", "연결", "SSL" 등 여러 탭이 표시
- 다음 세부 정보를 입력

- 일반 탭
이름: pgsql25hsw Connection

- 연결 탭
호스트 이름/주소: pgsql25<이니셜>.postgres.database.azure.com
포트: 5432
유지 관리 데이터베이스: 기본값을 그대로 
사용자 이름: pgadmin00 
암호: Pa55w.rdazSW
구성 저장: "저장" 

- 데이터베이스 액세스
> select * from t1;


# Visual Studio Code 설치
- VS Code 설치
- PostgreSQL 확장
- Database 확장

>
Server Name: pgsql25<이니셜>.postgres.database.azure.com
User Name: pgadmin00 
Password: Pa55w.rdazSW
연결 : SSL

