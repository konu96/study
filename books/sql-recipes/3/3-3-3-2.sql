CREATE TABLE IF NOT EXISTS `purchase_detail_log` (
    `purchase_id` VARCHAR(6) NOT NULL,
    `product_id` VARCHAR(4) NOT NULL,
    `price` VARCHAR(4) NOT NULL
);

-- INSERT INTO `purchase_detail_log` VALUES
--     ('100001', 'A001', 300),
--     ('100001', 'A002', 400),
--     ('100001', 'A003', 200),
--     ('100002', 'D001', 500),
--     ('100002', 'D002', 300),
--     ('100003', 'A001', 300)
-- ;

SELECT
    purchase_id,
--     string_agg(product_id, ',') AS product_ids,
    GROUP_CONCAT(product_id SEPARATOR ',') AS product_ids,
    SUM(price) AS amount
FROM
    purchase_detail_log
GROUP BY
    purchase_id
ORDER BY
    purchase_id
;