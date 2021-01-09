CREATE TABLE IF NOT EXISTS `purchase_log_with_coupon`(
    `purchase_id` INTEGER PRIMARY KEY NOT NULL,
    `amount` INTEGER NOT NULL,
    `coupon` INTEGER
);

-- INSERT IGNORE INTO `purchase_log_with_coupon` VALUES (10001, 3280, null), (10002, 4650, 500), (10003, 3870, null);

SELECT
    purchase_id,
    amount,
    coupon,
    amount - coupon AS discount_amount1,
    amount - COALESCE(coupon, 0) AS discount_amount2
FROM purchase_log_with_coupon\G
;