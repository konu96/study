package main

import (
	"./types"
	"context"
	"fmt"
	"time"

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

	chatData := types.Chat{
		User:    "user01",
		Message: "test message",
		Created: time.Now(),
		Tag:     "tag01",
	}

	indexedDocument, err := client.Index().Index("chat").Type("chat").Id("1").BodyJson(&chatData).Do(ctx)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Index/Type: %s%s へドキュメント(ID: %s)が登録されました。\n", indexedDocument.Index, indexedDocument.Type, indexedDocument.Id)
}
