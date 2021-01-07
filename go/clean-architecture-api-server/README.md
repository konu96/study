# 概要

[Clean ArchitectureでAPI Serverを構築してみる](https://tinyurl.com/y9ly85pv) のメモ

## ディレクトリ構成

```bash
└── src
    ├── app
    │   ├── domain
    │   │   └── user.go
    │   ├── infrastructure
    │   │   ├── router.go
    │   │   └── sqlhandler.go
    │   ├── interfaces
    │   │   ├── controllers
    │   │   │   ├── context.go
    │   │   │   ├── error.go
    │   │   │   └── user_controller.go
    │   │   └── database
    │   │       ├── sqlhandler.go
    │   │       └── user_repository.go
    │   ├── server.go
    │   └── usecase
    │       ├── user_interactor.go
    │       └── user_repository.go
```

`interfaces` 配下を更にレイヤーを分けている。これは `database` に関わる処理を明確に制限するためである。

## 各レイヤーの詳細

### `Entities` レイヤー

```go
package domain

type User struct {
    ID        int
    FirstName string
    LastName  string
}

type Users []User
```

### Infrastructure と Interfaces レイヤー(データベース関連)

データベースとの直接のやりとりは　Infrastructure レイヤー。それをアプリケーションで使い易いようにするのが Interface レイヤー

データベース接続に 外部 package を使っている。その依存を内側(`database` ディレクトリ)に持ち込まないために infrastructure に定義する。

```go
// infrastructure/sqlhandler.go
package infrastructure

type SqlHandler struct {
    Conn *sql.DB
}

func NewSqlHandler() *SqlHandler {
    conn, err := sql.Open("mysql", "root:@tcp(db:3306)/sample")
    if err != nil {
        panic(err.Error)
    }
    sqlHandler := new(SqlHandler)
    sqlHandler.Conn = conn
    return sqlHandler
}
```

データベースとのやりとりをするのは、`interfaces/database` ディレクトリ　に書く。

```go
// interfaces/database/user_repository.go
package database

type UserRepository struct {
    SqlHandler
}

func (ur *UserRepository) Store(u domain.User) (id int, err error) {
    result, err := ur.Execute(
        "INSERT INTO users (first_name, last_name) VALUES (?,?)", u.FirstName, u.LastName,
    )
    if err != nil {
        return
    }
    id64, err := result.LastInsertId()
    if err != nil {
        return
    }
    id = int(id64)
    return
}
```

`domain` レイヤーは `interface` レイヤーの内側にあるので依存して問題なし。ただ、`sqlHandler` は `infrastructure` レイヤーに依存しているので問題あり。
DIP(Dependency Injection Principle) を取り入れる。

```go
// interfaces/database/sql_handler.go
package database

type SqlHandler interface {
    Execute(string, ...interface{}) (Result, error)
    Query(string, ...interface{}) (Row, error)
}

type Result interface {
    LastInsertId() (int64, error)
    RowsAffected() (int64, error)
}

type Row interface {
    Scan(...interface{}) error
    Next() bool
    Close() error
}
``` 

`infrastructure/sqlhandler.go` に `Execute` と `Query` を定義することで `database.SqlHandler` を実装したことになる。

### Use Case レイヤー

`interfaces/database` からのインプット、`interfaces/controllers` への Gateway(アウトプットという意味で使っている?)の役割を担う。

```go
// usecases/user_interactor.go
package usecase

type UserInteractor struct {
    UserRepository UserRepository
}

func (interactor *UserInteractor) Add(u domain.User) (err error) {
    _, err := interactor.UserRepository.Store(u)
    return
}
```

ここでも `database` レイヤーにある `UserRepository` に依存しているので DIP を取り入れる。

```go
// usecases/user_repository.go
package usecase

type UserRepository interface {
    Store(domain.User) (int, error)
    FindById(int) (domain.User, error)
    FindAll() (domain.Users, error)
}
```

### Infrastructure と Interfaces レイヤー(ルーティング関連)

```go
// interfases/controllers/user_controller.go
package controllers

type UserController struct {
    Interactor usecase.UserInteractor
}

func NewUserController(sqlHandler database.SqlHandler) *UserController {
    return &UserController{
        Interactor: usecase.UserInteractor{
            UserRepository: &database.UserRepository{
                SqlHandler: sqlHandler,
            },
        },
    }
}

func (controller *UserController) Create(c Context) {
    u := domain.User{}
    c.Bind(&u)
    err := controller.Interactor.Add(u)
    if err != nil {
        c.JSON(500, NewError(err))
        return
    }
    c.JSON(201)
}
```

`Create` メソッドの引数の `Context` は gin フレームワークのコンテキストが渡される。外部 package への依存なので、ここでも DIP を使う。

```go
package controllers

type Context interface {
    Param(string) string
    Bind(interface{}) error
    Status(int)
    JSON(int, interface{})
}
```

```go
// infrastructure/router.go
package infrastructure

var Router *gin.Engine

func init() {
    router := gin.Default()

    userController := controllers.NewUserController(NewSqlHandler())

    router.POST("/users", func(c *gin.Context) { userController.Create(c) })
    Router = router
}
```