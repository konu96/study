# 概要

責任ある開発者のためのHTTPヘッダー

https://yakst.com/ja/posts/5512

## HTTPS と HSTS(HTTP Strict Transport Security)

HSTS レスポンスをヘッダーにつけることで、HTTPS 経由でのみ動作することをブラウザに伝えることができる。

```sample:header
Strict-Transport-Security: max-age=1000; includeSubDomains; preload
```

以降、同一オリジンへの HTTP へのアクセスは自動的にブラウザが HTTPS にリダイレクトする。

- `max-age` : HTTPS にリダイレクトする設定の有効期間
- `includeSubDomains` : 設定をサブドメインで有効にするかどうか
- `preload` : HTTP 通信を絶対に避けたい場合につける。

HSTS は安全なアクセスを可能にするだけではなく、高速化も行う。(HTTP -> HTTPS のリダイレクトをなくせる)

## CSP(Content Security Policy)

HTTPS で安全にサイトにアクセスできますが、まだ混合コンテンツの危険があります。

※混合コンテンツとは、HTTPS ページが HTTP ページを読み込む事で起こるリスクの事

混合コンテンツは大きく2種類に分けられる。

- パッシブな混合コンテンツ
  - ページの残りの部分を操作しないので、できる事が限られる
- アクティブな混合コンテンツ
  - ページ全体に関係するため、攻撃者はほぼ全ての事ができる

```
Content-Security-Policy: upgrade-insecure-requests<Paste>
```

CSP をヘッダー or メタ要素につける事で全ての HTTP リクエストを HTTPS にできる。
CSP はそれだけではなく、どのようなリソース・アクションが許可されるか定義もできる。

`Content-Security-Policy-Report-Only` モードを利用する事で、ブラウザはブロックされる見込みのリソースを出力できる。

## Accept, Accept-CH

`Accept` をリクエストヘッダーにつける事で、ブラウザがどんなファイル形式を解釈できるかの情報を提供します。

```
Accept: image/webp, image/apng, image/*,*/*;q=0.8
```

`Accept-CH` は、適切なサイズの画像を配信できる。

```
<meta http-equiv="Accept-CH" content="Viewport-Width, Downlink">
<meta http-equiv="Accept-CH-Lifetime" content="86400">
```


## preload
どのようなリソースがリクエストされるのかブラウザに伝えるために使う。

```
<link rel="preload" href="/font.woff2" as="font" type="font/woff2" crossorigin="anonymous">
or
Link: </font.woff2>; rel=preload; as=font; no-push
```

## Feature-Policy
なんの機能が許可されるのかを定義でき、サイトで実行される他者のコードが引き金となって現れる、許可を求めるダイアログのポップアップを制限できる。

```
Feature-Policy: vibrate 'none'; geolocation 'none'
```


## 参考

- https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content?hl=ja#%E3%83%91%E3%83%83%E3%82%B7%E3%83%96%E3%81%AA%E6%B7%B7%E5%90%88%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84

