SELECT
    STR_TO_DATE('09,01,2020','%d,%m,%Y') AS date1,
    STR_TO_DATE('2020-01-09','%Y-%m-%d') AS date2, -- m と d は必ず小文字
    DATE_FORMAT(CURRENT_TIMESTAMP, '%Y') AS year,
    DATE_FORMAT(CURRENT_TIMESTAMP, '%m') AS month,
    DATE_FORMAT(CURRENT_TIMESTAMP, '%d') AS `date`
;