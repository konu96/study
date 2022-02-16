package main

import (
	"crypto/sha256"
	"fmt"
	"io"
	"io/ioutil"
	"os"
)

func main() {
	tmp, _ := ioutil.TempFile(os.TempDir(), "tmp")
	defer tmp.Close()

	hash := sha256.New()

	writers := io.MultiWriter(tmp, hash)
	written, _ := io.Copy(writers, os.Stdin)

	fmt.Printf("Wrote %d bytes to %s\n SHA256: %x\n", written, tmp.Name(), hash.Sum(nil))
}
