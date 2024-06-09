package main

import (
    "fmt"
    //"os" //to check input args
    "slices"
    "encoding/json"
)

func main(){
    fmt.Println("Vulnerability Assets Tracking System")

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
    fmt.Println(arryunsze)

    serialize_test()

    fmt.Println("New Tests :")

    //m := make(map[int]Vuln)
    m := map[int]Vuln{
        1:Vuln{Component: "JQuery", Version: "0.23", Criticity: 8, Comments: "c"},
        2:Vuln{Component: "React", Version: "0.2", Criticity: 4.3, Comments: "c"},
        3:Vuln{Component: "Apache", Version: "0.2", Criticity: 9, Comments: "c"},
        4:Vuln{Component: "Fraise", Version: "0.2", Criticity: 1.1, Comments: "c"},
    }

    fmt.Println(m)

    jsonmap, _ := json.Marshal(m)
    fmt.Println(string(jsonmap))
    unjsonmap := make(map[int]Vuln)
    json.Unmarshal(jsonmap, &unjsonmap)
    fmt.Println(unjsonmap)
}