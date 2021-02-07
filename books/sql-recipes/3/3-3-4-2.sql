CREATE TABLE IF NOT EXISTS `purchase_log` (
    `purchase_id` INTEGER NOT NULL,
    `product_ids` VARCHAR(100) NOT NULL
);

-- INSERT INTO `purchase_log` VALUES
--     (100001, 'A001,A002,A003'),
--     (100002, 'D001,D002'),
--     (100003, 'A001')
-- ;

-- MySQL だとできない
SELECT unnest(['A001', 'A002', 'A003']) AS product_id;