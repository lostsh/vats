package main

import (
	"time"
	"encoding/json"
	//"cmp"
)

type Scan struct{
	Datetime string 			`json:"datetime"`
	FilePath string				`json:"file"`
}

type Index struct{
	Assets map[string][]Scan	`json:"assets"`
}

func (i *Index) addReport(r Report, filePath string){
	var scanUnit = Scan{Datetime: r.Datetime, FilePath: filePath}
	// getting all scan for this target
	var scanUnits []Scan
	_, exist := i.Assets[r.Target]
	if exist{
		// adding curent scan to the existing target
		scanUnits = append(i.Assets[r.Target], scanUnit)
	}else{
		// create new
		scanUnits = []Scan{scanUnit,}
	}
	i.Assets[r.Target] = scanUnits
}

func (i Index) String() string{
	var out string
	out += "Total index entry unknown\n"
	for key, val := range i.Assets{
		out += ("::"+key+"\n")
		for _, u := range val{
			//dt, _ := time.Parse(time.RFC3339, u.Datetime)
			//out += ("\t- Time: "+dt.String()+"\n")
			out += ("\t- Time: "+u.Datetime+"\n")
			out += ("\t- File: ["+u.FilePath+"]\n")
		}
		out += "\n"
	}
	return out
}
/*
//TODO use time.Time type to compare
func CompareAssets(a, b <string>[]Scan) int{
	if len(a) < 1 || len(b) < 1{
		return 0
	}
	da, _ := time.Parse(time.RFC3339, a[0].Datetime)
	db, _ := time.Parse(time.RFC3339, b[0].Datetime)
	if da.Equal(db) {
		return 0
	}
	if da.Before(db) {
		return 1
	}
    return -1
}*/

func CompareScans(a, b Scan) int{
	da, _ := time.Parse(time.RFC3339, a.Datetime)
	db, _ := time.Parse(time.RFC3339, b.Datetime)
	if da.Equal(db) {
		return 0
	}
	if da.Before(db) {
		return 1
	}
    return -1
}

func (i *Index) Serialize() string{
	byteJson, _ := json.Marshal(*i)
	return string(byteJson)
}

func (i *Index) Unserialize(jsonStr string){
	json.Unmarshal([]byte(jsonStr), i)
}