package main


type serializable interface{
	Serialize() string
	Unserialize() serializable
}

// save the serializable object into a file

// get seriablizable object from the file