package main

import (
	"fmt"
	//"errors"
	"os"
	//"io"
)

func except(e error){
	if nil != e {
		panic(e)
	}
}

func readChar(f *os.File) byte{
	char := make([]byte, 1)
	size, err := f.Read(char)
	fmt.Printf("Type: %T\n", err)
	fmt.Printf("Readsize: %d\n", size)
	if err != nil && size == 0 {
		fmt.Println("End of file reatched")
		return '\n'
	}else{
		except(err)
	}
	return char[0]
}

func readLine(f *os.File) (string, error){
	var line string
	char := make([]byte, 1)
	size, err := f.Read(char)
	for size > 0 && err == nil && string(char) != "\n" {
		line += string(char)
		size, err = f.Read(char)
	}
	// EOF line case
	if err != nil && size == 0 {
		return "\n", err
	}
	return line, nil
}

func test(){
	fmt.Println("Hi, this is a test !")

	f, err := os.Open("/tmp/fraise.txt")
	except(err)
	/*
	line := make([]byte, 4)
	//while string(line) != ""{
		_, err = f.Read(line)
		except(err)
		fmt.Println(string(line))
		//fmt.Println(str)
	//}
	*/
	/*
	var c string
	c = string(readChar(f))
	c += string(readChar(f))
	c += string(readChar(f))
	c += string(readChar(f))
	c += string(readChar(f))
	c += string(readChar(f))
	fmt.Println(string(c))
	//f.Seek(0, SeekStart)
	var accu string
	c = "-"
	for c != "\n" {
		c = string(readChar(f))
		accu += c
	}
	fmt.Println(accu)

	c = string(readChar(f))
	for c != "\n" {
		accu += c
		c = string(readChar(f))
	}
	fmt.Println(accu)

	c = string(readChar(f))
	for c != "\n" {
		accu += c
		c = string(readChar(f))
	}
	fmt.Println(accu)*/
	l, e := readLine(f)
	for e == nil{
		fmt.Println(l)
		l, e = readLine(f)
	}
	f.Close()
}

func readFile(filePath string) []string{
	var content []string
	f, err := os.Open(filePath)
	except(err)

	l, e := readLine(f)
	for e == nil{
		//fmt.Println(l)
		content = append(content, l)
		l, e = readLine(f)
	}
	f.Close()
	return content
}