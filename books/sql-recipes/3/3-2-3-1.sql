CREATE TABLE IF NOT EXISTS `advertising_stats`(
    `date_time` DATE,
    `ad_id` INTEGER NOT NULL,
    `impressions` INTEGER NOT NULL,
    `clicks` INTEGER NOT NULL
);

-- INSERT IGNORE INTO `advertising_stats` VALUES
--     ('2017-04-01', 001, 100000, 3000),
--     ('2017-04-01', 002, 100000, 3000),
--     ('2017-04-01', 003, 100000, 3000),
--     ('2017-04-02', 001,      0,    0),
--     ('2017-04-02', 002, 100000, 3000),
--     ('2017-04-02', 003, 100000, 3000)
-- ;

SELECT
    date_time,
    ad_id,
    clicks / impressions AS ctr,
    100.0 * clicks / impressions AS ctr_as_percent
FROM advertising_stats
;