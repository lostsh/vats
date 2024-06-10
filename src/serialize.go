package main


type serializable interface{
	Serialize() string
	Unserialize(string)
}

// save the serializable object into a file
func Serializer(path string, s serializable){
	WriteFile(path, s.Serialize())
}

// get seriablizable object from the file
func Unserializer(path string, s serializable){
	str_obj := ReadFile(path)
	s.Unserialize(str_obj)
}