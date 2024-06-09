package main 

import (
	"time"
	"encoding/json"
)

type Report struct{
	Target string
	Datetime time.Time
	Vulnerabilities []Vuln
}

func (r Report) Serialize() string{
	byteJson, _ := json.Marshal(r)
	return string(byteJson)
}

func Unserialize(jsonStr string) Report{
	var report Report
	json.Unmarshal([]byte(jsonStr), &report)
	return report
}