function readInMatrix(input)
{
    let rows = input.split('\n');
    let matrix = [];
    for (let row of rows)
    {
        let correctRow = row.split(' ');
        correctRow = correctRow.filter(col => col != '');
        correctRow = correctRow.map(function(i){return parseFloat(i)})
        if (correctRow.length != 0)
            matrix.push(correctRow)
    }
    return matrix;
}

function arrayCopy(a)
{
    let output = [];
    for (let row of a)
    {
        let r = [];
        for (let col of row)
            r.push(col);
        output.push(r);
    }
    return output;
}

function simplify(r)
{
    let leadingIndex = 0;
    for (;  leadingIndex < r.length; leadingIndex++)
    {
        if (r[leadingIndex] != 0)
            break;
    }
    if (leadingIndex == r.length)
        return r;
    const divisor = r[leadingIndex];
    if (divisor != 0)
        r = r.map(function(e) { return e / divisor })
    //console.log(r);
    return r;
}

function subtract(arr, index, leading)
{
    let ref = arr[index];
    for(let i=0; i < arr.length; i++)
    {
        if (i != index)
        {
            let minuend = arr[i];
            let subtrahendMultiplier = minuend[leading];
            for (let j=0; j < ref.length; j++)
            {
                minuend[j] -= subtrahendMultiplier * ref[j];
            }
        }
    }
}

function leadingOneAt(row, index)
{
    if (row[index] == 0)
        return false;
    for (let i=0; i < index; i++)
    {
        if (row[i] != 0)
            return false;
    }
    return true;
}

function rowWithLeadingOneAt(array, index)
{
    for (let i=0; i < array.length; i++)
    {
        if (leadingOneAt(array[i], index))
            return i;
    }
    return -1;
}

function sortLeadingOnes(array)
{
    let newArray = [];
    for (let i = 0; i < array.length; i++)
    {
        for (let row of array)
        {
            if (row[i] == 1)
            {
                newArray.push(row);
                break;
            }
        }
    }
    for (let row of array)
    {
        let sum = 0;
        for (let item of row)
            sum += item;
        if (sum == 0)
            newArray.push(row);
    }
    return newArray;
}

function basicSolve(matrix)
{
    let output = arrayCopy(matrix);
    //console.log(rowWithLeadingOneAt(matrix, 1));
    for (let i = 0; i < output.length; i++)
    {
        let currentRow = rowWithLeadingOneAt(output, i);
        if (currentRow != -1)
        {
            output[currentRow] = simplify(output[currentRow]);
            subtract(output, currentRow, i);
        }
    }
    return output;
}

//let input = "0 3 5 22.334 \n 0 0 0 0 \n 0 -6 76 168";

let textInput = document.querySelector('#input')
let input = textInput.textContent;
matrix = readInMatrix(input);
console.log(arrayCopy(matrix));
let x = basicSolve(matrix);
console.log(sortLeadingOnes(x));