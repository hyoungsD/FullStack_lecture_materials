

create database scottdb;

-- =========================================
-- DROP TABLE
-- =========================================
DROP TABLE IF EXISTS salgrade CASCADE;
DROP TABLE IF EXISTS emp CASCADE;
DROP TABLE IF EXISTS dept CASCADE;


-- =========================================
-- DEPT TABLE
-- =========================================
CREATE TABLE dept (
    deptno      INTEGER,
    dname       VARCHAR(14),
    loc         VARCHAR(13),

    CONSTRAINT pk_dept
        PRIMARY KEY (deptno)
);

-- =========================================
-- EMP TABLE
-- =========================================
CREATE TABLE emp (
    empno       INTEGER,
    ename       VARCHAR(10),
    job         VARCHAR(9),
    mgr         INTEGER,
    hiredate    DATE,
    sal         INTEGER,
    comm        INTEGER,
    deptno      INTEGER,

    CONSTRAINT pk_emp
        PRIMARY KEY (empno),

    CONSTRAINT fk_emp_mgr
        FOREIGN KEY (mgr)
        REFERENCES emp(empno),

    CONSTRAINT fk_emp_deptno_dept
        FOREIGN KEY (deptno)
        REFERENCES dept(deptno)
);

-- =========================================
-- SALGRADE TABLE
-- =========================================
CREATE TABLE salgrade (
    grade       INTEGER,
    losal       INTEGER,
    hisal       INTEGER,

    CONSTRAINT pk_salgrade
        PRIMARY KEY (grade)
);