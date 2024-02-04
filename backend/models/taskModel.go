package models

import (
	"time"

	"gorm.io/gorm"
)

type Task struct {
	gorm.Model
	Name     string
	Status   int
	Dateline time.Time `sql:"type:timestamp without time zone"`
	SubTask  []SubTask
}

// `gorm:"foreignkey:TaskID;references:id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
