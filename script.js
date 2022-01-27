const output = document.querySelector('#outputCode');
let prefix = "int main()\n{\n";
let suffix = "} "
let code = "";

let digitMin = 1;
let digitMax = 9;

const multiDigit = document.querySelector('#multiDigit');
multiDigit.addEventListener('change', multiDigitGen);
function multiDigitGen(e)
{
    digitMin = 10;
    digitMax = 100000000;
    regenerate()
}

const singleDigit = document.querySelector('#singleDigit');
singleDigit.addEventListener('change', singleDigitGen);
function singleDigitGen(e)
{
    digitMin = 1;
    digitMax = 9;
    regenerate()
}

var q, p, d;
validnums();

function forLoopValidation(array, arraysize, batches, bool, message)
{
    return `    std::string ${array}[${arraysize}] = { ${batches} };\n    for (std::string test : ${array})\n    {\n        if (isValidQC(test) == ${bool})\n        {\n            std::cout << \"${message}: \" << test << '\\n';\n        }\n    }\n`

}

function randomNum(min = digitMin, max = digitMax)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function validnums(min = digitMin, max = digitMax)
{
    q = randomNum(min,  max);
    p = randomNum(min, q - 1);
    d = q - p;
}

function updateCode()
{
    code = prefix;
    code += validTestCheckCode;
    code += wrongCaseCheckCode;
    code += extraCharCheckCode;
    code += wrongOrderCheckCode;
    code += repeatCheckCode;
    code += qZeroCheckCode;
    code += noNumCheckCode;
    code += wrongSumCheckCode;
    code += leadingZerosCheckCode;
    code += suffix;
    output.textContent = code;
    Prism.highlightAll();
}

// Generate Valid Cases
let validTestCheckCode = "";
const validTestCheck = document.querySelector('#validTestCheck');
validTestCheck.addEventListener('change', validTestCheckGenerate);

function validTestCheckGenerate(e)
{
    if (validTestCheck.checked)
    {
        let batches = "";
        // No Zeros
        validnums();
        batches += `"Q${q}p${p}d${d}", `;
        batches += `"Q${q}d${d}p${p}", `;

        // With Zeros
        q = Math.floor(Math.random() * 9) + 1;
        batches += `"Q${q}p${0}d${q}", `;
        q = Math.floor(Math.random() * 9) + 1;
        batches += `"Q${q}p${q}d${0}", `;
        q = Math.floor(Math.random() * 9) + 1;
        batches += `"Q${q}d${0}p${q}", `;
        q = Math.floor(Math.random() * 9) + 1;
        batches += `"Q${q}d${q}p${0}"`;

        validTestCheckCode = forLoopValidation("validTestStrings", "6", batches, "false", "isValidQC: Valid Test Case returned False: ");
    }
    else
    {
        validTestCheckCode = "";
    }
    updateCode();
}

// ===========================
// LETTER TESTS

// Generate Wrong Upper/Lowercase

let wrongCaseCheckCode = "";
const wrongCaseCheck = document.querySelector('#wrongCaseCheck');
wrongCaseCheck.addEventListener('change', wrongCaseCheckGenerate);

function wrongCaseCheckGenerate(e)
{
    wrongCaseCheckCode = "";
    if (wrongCaseCheck.checked)
    {
        var letters1 = ['Q', 'q'];
        var letters2 = ['p', 'P', 'd', 'D'];
        var letters21 = ['d', 'D'];
        var letters22 = ['p', 'P'];
        var batches = "";
        validnums();
        for (const letter1 of letters1)
        {
            for (const letter2 of letters2)
            {
                if (letter2 == 'p' || letter2 == 'P')
                {
                    for (const letter21 of letters21)
                    {
                        if (!(letter1 == 'Q' && letter2 == 'p' && letter21 == 'd'))
                        {
                            batches += `"${letter1}${q}${letter2}${p}${letter21}${d}", `;
                        }
                    }
                }
                else
                {
                    for (const letter22 of letters22)
                    {
                        if (!(letter1 == 'Q' && letter2 == 'd' && letter22 == 'p'))
                        {
                            batches += `"${letter1}${q}${letter2}${p}${letter22}${d}", `;
                        }
                    }
                }
            }
        }
        batches = batches.slice(0, -2);
        wrongCaseCheckCode += forLoopValidation("wrongCaseStrings", "14", batches, "true", "isValidQC: Wrong Case Test returned True: ");
    }
    updateCode();
}


// Insert String
String.prototype.insert = function(index, string) {
    return this.slice(0, index) + string + this.slice(index);
}

// Random Char
function randomChar(count)
{
    const alphanum = 'ABCEFGHIJKLMNORSTUVWXYZabcefghijklmnorstuvwxyz~`!@#$%^&*()_+-={}[]:;<>?,./|';
    return alphanum.charAt(Math.floor(Math.random() * alphanum.length));
}

