package main

import "fmt"

type location struct {
  lat, lon float64
}

func add(arg *location) {
  arg.lon += 3.5
}

func main() {
  a := location{lat: 2.0, lon: 3.0}
  add(&a)
  fmt.Println(a)
}
