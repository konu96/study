package api

import (
	"firebase.google.com/go/auth"
	"github.com/konu96/youtube-manager-go/middlewares"
	"github.com/konu96/youtube-manager-go/models"
	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
	"github.com/valyala/fasthttp"
	"google.golang.org/api/youtube/v3"
)

type VideoResponse struct {
	VideoList  *youtube.VideoListResponse `json:"video_list"`
	IsFavorite bool                       `json:"is_favorite"`
}

func GetVideo() echo.HandlerFunc {
	return func(c echo.Context) error {
		youtubeService := c.Get("youtubeService").(*youtube.Service)
		databases := c.Get("databases").(*middlewares.DatabaseClient)
		token := c.Get("auth").(*auth.Token)
		videoID := c.Param("id")

		isFavorite := false
		if token != nil {
			favorite := models.Favorite{}
			isFavoriteNotFound := databases.DB.Table("favorites").Joins("INNER JOIN users ON users.id = favorites.user_id").Where(models.User{UID: token.UID}).Where(models.Favorite{VideoID: videoID}).First(&favorite).RecordNotFound()
			logrus.Debug("isFavoriteNotFound: ", isFavoriteNotFound)

			if !isFavoriteNotFound {
				isFavoriteNotFound = true
			}
		}

		call := youtubeService.Videos.List("id,snippet").Id(videoID)
		response, err := call.Do()
		if err != nil {
			logrus.Fatalf("Error calling Youtube API: %v", err)
		}

		v := VideoResponse{
			VideoList:  response,
			IsFavorite: isFavorite,
		}

		return c.JSON(fasthttp.StatusOK, v)
	}
}
