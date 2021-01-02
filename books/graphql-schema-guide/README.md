# 概要

https://vvakame.booth.pm/items/1576562 のメモ

## 2. Github v4 API に倣え!

#### 命名規則

- Query

`repository` や `repositories` のような **名詞とその複数形になっている。**
複数形の場合、`repositoryList` も可能だが Relay の仕様では `List` ではなく `Connection` になるので意味が異なってしまう。

- Mutation

`addStar` や `createIssue` の **(動詞 + 名詞)の形をしている。**
DB 操作の抽象化と考えれば　`insert` でも良さそうだけど使っていない。なので、DB 操作の抽象化ではなくビジネスロジック、画面とのコミュニケーションとして設計していると汲み取れる。

#### どんな構造でも GraphQL で表現できる

プログラミング言語と同様に GraphQL も `interface` がある。`User` インタフェースは以下のような型が実装している。

![](https://storage.googleapis.com/zenn-user-upload/f2smk9mxn8v53eybdqb8hluxhb9a)


次に Github の URL の設計を見てみる。`https://github.com/vvakame/metago` や `https://github.com/google/wire` の `vvakame` と `google` に着目する。

|    name   | type |
| :-------: | :--: |
| `vvakame` | User 型 |
| `google`  | Organization 型 |

どちらも型は異なるが `RepositoryOwner` を実装していて、抽象化されている。

union type も似たような事をしている。

#### enum

enum を使う利点は、**修正をした時に変更範囲を絞り込み、静的にチェックできること** です。

#### セキュリティ

`rate limit` と `complexity` を考慮する。
https://docs.github.com/en/free-pro-team@latest/graphql/overview/resource-limitations を読む。

## 3. Relay 各仕様解説

Relay は　Facebook が作成している　React + GraphQL でフロントエンド の開発を行うためのライブラリである。次のような特徴を説明する。

1. Global Object Identification
2. Cursor Connections
3. Input Object Mutations
4. Mutations updater

#### Global Object Identification

全てのデータに ID を付けて一意に特定可能にする事で、クライアントによる自動的なデータの再取得を可能にする。

```
type Query {
  node(id: ID!): Node
}

interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  name: String
}
```

サービス全体で全てのデータに一意の ID を割り振るのはすごく大変。サーバーがマイクロサービスとなると、「どのサービス、どのテーブル、どのデータ」を ID に含めた上で一意にする必要がある。
Github では、base64 エンコードしたものを ID にしている。以下のクエリを叩くと、Google の Organization の ID が分かる。

```
{
  organization(login: "Google") {
    __typename
    id
    databaseId
    login
  }
}
```

`id = MDEyOk9yZ2FuaXphdGlvbjEzNDIwMDQ=` と返ってきて、デコードすると `012:Organization1342004` となる。

- 012: ID の書式バージョン(と推測)
- Organization: テーブル名
- 1342004: データベースID

書式バージョンを含めて base64 する事で、人には分かりにくくするが将来的な破壊的変更を内部で吸収できる余地を作る。

#### Input Object Mutations

mutation の　input に `clientMutationId: String` を含め、サーバー側ではそれを返り値に混ぜて返す。こうすることで、リクエストとレスポンスの操作の紐付けが可能。
しかし、JS では Promise などの非同期操作の API があり、処理に連続性があるため活用されていない。

#### Mutations updater

SKIP

## 4. データベースとの親和性

#### DB のスキーマと GraphQL のスキーマの対応

結論: DB スキーマと GraphQL スキーマは、ほとんど一致させて良い

GraphQL スキーマの大別

1. `name` や `price` などのスカラ型
2. 別の型やリストへの参照
3. **クライアント側用の値(ex.「未読数99+」)**

3 番目のデータは DB には存在しないデータである。クライアントで組み立てるとコストがかかるのでサーバーでやる。また、キャッシュを使うことで他のユーザーのレスポンスに対しても再利用できる。

**N+1 問題への対応**

Go 言語の場合、gqlgen の作者の手による dataloaden などが利用できます。アイディアとしては、一定時間以内に発生した同種のリクエストをプールして一箇所に集約し、IN 句などを使った効率的なクエリに変換します。

**ページネーション**

1. 何件のデータが欲しいか?
2. `WHERE` 句の条件は何か?
3. データの参照方向は何か?
4. **どのデータからの続きが欲しいか?**

4 番目の情報は、最後に得られたレコードの ID を渡すと良い。

例: https://github.com/google/llvm-bazel/releases?after=llvm-project-3bcca6b12d4cbe9d4571e799899e9b956e4711bf

## 5. graphql-schema-linter 

SKIP

## 6. スキーマ設計の実践と考察

簡単にまとめられないので、メモらない