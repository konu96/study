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

### Calling another task

`deps` で依存関係を表現した場合、並列でタスクを進める。シリアルにしたい場合は、次のように書く。

```
version: '3'

tasks:
  main-task:
    cmds:
      - task: task-to-be-called
      - task: another-task
      - echo "Both done"

  task-to-be-called:
    cmds:
      - echo "Task to be called"

  another-task:
    cmds:
      - echo "Another task"
```

### Prevent unnecessary work
インプットになるファイルに変更がない場合、一度コマンドを実行していたら２回目はスキップする。

```
version: '3'

tasks:
  build:
    cmds:
      - go build .
    sources:
      - ./*.go
    generates:
      - app{{exeExt}}
    method: checksum
```

### Dynamic variables

```
version: '3'

tasks:
  build:
    cmds:
      - go build -ldflags="-X main.Version={{.GIT_COMMIT}}" main.go
    vars:
      GIT_COMMIT:
        sh: git log -n 1 --format=%h
```

### Help

それぞれのタスクに `desc` を追加すると、`task --list` を実行したときにヘルプが出せる。

```
version: '3'

tasks:
  build:
    desc: Build the go binary.
    cmds:
      - go build -v -i main.go
```

同じ感じで `summary` を追加すると、`task --summary task-name` でタスクのサマリーが表示される。

```
version: '3'

tasks:
  release:
    deps: [build]
    summary: |
      Release your project to github

      It will build your project before starting the release.
      Please make sure that you have set GITHUB_TOKEN before starting.
    cmds:
      - your-release-tool

  build:
    cmds:
      - your-build-tool
```

### silent

```
version: '3'

tasks:
  echo:
    cmds:
      - cmd: echo "Print something"
        silent: true
```

`task --silent` でも OK

### Dry run mode

`task --dry`


### short task syntax

```
version: '3'

tasks:
  build: go build -v -o ./app{{exeExt}} .

  run:
    - task: build
    - ./app{{exeExt}} -h localhost -p 8080
```

### Watch tasks

`taks --watch`

ファイルの変更があるか知る必要があるので、 `sources` が必要