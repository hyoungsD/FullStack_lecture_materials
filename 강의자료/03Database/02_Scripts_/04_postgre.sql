-- 04_postgre.sql
-- 집계함수 : count(), min(), max(), sum(), avg()

select count(empno), min(sal), max(sal), sum(sal), trunc(avg(sal))
from emp; 

-- 전직원의 인원수는?

select count(empno)
from emp; 

-- 부서번호별 인원수는 ?
select deptno, count(empno)
from emp
group by deptno;

-- job 별 평균급여가 2000 이 넘는 job, 평균급여는?
select job, avg(sal) as "평균급여"
from emp 
group by job
having (avg(sal)  > 2000);

-- 업무(job)별 급여 합계액이 5500을 넘는 업무과 급여합계액은?
select job, sum(sal)
from emp 
group by job
having (sum(sal) > 5500);

-- 1981년 9월 1일 이후 입사자의 업무별 평균급여가 2000이 넘는 업무와 평균급여는?
select job, avg(sal)
from emp 
where (hiredate > '1981-09-01') -- 1980-12-17
group by job 
having (avg(sal) > 2000);


select * from emp;




