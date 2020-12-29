package main

import (
	"io"
	"log"
	"net/http"
	"os"
	"path"
	"path/filepath"
)

func main() {
	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if ok, err := path.Match("/data/*.txt", r.URL.Path); err != nil || !ok {
			http.NotFound(w, r)
			return
		}

		name := filepath.Join(cwd, "data", filepath.Base(r.URL.Path))
		file, err := os.Open(name)
		if err != nil {
			http.NotFound(w, r)
			return
		}

		defer file.Close()
		io.Copy(w, file)
	})

	http.ListenAndServe(":8080", nil)
}
