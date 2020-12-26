package middlewares

import (
	"github.com/jinzhu/gorm"
	"github.com/konu96/youtube-manager-go/databases"
	"github.com/labstack/echo"
)

type DatabaseClient struct {
	DB *gorm.DB
}

func DatabaseService() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			session, _ := databases.Connect()
			d := DatabaseClient{
				DB: session,
			}

			defer d.DB.Close()

			d.DB.LogMode(true)
			c.Set("databases", &d)

			if err := next(c); err != nil {
				return err
			}

			return nil
		}
	}
}
