package main

import (
  "fmt"
  "strings"
)

func sourceString(downstream chan string) {
  for _, value := range []string{"aaaa", "bbbb", "cccc"} {
    downstream <- value
  }

  close(downstream)
}

func filterString(upstream, downstream chan string) {
  for item := range upstream {
    if !strings.Contains(item, "bbb") {
      downstream <- item
    }
  }

  close(downstream)
}

func printString(upstream chan string) {
  for value := range upstream {
    fmt.Println(value)
  }
}

func main() {
  downstream := make(chan string)
  upstream := make(chan string)

  go sourceString(downstream)
  go filterString(downstream, upstream)
  printString(upstream)
}
