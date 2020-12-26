package main

import (
	"fmt"
	"net/http"

	"api/logger"
)

func main() {
	mux := http.NewServeMux()
	mux.Handle("/", http.HandlerFunc(hello))
	http.ListenAndServe(":8080", mux)
}

func hello(w http.ResponseWriter, r *http.Request) {
	message := "Hello Elastic Stack"

	logger.Info(message)
	w.WriteHeader(http.StatusOK)

	fmt.Fprintf(w, message)
}
