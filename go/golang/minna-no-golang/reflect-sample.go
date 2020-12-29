package main

import (
	"fmt"
	"reflect"
)

type Point struct {
	X int
	Y int
}

func main() {
	point := Point{
		X: 10,
		Y: 20,
	}

	reflectValue := reflect.ValueOf(point)
	fmt.Printf("reflect.Type = %v\n", reflectValue.Type())
	fmt.Printf("reflect.Kind = %v\n", reflectValue.Kind())
	fmt.Printf("reflect.Interface = %v\n", reflectValue.Interface())
}
