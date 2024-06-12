package main

import (
	"time"
	"encoding/json"
	//"cmp"
)

type Scan_Unit struct{
	Datetime string 		`json:"datetime"`
	FilePath string			`json:"file"`
}
type Scan struct{
	Target string			`json:"target"`
	Scans []Scan_Unit		`json:"scans"`
}
type Index struct{
	Assets []Scan			`json:"assets"`
}

func (i *Index) addReport(r Report, filePath string){
	var scanUnit = Scan_Unit{Datetime: r.Datetime, FilePath: filePath}
	// getting all scan for this target
	var scanUnits = []Scan_Unit{scanUnit,}
	// adding curent scan to the existing target
	// if already exit
	// if new
	var scan = Scan{Target: r.Target, Scans: scanUnits}
	i.Assets = append(i.Assets, scan)
}

func (i Index) String() string{
	var out string
	out += "Total index entry unknown\n"
	for _, e := range i.Assets{
		out += ("::"+e.Target+"\n")
		for _, u := range e.Scans{
			dt, _ := time.Parse(time.RFC3339, u.Datetime)
			out += ("\t- Time: "+dt.String()+"\n")
			out += ("\t- File: ["+u.FilePath+"]\n")
		}
		out += "\n"
	}
	return out
}
//TODO use time.Time type to compare
func CompareAssets(a, b Scan) int{
	if len(a.Scans) < 1 || len(b.Scans) < 1{
		return 0
	}
	da, _ := time.Parse(time.RFC3339, a.Scans[0].Datetime)
	db, _ := time.Parse(time.RFC3339, b.Scans[0].Datetime)
	if da.Equal(db) {
		return 0
	}
	if da.Before(db) {
		return 1
	}
    return -1
}
/*
func CompareScanUnit(a, b Scan_Unit) int{
	return cmp.Compare(a.Datetime, b.Datetime)
}*/
func CompareScanUnit(a, b Scan_Unit) int{
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