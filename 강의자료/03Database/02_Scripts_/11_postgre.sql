-- 11_postgre.sql

-- Table 구조 변경

-- 테이블 복제 -------------------------------
-- emp3 <- emp
-- dept3 <- dept
drop table if exists dept3
drop table if exists emp3

create table dept3
as
select * from dept;

select * from dept3;

create table emp3
as
select * from emp;

select * from emp3;

-- 컬럼(column) 추가/제거 : dept3 --
-- ALTER TABLE 테이블명 ADD COLUMN 컬럼명 데이터타입 제약조건;

alter table dept3
	add column col_01 varchar(4) NOT NULL; --> Error 나는 이유는?

alter table dept3
	add column col_01 varchar(4) NOT NULL default('test') ;

select * from dept3;

-- ALTER TABLE 테이블명 ALTER COLUMN 컬럼명 TYPE 데이터타입(사이즈);

alter table dept3
	alter column col_01 type varchar(10);

alter table dept3
	alter column col_01 type varchar(7);

select * from dept3;

alter table dept3
	alter column col_01 type varchar(3); --> Error 나는 이유는?

-- ALTER TABLE 테이블명 RENAME COLUMN 컬럼명 TO 변경할컬럼명; //컬럼명 변경

alter table dept3
	rename column col_01 to col_10;

select * from dept3;

alter table dept3
	drop column col_10;

select * from dept3;


-- 제약조건 추가 : dept3 -------------------------------
-- deptno : pk

--  dept3 에 Primary Key 추가
alter table dept3
	add constraint pk_dept3 PRIMARY KEY (deptno);

alter table dept3
	drop constraint pk_dept3;

alter table dept3
	add constraint pk_dept3_deptno PRIMARY KEY (deptno);


-- 제약조건 추가 : emp3 -------------------------------

-- empno : PK
-- ename : UK , not null
-- job 	: CK - in ('PRESIDENT','MANAGER','ANALYST','SALESMAN','CLERK' ) , not null
-- sal 	: CK - between 500 and 7000

-- drop table emp3;



alter table emp3
	add constraint pk_emp3_empno PRIMARY KEY (empno),
	add constraint uk_emp3_ename Unique (ename),
	add constraint ck_emp3_job Check (job in ('PRESIDENT','MANAGER','ANALYST','SALESMAN','CLERK' )),
	add constraint uk_emp3_sal Check (sal between 500 and 7000),

	ALTER COLUMN ename SET NOT NULL,
	ALTER COLUMN job SET NOT NULL;

select * from emp3;

-- 변경하는 방법은 따로 존재하지않고 제약조건을 삭제하고 다시 추가해야 함.

-- (X) 제약조건 제거 : emp3 -------------------------------
ALTER TABLE emp3
	DROP CONSTRAINT pk_emp3_empno,
	DROP CONSTRAINT uk_emp3_ename,
	DROP CONSTRAINT ck_emp3_job,
	DROP CONSTRAINT uk_emp3_sal
	ALTER COLUMN ename drop NOT NULL,
	ALTER COLUMN job drop NOT NULL;
;

--- ---------------------------------------------
-- View : 가상의 Select 문장 덩어리

-- CREATE VIEW 뷰_이름 AS
-- SELECT 컬럼1, 컬럼2, ...
-- FROM 테이블_이름
-- WHERE 조건;

select * from emp3;

select ename, empno, job, sal
from emp3
where (sal between 1000 and 2000);


create view v_emp3 
as
select ename, empno, job, sal, deptno
from emp3
where (sal between 1000 and 2000);

-- drop view if exists v_emp3;

select *
from v_emp3;

select *
from v_emp3 
where job = 'CLERK';

-- update : MARTIN의 job = 'CLERK', deptno = 10
update v_emp3
set job = 'CLERK', deptno = 10
where ename = 'MARTIN';

select *
from v_emp3;

select *
from emp3;

-- insert : Hong, 9999, SALESMAN, 2000, 30
insert into v_emp3 values('Hong', 9999, 'SALESMAN', 2000, 30);

select *
from v_emp3;

-- insert : 'Azure', 9000, SALESMAN, 3000, 30
insert into v_emp3 values('Azure', 9000, 'SALESMAN', 3000, 30);

select *
from v_emp3;

select *
from emp3;

-- delete : Hong
delete from v_emp3
where ename = 'Hong';

select *
from v_emp3;

-- delete : Azure
delete from v_emp3
where ename = 'Azure';

select *
from emp3;

-- View 변경

create or replace view v_emp3 
as
select ename, empno, job, sal, deptno
from emp3
where (sal between 1000 and 2000)
with check option;


-- insert : Hong, 9999, SALESMAN, 2000, 30
insert into v_emp3 values('Hong', 9999, 'SALESMAN', 2000, 30);

select *
from v_emp3;

-- insert : 'Azure', 9000, SALESMAN, 3000, 30
insert into v_emp3 values('Azure', 9000, 'SALESMAN', 3000, 30);

select *
from v_emp3;

select *
from emp3;