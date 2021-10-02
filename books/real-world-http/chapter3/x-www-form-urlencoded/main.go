package main

import (
	"log"
	"net/http"
	"net/url"
)

func main() {
	values := url.Values{
		"query": {
			"aaaaaaaaa",
		},
	}

	response, err := http.PostForm("http://localhost:18888", values)
	if err != nil {
		log.Println(err)
		return
	}

	defer response.Body.Close()

	log.Println(response)
}
