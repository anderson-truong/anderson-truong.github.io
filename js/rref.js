let input = "-4 1 1 \n 11 -12 13 \n 0 1 0";
let rows = input.split('\n');
let matrix = [];

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

for (let row of rows)
{
    let correctRow = row.split(' ');
    correctRow = correctRow.filter(col => col != '');
    correctRow = correctRow.map(function(i){return parseFloat(i)})
    if (correctRow.length != 0)
        matrix.push(correctRow)
}

function simplify(r)
{
    let max = Math.max(...r);
    let divisor = 2;
    for (; divisor < max; divisor++)
    {
        let divided = r.map(function(e){ return e % divisor })
        if (divided.reduce((partialSum, a) => partialSum + a, 0) == 0)
        {
            break;
        }
    }
    if (divisor != max)
    {
        let newRow = r.map(function(e) { return e / divisor })
        return newRow;
    }
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
console.log(matrix);
let b = arrayCopy(matrix);
b[0] = simplify(b[0]);
console.log(b);
let c = arrayCopy(b);
subtract(c, 0, 0);
console.log(c);
let d = arrayCopy(c);
d[0] = simplify(d[0]);
subtract(d, 1, 1);
console.log(d);