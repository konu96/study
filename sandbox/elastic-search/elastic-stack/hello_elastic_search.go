package main

import (
	"context"
	"fmt"

	"gopkg.in/olivere/elastic.v6"
)

func main() {
	esURL := "http://localhost:9200"
	ctx := context.Background()

	client, err := elastic.NewClient(
		elastic.SetURL(esURL),
		elastic.SetSniff(false),
	)

	if err != nil {
		panic(err)
	}

	info, _, err := client.Ping(esURL).Do(ctx)
	if err != nil {
		fmt.Printf("message: %v", err)
	}

	fmt.Printf("Elasticsearch version %s\n", info.Version.Number)
}
