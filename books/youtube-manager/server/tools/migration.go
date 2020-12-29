package main

import (
	"github.com/konu96/youtube-manager-go/databases"
	"github.com/konu96/youtube-manager-go/models"
	"github.com/sirupsen/logrus"
)

func main() {
	db, err := databases.Connect()
	if err != nil {
		logrus.Fatal(err)
	}

	defer db.Close()

	db.Debug().AutoMigrate(&models.User{})
	db.Debug().AutoMigrate(&models.Favorite{})
}
