const output = document.querySelector('#outputCode');
const clipboardPrompt = document.querySelector('#copied');
document.querySelector("#copyClipboard").onclick = function(){
    navigator.clipboard.writeText(output.textContent);
    clipboardPrompt.style.opacity = "1";
    clipboardPrompt.textContent = "Copied!";
    setTimeout(function(){
        clipboardPrompt.style.opacity = "0.5";
    }, 3000);
}

let maze = `XXXXXXXXXX
X........X
X........X
X........X
X........X
X........X
X........X
X........X
X........X
XXXXXXXXXX`

let matrix = maze.split('\n');
console.log(matrix);
let carray = "";

output.textContent = `#include <string>
#include <cassert>
#include <iostream>
using namespace std;

int main()
{
    string cases[57] = {
		"", "()", "(())", ")(", "))((", 
		"(T", "T)", "((T|F)", "(T|F))",
		")T(", ")F(", "))T((", "))F((",
		"TT", "TF", "FT", "FF", "TTT", "TTF", "TFT", "FTT", "TFF", "FFT", "FTF", "FFF",
		"T&&T", "T&|F", "T|&F", "T!&F", "T!|F", "T!!F",
		"&", "&T", "&F", "|", "|T", "|F", "T&", "F&", "T|", "F|",
		"(&T&T)", "(|T&T)", "(T&T!)", "(T&T&)", "(T&T|)", "(T&T)!",
		"(&T)", "(&F)", "(|T)", "(|F)",
		"T!T", "T!F", "F!T", "F!F",
		"T!", "F!"
	};
	string postfix = "";
	bool result = false;
    for (string c : cases)
	{
		cout << "Case: " << c << endl;
		assert(evaluate(c, postfix, result) == 1);
		assert(result == false);
	}
}`