package main

import (
	"context"
	"fmt"
	"sync"
)

var wg2 sync.WaitGroup

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	queue := make(chan string)

	for i := 0; i < 2; i++ {
		wg2.Add(1)
		go fetchUrl2(ctx, queue)
	}

	queue <- "https://exxample.com"
	queue <- "https://exxample.net"
	queue <- "https://exxample.net/foo"
	queue <- "https://exxample.net/bar"

	cancel()
	wg2.Wait()
}

func fetchUrl2(ctx context.Context, queue chan string) {
	for {
		select {
		case <-ctx.Done():
			fmt.Println("worker exit")
			wg2.Done()
			return
		case url := <-queue:
			fmt.Println("fetching", url)
		}
	}
}
