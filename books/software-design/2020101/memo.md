# 1. 基本の型とインタフェース

## スライス

`[]` に数値や `...` があると、配列になる。

```
array := [...]int{1, 2, 3}
slice := []int{1, 2, 3}
```

配列同士の比較はできるけど、スライス同士で比較はできない。

```
array1 := [2]int{1, 2}
array2 := [2]int{1, 2}
println(array1 == array2)

slice1 := []int{1, 2}
slice2 := []int{1, 2}
// println(slice1 == slice2)  これはできない
println(&slice1 == &slice2)
```

2つのスライスを連結する場合

```
dstWithSrc := append(dst, src...)
```

スライス内の要素を削除する

```
i := 1
fmt.Println(dst[:i], dst[i+1:])
```

## マップ

`m[key]` は値とそのキーの有無の二値を返す。
```
followerNames := []string{ "John", "Richard", "John", "Jane", "Jane" }
uniqueNames := make([]string, 0, len(followerNames)) // capacity を指定する事で、余計なメモリを確保しなくなる

m := make(map[string]struct{})
for _, v := range followerNames {
    if _, ok := m[v]; ok {
        continue
    }
    uniqueNames = append(uniqueNames, v)
    m[v] = struct{}{}
}

fmt.Println(uniqueNames)
```

## ストラクタ

