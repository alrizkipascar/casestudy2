package controllers

import (
	"fmt"
	"strconv"

	"github.com/alrizkipascar/casestudy2/initializers"
	"github.com/alrizkipascar/casestudy2/models"
	"github.com/gin-gonic/gin"
)

func SubTaskCreate(c *gin.Context) {
	//Get data from req body
	var body struct {
		Name   string
		Status int
		// Dateline string
	}

	c.Bind(&body)

	// Parse task id
	task_id := c.Param("id")
	taskID, _ := strconv.ParseInt(task_id, 0, 64)

	// declare model
	var mainTask models.Task

	result := initializers.DB.Find(&mainTask, taskID)
	if result.RowsAffected < 1 {
		c.JSON(400, gin.H{
			"status": "Main Task is Not Exist",
		})

	} else {
		// add data to sub task
		initializers.DB.Model(&mainTask).Association("SubTask").Append([]models.SubTask{
			{Name: body.Name, Status: body.Status, TaskID: taskID},
		})

		// Success Respond
		c.JSON(200, gin.H{
			"message": mainTask,
		})
	}

}

func SubTaskUpdate(c *gin.Context) {
	//Get id
	id := c.Param("subtask_id")

	//Get data from req body
	var body struct {
		Name   string
		Status int
	}
	c.Bind(&body)

	// Find the SubTask
	var subtask models.SubTask
	initializers.DB.First(&subtask, id)

	// update the SubTask
	result := initializers.DB.Model(&subtask).Updates(models.SubTask{
		Name:   body.Name,
		Status: body.Status,
	})

	// Respond
	if result.RowsAffected < 1 {
		c.JSON(400, gin.H{
			"status": "Update Failed",
		})

	} else {
		var count int64
		// Counting subtask with same task ID and status == 0
		initializers.DB.Model(&subtask).Where("task_id = ? AND status = ?", subtask.TaskID, 0).Count(&count)

		// IF data count exist
		if count == 0 {
			var task models.Task

			initializers.DB.Find(&task, subtask.TaskID)
			initializers.DB.Model(&task).Updates(models.Task{
				Status: 1,
			})

		}
		c.JSON(200, gin.H{
			"task": subtask,
		})
	}

}

func SubTaskIndex(c *gin.Context) {
	// Get the tasks
	var subTasks []models.SubTask
	id := c.Param("id")
	i, err := strconv.Atoi(id)
	if err != nil {
		// ... handle error
		fmt.Println(err)
	}

	// create Object map for GORM
	m := make(map[string]interface{})
	m["task_id"] = i

	// Find subtask where task id is the same as Params
	result := initializers.DB.Where(m).Find(&subTasks)
	// Respond
	if result.RowsAffected < 1 {
		c.JSON(200, gin.H{
			"task": nil,
		})

	} else {
		c.JSON(200, gin.H{
			"tasks": subTasks,
		})
	}
}

func SubTaskID(c *gin.Context) {
	// Get id
	id := c.Param("subtask_id")

	// Get the single tasks
	var task models.SubTask
	result := initializers.DB.Find(&task, id)

	// Respond
	if result.RowsAffected < 1 {
		c.JSON(200, gin.H{
			"task": nil,
		})

	} else {
		c.JSON(200, gin.H{
			"task": task,
		})
	}

}

func SubTaskDelete(c *gin.Context) {
	// Get id
	id := c.Param("subtask_id")

	// Delete the tasks
	result := initializers.DB.Delete(&models.SubTask{}, id)
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
