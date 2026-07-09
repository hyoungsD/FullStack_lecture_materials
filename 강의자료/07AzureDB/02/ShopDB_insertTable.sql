-- Active: 1783538022669@@pgsql25swh.postgres.database.azure.com@5432@shopdb
-- shopdb 연결
-- \c shopdb00
# ShopDB - Table Data 입력

-- 1. Customers
INSERT INTO Customers (customer_name, email) VALUES
('홍길동', 'gdHong@naver.com'),
('에이다 러브레이스', 'adaLove@gmail.com'),
('플로렌스 나이팅게일', 'Nightingale@hotmail.com'),
('앨런 튜링', ' alanTuring@daum.net'),
('어빙존 굿', 'ijGood@outlook.com');

-- 2. Products
INSERT INTO Products (product_name, price, stock_quantity) VALUES
('모니터', 350000.00, 10),
('키보드', 89000.00, 20),
('C타입 케이블', 4500.00, 100),
('블루투스 스피커', 55000.00, 15),
('무선 마우스', 25000.00, 50); 

-- 3. Orders
INSERT INTO Orders (customer_no, product_no, quantity) VALUES
(1, 5, 2), -- 홍길동(1)이 무선 마우스(5)를 2개 구매
(2, 1, 1), -- 에이다 러브레이스(2)가 모니터(1)를 1개 구매
(3, 2, 1), -- 나이팅게일(3)이 키보드(2)를 1개 구매
(4, 3, 5), -- 앨런 튜링(4)이 C타입 케이블(3)을 5개 구매
(5, 4, 1); -- 어빙존 굿(5)이 블루투스 스피커(4)를 1개 구매