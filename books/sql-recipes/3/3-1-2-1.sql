CREATE TABLE IF NOT EXISTS `access_log` (
    `stamp` TIMESTAMP PRIMARY KEY DEFAULT CURRENT_TIMESTAMP,
    `referrer` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL
);

-- INSERT IGNORE INTO access_log VALUES
--     (CURRENT_TIMESTAMP, "http;//www.other.com/path1/index.php?k1=v1&k2=v2", "http://www.example.com/video/detail?id=001"),
--     (CURRENT_TIMESTAMP + 1, "http;//www.other.net/path1/index.php?k1=v1&k2=v2#ref1", "http://www.example.com/video#ref"),
--     (CURRENT_TIMESTAMP + 2, "http;//www.other.com", "http://www.example.com/book/detail?id=002")
-- ;

-- リファラーからホスト名を取得
SELECT
    stamp,
    SUBSTRING_INDEX(SUBSTRING_INDEX(referrer, '/', 3), '/', -1) AS referrer_host
FROM access_log\G
;

SELECT
    stamp,
    url,
    TRIM('?' from SUBSTRING_INDEX(SUBSTRING_INDEX(url, SUBSTRING_INDEX(url, '/', 3), -1), SUBSTRING_INDEX(url, '?', -1), 1)) AS path,
    SUBSTRING_INDEX(SUBSTRING_INDEX(url, 'id=', -1), SUBSTRING_INDEX(url, 'id=', 1), -1) AS id
FROM access_log\G
;
