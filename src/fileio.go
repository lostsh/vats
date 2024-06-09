package main

import (
	"os"
	//"fmt"
)

func ReadLine(f *os.File) (string, error){
	var line string
	char := make([]byte, 1)
	size, err := f.Read(char)
	for size > 0 && err == nil && string(char) != "\n" {
		line += string(char)
		size, err = f.Read(char)
	}
	// EOF line case
	if err != nil && size == 0 {
		return line, err
	}
	return line, nil
}

func ReadFile(filePath string) string{
	var content string
	f, err := os.Open(filePath)
	if err != nil{
		//fmt.Println(err)
		panic(err)
		return ""
	}

	for {
		l, e := ReadLine(f)
		content += (l+"\n")
		if e != nil { break }
	}
	f.Close()
	return content
}

func WriteFile(filePath string, content string){
	var byteContent = []byte(content)
	f, err := os.Create(filePath)
	if err != nil{
		panic(err)
	}
	_, err = f.Write(byteContent)
	if err != nil{
		panic(err)
	}
	f.Close()
}