[レシーバの型とポインタの使い分け](https://gist.github.com/knsh14/0507b98c6b62959011ba9e4c310cd15d)

```
type secret struct {
	ID string
	CreateTime time.Time

	token string
}

func (s *secret) Read(p []byte) (int, error) {
	return bytes.NewBuffer(p).WriteString(s.token)
}

func NewSecret() io.Reader {
	return &secret {
		ID: "dummy_id",
		CreateTime: time.Now(),
		token: "dummy_token",
	}
}

type User struct {
	Name string
	Age int
}

func (u *User) Aging() {
	u.Age++
}

func (u User) AgingButNothingHappen() {
	u.Age++
}

func main() {
    s := NewSecret()
    
    if err := json.NewEncoder(os.Stdout).Encode(s); err != nil {
        fmt.Println("failed to json encode: error = ", err)
    }
    
    user := &User{
        Name: "konu96",
        Age: 25,
    }
    
    user.AgingButNothingHappen()
    fmt.Println(user)  // 25
}
```

## インタフェース

関数にメソッドを実装して、インタフェースを満たす。標準ライブラリだと `http.HandlerFunc` とかが参考になる。

```
type ParrotFunc func() string

func (p ParrotFunc) Cry() string {
	return p()
}

func (p ParrotFunc) Cry1() int {
	return 1
}

type Crier interface {
	Cry() string
}

c := ParrotFunc(func() string {
    return "aaaaa"
})

fmt.Println(c.Cry())
fmt.Println(c.Cry1())
```

Rob Pike の名言
「The bigger the interface, the weaker the abstraction」
大きいインタフェースは、弱い抽象化である。

一つに無理やり複数のメソッドを定義するより、複数のインタフェースを組み合わせるのが良い。

```
type Crier interface {
	Cry() string
}

type FootStepper interface {
	FootSteps() string
}

type CryFootStepper interface {
	Crier
	FootStepper
}
```

### 関連メモ

[`fmt.Print` と `print` の違い](https://qiita.com/taji-taji/items/79a49c0ee329d0b9c065)

```
src := []int{1, 2, 3}
fmt.Print(src) // [1 2 3]
print(src) // [3/3]0xc0000161c0
```

# 2. 入出力

# 3. ゴルーチンとチャネル

「Do not communicate by sharing memory; instead, share memory by communicating.」
メモリを共有する事で通信するのではなく、通信する事でメモリを共有する。

- ミューテックス
    - 複数のゴルーチンで共有したメモリを保護して、競合を防ぐ仕組み
- チャネル
    - 複数のゴルーチンで通信をする仕組み
    
良くあるチャネルパターン

1. `select-default`

```
ch := make(chan int)

selecct {
    case ch <- 100:
      fmt.Println("sent")
    default:
```

2. `for-select`

```
for {
    select {
        case <- time.Tick(1 * time.Second):
          fmt.Println("waiting...")
        case <- doneCh:
    }
}
```

3. `nil` チャネル

```
select {
    case <- ch1:
      ch1 = nil  // ch1 の受信を無効にする
    case <- ch2:

}
```

4. close を使ったブロードキャスト

```
func main() {
	doneCh := make(chan struct{})
	for i := 0; i < 10; i++ {
		go do(i, doneCh)
	}

	close(doneCh)
	time.Sleep(300 * time.Millisecond)
}

func do(n int, doneCh <- chan struct{}) {
	for {
		select {
		case <- doneCh:
			log.Printf("finished %d", n)
		default:
			time.Sleep(100 * time.Millisecond)
		}
	}
}
```

並列処理の記述方法

- `sync.WaitGroup` を使う

```
var wg sync.WaitGroup
	for i := 0; i < 10; i++ {
        i := i
		wg.Add(1)
		go func(n int) {
			defer wg.Done()
			do(n)
		}(i)
	}

	wg.Wait()
}

func do(n int) {
	time.Sleep(1 * time.Second)
	log.Printf("%d called", n)
}
```

- `errgroup.Group` を使う

`sync.WaitGroup` とほとんど同じ。エラーを返せる点が異なる。
`Wait` メソッドは最初に返されたエラーのみを返す。

```
var eg errgroup.Group
for i := 0; i < 10; i++ {
    eg.Go(func() error {
        return do2(i)
    })
}

if err := eg.Wait(); err != nil {
    log.Printf("error = %v", err)
}

fmt.Println("success")

func do2(n int) error {
	if n % 2 == 0 {
		return errors.New("err")
	}

	time.Sleep(1 * time.Second)
	log.Printf("%d called", n)

	return nil
}
```

- `semaphore.Weighted`

特定リソースへの同時アクセスを減らす時に使われる手法。
下記コードでは次のような処理が行われる。

1. 重み5の計数セマフォを用意する
2. 直後に「1, 2」の重みが使われ「5-(1+2)=2」が残る
3. 次のゴルーチンは3必要なので、空きが出るまで実行を待つ

```
func main() {
	sem := semaphore.NewWeighted(5)
	go do(sem, func() { time.Sleep(1 * time.Second)}, 1)
	go do(sem, func() { time.Sleep(1 * time.Second)}, 2)
	go do(sem, func() { time.Sleep(1 * time.Second)}, 3)

	time.Sleep(5 * time.Second)
}

func do(sem *semaphore.Weighted, f func(), w int64) {
	if err := sem.Acquire(context.Background(), w); err != nil {
		log.Println(err)
		return
	}
	defer sem.Release(w)

	log.Printf("acquired %d\n", w)

	f()
}
```

- `sync.Once`

複数ゴルーチンがアクセスする可能性があり、一度だけ実行すればよい時に使う。

```
func main() {
	sem := semaphore.NewWeighted(5)
	go do(sem, func() { time.Sleep(1 * time.Second)}, 1)
	go do(sem, func() { time.Sleep(1 * time.Second)}, 2)
	go do(sem, func() { time.Sleep(1 * time.Second)}, 3)

	time.Sleep(5 * time.Second)
}

func do(sem *semaphore.Weighted, f func(), w int64) {
	if err := sem.Acquire(context.Background(), w); err != nil {
		log.Println(err)
		return
	}
	defer sem.Release(w)

	log.Printf("acquired %d\n", w)

	f()
}
```

- `singleflight.Group`

短い時間に重複して API 呼び出しをする場合、不要な API 呼び出しを抑制できる。
下記コードは、`foo`, `bar` の片方の値をキャッシュする。もう片方はそのキャッシュが変える

```
type group struct {
	singleflight.Group
	sync.WaitGroup
}

func (g *group) do(s string) {
	g.Add(1)
	go func() {
		defer g.Done()

		v, err, shared := g.Do("key", func() (interface{}, error) {
			time.Sleep(1 * time.Second)
			log.Printf("cached %s", s)
			return s, nil
		})
		log.Println(v, err, shared)
	}()
}

func (g *group) Forget() {
	g.Group.Forget("key")
}

func main() {
	var g group

	g.do("foo")
	g.do("bar")
	g.Wait()

	g.Forget()
	g.do("hoge")
	g.do("fuga")
	g.Wait()

}
```

**ゴルーチンを直接使う時に、意識すること**

- 一方向チャネル型を使う

クローズしたチャネルに送信する、クローズしたチャネルから受信を永遠に待つ可能性が減る。

- 受信ゴルーチンより送信ゴルーチンを先に終了する

**仕組みで並行性のバグを検出する**

1. ゴルーチンリークを検出する

ゴルーチンリーク is 生成されたゴルーチンが終了せずに滞留すること

https://github.com/uber-go/goleak を使って、検出できる。ただし、テスト時の実行パスの時に発生ゴルーチンリークを検出する。

2. データ競合を検出

`go test -race` のように `race` オプションをテスト時に付ければ、検出できる。

# 4. コンテキスト

整合性のあるキャンセル処理をするために使う。

(1) 対象のコンテキストをキャンセルする
(2) 次に子コンテキストにキャンセルを伝搬する
(3) 親コンテキストから対象のコンテキストの参照を削除

![](https://storage.googleapis.com/zenn-user-upload/idgih3gs2126ygwupsu9a6szzaf2)

**コンテキストを使う上で守るべき点**

- コンテキストは構造体に入れず、第一引数に渡す
- 渡すべきコンテキストがない場合は、 `context.TODO` を渡す
- コンテキストに保存する key-value はリクエストスコープに収まる値

![](https://storage.googleapis.com/zenn-user-upload/ekm5dv36rcigf7fnf3hyx9ic0ldz)

## コンテキスト木の根を作る `Background` 関数

`Background` 関数は値を持たない `emptyCtx` を作成する。この配下に、値共有やキャンセル用のコンテキストを配置していく。


```
emptyCtx := context.Background()
cancelCtx, cancel := context.WithCancel(emptyCtx)
defer cancel()

doSomething(cancelCtx)
```

## 古いコードに context パッケージを導入する時に使える `TODO` 関数

コンテキストを関数に渡したいが現状コンテキストが無い場合に `context.TODO` で一時的にコンテキストを作成する。

```
ctx := context.TODO()
return newFunc(ctx) // return newFunc(nil) としない
```

## キャンセル可能なコンテキストを生成する `WithCancel` 関数

```
func main() {
	ctx := context.Background()
	cancelCtx, cancel := context.WithCancel(ctx)

	defer cancel()

	workerNum := 3
	errCh := make(chan error, workerNum)

	wg := sync.WaitGroup{}
	for i := 0; i < workerNum; i++ {
        i := i
		wg.Add(1)
		go func(num int) {
			defer wg.Done()
			if err := doSomethingWithContext(cancelCtx, num); err != nil {
				cancel()
				errCh <- err
			}
		}(i)
	}

	wg.Wait()
	close(errCh)

	var errs []error
	for err := range errCh {
		errs = append(errs, err)
	}

	if len(errs) > 0 {
		fmt.Printf("first error is %v", errs[0])
	}
}

func doSomethingWithContext(ctx context.Context, num int) error {
	select {
	case <- ctx.Done():
		return ctx.Err()
	default:
	}

	fmt.Println(num)
	return nil
}
```

## 指定した時刻にキャンセルされるコンテキストを生成する `WithDeadline`

## 指定時間が経つとキャンセルされるコンテキストを生成する `WithTimeout`

`WithDeadline` とほとんど同じ挙動をする。違いは、経過時間を指定してキャンセル処理を実行する点である。

```
func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc) {
    return WithDeadline(parent, time.Now().Add(timeout)
}
```

## コンテキスト間で値を共有できるコンテキストを生成する `WithValue`

# 5. ポインタ

メモリの読み書きは **スタック**、**ヒープ** に分けられる。

- スタック
    - コンパイル時に使用量が決定される場合に使う
    - 変数が型の時に使われる
- ヒープ
    - 実行時に使用量や変数の生存期間が分からない時に使う
    - ポインタだとヒープが使われる可能性がある
    
どちらを使うかは `go build -gcflags "-m"` で見られる。

```
type T struct {
    Number int
    Text string
}
```

`T` 型を要素にいくつか例を見る。

- マップ

```
c := map[int]T{ 0: T{} }
c[0].Number = 1 // cannot assign to struct dield c[0].Number in map
c[0] = T{ Number: 1 } // ok
fmt.Println(c[0].Number)

or

c := map[int]*T{ 0: &T{} }
c[0].Number = 1
fmt.Println(c[0].Number)
```

- スライス

```
c := []T{}
c = append(c, T{})
v := c[0]
v.Number = 1

fmt.Println(c[0].Number)
c[0].Number = 1
fmt.Println(c[0].Number)
```

ポインタを使う時に意識しないといけない点

```
s := []T{
    {1},
    {2},
    {3},
    {4},
    {5},
}
var s2 []*T

for _, v := range s {
    s2 = append(s2, &v)
}

for _, v := range s2 {
    fmt.Printf("%+v\n", v)
}
// &{Number:5}
// &{Number:5}
// &{Number:5}
// &{Number:5}
// &{Number:5}
```

```
for _, v := range s {
    v := v
    s2 = append(s2, &v)
}
```

```
s := []*T{
    {1},
    {2},
    {3},
    {4},
    {5},
}
var s2 []*T

for _, v := range s {
    s2 = append(s2, v)
}

for _, v := range s2 {
    fmt.Printf("%+v\n", v)
}
```

# 5. エラーハンドリング

https://zenn.dev/spiegel/books/error-handling-in-golang/viewer の方が詳しいので、これを読む

## Appendix

- https://gist.github.com/knsh14/0507b98c6b62959011ba9e4c310cd15d