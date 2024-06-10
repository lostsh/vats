package main

import "slices"

func Init() Index{
	var index Index
    Unserializer("assets/index.json", &index)
	// sorting all scan files for each target
	for _, unit := range index.Assets{
		slices.SortFunc(unit.Scans, CompareScanUnit)
	}
	// sorting targets by last scan date
	slices.SortFunc(index.Assets, CompareAssets)
    return index
}