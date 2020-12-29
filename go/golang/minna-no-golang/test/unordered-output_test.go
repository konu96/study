package test

import "fmt"

func ExampleUnOrdered() {
	for _, value := range []int{1, 2, 3} {
		fmt.Println(value)
	}
	// Unordered output:
	// 2
	// 3
	// 1
}
