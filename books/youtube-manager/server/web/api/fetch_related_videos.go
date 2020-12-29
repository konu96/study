package api

import (
	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
	"github.com/valyala/fasthttp"
	"google.golang.org/api/youtube/v3"
)

func FetchRelatedVideos() echo.HandlerFunc {
	return func(c echo.Context) error {
		youtubeService := c.Get("youtubeService").(*youtube.Service)
		videoId := c.Param("id")

		call := youtubeService.Search.List("id,snippet").RelatedToVideoId(videoId).Type("video").MaxResults(3)
		response, err := call.Do()
		if err != nil {
			logrus.Fatalf("Error calling Youtube API: %v", err)
		}

		return c.JSON(fasthttp.StatusOK, response)
	}
}
