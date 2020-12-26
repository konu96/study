package tinysearch

import (
	"container/list"
	"encoding/json"
	"fmt"
	"sort"
	"strings"
)

type Index struct {
	Dictionary         map[string]PostingList
	TotalDocumentCount int
}

func NewIndex() *Index {
	dictionary := make(map[string]PostingList)
	return &Index{
		Dictionary:         dictionary,
		TotalDocumentCount: 0,
	}
}

func (idx Index) String() string {
	var padding int
	keys := make([]string, 0, len(idx.Dictionary))
	for key := range idx.Dictionary {
		l := utf8.RuneCountInString(key)
		if padding < l {
			padding = l
		}
		keys = append(keys, key)
	}

	sort.Strings(keys)
	strs := make([]string, len(keys))
	format := " [%-" + strconv.Itoa(padding) + "s] -> %s"
	for i, key := range keys {
		if postingList, ok := idx.Dictionary[key]; ok {
			strs[i] = fmt.Sprintf(format, key, postingList.String())
		}
	}
	return fmt.Sprintf("total documents : %v\ndictionary:\n%v\n", idx.TotalDocsCount, strings.Join(strs, "\n"))
}
