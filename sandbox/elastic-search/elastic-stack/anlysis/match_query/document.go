package main

import (
	"../../types"
	"../../utility"
	"context"
	"fmt"
	"reflect"

	"gopkg.in/olivere/elastic.v6"
)

func main() {
	client, err := utility.GetEsClient()
	if err != nil {
		panic(err)
	}

	ctx := context.Background()
	query := elastic.NewMatchQuery("message", "精神的")
	results, err := client.Search().Index("chat").Query(query).Do(ctx)
	if err != nil {
		panic(err)
	}

	var chatType types.Chat
	for _, chat := range results.Each(reflect.TypeOf(chatType)) {
		if c, ok := chat.(types.Chat); ok {
			fmt.Printf("Chat message is %s\n", c.Message)
		}
	}
}