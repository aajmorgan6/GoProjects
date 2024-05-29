# Grep Clone in Go

This is my first attempt at learning Golang, so I'm creating a `grep` clone using the Boyer-Moore Algorithm for text pattern searching.

## Works as a Command Line Tool with proper installation

Follow steps on https://go.dev/doc/tutorial/compile-install to have proper env set up for `go install` to run to correct place

Can be run as a standalone with multiple files, like 
```bash
grepp {pattern} [file1, file2, ...] {flags}
```

or while piped in
```bash
cat test.txt | grepp {pattern} {flags}
```

### Currently supported flags

`-i`: case insensitive search -- does not care about upper or lower case while matching texts

`-v`: inverse search -- shows lines that do not match the searched pattern
