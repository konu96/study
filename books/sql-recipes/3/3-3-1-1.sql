CREATE TABLE IF NOT EXISTS `reviews` (
    `user_id` VARCHAR(4) NOT NULL,
    `product_id` VARCHAR(4) NOT NULL,
    `score` FLOAT NOT NULL
);

-- INSERT INTO `reviews` VALUES
--     ('U001', 'A001', 4.0),
--     ('U001', 'A002', 5.0),
--     ('U001', 'A003', 5.0),
--     ('U002', 'A001', 3.0),
--     ('U002', 'A002', 3.0),
--     ('U002', 'A003', 4.0),
--     ('U003', 'A001', 5.0),
--     ('U003', 'A002', 4.0),
--     ('U003', 'A003', 4.0)
-- ;

SELECT
    COUNT(*) AS total_count,
    COUNT(DISTINCT user_id) AS user_count,
    COUNT(DISTINCT product_id) AS product_count,
    SUM(score) AS sum,
    AVG(score) AS avg,
    MAX(score) AS max,
    MIN(score) AS min
FROM
    reviews
\G;