-- 08_postgre.sql
--> CTE(Common Table Expression)
-----------------------------
-- 개별 사원 급여와 직급별 평균 급여의 차이 계산
----------------------------------------------
직급별 사원 수와 평균 급여를 집계

select 	job, round(avg(sal))
from emp
group by job;


사원 정보와 해당 직급의 통계를 매핑

with job_statistics as (
	select 	job, 
			round(avg(sal)) as job_avg_sal
	from emp
	group by job
)

select e.ename, e.job, e.sal, j.job_avg_sal, round(e.sal - j.job_avg_sal)
from emp e join job_statistics j on (e.job=j.job)
order by e.job, e.sal desc;


-

	