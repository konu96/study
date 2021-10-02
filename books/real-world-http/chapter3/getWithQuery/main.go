package main

import (
	"io/ioutil"
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

	response, err := http.Get("http://localhost:18888?" + values.Encode())
	if err != nil {
		log.Println(err)
		return
	}

	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	log.Println(string(body))
}
