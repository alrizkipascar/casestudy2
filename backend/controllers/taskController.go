package controllers

import (
	"strconv"
	"time"

	"github.com/alrizkipascar/casestudy2/initializers"
	"github.com/alrizkipascar/casestudy2/models"
	"github.com/gin-gonic/gin"
)

func TaskCreate(c *gin.Context) {
	// Get data off req body

	var body struct {
		Name     string
		Status   int
		Dateline string
	}
	c.Bind(&body)

	// Format Date as timestamp without time zone
	formattedDate, err := time.Parse(time.RFC3339, body.Dateline)
	if err != nil {
		c.JSON(400, gin.H{
			"body":   body,
			"data":   formattedDate,
			"status": "date time not accepted",
		})
		return
	}

	// Create a task
	task := models.Task{Name: body.Name, Status: body.Status, Dateline: formattedDate}

	result := initializers.DB.Create(&task) // pass pointer of data to Create

	//error check
	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(200, gin.H{
		"message": task,
	})
}

func TaskIndex(c *gin.Context) {
	// Get the tasks
	var tasks []models.Task
	result := initializers.DB.Find(&tasks)
	// Respond
	if result.RowsAffected < 1 {
		c.JSON(200, gin.H{
			"task": nil,
		})

	} else {
		c.JSON(200, gin.H{
			"tasks": tasks,
		})
	}

}

func TaskStatus(c *gin.Context) {
	// Get the tasks

	status := c.Param("status")
	i, err := strconv.Atoi(status)
	if err != nil {
		// ... handle error
		panic(err)
	}

	// create object for gorm
	m := make(map[string]interface{})
	m["status"] = i

	// declare model and search where status = param status
	var tasks []models.Task
	result := initializers.DB.Where(m).Find(&tasks)

	// Respond
	if result.RowsAffected < 1 {
		c.JSON(200, gin.H{
			"task": nil,
		})

	} else {
		c.JSON(200, gin.H{
			"tasks": tasks,
		})
	}

}

func TaskID(c *gin.Context) {
	// Get id
	id := c.Param("id")

	// Get the single tasks
	var task models.Task
	initializers.DB.Find(&task, id)

	// Respond
	c.JSON(200, gin.H{
		"task": task,
	})
}

func TaskUpdate(c *gin.Context) {
	//Get id
	id := c.Param("id")

	//Get data from req body
	var body struct {
		Name     string
		Status   int
		Dateline string
	}
	c.Bind(&body)

	// Format date to timestamp without time zone
	formattedDate, err := time.Parse(time.RFC3339, body.Dateline)
	if err != nil {
		c.JSON(400, gin.H{
			"body":   body,
			"data":   formattedDate,
			"status": "date time not accepted",
		})
		return
	}

	// Find the Task
	var task models.Task
	initializers.DB.First(&task, id)

	// update the Task
	result := initializers.DB.Model(&task).Updates(models.Task{
		Name:     body.Name,
		Status:   body.Status,
		Dateline: formattedDate,
	})

	// Respond

	if result.RowsAffected < 1 {
		c.JSON(400, gin.H{
			"status": "Update Failed",
		})

	} else {
		c.JSON(200, gin.H{
			"task": task,
		})
	}

}

func TaskDelete(c *gin.Context) {
	// Get id
	id := c.Param("id")

	// Delete the tasks
	result := initializers.DB.Delete(&models.Task{}, id)
	// Respond
	if result.RowsAffected < 1 {
		c.JSON(400, gin.H{
			"status": "0 rows deleted",
		})
	} else if result.Error == nil {
		c.JSON(200, gin.H{
			"status": "record deleted",
		})
	}

}
