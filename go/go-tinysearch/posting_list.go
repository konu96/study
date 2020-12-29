package tinysearch

import (
	"container/list"
	"encoding/json"
	"fmt"
	"sort"
	"strings"
)

type PostingList struct {
	*list.List
}

func NewPostingList(postings ...*Posting) PostingList {
	l := list.New()
	for _, posting := range postings {
		l.PushBack(posting)
	}

	return PostingList{l}
}

func (pl PostingList) add(p *Posting) {
	pl.PushBack(p)
}

func (pl PostingList) last() *Posting {
	element := pl.List.Back()
	if element == nil {
		return nil
	}

	return element.Value.(*Posting)
}

func (pl PostingList) Add(newElement *Posting) {
	last := pl.last()
	if last == nil || last.DocumentID != newElement.DocumentID {
		pl.add(newElement)
		return
	}

	last.Positions = append(last.Positions, newElement.Positions...)
	last.TermFrequency++
}

func (pl PostingList) String() string {
	str := make([]string, 0, pl.Len())
	for element := pl.Front(); element != nil; element = element.Next() {
		str = append(str, elment.Value.(*Posting).String())
	}

	return strings.Json(str, "=>")
}
