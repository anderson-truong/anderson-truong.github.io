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

// True if string has zero length, false otherwise
bool somePredicate(std::string s)
{
	return s.length() == 0 ? true : false;
}

// Your functions here

int main()
{
`

var len = 5;

// All false
output.textContent += '    //Test allFalse\n    {\n';
{
var allFalse_True = `    std::string allFalse_True[${len}] { `
for (let i = 0; i < len; i++) allFalse_True += '"o",';
allFalse_True = allFalse_True.slice(0, -1);
allFalse_True += ' };\n';
output.textContent += allFalse_True;
output.textContent += `    assert(allFalse(allFalse_True, ${len}));\n`;

var allFalse_False = `    std::string allFalse_False[${len}][${len}] { `
for (let i = 0; i < len; i++)
{
    allFalse_False += '{ ';
    for (let j = 0; j < len; j++)
    {
        if (i == j)
            allFalse_False += '"", ';
        else
            allFalse_False += '"o", '
    }
    allFalse_False = allFalse_False.slice(0, -1);
    allFalse_False += ' }, '
}
allFalse_False = allFalse_False.slice(0, -1);
allFalse_False += ' };\n'
output.textContent += allFalse_False;

output.textContent += `    for (int i = 0; i < ${len}; i++)
        assert(!allFalse(allFalse_False[i], ${len}));
`;    
}
output.textContent += '    }\n';

// Count false
output.textContent += '    //Test countFalse\n    {\n';
{
var countFalseStrings = `    std::string countFalseTest[${2*(len + 1)}][${len}] { `;
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
    countFalseStrings = countFalseStrings.slice(0, -2);
    countFalseStrings += ' }, ';

    let set = '}, ';
    falses = i;
    for (let j = 0; j < len; j++)
    {
        if (falses > 0)
        {
            set = ', "o"' + set;
            falses--;
        }
        else
            set = `, ""` + set;
            
    }
    set = set.slice(1, set.length);
    set = '{' + set;
    countFalseStrings += set;
}
countFalseStrings = countFalseStrings.slice(0, -2);
countFalseStrings += ' };\n';

output.textContent += countFalseStrings;

output.textContent += `    for (int i = 0; i < ${len + 1}; i++)
    {
        assert(countFalse(countFalseTest[2 * i], ${len}) == i);
        assert(countFalse(countFalseTest[2 * i + 1], ${len}) == i);
    }\n`
}
output.textContent += '    }\n';

// First false
output.textContent += '    //Test firstFalse\n    {\n';
{
let counter;
let firstFalseLeft = `    std::string firstFalseLeft[${len}][${len}] { `;
for (let i = 1; i <= len; i++)
{
    counter = i;
    firstFalseLeft += '{ ';
    for (let j = 0; j < len; j++)
    {
        if (counter > 0)
        {
            firstFalseLeft += '"o", ';
            counter--;
        }
        else
        {
            firstFalseLeft += '"", ';
        }
    }
    firstFalseLeft = firstFalseLeft.slice(0, -2);
    firstFalseLeft += ' }, ';
}
firstFalseLeft = firstFalseLeft.slice(0, -2);
firstFalseLeft += ' };\n';
output.textContent += firstFalseLeft;

let firstFalseRight = ` };\n`;
for (let i = 1; i <= len; i++)
{
    counter = i;
    firstFalseRight = ' }' + firstFalseRight;
    for (let j = 0; j < len; j++)
    {
        if (counter > 0)
        {
            firstFalseRight = ', "o"' + firstFalseRight;
            counter--;
        }
        else
        {
            firstFalseRight = ', ""' + firstFalseRight;
        }
    }
    firstFalseRight = firstFalseRight.slice(1, firstFalseRight.length);
    firstFalseRight = ', {' + firstFalseRight;
}
firstFalseRight = firstFalseRight.slice(2, firstFalseRight.length);
firstFalseRight = `    std::string firstFalseRight[${len}][${len}] { ` + firstFalseRight;
output.textContent += firstFalseRight;

let firstFalseShift = `    std::string firstFalseShift[${len}][${len}] { `;
for (let i = 0; i < len; i++)
{
    firstFalseShift += '{ ';
    for (let j = 0; j < len; j++)
    {
        if (i == j)
        firstFalseShift += '"o", ';
        else
        firstFalseShift += '"", ';
    }
    firstFalseShift = firstFalseShift.slice(0, -2);
    firstFalseShift += ' }, ';
}
firstFalseShift = firstFalseShift.slice(0, -2);
firstFalseShift += ' };\n';
output.textContent += firstFalseShift;

let firstfalseEmpty = `    std::string firstfalseEmpty[${len}] { `;
for (let i = 0; i < len; i++)
{
    firstfalseEmpty += '"", ';
}
firstfalseEmpty = firstfalseEmpty.slice(0, -2);
firstfalseEmpty += ' };\n';
output.textContent += firstfalseEmpty;

// Tester
output.textContent += `    for (int i = 0; i < 5; i++)
    {
        assert(firstFalse(firstFalseLeft[i], 5) == 0);
        assert(firstFalse(firstFalseRight[i], 5) == i);
        assert(firstFalse(firstFalseShift[i], 5) == i);
    }
    assert(firstfalse(firstFalseEmpty[i], 5) == -1);\n`
}
output.textContent += '    }\n';



output.textContent += '}\n'