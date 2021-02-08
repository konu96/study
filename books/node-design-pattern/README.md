# [Node.js デザインパターン](www.amazon.co.jp/dp/4873118735)

## Chapter 2

### 同期・非同期

- 同期的な処理と非同期的な処理を混在している関数への対処

=> どちらかに統一する

※ 注意点

同期的な処理にする場合、ダイレクトスタイルで実装した方がパフォーマンスが良い。
しかし、呼び出し元も同期的にする必要がある。加えて、処理をブロックするので並行性が損なわれる.


非同期な処理にする場合は、 `process.nextTick` 関数が使える。 `setImmediate` 関数も使えるが、機能が異なる。

- `process.nextTick` : 既に登録された I/O イベントよりも **前に** 実行される
- `setImmediate` : 既に登録された I/O イベントの **後に** 実行される

### コールバック

callback 関数は他の引数を分かりやすくするために最後に渡す。

### モジュールの公開方法

- Named Exports

```JavaScript
// logger.js
exports.info = message => {
    console.log(`info: ${message}`);
};

exports.verbose = message => {
    console.log(`verbose: ${message}`);
};

const logger = require('./logger');
logger.info('information');
logger.verbose('verbose');
```

- 関数エクスポート(substack パターン)

substack パターンは、メインとなる関数のみを公開して、プロパティとして副次的な機能を公開する方法

```JavaScript
// logger2.js
module.exports = message => {
    console.log(`info: ${message}`);
};

module.exports.verbose = message => {
    console.log(`verbose: ${message}`);
};

const logger = require('./logger2');
logger('info');
logger.verbose('verbose');
```

- コンストラクタのエクスポート

```JavaScript
class Logger {
    constructor(name) {
        this.name = name;
    }
    
    log(message) {
        console.log(`[${this.name}] ${message}`);
    }
    
    info(message) {
        console.log(`[info] ${message}`);
    }
}

module.exports = Logger;

const Logger = require('./logger');
const dbLogger = new Logger('DB');
dbLogger.info('info');
```

- インスタンスのエクスポート

```JavaScript
class Logger {
    constructor(name) {
        this.count = 0;
        this.name = name;
    }
    
    log(message) {
        this.count++;
        console.log(`[${this.name}] ${message}`);
    }
}

module.exports = new Logger('DEFAULT');
```

これは、 Singleton パターンと似ていますが一点違う点として `同じモジュールを require しても、同一のインスタンスであることが保証されない点` です。
複数バージョンの同じパッケージの場合は、違うインスタンスになってしまいます。

- 何もエクスポートしない

キャッシュなどのグローバルオブジェクトにアクセスして、実行時の変更を変えることができる。(モンキーパッチングという)
基本はアンチパターンです。

### オブザーバーパターン

- ここに図を入れる

## Chapter 4

### ES2015 以降の機能を使った非同期パターン

#### プロミス

プロミスは実装によって、複数の種類がある。Promise/A+ では、 `then` メソッドの振る舞いを規定していて中身の実装(プロミスの生成方法)に決まりはない。

- Bluebird
- Q
- RSVP
- ...
- ES2015 Promise

コールバックを受け取る API をプロミスを返す API に変換することを **プロミス化** という。
