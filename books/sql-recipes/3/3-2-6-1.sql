SElECT
    inet_aton('127.0.0.1') < inet_aton('127.0.0.2') AS lt,
    inet_aton('127.0.0.1') > inet_aton('192.168.0.1') AS gt,
    inet_aton('127.0.0.1') BETWEEN inet_aton('127.0.0.0') AND inet_aton('127.0.0.255') AS is_contained
;