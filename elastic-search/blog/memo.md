# Elastic Search の勉強メモ

Elastic Search と RDB では使う単語が違うが、次のような単語がそれぞれ近い。

| ES | RDB |
| :-: | :-: |
| index | DB |
| Type | | table |
| Document | record |


## CRUD アプリケーション

**Document の作成**

```
PUT /library/_doc/1
{
  "title": "Norwegian Wood",
  "name": {
    "first": "Haruki",
    "last": "Murakami"
  },
  "publish_date": "1987-09-04T00:00:00+0900",
  "price": 19.95
}
```

一行目のフォーマットは `/indexName/typeName/documentId` として JSON を渡す。

上記 PUT のレスポンスは次のようになる。

```
{
  "_index" : "library",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 0,
  "_primary_term" : 1
}
```

Document ID を指定しないで作成するには、 `POST` を使う。

- リクエスト

```
POST /library/_doc/
{
  "title": "Kafka on the Shore",
  "name": {
    "first": "Haruki",
    "last": "Murakami"
  },
  "publish_date": "2002-09-12T00:00:00+0900",
  "price": 19.95
}
```

- レスポンス

```
{
  "_index" : "library",
  "_type" : "_doc",
  "_id" : "q2aZVmoBFWFSqRl8nY0k",
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 23,
  "_primary_term" : 1
}
```

**Document の取得**

- リクエスト

```
GET /library/_doc/1
```

- レスポンス

```
{
  "_index" : "library",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 1,
  "_seq_no" : 0,
  "_primary_term" : 1,
  "found" : true,
  "_source" : {
    "title" : "Norwegian Wood",
    "name" : {
      "first" : "Haruki",
      "last" : "Murakami"
    },
    "publish_date" : "1987-09-04T00:00:00+0900",
    "price" : 19.95
  }
}
```

**Document の更新**

Document の更新は、 `PUT /indexName/typeName/DocumentId` でできるので割愛

**Document の部分更新**

`POST /indexName/_update/documentId` で JSON の key に `doc` を指定することで、部分的に更新できる。

- リクエスト

```
POST /library/_update/1
{
  "doc": {
    "price": 10
  }
}
```

- レスポンス

```
{
  "_index" : "library",
  "_type" : "_doc",
  "_id" : "q2aZVmoBFWFSqRl8nY0k",
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 23,
  "_primary_term" : 1
}
```

**Document に項目を追加**

「Document の部分更新」と方法が同じなので割愛

**Document の削除**

- リクエスト

```
DELETE /library/_doc/1
```

- レスポンス

```
{
  "_index" : "library",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 3,
  "result" : "deleted",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 2,
  "_primary_term" : 1
}
```

**Document の検索**

検索するために、取り敢えず適当な Document を作成する。

- リクエスト

```
POST /library/_bulk
{"index": {"_id": 1}}
{"title": "The quick brown fox", "price": 5}
{"index": {"_id": 2}}
{"title": "The quick brown fox jumps over the lazy dog", "price": 15}
{"index": {"_id": 3}}
{"title": "The quick brown fox jumps over the quick dog", "price": 8}
{"index": {"_id": 4}}
{"title": "Brown fox and brown dog", "price": 2}
```

- レスポンス

```
{
  "took" : 215,
  "errors" : false,
  "items" : [
    {
      "index" : {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "1",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 0,
        "_primary_term" : 1,
        "status" : 201
      }
    },
    {
      "index" : {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "2",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 1,
        "_primary_term" : 1,
        "status" : 201
      }
    },
    {
      "index" : {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "3",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 2,
        "_primary_term" : 1,
        "status" : 201
      }
    },
    {
      "index" : {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "4",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 3,
        "_primary_term" : 1,
        "status" : 201
      }
    }
  ]
}
```

検索には、 `GET /indexName/_search` でできる。

```
{
  "took" : 2,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 4,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "1",
        "_score" : 1.0,
        "_source" : {
          "title" : "The quick brown fox",
          "price" : 5
        }
      },
      {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "2",
        "_score" : 1.0,
        "_source" : {
          "title" : "The quick brown fox jumps over the lazy dog",
          "price" : 15
        }
      },
      {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "3",
        "_score" : 1.0,
        "_source" : {
          "title" : "The quick brown fox jumps over the quick dog",
          "price" : 8
        }
      },
      {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "4",
        "_score" : 1.0,
        "_source" : {
          "title" : "Brown fox and brown dog",
          "price" : 2
        }
      }
    ]
  }
}
```

