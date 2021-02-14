# [Swift らしい表現を目指そう](https://booth.pm/ja/items/1264780)

## 2. 関数名とメソッド名

1. 引数ラベルをつけるのはどんな時か?

関数/メソッドが扱う主体ではなく、補足説明がないと関数/メソッドを使う時にわかりにくい場合にラベルを付ける

e.g.

2. 動詞系のメソッドで mutation, non-mutation はどのように表すのか?

- non-mutating
    - `ed` or `ing`
- mutating
    - 動詞系


3. 名詞系のメソッドで mutation, non-mutation はどのように表すのか?

- non-mutating
    - 名詞系
- mutating
    - prefix で form を付ける
    - write back する時も同様
        - `inout` という予約後を使う

## 3. イニシャライザー

1. 変換イニシャライザーの命名は?

変換には **全幅変換(Value Preserving Type Conversion)** と **Narrow 変換(Narrow Type Conversion)** の二つに大別される.

全幅変換を一般的に **型キャスト** と呼ぶ.

```
struct String {
	// 第一引数のラベルは省略する
	init(_ value: Int, radix: Int = 10)
}
```

Narrow 変換は「元の値を加工して、新しい型を作る」変換方法.

## 4. 機能の所属

特になし

## 5. 型キャスト

ビットパターンをそのまま別の意味として再評価する事を **再解釈キャスト(reinterpret cast)** と呼ぶ.

e.g.
`Int 型の init(bitPattern:)`