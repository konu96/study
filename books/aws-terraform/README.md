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

## 2. サービス公開

あとでまとめる

## 3. デプロイフロー

Kubernetes のデプロイフローは大きく二つに分けれる。

1. コンテナイメージのビルド
2. マニフェストを apply

AWS では、`CodeBuild` がコンテナイメージのビルドができる。また、`Amazon Elastic Container Registry` を使ってイメージを配布する。
もちろん、`CodeBuild` も terraform でリソースを作成できる。(`codebuild.tf` を参照)

Kubernetes のマニフェストファイルは、Git でバージョン管理して Kustomize で作るのが一般的である。

```
kustomize
├── base
│ ├── front-end.yaml
│ └── kustomization.yaml 
└── overlays
  ├── production
  │ ├── front-end.yaml
  │ └── kustomization.yaml
  └── staging
  ├── front-end.yaml 
  └── kustomization.yaml
```

`kustomize build overlays/production` でマニフェストが作成される。
環境変数を使うには Kustomize の `Generator` を使う。ConfigMapGenerator 