**指定した単語を含む Document を検索**

指定した単語で検索するためには、 `GET /library/_search` に JSONで `match` クエリを指定する。

- リクエスト

```
GET /library/_search
{
  "query": {
    "match": {
      "title": "fox"
    }
  }
}
```

- レスポンス

```
{
  "took" : 6,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 4,
      "relation" : "eq"
    },
    "max_score" : 0.12643263,
    "hits" : [
      {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "1",
        "_score" : 0.12643263,
        "_source" : {
          "title" : "The quick brown fox",
          "price" : 5
        }
      },
      {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "4",
        "_score" : 0.117860906,
        "_source" : {
          "title" : "Brown fox and brown dog",
          "price" : 2
        }
      },
      {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "2",
        "_score" : 0.09271725,
        "_source" : {
          "title" : "The quick brown fox jumps over the lazy dog",
          "price" : 15
        }
      },
      {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "3",
        "_score" : 0.09271725,
        "_source" : {
          "title" : "The quick brown fox jumps over the quick dog",
          "price" : 8
        }
      }
    ]
  }
}
```

OR 条件で検索するときは、渡す文字列を空白区切りにすれば良い。

```
GET /library/_search
{
  "query": {
    "match": {
      "title": "quick dog"
    }
  }
}
```

ただ、これだと空白を含む文字列を検索できない。空白を含む文字列を検索するときは `match` の代わりに `match_phrase` を使う。

```
GET /library/_search
{
  "query": {
    "match_phrase": {
      "title": "quick dog"
    }
  }
}
```

**AND 条件で Document を検索**

AND 条件で検索をするときは、 `bool` クエリを指定する。

- リクエスト

```
GET /library/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "title": "quick"
          }
        },
        {
          "match_phrase": {
            "title": "lazy dog"
          }
        }
      ]
    }
  }
}
```

- レスポンス


```
{
  "took" : 0,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 1.687244,
    "hits" : [
      {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "2",
        "_score" : 1.687244,
        "_source" : {
          "title" : "The quick brown fox jumps over the lazy dog",
          "price" : 15
        }
      }
    ]
  }
}
```

**Document の検索結果に重み付けをする**

特定の検索結果に対して、重み付けをすることができます。次のリクエストは、 `quick dog` が含まれる結果のスコアが半分になります。

```
GET /library/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "match_phrase": {
            "title": {
              "query": "quick dog",
              "boost": 0.5
            }
          }
        },
        {
          "match_phrase": {
            "title": {
              "query": "lazy dog"
            }
          }
        }
      ]
    }
  }
}
```

- レスポンス

```
{
  "took" : 7,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 2,
      "relation" : "eq"
    },
    "max_score" : 1.37337,
    "hits" : [
      {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "2",
        "_score" : 1.37337,
        "_source" : {
          "title" : "The quick brown fox jumps over the lazy dog",
          "price" : 15
        }
      },
      {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "3",
        "_score" : 0.31387398,
        "_source" : {
          "title" : "The quick brown fox jumps over the quick dog",
          "price" : 8
        }
      }
    ]
  }
}
```

**フィルタリングして検索する**

`filter` クエリを使うことで、フィルタリング検索ができる。

- リクエスト

```
GET /library/_search
{
  "query": {
    "bool": {
      "filter": {
        "range": {
          "price": {
            "gte": 5,
            "lte": 10
          }
        }
      }
    }
  }
}
```

- レスポンス

```
{
  "took" : 2,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 2,
      "relation" : "eq"
    },
    "max_score" : 0.0,
    "hits" : [
      {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "1",
        "_score" : 0.0,
        "_source" : {
          "title" : "The quick brown fox",
          "price" : 5
        }
      },
      {
        "_index" : "library",
        "_type" : "_doc",
        "_id" : "3",
        "_score" : 0.0,
        "_source" : {
          "title" : "The quick brown fox jumps over the quick dog",
          "price" : 8
        }
      }
    ]
  }
}

```
