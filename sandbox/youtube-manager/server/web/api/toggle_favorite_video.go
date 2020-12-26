package api

import (
	"firebase.google.com/go/auth"
	"github.com/konu96/youtube-manager-go/middlewares"
	"github.com/konu96/youtube-manager-go/models"
	"github.com/labstack/echo"
	"github.com/valyala/fasthttp"
)

type ToggleFavoriteVideoResponse struct {
	VideoID    string `json:"video_id"`
	IsFavorite bool   `json:"is_favorite"`
}

func ToggleFavoriteVideo() echo.HandlerFunc {
	return func(c echo.Context) error {
		databases := c.Get("databases").(*middlewares.DatabaseClient)
		videoID := c.Param("id")
		token := c.Get("auth").(*auth.Token)

		user := models.User{}
		if databases.DB.Table("users").Where(models.User{UID: token.UID}).First(&user).RecordNotFound() {
			user = models.User{UID: token.UID}
			databases.DB.Create(&user)
		}

		favorite := models.Favorite{}
		isFavorite := false
		if databases.DB.Table("favorites").Where(models.Favorite{UserID: user.ID, VideoID: videoID}).First(&favorite).RecordNotFound() {
			favorite = models.Favorite{
				UserID:  user.ID,
				VideoID: videoID,
			}
			databases.DB.Create(&favorite)
			isFavorite = true
		} else {
			databases.DB.Delete(&favorite)
		}

		response := ToggleFavoriteVideoResponse{
			VideoID:    videoID,
			IsFavorite: isFavorite,
		}

		return c.JSON(fasthttp.StatusOK, response)
	}
}
