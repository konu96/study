CREATE TABLE IF NOT EXISTS `quarterly_sales`(
    `year` INTEGER PRIMARY KEY NOT NULL,
    `q1` INTEGER DEFAULT NULL,
    `q2` INTEGER DEFAULT NULL,
    `q3` INTEGER DEFAULT NULL,
    `q4` INTEGER DEFAULT NULL
);

-- INSERT INTO `quarterly_sales` VALUES
--     (2015, 82000, 83000, 78000, 83000),
--     (2016, 85000, 85000, 80000, 81000),
--     (2017, 92000, 81000,  null,  null)
-- ;

SELECT
    `year`,
    q1,
    q2,
    CASE
        WHEN q1 < q2 THEN '+'
        WHEN q1 = q2 THEN ' '
        ELSE '-'
    END AS judge_q1_q2,
    q2 - q1 AS diff_q2_q1,
    SIGN(q2 - q1) AS sign_q2_q1
FROM `quarterly_sales`
ORDER BY `year`\G
;

SELECT
    `year`,
    (COALESCE(q1, 0) + COALESCE(q2, 0) + COALESCE(q3, 0) + COALESCE(q4, 0)) / (SIGN(COALESCE(q1, 0)) + SIGN(COALESCE(q2, 0)) + SIGN(COALESCE(q3, 0)) + SIGN(COALESCE(q4, 0))) AS average
FROM `quarterly_sales`
ORDER BY `year`\G
;