let extraCharCheckCode = "";
const extraCharCheck = document.querySelector('#extraCharCheck');
extraCharCheck.addEventListener('change', extraCharCheckGenerate);

function extraCharCheckGenerate(e)
{
    extraCharCheckCode = "";
    if (extraCharCheck.checked)
    {
        validnums();
        let batchprototypes = [`Q${q}p${p}d${d}`, `Q${q}d${d}p${p}`];
        let batchCount = 0;
        var batches = "";
        for (const batch of batchprototypes)
        {
            for (let i = 0; i < batch.length; i++)
            {   
                batchCount += 2;
                batches += `"${batch.insert(i, randomChar(1))}", `;
                batches += `"${batch.insert(i, randomChar(3))}", `;
            }
        }
        batches = batches.slice(0, -2);
        extraCharCheckCode = forLoopValidation("extraCharsString", `${batchCount}`, batches, "true", "isValidQC: Extra Char Test returned True: ");
    }
    updateCode();
}

function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;
  
    while (i < length) {
      if (c[i] < i) {
        k = i % 2 && c[i];
        p = permutation[i];
        permutation[i] = permutation[k];
        permutation[k] = p;
        ++c[i];
        i = 1;
        result.push(permutation.slice());
      } else {
        c[i] = 0;
        ++i;
      }
    }
    return result;
}

let wrongOrderCheckCode = "";
const wrongOrderCheck = document.querySelector('#wrongOrderCheck');
wrongOrderCheck.addEventListener('change', wrongOrderCheckGenerate);

function wrongOrderCheckGenerate(e)
{
    wrongOrderCheckCode = "";
    if (wrongOrderCheck.checked)
    {
        validnums();
        while (q == p || q == d || p == d)
        {
            validnums();
        }
        let batches = "";
        let set = ['Q', q, 'p', p, 'd', d];
        let perms = permute(set);
        let batchCount = 0;
        for (const perm of perms)
        {
            if (perm.join('') != `Q${q}p${p}d${d}` && perm.join('') != `Q${q}d${d}p${p}` && perm.join('') != `Q${q}p${d}d${p}` && perm.join('') != `Q${q}d${p}p${d}`)
            {
                batches += `"${perm.join('')}", `;
                batchCount++;
            }
        }
        batches = batches.slice(0, -2);
        wrongOrderCheckCode = forLoopValidation("wrongOrderStrings", `${batchCount}`, batches, "true", "isValidQC: Wrong Order Test returned True: ");
    }
    updateCode();
}

let repeatCheckCode = "";
const repeatCheck = document.querySelector('#repeatCheck');
repeatCheck.addEventListener('change', repeatCheckGenerate);

function repeatCheckGenerate(e)
{
    repeatCheckCode = "";
    if (repeatCheck.checked)
    {
        validnums();
        let letters = ['Q', 'p', 'd'];
        let batch = `Q${q}p${p}d${d}`;
        let batchArray = [];
        for (const letter of letters)
        {
            for (let i = 1; i < batch.length + 1; i++)
            {
                batchArray.push(`"${batch.insert(i, letter)}", `)
            }
        }
        batchArray = [...new Set(batchArray)];
        let batches = batchArray.join('');
        batches = batches.slice(0, -2);
        repeatCheckCode = forLoopValidation("repeatCheck", "16", batches, "true", "isValidQC: Repeat Letter Test returned True: ");
    }
    updateCode();
}

let qZeroCheckCode = "";
const qZeroCheck = document.querySelector('#qZeroCheck');
qZeroCheck.addEventListener('change', qZeroCheckGenerate);

function qZeroCheckGenerate(e)
{
    qZeroCheckCode = "";
    if (qZeroCheck.checked)
    {
        validnums();
        let batches = `"Q0p${p}d${d}", `;
        validnums();
        batches += `"Q0d${d}p${p}"`;
        qZeroCheckCode = forLoopValidation("zeroAfterQStrings", "2", batches, "true", "isValidQC: Zero after Q Test returned True: ");
    }
    updateCode();
}

let noNumCheckCode = "";
const noNumCheck = document.querySelector('#noNumCheck');
noNumCheck.addEventListener('change', noNumCheckGenerate);

