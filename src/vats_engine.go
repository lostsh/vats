package main

import (
	"slices"
	"path/filepath"
	"regexp"
)

func SortIndex(index *Index){
    //Unserializer(filePath, index)
	// sorting all scan files for each target
	for _, unit := range index.Assets{
		slices.SortFunc(unit.Scans, CompareScanUnit)
	}
	// sorting targets by last scan date
	slices.SortFunc(index.Assets, CompareAssets)
}

func (r *Report) TargetToFileName() string{
	//TODO : regex that match all points and oor space
	panic("TODO")
	regex := regexp.MustCompile(".")
	n := regex.ReplaceAllString(r.Target, "_")
	return n
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
	//copy content to assets directoy with correct name
}