package models

import (
	"gorm.io/gorm"
)

type SubTask struct {
	gorm.Model
	TaskID int64
	Name   string
	Status int

	// Task   Task `gorm:"foreignkey:TaskID;references:id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	// User   User   `gorm:"foreignkey:UserId;references:Id"`
	// UserId string
	// Task   Task `gorm:"foreignKey:CompanyRefer"`
	// use CompanyRefer as foreign key
}
