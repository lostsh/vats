package main

import (
    "fmt"
    //"os" //to check input args
    //"slices"
    "encoding/json"
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
    
    vv = append(vv, Vuln{Component: "Angular", Version: "10.2", Criticity: 3.4, Comments: "fraise"})
    fmt.Println("addition to array")
    fmt.Println(vv)

    jsonarray, _ := json.Marshal(vv)
    WriteFile("assets/test.json", string(jsonarray))
    fmt.Println("==>Nest test :")
}