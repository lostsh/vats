package main 

import (
	//"time"
	"encoding/json"
)

// Report contain results of a scan on a Target
type Report struct{
	Target string			`json:"target"`
	Datetime string			`json:"datetime"`
	Vulnerabilities []Vuln	`json:"vulnerabilities"`
}

func (r Report) String() string{
	var str string
	//dt, _ := time.Parse(time.RFC3339, r.Datetime)
	//str += (r.Target+" : "+dt.String()+"\n\t")
	str += (r.Target+" : "+r.Datetime+"\n\t")
	for _, v := range r.Vulnerabilities{
		str+= (" "+v.String())
	}
	return (str+"\n")
}

func (r *Report) Serialize() string{
	byteJson, _ := json.Marshal(*r)
	return string(byteJson)
}

func (r *Report) Unserialize(jsonStr string){
	json.Unmarshal([]byte(jsonStr), r)
}