-- 10_postgre.sql

DROP TABLE IF EXISTS buytbl;
DROP TABLE IF EXISTS custtbl;


CREATE TABLE custtbl (
    cno     INTEGER,
		cid   	VARCHAR(20) NOT NULL,
    cname   VARCHAR(20) NOT NULL,
    gender  CHAR(1) NOT NULL,
    age     NUMERIC(3) NOT NULL,
    job     VARCHAR(20),
    addr    VARCHAR(10),
    mob1    CHAR(3)  DEFAULT '010',
    mob2    CHAR(8),
    cdatetime TIMESTAMP NOT NULL DEFAULT Now(),

    CONSTRAINT ct_pk_cno PRIMARY KEY (cno),
    CONSTRAINT ct_uk_cname UNIQUE (cid),
    CONSTRAINT ct_ck_gender CHECK (gender IN ('F','M')),
    CONSTRAINT ct_ck_age CHECK (age BETWEEN 1 AND 130),
    CONSTRAINT ct_ck_mob1 CHECK (mob1 IN ('010','011','019'))
);

CREATE TABLE buytbl (
    bno     INTEGER,
    bname   VARCHAR(10),
    price   NUMERIC(6,2),
    amount  INTEGER,
    cno     INTEGER,

    CONSTRAINT bt_pk_bno PRIMARY KEY (bno),

    CONSTRAINT bt_fk_cno_ct_cno
        FOREIGN KEY (cno)
        REFERENCES custtbl(cno)
);


insert into CustTbl values (1,'hong','홍길동','M',30,'IT','서울','010','10001000',default);
insert into CustTbl values (2,'ada','에이다','F',37,'HR','대전','011','11111111',default);

select * from CustTbl;

insert into BuyTbl values (1,'책',9000,3,1);
insert into BuyTbl values (2,'연필',3300,1,2);
--insert into BuyTbl values (2,'의자',21000,1,2); --> Error

select * from BuyTbl;

select * 
from CustTbl c, BuyTbl b
where (c.cno = b.cno);
