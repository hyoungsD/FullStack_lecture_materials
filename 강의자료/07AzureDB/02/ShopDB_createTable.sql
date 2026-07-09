-- shopdb 연결
-- \c shopdb00

# ShopDB - Table 구성

-- 1. 고객 테이블 생성
CREATE TABLE Customers (
    customer_no SERIAL PRIMARY KEY,
    customer_name VARCHAR(20) NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. 상품 테이블 생성
CREATE TABLE Products (
    product_no SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0
);

-- 3. 구매 테이블 생성
CREATE TABLE Orders (
    order_no SERIAL PRIMARY KEY,
    customer_no INT NOT NULL,
    product_no INT NOT NULL,
    quantity INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_no) REFERENCES Customers(customer_no) ON DELETE RESTRICT,
    FOREIGN KEY (product_no) REFERENCES Products(product_no) ON DELETE RESTRICT
);


---
