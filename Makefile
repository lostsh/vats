## build pipeline

## Working env
BIN_DIR=bin/
SRC_DIR=src/
DOC_DIR=doc/

# Build vars
TARGET=$(BIN_DIR)/vats
SRC=$(wildcard $(SRC_DIR)/*.go)

CC=go build

all: $(TARGET)

## Compile main Target
$(TARGET): $(SRC)
	$(CC) -o $@ $^

.PHONY: doc clean clean_doc clean_bin

doc:
	@doxygen

clean: clean_bin clean_doc

clean_doc:
	@rm -rf $(DOC_DIR)/*

# Clean *~ *.o
clean_bin:
	@rm -rf $(BIN_DIR)/*
