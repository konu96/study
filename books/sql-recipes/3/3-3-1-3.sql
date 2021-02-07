-- テーブルは　3-3-1-1.sql で作成済み
-- ウィンドウ関数は MySQL 5.7 にはないので動作

SELECT
    user_id,
    product_id,
    score,
    AVG(score) OVER() AS avg_score,
    AVG(score) OVER(PARTITION BY user_id) AS user_avg_score,
    score - AVG(score) OVER(PARTITION  BY user_id) AS user_avg_score-diff
FROM
    reviews
;
