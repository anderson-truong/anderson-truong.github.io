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

function singleString(name, range)
{
    let test = `    std::string ${name}[${range.length}] { `;
    for (let i of range) test += `"${i}", `
    test = test.slice(0, -2);
    test += ' };\n'
    return test;
}

function multiString(name, range)
{
    let test = `    std::string ${name}[${range.length}][${range[0].length}] { `;
    for (let i of range)
    {
        test += '{ ';
        for (let j of i)
            test += `"${j}", `
        test = test.slice(0, -2);
        test += ' }, ';
    }
    test = test.slice(0, -2);
    test += ' };\n'
    return test;
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

let firstfalseEmpty = `    std::string firstFalseEmpty[${len}] { `;
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
    assert(firstFalse(firstFalseEmpty, 5) == -1);\n`
}
output.textContent += '    }\n';

// position of least
output.textContent += '    //Test positionOfLeast\n    {\n';
{
let reverseOrdered = `    std::string reverseOrdered[${len}] { `;
for (let i = len - 1; i >= 0; i--) reverseOrdered += `"${i}", `;
reverseOrdered = reverseOrdered.slice(0, -2);
reverseOrdered += ' };\n';
output.textContent += reverseOrdered;

let ordered = `    std::string ordered[${len}] { `;
for (let i = 0; i < len; i++) ordered += `"${i}", `;
ordered = ordered.slice(0, -2);
ordered += ' };\n';
output.textContent += ordered;

let repeated = `    std::string repeated[${len}] { `;
for (let i = 0; i < len - 1; i++) repeated += `"${i}", `;
repeated += `"0"`;
repeated += ' };\n';
output.textContent += repeated;

let allLeast = `    std::string allLeast[${len}] { `;
for (let i = 0; i < len; i++) allLeast += `"0", `;
allLeast = allLeast.slice(0, -2);
allLeast += ' };\n';
output.textContent += allLeast;

output.textContent += `    assert(positionOfLeast(reverseOrdered, 0) == -1);
    assert(positionOfLeast(reverseOrdered, ${len}) == ${len - 1});
    assert(positionOfLeast(ordered, ${len}) == 0);
    assert(positionOfLeast(repeated, ${len}) == 0);
    assert(positionOfLeast(allLeast, ${len}) == 0);
`
}
output.textContent += '    }\n';

// has
// 0 occurrences
// 4
// 1 occurrence
// 0 1 2 3 (0 1 2), (0, 1, 3), (0, 2, 3), (1, 2, 3), (0, 1), (0, 2), (0, 3), (1, 2), (1, 3), (2, 3), (0), (1), (2), (3)
// Not (3, 2, 1), (3, 2, 0), (3, 1, 0), (2, 1, 0), (3, 2), (3, 1), (3, 0), (2, 1), (2, 0)

// 2 occurrences
// 0 1 2 2 3
// 0 1 2, 1 2 3, 0 1, 1 2, 2 3, 2

// pattern mostly matches but last char of pattern doesnt match
// 0 1 2 3 4, 0 1 2 4, 1 2 4, 2 4, 4
// first char of pattern doesnt match
// 4 0 1 2 3, 4 0 1 2, 4 0 1, 4 0, 4
// pattern mostly matches but is cut off at the end of a1
// 0 1 2 3 4, 1 2 3 4, 2 3 4, 3 4, 4
// a2 empty, n = 0
// n1 < n2

// has
output.textContent += '    //Test has\n    {\n';
{
let test1 = singleString('test1_a1', [0, 1, 2, 3]);
output.textContent += test1;
let test2 = singleString('test2_a1', [0, 1, 2, 2, 3]);
output.textContent += test2;

let valid1 = [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]];
let valid2 = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
let valid3 = [[0], [1], [2], [3]];

output.textContent += multiString(`valid1`, valid1);
output.textContent += multiString(`valid2`, valid2);
output.textContent += multiString(`valid3`, valid3);

output.textContent += `
    for (int i = 0; i < 4; i++) { assert(has(test1_a1, 4, valid1[i], 3)); assert(has(test2_a1, 5, valid1[i], 3)); }
    for (int i = 0; i < 6; i++) { assert(has(test1_a1, 4, valid2[i], 2)); assert(has(test2_a1, 5, valid2[i], 2)); }
    for (int i = 0; i < 4; i++) { assert(has(test1_a1, 4, valid3[i], 1)); assert(has(test2_a1, 5, valid3[i], 1)); }
    assert(has(test1_a1, 0, test1_a1, 0));
    assert(has(test1_a1, 4, test1_a1, 0));
    assert(has(test1_a1, 4, test1_a1, 4));
    assert(has(test1_a1, 0, test1_a1, 4) == false);
    assert(has(test1_a1, 4, test2_a1, 5) == false);

`

let invalid1 = [[0, 1, 2, 3, 4], [4, 0, 1, 2, 3]];
let invalid2 = [[0, 1, 2, 4], [4, 0, 1, 2], [1, 2, 3, 4]];
let invalid3 = [[1, 2, 4], [4, 0, 1], [2, 3, 4]];
let invalid4 = [[2, 4], [4, 0], [3, 4]];
let invalid5 = [4];
output.textContent += multiString('invalid1', invalid1);
output.textContent += multiString('invalid2', invalid2);
output.textContent += multiString('invalid3', invalid3);
output.textContent += multiString('invalid4', invalid4);
output.textContent += singleString('invalid5', invalid5);

output.textContent += `
    for (int i = 0; i < 2; i++) assert(has(test1_a1, 4, invalid1[i], 5) == false);
    for (int i = 0; i < 3; i++) assert(has(test1_a1, 4, invalid2[i], 4) == false);
    for (int i = 0; i < 3; i++) assert(has(test1_a1, 4, invalid3[i], 3) == false);
    for (int i = 0; i < 3; i++) assert(has(test1_a1, 4, invalid4[i], 2) == false);
    assert(has(test1_a1, 4, invalid5, 1) == false);
`

}
output.textContent += '    }\n';

output.textContent += `    std::cout << "           ',\\n        .-\`-,\\\\__\\n          .\\"\`   \`,\\n        .'_.  ._  \`;.\\n    __ / \`      \`  \`.\\\\ .--.\\n   /--,| 0)   0)     )\`_.-,)\\n  |    ;.-----.__ _-');   /\\n   '--./         \`.\`/  \`\\"\`\\n      :   '\`      |.\\n      | \\     /  //\\n       \\\\ '---'  /'\\n        \`------' \\\\\\n         _/       \`--..." << std::endl;\n`
output.textContent += '}\n'