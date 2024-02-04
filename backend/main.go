package main

import (
	"github.com/alrizkipascar/casestudy2/controllers"
	"github.com/alrizkipascar/casestudy2/initializers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectDB()
}

func main() {

	r := gin.Default()
	config := cors.DefaultConfig()
	config.AddAllowHeaders("Authorization")
	config.AllowCredentials = true
	config.AllowAllOrigins = false
	config.AllowMethods = []string{"PUT", "POST", "GET", "OPTIONS", "DELETE"}
	// I think you should whitelist a limited origins instead:
	//  config.AllowAllOrigins = []{"xxxx", "xxxx"}
	config.AllowOriginFunc = func(origin string) bool {
		return true
	}
	r.Use(cors.New(config))
	// r.Use(cors.New(cors.Config{
	// 	// AllowOrigins:    []string{"http://localhost:3000", "http://127.0.0.1:3000"},
	// 	AllowMethods:    []string{"PUT", "POST", "GET", "OPTIONS", "DELETE"},
	// 	AllowHeaders:    []string{"Origin"},
	// 	AllowAllOrigins: true,
	// 	//ExposeHeaders:    []string{"Content-Length"},
	// 	AllowCredentials: true,
	// 	MaxAge:           12 * time.Hour,
	// }))
	// r.GET("/", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{
	// 		"message": "pingpong",
	// 	})
	// })

	// ===================TASK=======================

	r.GET("/tasks", controllers.TaskIndex)
	r.GET("/tasks/status/:status", controllers.TaskStatus)
	r.GET("/tasks/:id", controllers.TaskID)
	r.POST("/tasks/create", controllers.TaskCreate)
	r.PUT("/tasks/:id", controllers.TaskUpdate)
	r.DELETE("/tasks/:id", controllers.TaskDelete)

	// ===================SUB TASK=======================

	r.GET("/tasks/:id/subtask", controllers.SubTaskIndex)
	r.GET("/tasks/:id/subtask/:subtask_id", controllers.SubTaskID)
	r.POST("/tasks/:id/subtask/create", controllers.SubTaskCreate)
	r.PUT("/tasks/:id/subtask/:subtask_id", controllers.SubTaskUpdate)
	r.DELETE("/tasks/:id/subtask/:subtask_id", controllers.SubTaskDelete)

	// RUN
	r.Run() // listen and serve on 0.0.0.0:8080
}
