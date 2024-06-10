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
    /*
    var repp Report
    Unserializer("assets/11_lostsh_github_io.json", &repp)
    fmt.Println(repp)
    Serializer("assets/111_fraise.json", &repp)
    fmt.Println("File written")
    var inn Index
    Unserializer("assets/index.json", &inn)
    fmt.Println(inn)
    Serializer("assets/111_index.json", &inn)
    fmt.Println("File written")*/

    var fraise = Init()
    fmt.Println(fraise)
    //Serializer("assets/sorted_index.json", &fraise)
}