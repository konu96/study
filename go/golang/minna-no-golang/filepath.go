package main

import (
	"log"
	"os"
	"os/user"
	"path/filepath"
)

func main() {
	u, err := user.Current()
	if err != nil {
		log.Fatal(err)
	}

	directory := filepath.Join(u.HomeDir, ".config", "myapp")
	err = os.Mkdir(directory, 0755)
	if err != nil {
		log.Fatal(err)
	}
}
