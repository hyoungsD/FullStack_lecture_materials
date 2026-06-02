-- 03_postgre.sql
-- 함수 : 문자함수, 숫자함수, 날짜함수, 변환함수
-------------------------------------
--> - 문자함수 -
select 'Oracle', upper('Oracle'), lower('Oracle'), initcap('oraCle');

select  LENGTH('Oracle'), CHAR_LENGTH('Oracle'), OCTET_LENGTH('Oracle'), BIT_LENGTH('Oracle'),
        LENGTH('오라클'), CHAR_LENGTH('오라클'), OCTET_LENGTH('오라클'),BIT_LENGTH('오라클');

-- Welcome to Oracle

select substr('Welcome to Oracle',1,9);
select substr('대한민국 만세',1,3); --> UTF-8 문자 기준으로 정상 처리.

--> Quiz <----------------------------
-- Welcome to Oracle
-- 출력 e to Or

select substr('Welcome to Oracle',7,7);
select substring('Welcome to Oracle',7,7);

--------------------------------------
select  ltrim('   Welcome to Oracle'),
        rtrim('Welcome to Oracle   '),
        trim('  Welcome to Oracle  '),
        ltrim('Welcome to Oracle','Wel'),
        rtrim('Welcome to Oracle','cle');


select ename, rpad(ename,10,'*'),lpad(ename,10,'#')
from emp;

select ename, rpad(sal::Text,10,'*'),lpad(sal::Text,10,'#')
from emp;


SELECT
    ename,
    sal,
    LPAD(sal::TEXT, 10, ' ') AS lpad_sal,
    RPAD(LPAD(sal::TEXT, 10, ' '), 11, '원') AS rpad_sal
FROM emp;

select ename, sal, lpad(sal::Text,10,' '), rpad(lpad(sal::Text,10,' '),11,'원')
from emp;

select  replace('Welcome to Oraclet','to','#@'),
        translate('Welcome to Oraclet','to','#@');

--> - 숫자함수 -
select abs(10), abs(-10);

select ceil(10.123), ceil(10.543), ceil(11.001);

select round(10.123), round(10.543), round(11.001);

select floor(10.123), floor(10.543), floor(11.001);
select trunc(10.123), trunc(10.543), trunc(11.001);

select floor(-10.123), floor(-10.543), floor(-11.001);
select trunc(-10.123), trunc(-10.543), trunc(-11.001);


select round(98.7654), round(98.7654,2), round(98.7654,-2);

select mod(10,3),power(10,3);

--> - 날짜함수 -
select Current_date, Current_date - 40;

-- 직원들의 이름, 입사날짜, 오늘까지의 근무일수는 ?; 
select ename, hiredate, age(Current_date,hiredate)
from emp; 

-- Timestamp 에서 정보 추출;
select extract(day from timestamp '2020-09-20'); 
select extract(month from timestamp '2020-09-20'); 
select extract(year from timestamp '2020-09-20'); 
select extract(quarter from timestamp '2020-09-20'); 

select date_part('hour', now());
select date_part('minute', now());
select date_part('second', now());
select date_part('day', now());
select date_part('month', now());
select date_part('quarter', now());

--> - 변환함수 -
-- PostgreSQL의 TO_DATE() 는 반드시 날짜 포맷(format)을 함께 지정.
select Current_date - to_date('1988/08/08'); --> Error

SELECT CURRENT_DATE - TO_DATE('1988/08/08', 'YYYY/MM/DD');

select ename, hiredate from emp;

select ename, to_char(hiredate,'YYYY-MM-DD HH:MM:SS') from emp;
select ename, to_char(hiredate,'YYYY-MM-DD HH24:MM:SS') from emp;
select ename, to_char(hiredate,'YYYY"년 " MM"월 " DD"일 " HH24:MM:SS') from emp;

select to_char(CURRENT_DATE,'YYYY"년 " MM"월 " DD"일 " HH24:MM:SS');


select '123.45'::numeric(5), cast('123.45' as numeric(5));
select '123.45'::numeric(5,2), cast('123.45' as numeric(5,2));


--> case when then
select ename, deptno,
	case deptno when 10 then '인사팀'
                when 20 then '영업팀'
                when 30 then '전산팀'
                else '기타'
    end "팀명"
from emp;

select ename, deptno,
	case when deptno = 10 then 'HR팀'
         when deptno = 20 then 'Sales팀'
         when deptno = 30 then 'IT팀'
    	 else '기타'
    end "팀명"
from emp;

