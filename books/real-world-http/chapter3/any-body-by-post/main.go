package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	file, err := os.Open("main.go")
	if err != nil {
		panic(err)
	}

	response, err := http.Post("http://localhost:18888", "text/plain", file)
	if err != nil {
		log.Println(err)
		return
	}

	defer response.Body.Close()

	log.Println(response.Status)
}
