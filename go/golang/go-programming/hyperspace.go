package main

import (
  "fmt"
  "strings"
)

func hyperspace(worlds []string) {
  for index := range worlds {
    worlds[index] = strings.TrimSpace(worlds[index])
  }
}

func main() {
  planets := []string{" Venus ", "Earth", " Mars"}
  hyperspace(planets)

  fmt.Println(planets)
}
