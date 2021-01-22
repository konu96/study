CREATE TABLE IF NOT EXISTS `daily_kpi` (
    `date_time` DATE NOT NULL,
    `indicator` ENUM('impressions', 'sessions', 'users') NOT NULL,
    `value` INTEGER NOT NULL
);

-- INSERT INTO `daily_kpi` VALUES
--     ('2021-01-21', 'impressions', 1800),
--     ('2021-01-21', 'sessions', 500),
--     ('2021-01-21', 'users', 200),
--     ('2021-01-22', 'impressions', 2000),
--     ('2021-01-22', 'sessions', 700),
--     ('2021-01-22', 'users', 250)
-- ;

SELECT
    date_time,
    MAX(CASE WHEN indicator = 'impressions' THEN value END) as impressions,
    MAX(CASE WHEN indicator = 'sessions' THEN value END) as sessions,
    MAX(CASE WHEN indicator = 'users' THEN value END) as users
FROM
    daily_kpi
GROUP  BY
    date_time
ORDER BY
    date_time
\G;