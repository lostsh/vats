package main
import (
	"slices"
	"path/filepath"
	"regexp"
)

func (index *Index) SortIndex(){
	//Unserializer(filePath, index)
	// sorting all scan files for each target
	for _, val := range index.Assets{
		slices.SortFunc(val, CompareScans)
	}
	//TODO sorting targets by last scan date
	//slices.SortFunc(index.Assets, CompareAssets)
}


func (r *Report) TargetToFileName() string{
	regex := regexp.MustCompile("[\\W]")
	n := regex.ReplaceAllString(r.Target, "_")
	n += ("_"+regex.ReplaceAllString(r.Datetime, ""))
	return (n+".json")
}

func (index *Index) ImportScanReport(importFilePath string, storageDirectory string){
	// getting report data
	var report Report
	Unserializer(importFilePath, &report)

	// creating and storing report file
	fileName := report.TargetToFileName()
	storeFilePath := filepath.Join(storageDirectory, fileName)
	Serializer(storeFilePath, &report)

	// adding report to index
	index.addReport(report, storeFilePath)
}