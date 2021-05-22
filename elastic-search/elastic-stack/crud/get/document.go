package main

import (
	"../types"
	"context"
	"encoding/json"
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

	document, err := client.Get().Index("chat").Type("chat").Id("1").Do(ctx)
	if err != nil {
		panic(err)
	}

	if document.Found {
		var chat types.Chat
		err := json.Unmarshal(document.Source, &chat)
		if err != nil {
			fmt.Println(err)
		}

		fmt.Printf("Message: <%s> created by %s\n", chat.Message, chat.User)
	}

}
