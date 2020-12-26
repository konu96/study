package main

import (
  "../../types"
  "../../utility"
  "context"
  "fmt"
  "time"
  "strconv"
)

func main() {
  client, err := utility.GetEsClient()
  if err != nil {
    panic(err)
  }

  ctx := context.Background()

  chatDatas := []types.Chat{
    {
      User: "user01",
      Message: "Elastic Search 難しいな",
      Created: time.Now(),
      Tag: "勉強",
    },
    {
      User: "user02",
      Message: "精神的に最近辛いな",
      Created: time.Now(),
      Tag: "生活",
    },
    {
      User: "user03",
      Message: "TypeScript 勉強しないといけないなぁーー",
      Created: time.Now(),
      Tag: "勉強",
    },
    {
      User: "user04",
      Message: "夏休みが終わってしまう",
      Created: time.Now(),
      Tag: "学校",
    },
    {
      User: "user05",
      Message: "ライブ行きたすぎる",
      Created: time.Now(),
      Tag: "趣味",
    },
  }
  indexService := client.Index().Index("chat")

  for index, chat := range chatDatas {
    // Type は deprecated だが、 ES6 では必要
    _, err = indexService.Type("chat").Id(strconv.Itoa(index)).BodyJson(&chat).Do(ctx)
    if err != nil {
      fmt.Printf("Error: can not create document (%v)", err)
    }
  }
}


