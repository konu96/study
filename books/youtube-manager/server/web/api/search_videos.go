package api

import (
	"fmt"
	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
	"github.com/valyala/fasthttp"
	"google.golang.org/api/youtube/v3"
)

func SearchVideos() echo.HandlerFunc {
	return func(c echo.Context) error {
		youtubeService := c.Get("youtubeService").(*youtube.Service)
		query := c.QueryParam("q")

		fmt.Println(query)

		call := youtubeService.Search.List("id,snippet").Q(query).MaxResults(3)
		page := c.QueryParam("page")
		if len(page) > 0 {
			call = call.PageToken(page)
		}

		response, err := call.Do()
		if err != nil {
			logrus.Fatalf("Error calling Youtube API: %v", err)
		}

		return c.JSON(fasthttp.StatusOK, response)
	}
}
