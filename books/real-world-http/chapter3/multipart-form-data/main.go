package main

import (
	"bytes"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"os"
)

func main() {
	var buffer bytes.Buffer
	writer := multipart.NewWriter(&buffer)
	writer.WriteField("name", "konu96")

	fileWriter, err := writer.CreateFormFile("thumbnail", "photo.jpg")
	if err != nil {
		log.Println(err)
		return
	}

	readFile, err := os.Open("photo.jpg")
	if err != nil {
		log.Println(err)
		return
	}

	defer readFile.Close()
	io.Copy(fileWriter, readFile)
	writer.Close()

	response, err := http.Post("http://localhost:18888", writer.FormDataContentType(), &buffer)
	if err != nil {
		log.Println(err)
		return
	}

	log.Println(response)
}
