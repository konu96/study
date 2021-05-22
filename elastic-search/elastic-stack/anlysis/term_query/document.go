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
	termQuery := elastic.NewTermQuery("tag", "生活")
	results, err := client.Search().Index("chat").Type("chat").Query(termQuery).Do(ctx)
	if err != nil {
		panic(err)
	}

	var chatType types.Chat
	for _, chat := range results.Each(reflect.TypeOf(chatType)) {
		if c, ok := chat.(types.Chat); ok {
			fmt.Printf("Tag: %s and Chat message is : %s\n", c.Tag, c.Message)
		}
	}
}
