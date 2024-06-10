package main

import (
	"time"
	"encoding/json"
	"cmp"
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

func CompareAssets(a, b Scan) int{
	if len(a.Scans) < 1 || len(b.Scans) < 1{
		return 0
	}
    return cmp.Compare(a.Scans[0].Datetime, b.Scans[0].Datetime)
}
func CompareScanUnit(a, b Scan_Unit) int{
	return cmp.Compare(a.Datetime, b.Datetime)
}

func (i *Index) Serialize() string{
	byteJson, _ := json.Marshal(*i)
	return string(byteJson)
}

func (i *Index) Unserialize(jsonStr string){
	json.Unmarshal([]byte(jsonStr), i)
}