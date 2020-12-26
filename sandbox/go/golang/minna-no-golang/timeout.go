package main

import (
	"context"
	"io"
	"net/http"
	"time"
)

func getHTTP(url string, destination io.Writer) error {
	client := &http.Client{
		// 10秒でタイムアウトする
		Timeout: 10 * time.Second,
	}

	request, _ := http.NewRequest("GET", url, nil)
	response, err := client.Do(request)
	if err != nil {
		// レスポンスヘッダの取得に10秒経過したらエラーを返す
		return err
	}

	defer response.Body.Close()

	_, err = io.Copy(destination, response.Body)

	// レスポンスボディの取得に10秒経過したらエラーを返す
	return err
}

func getHTTPWithContext(url string, destination io.Writer) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client := &http.Client{}
	request, _ := http.NewRequest("GET", url, nil)

	response, err := client.Do(request.WithContext(ctx))
	if err != nil {
		// レスポンスヘッダの取得に10秒経過したらエラーを返す
		return err
	}

	defer response.Body.Close()

	_, err = io.Copy(destination, response.Body)
	return err
}
