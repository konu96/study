# [Taskfile](https://taskfile.dev)

## Getting started

### Basic

```
version: '3'

tasks:
  build:
    cmds:
      - go build -v -i main.go

  assets:
    cmds:
      - minify -o public/style.css src/css
```

`task assets build` で実行する

### Environment variable

```
version: '3'

tasks:
  greet:
    cmds:
      - echo $GREETING
    env:
      GREETING: Hey, konu96
```

### dotenv

これだと、Task の定義と環境変数の定義がごちゃごちゃになる。`dotenv` を使うと、解決できる。

### includes

```
version: '3'

includes:
  docs: ./documentation # will look for ./documentation/Taskfile.yml
  docker: ./DockerTasks.yml
```

- `task docs:serve` => `./documentation/Taskfile.yml` の `serve` を実行する
- `task docker:build` => `./DockerTasks.yml` の `build` を実行する

デフォルトでは、`Taskfile` があるディレクトリで実行する。変更する場合は、次のようにする。
`task docs` をすると、`docs` ディレクトリで実行する。

```
version: '3'

includes:
  docs:
    taskfile: ./docs/Taskfile.yml
    dir: ./docs
```

### dependencies

`Basic` の章で `task assets build` で実行していた。このやり方だと、依存するタスクの実行を忘れる。`deps` を使えば、解決できる。

```
version: '3'

tasks:
  build:
    deps: [assets]
    cmds:
      - go build -v -i main.go

  assets:
    cmds:
      - minify -o public/style.css src/css
```

### vars

タスクに引数を渡す場合は、`vars` を使う。

```
version: '3'

tasks:
  default:
    deps:
      - task: echo_sth
        vars: {TEXT: "before 1"}
      - task: echo_sth
        vars: {TEXT: "before 2"}
    cmds:
      - echo "after"

  echo_sth:
    cmds:
      - echo {{.TEXT}}
```