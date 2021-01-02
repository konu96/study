package main

import "testing"

type TestCase struct {
	description string
	input       int
	output      string
}

func Test_Stringify(test *testing.T) {
	test.Run("normal number", func(test *testing.T) {
		cases := []TestCase{
			{"number is 1", 1, "1"},
			{"number is 101", 101, "101"},
		}

		for _, c := range cases {
			test.Run(c.description, func(test *testing.T) {
				if actual, expect := Stringify(c.input), c.output; actual != expect {
					test.Errorf("actual=%s, expect=%s", actual, expect)
				}
			})
		}
	})

	test.Run("Multiple of 3", func(test *testing.T) {
		cases := []TestCase{
			{"number is 3", 3, "fizz"},
			{"number is 99", 99, "fizz"},
		}

		for _, c := range cases {
			test.Run(c.description, func(test *testing.T) {
				if actual, expect := Stringify(c.input), c.output; actual != expect {
					test.Errorf("actual=%s, expect=%s", actual, expect)
				}
			})
		}
	})

	test.Run("Multiple of 5", func(test *testing.T) {
		cases := []TestCase{
			{"number is 5", 5, "buzz"},
			{"number is 100", 100, "buzz"},
		}

		for _, c := range cases {
			test.Run(c.description, func(test *testing.T) {
				if actual, expect := Stringify(c.input), c.output; actual != expect {
					test.Errorf("actual=%s, expect=%s", actual, expect)
				}
			})
		}
	})

	test.Run("Multiple of 15", func(test *testing.T) {
		cases := []TestCase{
			{"number is 15", 15, "fizzbuzz"},
			{"number is 30", 30, "fizzbuzz"},
		}

		for _, c := range cases {
			test.Run(c.description, func(test *testing.T) {
				if actual, expect := Stringify(c.input), c.output; actual != expect {
					test.Errorf("actual=%s, expect=%s", actual, expect)
				}
			})
		}
	})

}
