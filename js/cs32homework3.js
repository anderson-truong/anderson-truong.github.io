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

output.textContent = `#include <string>
#include <cassert>
// True if string has non-zero length, false if length == 0
bool somePredicate(std::string s)
{
	return s.length() != 0 ? true : false;
}

// Your functions here

int main()
{
`

var len = 5;
var allFalse_True = `std::string allFalse_True[${len}] { `
var allFalse_False = `std::string allFalse_False[${len}][${len}] { `
for (let i = 0; i < len; i++) allFalse_True += '"",';
for (let i = 0; i < len; i++)
{
    allFalse_False += '{ ';
    for (let j = 0; j < len; j++)
    {
        if (i == j)
            allFalse_False += '"o", ';
        else
            allFalse_False += '"", '
    }
    allFalse_False = allFalse_False.slice(0, -1);
    allFalse_False += '}, '
}
allFalse_False = allFalse_False.slice(0, -1);
allFalse_False += ' };\n'

allFalse_True = allFalse_True.slice(0, -1);
allFalse_True += ' };\n'
output.textContent += allFalse_True;
output.textContent += allFalse_False;

output.textContent += `assert(allFalse(allFalse_True, ${len}));
for (int i = 0; i < ${len}; i++)
    assert(!allFalse(allFalse_False[i], ${len}));
`;

var countFalseStrings = `std::string countFalseTest[${2*(len + 1)}][${len}] { `;
for (let i = 0; i < len + 1; i++)
{
    countFalseStrings += '{ ';
    let falses = i;
    for (let j = 0; j < len; j++)
    {
        if (falses > 0)
        {
            countFalseStrings += '"o", '
            falses--;
        }
        else
            countFalseStrings += `"", `
            
    }
    countFalseStrings = countFalseStrings.slice(0, -1);
    countFalseStrings += '}, ';

    countFalseStrings += '{ ';
    falses = len;
    for (let j = 0; j < len; j++)
    {
        if (falses > 0)
        {
            countFalseStrings += `"", `
            falses--;
        }
        else
            countFalseStrings += '"o", '      
    }
    countFalseStrings = countFalseStrings.slice(0, -1);
    countFalseStrings += '}, ';
}
countFalseStrings = countFalseStrings.slice(0, -1);
countFalseStrings += '};\n';

output.textContent += countFalseStrings;

output.textContent += '}'