CREATE TABLE IF NOT EXISTS `mst_categories` (
    `category_id` INTEGER NOT NULL,
    `name` VARCHAR(5) NOT NULL
);

CREATE TABLE IF NOT EXISTS `category_sales` (
    `category_id` INTEGER NOT NULL,
    `sales` INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS `product_sale_ranking` (
    `category_id` INTEGER NOT NULL,
    `rank` INTEGER NOT NULL,
    `product_id` VARCHAR(4) NOT NULL,
    `sales` INTEGER NOT NULL
);

-- INSERT INTO `mst_categories` VALUES
--     (1, 'dvd'),
--     (2, 'cd'),
--     (3, 'book')
-- ;
--
-- INSERT INTO `category_sales` VALUES
--     (1, 850000),
--     (2, 500000)
-- ;
--
-- INSERT INTO `product_sale_ranking` VALUES
--     (1, 1, 'D001', 50000),
--     (1, 2, 'D002', 20000),
--     (1, 3, 'D003', 10000),
--     (2, 1, 'C001', 30000),
--     (2, 2, 'C002', 20000),
--     (2, 3, 'C003', 10000)
-- ;

SELECT
    mc.category_id,
    mc.name,
    cs.sales,
    psr.product_id AS sale_product
FROM
    mst_categories AS mc
    LEFT JOIN
        category_sales AS cs
    ON
        mc.category_id = cs.category_id
    LEFT JOIN
        product_sale_ranking AS psr
    ON
        mc.category_id = psr.category_id