package main

import (
    "fmt"
    //"os" //to check input args
    //"slices"
    "encoding/json"
    //"time"
)

func main(){
    fmt.Println("Vulnerability Assets Tracking System")
    /*
    vulns := []Vuln{
        Vuln{Component: "JQuery", Version: "0.23", Criticity: 8, Comments: "c"},
        Vuln{Component: "React", Version: "0.2", Criticity: 4.3, Comments: "c"},
        Vuln{Component: "Apache", Version: "0.2", Criticity: 9, Comments: "c"},
        Vuln{Component: "Fraise", Version: "0.2", Criticity: 1.1, Comments: "c"},
    }

    fmt.Println(vulns)

    slices.SortFunc(vulns, CompareVuln)
    fmt.Println(vulns)

    byteJson, _ := json.Marshal(vulns)
    fmt.Println(string(byteJson))
    arryunsze := []Vuln{}
    json.Unmarshal(byteJson, &arryunsze)
    fmt.Println(arryunsze)*/

    fmt.Println("Test on json reading files :")
    c := ReadFile("assets/test.json")
    var vv []Vuln
    json.Unmarshal([]byte(c), &vv)
    fmt.Println(vv)
    
    vv = append(vv, Vuln{Component: "Leemon", Version: "10.2", Criticity: 2.4, Comments: "Ours"})
    fmt.Println("addition to array")
    fmt.Println(vv)

    jsonarray, _ := json.Marshal(vv)
    WriteFile("assets/test.json", string(jsonarray))


    fmt.Println("==>Nest test :")
    indexcontent := ReadFile("assets/index.json")
    //fmt.Println(indexcontent)
    fmt.Println("Now unserializing")
    var i Index
    (&i).Unserialize(indexcontent)
    fmt.Println(i)

    //fmt.Println(Unserialize(indexcontent))
    /*
    var s1 = Scan_Unit{Datetime:time.Now(), FilePath:"../one/"}
    var s2 = Scan_Unit{Datetime:time.Now(), FilePath:"../two/"}
    var s3 = Scan_Unit{Datetime:time.Now(), FilePath:"../tree/"}
    var s4 = Scan_Unit{Datetime:time.Now(), FilePath:"../four/"}
    var sc1 = Scan{Target:"premiere", Scans:[]Scan_Unit{s1,s2,}}
    var sc2 = Scan{Target:"seconde", Scans:[]Scan_Unit{s3,s4,}}
    var test = Index{Assets:[]Scan{sc1,sc2,}}
    fmt.Println(test)
    */
    //WriteFile("assets/testindex.json", test.Serialize())
}