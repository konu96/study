package main

import (
	"fmt"
	"os"
	"shuffle/shuffle"
)

type Dice []int

func (d Dice) Seed() int64 { return int64(os.Getpid()) }

func (d Dice) Len() int { return len(d) }

func (d Dice) Swap(i, j int) { d[i], d[j] = d[j], d[i] }

func main() {
	dice := Dice([]int{1, 2, 3, 4, 5})

	fmt.Printf("%v\n", dice)
	shuffle.Shuffle(dice)
	fmt.Printf("%v\n", dice)

}
