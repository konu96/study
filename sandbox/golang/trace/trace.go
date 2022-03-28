// go tool trace trace.out
package main

import (
  "fmt"
  "log"
  _ "net/http/pprof"
  "os"
  "runtime/trace"
  "time"
)

func main() {

  file, err := os.Create("trace.out")
  if err != nil {
    log.Fatal(err)
  }

  defer file.Close()

  trace.Start(file)
  defer trace.Stop()

  ch := generator("Hi!")
  timeout := time.After(5 * time.Second)
  for i := 0; true; i++ {
    select {
    case s := <-ch:
      fmt.Println(s)
    case <-timeout: // time.After returns a channel that waits N time to send a message
      fmt.Println("5s Timeout!")
      return
    }
  }
}

func generator(msg string) <-chan string { // returns receive-only channel
  ch := make(chan string)
  go func() { // anonymous goroutine
    for i := 0; ; i++ {
      ch <- fmt.Sprintf("%s %d", msg, i)
      time.Sleep(time.Second)
    }
  }()
  return ch
}
