package middlewares

import (
	"context"
	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
	"google.golang.org/api/option"
	"google.golang.org/api/youtube/v3"
	"os"
)

func YoutubeService() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			key := os.Getenv("YOUTUBE_API")

			ctx := context.Background()
			youtubeService, err := youtube.NewService(ctx, option.WithAPIKey(key))
			if err != nil {
				logrus.Fatalf("Error creating new Youtube service: %v", err)
			}

			c.Set("youtubeService", youtubeService)

			if err := next(c); err != nil {
				return err
			}

			return nil
		}
	}
}
