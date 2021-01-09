# 概要

[AWSとTerraformで学ぶプロダクションレディなKubernetes](https://techbookfest.org/product/6493637175148544?productVariantID=4853391664611328) のメモ追加

## 1. セットアップ

### 初期化

`.tf` ファイルがあるディレクトリで `terraform init` を実行する。 provider の DL などをしてから、いくつかのファイルを自動生成する。

### 実行計画の確認

`terraform plan` でどういうリソースを作成するかを、実行前に確認できる。

### 実行

`terraform apply` でファイルの中身を適用する。

### リソースの削除

`terraform destroy` でリソースを削除する。

### 変数

`.tf` ファイルで変数を使う場合は `locals` を使う。

```hcl-terraform
locals {
  variable = "aaaaa"
}
```

`variable` を使っても変数を定義できるが、「スコープ」と「関数が宣言できない」点が異なる。

細かいシンタックスについは、[ここ](https://y-ohgi.com/introduction-terraform/handson/syntax/#output) を参照する。