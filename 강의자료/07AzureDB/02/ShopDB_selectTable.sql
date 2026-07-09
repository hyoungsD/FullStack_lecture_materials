-- shopdb 연결
-- \c shopdb00

# ShopDB - Table Data 확인
select * from Customers;
select * from Products;
select * from Orders;

-- Join문 (전체)
select * 
from Customers c 
  inner join Orders o on(c.customer_no=o.customer_no)
  inner join Products p on(o.product_no=p.product_no);
