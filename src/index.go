package main

import (
	"time"
)

type Scan_Unit struct{
	Datetime time.Time
	FilePath string
}

type Scan struct{
	Target string
	ScanUnit []Scan_Unit
}

type Index struct{
	Index []Scan
}