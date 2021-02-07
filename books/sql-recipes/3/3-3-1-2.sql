-- テーブルは　3-3-1-1.sql で作成済み

SELECT
    user_id,
    COUNT(*) AS total_count,
    COUNT(DISTINCT user_id) AS user_count,
    COUNT(DISTINCT product_id) AS product_count,
    SUM(score) AS sum,
    AVG(score) AS avg,
    MAX(score) AS max,
    MIN(score) AS min
FROM
    reviews
GROUP BY
    user_id
\G;