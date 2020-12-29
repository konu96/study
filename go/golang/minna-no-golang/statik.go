package main

import (
	"io"
	"log"
	"os"

	_ "./statik"
	"github.com/rakyll/statik/fs"
)

func main() {
	statikFS, err := fs.New()
	if err != nil {
		log.Fatal(err)
	}

	file, err := statikFS.Open("/sample2.txt")
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	io.Copy(os.Stdout, file)
}
