package main

import (
	"github.com/alrizkipascar/casestudy2/initializers"
	"github.com/alrizkipascar/casestudy2/models"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectDB()
}

func main() {
	// initializers.DB.AutoMigrate(&models.Post{})
	initializers.DB.AutoMigrate(&models.Task{})
	initializers.DB.AutoMigrate(&models.SubTask{})
}
