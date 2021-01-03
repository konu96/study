# 概要

https://azu.github.io/promises-book/ のメモ

## 1. Promise とは何か?

非同期処理を抽象化したオブジェクトとそれを操作する仕組みのこと

```javascript
// コールバックを使った非同期処理
getAsync("fileA.txt", (error, result) => {
    if (error) {
        console.error(`error = ${error}`)
    }
    // 成功処理
});

// Promise を使った非同期処理
const promise = getAsyncPromise("fileA.txt");
promise.then(result => {
    // 成功処理
}).catch(error => {
    // 失敗処理
})
```

`Promise` を使うことで、書き方が統一される。複雑になり易い非同期処理を扱い易いものにできる。

`Promise` オブジェクトに成功処理・失敗処理を登録する書き方


`promise.then(onFulfilled, onRejected)` のように書く。(`onFulfilled`, `onRejected` は関数)
エラー処理だけ書く場合は、 `promise.then(undefined, onRejected)` でも可能。
`.catch` は `promise.then(undefined, onRejected)` のシンタックスシュガー

`Promise.resolve(value)` は次のコードと等しい。

```javascript
new Promise(resolve => {
  resolve(value);
});

// resolve が返す値は promise オブジェクトなので次のように書ける
Promise.resolve(42).then(value => {
  console.log(value);
})
```

`.resolve` の他の大きな特徴は **thenable オブジェクトを promise オブジェクトに変換する** というがある。
`thenable` オブジェクトとは、`then` を持っていて `promise.then` と同じような挙動を期待する。

```javascript
const promise = Promise.resolve($.ajax('https://httpbin.org.get'));

promise.then(value => {
  console.log(value);
});
```

もちろん、 `Promise.reject` もある。

**コラム**

`Promise.resolve(value)` を使った場合、`promise` オブジェクトがすぐに `resolve` されるので同期処理のように見えてしまう。ただ実際は、`then` に登録した関数が呼ばれるのは非同期である。

```javascript
const promise = new Promise(resolve => {
  console.log('inner promise');
  resolve(42);
});

promise.then(value => {
  console.log(value);
})

console.log('outer promise');
```

上のコードは `resolve` に渡すデータがすぐに用意されている。 `then` の実行は同期的には可能である。
ただし、非同期処理する可能性のコードは必ず非同期で行わなければならない。同期処理できてもしてはならない。

- 同期的に実行すると、処理の期待されたシーケンスが乱れて、バグが生じる
- スタックオーバーフローや例外処理の間違いが発生する可能性がある
- 同期的に実行される処理は `setTimeout` を使って、非同期にする

`Promise.finally` の書き方

```javascript
const onFinally = () => {
    console.log("finished");
}

Promise.resolve(42)
  .finally(onFinally)
  .then(value => {
    console.log(value);
});

Promise.resolve(42).then(result => {
  onFinally()
  return result;
}, error => {
  return Promise.reject(error);
})
```

`then` は毎回新しい `Promise` オブジェクトを作成する。

```javascript
const promise = new Promise(resolve => {
    resolve(100);
})

promise.then(value => value * 2);
promise.then(value => value * 2);
promise.then(value => { console.log(`1: ${value}`); }); // 1: 100

promise
    .then(value => value * 2)
    .then(value => value * 2)
    .then(value => { console.log(`2: ${value}`); }); // 2: 400
```

`then` or `catch`

```javascript
function throwError(value) { // 例外を投げる 
    throw new Error(value);
}
// <1> onRejectedが呼ばれることはない
function badMain(onRejected) {
    return Promise.resolve(42).then(throwError, onRejected);
}
// <2> onRejectedが例外発生時に呼ばれる
function goodMain(onRejected) {
    return Promise.resolve(42).then(throwError).catch(onRejected);
}

badMain(function(){ 
    console.log("BAD");
});

goodMain(function(){
    console.log("GOOD"); 
});
```


## 5. Async Function

`async` を付けた関数は必ず `Promise` インスタンスを返す関数になる。

```javascript
const doAsync = async () => {
    return "値";
}
```

上の関数は以下と同じである。

```javascript
function doAsync() {
    return Promise.resolve("値");
}
```