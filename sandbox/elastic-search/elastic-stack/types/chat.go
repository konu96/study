package types

import "time"

type Chat struct {
  User string `json:"user"`
  Message string `json:"message"`
  Created time.Time `json:"created"`
  Tag string `json:"tag"`
}
