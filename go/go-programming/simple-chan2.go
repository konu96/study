package main

import (
  "fmt"
  "time"
)

func sleep (id int, c chan int)  {
  time.Sleep(3 * time.Second)
  fmt.Println("...", id, " snore ...")
  c <- id
}

func main() {
  c := make(chan int)

  for i := 0; i < 5; i++ {
    go sleep(i, c)
  }

  timeout := time.After(2 * time.Second)
  for i := 0; i < 5; i++ {
    select {
      case gopherID := <- c:
        fmt.Println("gopher", gopherID)
      case <-timeout:
        fmt.Println("timeout")
        return
    }
  }
}
