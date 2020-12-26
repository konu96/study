package tinysearch

import (
	"container/list"
	"encoding/json"
	"fmt"
	"sort"
	"strings"
)

type DocumentID int64

type Posting struct {
	DocumentID
	Positions     []int
	TermFrequency int
}

func NewPosting(documentID DocumentID, positions ...int) *Posting {
	return &Posting{documentID, positions, len(positions)}
}

func (p Posting) String() string {
	return fmt.Sprintf("(%v, %v, %v)", p.DocumentID, p.TermFrequency, p.Positions)
}
