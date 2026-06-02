-- 12_postgre.sql

-- function 구성
-- PostgreSQL의 사용자 정의 함수(User Defined Function) 구성

	
SELECT $$Hello PostgreSQL$$;

-- Hello 함수수
CREATE OR REPLACE FUNCTION fn_Hello()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN 'Hello';
END;
$$;

SELECT fn_Hello();

-- 입력된 두 숫자의 제곱을 더한 함수
-- fn_sum(3,4) = 25

CREATE OR REPLACE FUNCTION fn_test(
	p_n1 INTEGER,
	p_n2 INTEGER
)
	RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    v_pow INTEGER := 2;
BEGIN
    RETURN (pow(p_n1,v_pow) + pow(p_n2,v_pow));
END;
$$;

SELECT fn_test(3,4);

-- 부서명 조회 함수 : 부서번호 → 부서명 반환
CREATE OR REPLACE FUNCTION fn_get_dname(
    p_deptno INTEGER
)
RETURNS VARCHAR
LANGUAGE plpgsql
AS $$
DECLARE
    v_dname VARCHAR(14);
BEGIN
    SELECT dname
      INTO v_dname
      FROM dept
     WHERE deptno = p_deptno;

    RETURN v_dname;
END;
$$;

SELECT fn_get_dname(10);


-- (x) --------------------------------------

-- 부서 위치 조회 함수 : 부서번호 → 부서위치 반환
CREATE OR REPLACE FUNCTION fn_get_loc(
    p_deptno INTEGER
)
RETURNS VARCHAR
LANGUAGE plpgsql
AS $$
DECLARE
    v_loc VARCHAR(13);
BEGIN
    SELECT loc
      INTO v_loc
      FROM dept
     WHERE deptno = p_deptno;

    RETURN v_loc;
END;
$$;

-- 부서 추가 함수

CREATE OR REPLACE FUNCTION fn_insert_dept(
    p_deptno INTEGER,
    p_dname  VARCHAR,
    p_loc    VARCHAR
)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN

    INSERT INTO dept(
        deptno,
        dname,
        loc
    )
    VALUES (
        p_deptno,
        p_dname,
        p_loc
    );

    RETURN '등록 완료';

EXCEPTION
    WHEN unique_violation THEN
        RETURN '이미 존재하는 부서번호';
END;
$$;


