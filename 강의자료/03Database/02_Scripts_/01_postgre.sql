-- 01_postgre.sql
select * from emp;
select * from dept;
select * from salgrade;

select *
from emp;

select *
from emp
limit 5;

select *
from emp
limit 5
offset 1;

-- 전직원의 이름, 사번, 급여는?
select ename, empno, sal
from emp;

-- 직원들의 이름, job, 	부서번호는?
select ename, job, deptno
from emp;

-- 부서들의 이름, 부서번호, 위치는?
select dname, deptno, loc
from dept;

select 20+10, 20-10, 20*10, 20/10;

select '20' + '10';
select cast('20' as integer) + cast('10' as int);
select '20'::integer + '10'::int;

select '대한' || '민국';

select cast(10 as varchar(2)) || 20::varchar(2) ;

-- 모든 직원들의 이름과, 급여, 10% 향상된 급여를 출력하세요
select ename, sal, sal*1.1 as "10% 향상된 급여"
from emp;

-- 직원들의 이름, 사번, 업무(Job), 급여, 연봉, 연간수입은?
-- 단, 연봉은 12개월치 급여
-- 단, 연간수입은 연봉 + 커미션

select	ename as "이름",
		empno "사번",
		job as 업무 ,
		sal 급여 ,
		sal*12 "연 봉" ,
		(sal*12) + coalesce(comm,0) "연간 수입"
from emp;

-- 직원들의 수는?
select count(empno)
from emp;

-- Job 의 개수는 ?
select count(distinct job)
from emp; 

-- 직원들의 부서번호, Job, 이름은?

select deptno, job, ename
from emp
order by deptno; --> asc, desc

-- 직원들의 부서번호, job, 이름은?
-- 부서번호는 내림차순, job은 오름차순
select deptno, job, ename
from emp
order by deptno desc, job asc;





