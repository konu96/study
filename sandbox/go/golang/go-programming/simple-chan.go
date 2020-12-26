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

  for i := 0; i < 5; i++ {
    gopherID := <- c
    fmt.Println("gopher", gopherID)
  }
}