function noNumCheckGenerate(e)
{
    noNumCheckCode = "";
    if (noNumCheck.checked)
    {
        let batches = "";
        for (let i = 0; i < 3; i++)
        {
            validnums();
            let nums1 = [q, p, d];
            let nums2 = [q, d, p];
            nums1[i] = '';
            nums2[i] = '';
            batches += `"Q${nums1[0]}p${nums1[1]}d${nums1[2]}", `;
            batches += `"Q${nums2[0]}d${nums2[1]}p${nums2[2]}", `;
        }
        let perms = permute([0, 1, 2]);
        let perms2 = perms;
        for (let i = 0; i < perms.length; i++)
        {
            perms2[i] = [perms2[i][0], perms2[i][1]];
        }

        batches += `"Qpd${d}", `;
        batches += `"Qd${d}p", `;
        batches += `"Qp${p}d", `;
        batches += `"Qdp${p}", `;
        batches += `"Q${d}pd", `;
        batches += `"Q${d}dp", `;
        batches += `"Qpd", `;
        batches += `"Qdp", `;

        batches = batches.slice(0, -2);
        noNumCheckCode = forLoopValidation("noNumAfterLetterStrings", "14", batches, "true", "isValidQC: No Number After Letter Test returned True: ");
    }
    updateCode();
}

let wrongSumCheckCode = "";
const wrongSumCheck = document.querySelector('#wrongSumCheck');
wrongSumCheck.addEventListener('change', wrongSumCheckGenerate);

function wrongSumCheckGenerate(e)
{
    wrongSumCheckCode = "";
    if (wrongSumCheck.checked)
    {
        let batches = "";
        q = randomNum();
        p = randomNum();
        d = randomNum();
        while (q == p + d)
        {
            q = randomNum();
            p = randomNum();
            d = randomNum();
        }
        batches += `"Q${q}p${p}d${d}", `
        q = randomNum();
        p = randomNum();
        d = randomNum();
        while (q == p + d)
        {
            q = randomNum();
            p = randomNum();
            d = randomNum();
        }
        batches += `"Q${q}p${p}d${d}", `
        batches = batches.slice(0, -2);
        noNumCheckCode = forLoopValidation("wrongSumStrings", "2", batches, "true", "isValidQC: No Number After Letter Test returned True: ");
    }
    updateCode();
}

let leadingZerosCheckCode = "";
const leadingZerosCheck = document.querySelector('#leadingZerosCheck');
leadingZerosCheck.addEventListener('change', leadingZerosCheckGenerate);

function leadingZerosCheckGenerate(e)
{
    leadingZerosCheckCode = "";
    if (leadingZerosCheck.checked)
    {
        let batches = "";
        validnums();
        let batch1 = `"Q${q}p${p}d${d}", `
        let batch2 = `"Q${q}d${d}p${p}", `
        let batch1_p = batch1.indexOf('p');
        let batch1_d = batch1.indexOf('d');
        let batch2_p = batch2.indexOf('p');
        let batch2_d = batch2.indexOf('d');
        
        batches += batch1.insert(batch1_p + 1, '0'.repeat(randomNum(min = 1, max = 9)));
        batches += batch2.insert(batch2_p + 1, '0'.repeat(randomNum(min = 1, max = 9)));

        batches += batch1.insert(batch1_d + 1, '0'.repeat(randomNum(min = 1, max = 9)));
        batches += batch2.insert(batch2_d + 1, '0'.repeat(randomNum(min = 1, max = 9)));

        let doubleBatch1 = batch1.insert(batch1.indexOf('p') + 1, '0'.repeat(randomNum(min = 1, max = 9)));
        doubleBatch1 = doubleBatch1.insert(doubleBatch1.indexOf('d') + 1, '0'.repeat(randomNum(min = 1, max = 9)));
        batches += doubleBatch1;

        let doubleBatch2 = batch2.insert(batch2.indexOf('p') + 1, '0'.repeat(randomNum(min = 1, max = 9)));
        doubleBatch2 = doubleBatch2.insert(doubleBatch2.indexOf('d') + 1, '0'.repeat(randomNum(min = 1, max = 9)));
        batches += doubleBatch2;

        batches = batches.slice(0, -2);
        leadingZerosCheckCode = forLoopValidation("leadingZerosStrings", "6", batches, "true", "isValidQC: Leading Zeros Test returned True: ");
    }
    updateCode();
}

// END
window.onload = regenerate;
function regenerate()
{
    validTestCheckGenerate();
    wrongCaseCheckGenerate();
    extraCharCheckGenerate();
    wrongOrderCheckGenerate();
    repeatCheckGenerate();
    qZeroCheckGenerate();
    noNumCheckGenerate();
    wrongSumCheckGenerate();
    leadingZerosCheckGenerate();
    updateCode();
}

const clipboardPrompt = document.querySelector('#copied');
document.querySelector("#generateCode").onclick = regenerate;
document.querySelector("#copyClipboard").onclick = function(){
    navigator.clipboard.writeText(output.textContent);
    clipboardPrompt.style.opacity = "1";
    clipboardPrompt.textContent = "Copied to clipboard!";
    setTimeout(function(){
        clipboardPrompt.style.opacity = "0.5";
    }, 3000);
}
