-- 07_postgre.sql

-- MARTIN 과 같은 급여를 받는 직원들의 이름, 급여는 ?
-- 1) MARTIN 급여 ?
select sal
from emp 
where (ename = 'MARTIN');

-- 2) 1250 급여를 받는 직원들의 이름, 급여는 ?
select ename, sal
from emp 
where (sal =1250);

-- 3) 결합
select ename, sal
from emp 
where (sal = ( select sal
				from emp 
				where (ename = 'MARTIN')));

-- 전직원의 평균급여보다 급여를 많이 받는 직원들의 이름, 사번, 급여는?
--1) 전직원의 평균급여?
select avg(sal)
from emp;

--2) 2073 급여보다 급여를 많이 받는 직원들의 이름, 사번, 급여는?
select ename, empno, sal
from emp 
where (sal>2073);

--3) 결 합 
select ename, empno, sal
from emp 
where (sal> ( select avg(sal)
			  from emp));

-- sales부서의 부서 평균급여보다 급여를 많이 받는 
-- 직원들의 이름, 급여, 급여등급, 부서명은?
--1) sales부서의 부서 평균급여 ?
select avg(e.sal)
from dept d, emp e
where (d.deptno = e.deptno)
 and  (d.dname = 'SALES');

--2) 1566 급여보다 급여를 많이 받는 
-- 직원들의 이름, 급여, 급여등급, 부서명은?
select e.ename, e.sal, s.grade, d.dname
from emp e, salgrade s, dept d
where ( e.sal between s.losal and s.hisal )
 and  ( e.deptno = d.deptno )
 and  ( e.sal > 1566);

--3) 결합
select e.ename, e.sal, s.grade, d.dname
from emp e, salgrade s, dept d
where ( e.sal between s.losal and s.hisal )
 and  ( e.deptno = d.deptno )
 and  ( e.sal > (select avg(e.sal)
				from dept d, emp e
				where (d.deptno = e.deptno)
				 and  (d.dname = 'SALES')));


