-- 13_postgre.sql

-- Stored Procedure 구성

-- 부서 등록 Procedure

CREATE OR REPLACE PROCEDURE proc_insert_dept(
    p_deptno INTEGER,
    p_dname  VARCHAR,
    p_loc    VARCHAR
)
	LANGUAGE plpgsql
AS $$
BEGIN

    INSERT INTO dept (
        deptno,
        dname,
        loc
    )
    VALUES (
        p_deptno,
        p_dname,
        p_loc
    );

    RAISE NOTICE '부서 등록 완료';

END;
$$;

--
CALL proc_insert_dept(50,'IT','SEOUL');

--
select * from dept;

-- 부서 정보 조회 Procedure

CREATE OR REPLACE PROCEDURE proc_dept_info(
    p_deptno INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_dname dept.dname%TYPE;
    v_loc   dept.loc%TYPE;
BEGIN

    SELECT dname, loc
      INTO v_dname, v_loc
      FROM dept
     WHERE deptno = p_deptno;

    RAISE NOTICE -- 메시지를 화면에 출력하는 명령어
        '부서명: %, 지역: %',
        v_dname,
        v_loc;

END;
$$;

CALL proc_dept_info(10);









