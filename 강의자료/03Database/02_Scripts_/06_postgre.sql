-- 06_postgre.sql
-- Outer Join, ANSI Join

------------------------------------------------
create table dept2
as
select * from dept;

create table emp2
as
select ename, empno, deptno from emp
where (ename like '%ER') or (ename like '%ES');

insert into emp2 values('NBW',9999,null);

select * from dept2;
select * from emp2;

select *
from emp2 e, dept2 d
where ( e.deptno = d.deptno );

select *
from emp2 e inner join dept2 d on ( e.deptno = d.deptno );

select *
from emp2 e inner join dept2 d using ( deptno );

select *
from emp2 e join dept2 d using ( deptno );

select *
from emp2 e natural join dept2 d;

select *
from emp2 e full outer join dept2 d on ( e.deptno = d.deptno );

select *
from emp2 e left outer join dept2 d on ( e.deptno = d.deptno );

select *
from emp2 e right outer join dept2 d on ( e.deptno = d.deptno );

select *
from emp2 e full join dept2 d on ( e.deptno = d.deptno );

-- 등급별 인원수는?
select s.grade, count(e.empno)
from salgrade s inner join emp e on (e.sal between s.losal and s.hisal)
group by s.grade;

-- RESEARCH 부서의 부서명, 직원이름, 급여, 급여등급은?
select d.dname, e.ename, e.sal, s.grade
from dept d inner join emp e on (d.deptno=e.deptno)
			inner join salgrade s on (e.sal between s.losal and s.hisal)
where (d.dname = 'RESEARCH');
















