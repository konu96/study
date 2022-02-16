package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {

	// バッファリングされないので、システムコールが都度呼ばれる
	for i := 0; i < 100; i++ {
		_, _ = fmt.Fprintln(os.Stdout, strings.Repeat("x", 100))
	}

	fmt.Println("bufio ↓")
	// こっちのコードはバッファリングされるので、パフォーマンスが良い
	buffer := bufio.NewWriter(os.Stdout)
	for i := 0; i < 100; i++ {
		_, _ = fmt.Fprintln(buffer, strings.Repeat("x", 100))
	}
	_ = buffer.Flush()
}
