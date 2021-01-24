# [webpack 実践入門](www.amazon.co.jp/dp/B07X9H8JZZ)

## 3. webpack を利用してみる

### 4. ローダー

主に JavaScript 以外のファイル(css, png etc)をバンドルできるように変換するプログラムのこと。
ESLint などコードフォーマッターもローダーと呼ぶ。

- `sass-loader`: Sass を CSS にコンパイルする
- `css-loader`: CSS をモジュールに変換する
- `style-loader`: css-loader で変換した CSS をスタイルが記述された style タグを HTML に追加する
- `url-loader`: 画像を `DataURL` に変換するローダー


バンドルすることで、リクエスト数を減らせる。一方で、`DataURL` にすることでファイルサイズの増加、バンドルファイルの解析時間の遅延が発生する可能性がある。
そのため、全てのリソースをバンドルせず小さいファイルサイズだけバンドルするのが一般的である。
=> `file-loader` 使うことで実現可能

## 4. プラグイン

webpack の機能を拡張する仕組み

- `ProvidePlugin`

全てのファイルで使える変数を定義する

- 