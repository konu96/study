CREATE TABLE IF NOT EXISTS `app1_mst_users` (
    `user_id` VARCHAR(4) NOT NULL,
    `name` VARCHAR(10) NOT NULL,
    `email` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `app2_mst_users` (
    `user_id` VARCHAR(4) NOT NULL,
    `name` VARCHAR(10) NOT NULL,
    `phone` VARCHAR(13) NOT NULL
);

-- INSERT INTO `app1_mst_users` VALUES
--     ('U001', 'Sato'  , 'sato@example.com'),
--     ('U002', 'Suzuki', 'suzuki@example.com')
-- ;
--
-- INSERT INTO `app2_mst_users` VALUES
--     ('U001', 'Ito'   , '080-xxxx-xxxx'),
--     ('U002', 'Tanaka', '070-xxxx-xxxx')
-- ;

-- SELECT
--     'app1' AS app_name,
--     user_id,
--     name,
--     email
-- FROM
--     app1_mst_users
-- UNION ALL
--     SELECT
--         'app2' AS app_name,
--         user_id,
--         name,
--         NULL AS email
--     FROM
--         app2_mst_users
-- \G;

SELECT
    'app1' AS app_name,
    user_id,
    name,
    email
FROM
    app1_mst_users
UNION DISTINCT -- DISTINCT は計算コストが高い
SELECT
    'app2' AS app_name,
    user_id,
    name,
    NULL AS email
FROM
    app2_mst_users
\G;
