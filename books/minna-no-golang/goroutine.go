package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func main() {
	queue := make(chan string)

	for i := 0; i < 2; i++ {
		wg.Add(1)
		go fetchUrl(queue)
	}

	queue <- "https://exxample.com"
	queue <- "https://exxample.net"
	queue <- "https://exxample.net/foo"
	queue <- "https://exxample.net/bar"

	close(queue)
	wg.Wait()
}

func fetchUrl(queue chan string) {
	for {
		url, more := <-queue
		if more {
			fmt.Println("fetching", url)
		} else {
			fmt.Println("worker exit")
			wg.Done()

			return
		}
	}
}
