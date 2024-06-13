package main

import (
    "fmt"
    //"os" //to check input args
    //"slices"
    //"encoding/json"
    //"time"
)

func main(){
    fmt.Println("Vulnerability Assets Tracking System")

    var fraise Index
    
    Unserializer("assets/index_map.json", &fraise)
    (&fraise).SortIndex()
    fmt.Println(fraise)

    fmt.Printf("\n\nImporting report:\n")
    //(&fraise).ImportScanReport("report_example2.json", "assets")
    fmt.Printf("Saving index file:\n")
    //Serializer("assets/index_map.json", &fraise)
    fmt.Printf("\n\n")

    fmt.Println("Now sorting those things")
    
    (&fraise).SortIndex()
    fmt.Println(fraise)
}