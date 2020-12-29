package main

import "fmt"

type Report struct {
  sol int
  Temperature
  Location
}

type Temperature struct {
  high, low float64
}

func (t Temperature) average() float64 {
  return (t.high + t.low) / 2
}

type Location struct {
  lat, lon float64
}

func main() {
  bradbury := Location{
    lat: -4.5,
    lon: 137.2,
  }
  temperature := Temperature{
    high: -1.0,
    low: -78.0,
  }

  report := Report{
    sol:         0,
    Temperature: temperature,
    Location:    bradbury,
  }

  fmt.Println("平均気温", report.average())
}
