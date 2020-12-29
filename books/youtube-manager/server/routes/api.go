package routes

import (
	"github.com/konu96/youtube-manager-go/middlewares"
	"github.com/konu96/youtube-manager-go/web/api"
	"github.com/labstack/echo"
)

func Init(e *echo.Echo) {
	g := e.Group("/api")
	{
		g.GET("/popular", api.FetchMostPopularVideos())
		g.GET("/video/:id", api.GetVideo(), middlewares.FirebaseAuth())
		g.GET("/related/:id", api.FetchRelatedVideos())
		g.GET("/search", api.SearchVideos())
	}

	favoriteGroup := g.Group("/favorite", middlewares.FirebaseGuard())
	{
		favoriteGroup.POST("/:id/toggle", api.ToggleFavoriteVideo())
	}
}
