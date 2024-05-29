package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"strings"
	"unicode/utf8"

	arg "github.com/alexflint/go-arg"
)

type args struct {
	P       string   `arg:"positional"`
	File    []string `arg:"positional" required:"false"`
	Lower   bool     `arg:"-i" help:"case insensitive search" default:"false"`
	Inverse bool     `arg:"-v" help:"invert search, don't use specified pattern" default:"false"`
}

var NO_CHAR int = 256

func badCharSet(str string, size int, badchar []int) {
	var i int

	for i = 0; i < NO_CHAR; i++ {
		badchar[i] = -1
	}

	for i = 0; i < size; i++ {
		badchar[int(str[i])] = i
	}
}

func compareLower(j int, s int, P string, T string) int {
	// -i flag comparison, case insensitive search
	for j >= 0 && strings.EqualFold(string(P[j]), string(T[s+j])) {
		j--
	}
	return j
}

func compare(j int, s int, P string, T string) int {
	// normal comparison function for string
	for j >= 0 && P[j] == T[s+j] {
		j--
	}
	return j
}

func search(text []string, args args) []int {
	m := utf8.RuneCountInString(args.P)
	badChar := make([]int, NO_CHAR)

	badCharSet(args.P, m, badChar)

	var lines []int

	for i := 0; i < len(text); i++ {
		T := text[i]
		n := utf8.RuneCountInString(T)

		s := 0

		for s <= (n - m) {
			var j int = m - 1
			if args.Lower {
				j = compareLower(j, s, args.P, T)
			} else {
				j = compare(j, s, args.P, T)
			}

			if j < 0 {

				if !args.Inverse {
					lines = append(lines, i)
				} else if len(lines) > 0 {
					// remove previous additions of i once it has been found in line
					for lines[len(lines)-1] == i {
						lines = lines[:len(lines)-1]
					}
				}
				break

			} else {
				if args.Inverse {
					if len(lines) > 0 {
						if lines[len(lines)-1] != i {
							lines = append(lines, i)
						}
					} else {
						lines = append(lines, i)
					}
				}
				tmp := float64((j - badChar[T[s+j]]))
				s += int(math.Max(1, tmp))
			}
		}
	}
	return lines
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func loadText(fileScanner *bufio.Scanner) []string {
	var text []string
	for fileScanner.Scan() {
		text = append(text, fileScanner.Text())
	}
	return text
}

func main() {
	var args args
	info, _ := os.Stdin.Stat()
	arg.MustParse(&args)
	fmt.Println("File(s): ", args.File)
	fmt.Println("Pattern: ", args.P)
	var stdin bool
	if info.Mode()&os.ModeCharDevice == 0 {
		stdin = true
		args.File = append(args.File, "none")
	} else {
		stdin = false
	}
	fmt.Printf("stdin: %t\n", stdin)
	texts := make([][]string, len(args.File))
	all_lines := make([][]int, len(args.File))
	for i := 0; i < len(args.File); i++ {
		var text []string
		// var fileScanner *bufio.Scanner
		if stdin {
			fileScanner1 := bufio.NewScanner(os.Stdin)
			text = loadText(fileScanner1)
		} else {
			data, err := os.Open(args.File[i])
			check(err)
			fileScanner2 := bufio.NewScanner(data)
			fileScanner2.Split(bufio.ScanLines)
			text = loadText(fileScanner2)
			data.Close() // have to close after everything is done
		}

		texts[i] = make([]string, len(text))
		texts[i] = text

		lines := search(texts[i], args)
		all_lines[i] = make([]int, len(lines))
		all_lines[i] = lines
	}
	if len(args.File) == 1 {
		for i := 0; i < len(all_lines[0]); i++ {
			fmt.Println(texts[0][all_lines[0][i]])
		}
	} else {
		for i := 0; i < len(all_lines); i++ {
			fmt.Print("------", args.File[i], "-----\n\n")
			for j := 0; j < len(all_lines[i]); j++ {
				fmt.Println(texts[i][all_lines[i][j]])
			}
			fmt.Print("\n\n")
		}
	}
}
