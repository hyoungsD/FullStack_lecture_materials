-- 02.postgre.sql

-- smith 의 사번은?
select empno 
from emp
where (ename = 'SMITH');

-- CLERK 업무를 하는 직원들의 이름, 사번, 업무(JOB)은 ?
select ename, empno, job
from emp 
where (job = 'CLERK');

-- 급여가 1350 이상인 직원들의 이름, 사번, 급여는?
select ename, empno, sal
from emp 
where (sal >= 1350);

-- 1년 수입이 30000 이상이 직원들의 이름, 사번, 1년 수입은?
-- 1년 수입 :12개월치 급여

select ename, empno, (sal*12) as "1년수입"
from emp 
where ((sal*12) >= 30000);

-- sql문 처리 순서 
5: select
1: from
2: where 
3: group by
4: having
6: order by

-- 1981년 11월 1일 이후 입사자의 이름, 사번, 입사일자는?

select ename, empno, hiredate
from emp
where (hiredate >= '1981-11-01'); 

-- 급여가 1500 이상이고, 3000 이하인 직원들의 이름, 사번, 급여는?;

select ename, empno, sal
from emp 
where (sal >= 1500)
 and   (sal <= 3000);

select ename, empno, sal
from emp 
where (sal between 1500 and 3000);

-- 급여가 1250 또는 1500 또는 1600 인 직원들의 이름, 급여는 ?
select ename, sal
from emp 
where (sal = 1250 )
 or (sal = 1500 )
 or (sal = 1600 );

select ename, sal
from emp 
where (sal in (1250,1500,1600));

-- job 이 'CLERK' , 'ANALYST', 'PRESIDENT' 인 
-- 직원들의 이름, 사번, job 은?
select ename, empno, job
from emp 
where (job in ('CLERK' , 'ANALYST', 'PRESIDENT'));

-- 직속상관이 없는 직원들의 이름, 사번, 상관번호는?
select ename, empno, mgr
from emp 
where (mgr is null);

select ename, empno, mgr
from emp 
where (mgr is not null);

-- A 자로 시작하는 이름을 가진 직원들의 이름, 사번은?
select ename, empno
from emp 
where (ename like 'A%');

-- 이름에 A자가 들어있는 직원들의 이름, 사번은?
select ename, empno
from emp 
where (ename like '%A%');

-- 뒤에서 두번째 자리에 E 자가 있는 직원들의 이름, 사번은 ?
select ename, empno
from emp 
where (ename like '%E_');

select ename, empno
from emp 
where (ename not like '%E_');




















