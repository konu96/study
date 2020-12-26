package main

import (
	"../../types"
	"../../utility"
	"context"
	"fmt"
	"reflect"

	"github.com/olivere/elastic"
)

func main() {
	client, err := utility.GetEsClient()
	if err != nil {
		panic(err)
	}

	ctx := context.Background()
	matchQuery := elastic.NewTermQuery("message", "勉強")
	results, err := client.Scroll("chat").Query(matchQuery).Do(ctx)
	if err != nil {
		panic(err)
	}

	var chatType types.Chat
	for _, chat := range results.Each(reflect.TypeOf(chatType)) {
		if c, ok := chat.(types.Chat); ok {
			fmt.Printf("Message: %s and Chat message is : %s\n", c.Tag, c.Message)
		}
	}

	nextResults, err := client.Scroll("chat").Query(matchQuery).Size(1).ScrollId(results.ScrollId).Do(ctx)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
	}

	for _, chat := range nextResults.Each(reflect.TypeOf(chatType)) {
		if c, ok := chat.(types.Chat); ok {
			fmt.Printf("Scrolled message is: %s\n", c.Message)
		}
	}
}
