package utility

import "gopkg.in/olivere/elastic.v6"

func GetEsClient() (*elastic.Client, error) {
  esURL := "http://localhost:9200"
  client, err := elastic.NewClient(
    elastic.SetURL(esURL),
    elastic.SetSniff(false),
  )

  if err != nil {
    return nil, err
  }

  return client, nil
}
