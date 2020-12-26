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
	)
	if err != nil {
		panic(err)
	}

	deletedDocument, err := client.Delete().Index("chat").Type("chat").Id("1").Do(ctx)
	if err != nil {
		panic(err)
	}

	fmt.Println(deletedDocument.Result)
}
