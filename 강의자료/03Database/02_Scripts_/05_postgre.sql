-- 05_postgre.sql

-- Equi-Join
-- SMITH의 부서명은?

select dname
from emp, dept 
where (emp.deptno = dept.deptno)
 and (ename = 'SMITH');

-- RESEARCH 부서소속 직원들의 부서명, 이름, 사번은?
select dname, ename, empno
from dept, emp
where ( dept.deptno = emp.deptno )
 and  (dname = 'RESEARCH');

-- DALLAS 에서 일하는 직원들의  부서명, 부서번호, 부서위치, 이름, 사번은?

select dept.dname, dept.deptno, dept.loc, emp.ename, emp.empno
from dept, emp
where ( dept.deptno = emp.deptno )
 and  ( dept.loc = 'DALLAS');

select d.dname, d.deptno, d.loc, e.ename, e.empno
from dept d, emp e
where ( d.deptno = e.deptno )
 and  ( d.loc = 'DALLAS');

-- 급여가 2000 이상인 직원들의 이름, 부서명, 급여, 위치는?
select e.ename, d.dname, e.sal, d.loc
from emp e, dept d
where ( e.deptno = d.deptno )
 and (e.sal >= 2000);

-- 부서명별 평균 급여가 2000이 넘는 부서와 평균급여는?
select d.dname, avg(e.sal)
from dept d, emp e
where ( e.deptno = d.deptno )
group by d.dname
having (avg(e.sal) > 2000);

----------------------------------
-- Non-Equi Join

-- 스미스의 급여등급은?

select s.grade
from emp e, salgrade s
--where ( (s.losal <= e.sal) and (e.sal <= s.hisal) )
where ( e.sal between s.losal and s.hisal )
 and  ( e.ename = 'SMITH');

-- 3등급의 급여등급을 가지고 있는 직원들의 이름, 급여, 급여등급은?
select e.ename, e.sal, s.grade
from salgrade s, emp e
where ( e.sal between s.losal and s.hisal)
 and  ( s.grade = 3 );

-- 급여등급별 직원수는 ?
select s.grade, count(e.empno)
from salgrade s, emp e
where ( e.sal between s.losal and s.hisal)
group by s.grade;

-- 급여등급별 직원수가 3명 이상인 급여등급과 직원수는 ?
select s.grade, count(e.empno)
from salgrade s, emp e
where ( e.sal between s.losal and s.hisal)
group by s.grade
having (count(e.empno) >= 3);

-- MANAGER 들의 JOB, 급여, 급여등급, 이름, 부서명은?
select e.JOB, e.sal, s.grade, e.ename, d.dname
from emp e, salgrade s, dept d
where ( e.sal between s.losal and s.hisal )
 and  ( e.deptno = d.deptno )
 and  ( e.job = 'MANAGER');

-- ACCOUNTING 부서소속 직원들의 부서명, 부서번호, 이름, JOB, 급여, 급여등급은?
select d.dname, d.deptno, e.ename, e.JOB, e.sal, s.grade
from dept d, emp e, salgrade s
where ( e.deptno = d.deptno )
 and  ( e.sal between s.losal and s.hisal )
 and  ( d.dname = 'ACCOUNTING');

 ------------------------------------------
 -- Self-Join
 -- SMITH의 직속상관 이름은 ?;
select ee.ename, me.ename
from emp ee, emp me
where ( ee.mgr = me.empno )
 and  ( ee.ename = 'SMITH');
 
-- KING 의 이름, 사번, JOB, 직속부하직원들의 이름, 사번, JOB은?
select me.ename, me.empno, me.job, ee.ename, ee.empno, ee.job
from emp me, emp ee
where ( me.empno = ee.mgr )
 and  ( me.ename = 'KING');

-- KING 의 이름, 사번, JOB, 직속부하직원들의 이름, 사번, JOB, 급여, 급여등급, 부서명은?

select me.ename, me.empno, me.JOB, 
	   ee.ename, ee.empno, ee.JOB, ee.sal, es.grade, ed.dname
from emp me, emp ee, salgrade es, dept ed
where ( me.empno = ee.mgr )
 and  ( ee.sal between es.losal and es.hisal )
 and  ( ee.deptno = ed.deptno )
 and  ( me.ename = 'KING' ); 
 
