CREATE TABLE IF NOT EXISTS `mst_users` (
    `user_id` CHAR(4) PRIMARY KEY,
    `register_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `register_device` INTEGER NOT NULL
);

-- INSERT IGNORE INTO mst_users (user_id, register_device) VALUES ("U001", 1), ("U002", 2), ("U003", 3);

SELECT
    user_id,
    CASE
        WHEN register_device = 1 THEN 'PC'
        WHEN register_device = 2 THEN 'SP'
        WHEN register_device = 2 THEN 'App'
    END AS device_name
FROM mst_users\G;