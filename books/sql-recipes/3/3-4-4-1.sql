CREATE TABLE IF NOT EXISTS `product_sales` (
    `category_name` VARCHAR(4) NOT NULL,
    `product_id` VARCHAR(4) NOT NULL,
    `sales` INTEGER NOT NULL
);

-- INSERT INTO `product_sales` VALUES
--     ('dvd' , 'D001', 500000),
--     ('dvd' , 'D002', 200000),
--     ('dvd' , 'D003', 100000),
--     ('cd'  , 'C001', 300000),
--     ('cd'  , 'C002', 200000),
--     ('cd'  , 'C003', 100000),
--     ('book', 'B001', 200000),
--     ('book', 'B002', 150000),
--     ('book', 'B003', 100000),
--     ('book', 'B004',  50000)
-- ;

-- 参考: https://qiita.com/mtanabe/items/f6d567ae51caf5ad3eb3
SELECT
    category_name,
    product_id,
    sales,
    (SELECT count(*) + 1 FROM product_sales WHERE sales > ps.sales and category_name = ps.category_name) AS `rank`
FROM
    `product_sales` AS ps
ORDER BY
    ps.category_name, sales DESC
;
