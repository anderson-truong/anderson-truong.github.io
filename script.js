const output = document.querySelector('#outputCode');
let codePrefix = "int main()\n{\n";
let codeSuffix = "} "
let code = "";

let batch_count = 0;
let string_count = 0;

let digitMin = 1;
let digitMax = 9;

let multiBatchState = false;

const multiBatch = document.querySelector('#multiBatch');
multiBatch.addEventListener('change', multiBatchEnable);
function multiBatchEnable(e)
{
    if (multiBatch.checked)
    {
        multiBatchState = true;
        regenerate();
    }
    else
    {
        multiBatchState = false;
        regenerate();
    }
}

function multiBatchString(min=digitMin, max=digitMax)
{
    if (multiBatchState)
    {
        let order = randomNum(1, 2);
        var string = "";
        if (order == 1)
        {
            for (let i = 0; i < randomNum(1, 5); i++)
            {
                let a = randomNum(min, max);
                let b = randomNum(min, a);
                let c = a - b;
                string += `Q${a}p${b}d${c}`;
            }
        }
        else if (order == 2)
        {
            for (let i = 0; i < randomNum(1, 5); i++)
            {
                let a = randomNum(min, max);
                let b = randomNum(min, a);
                let c = a - b;
                string += `Q${a}d${b}p${c}`;
            }
        }
        return string;
    }
    else
    {
        return "";
    }
}

const multiDigit = document.querySelector('#multiDigit');
multiDigit.addEventListener('change', multiDigitGen);
function multiDigitGen(e)
{
    digitMin = 10;
    digitMax = 1000000;
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
    return `    std::string* ${array} = new std::string[${arraysize}]{ ${batches} };\n    for (int i = 0; i < ${arraysize}; i++)\n    {\n        if (isValidQC(${array}[i]) == ${bool})\n        {\n            std::cout << \"${message}\" << ${array}[i] << '\\n';\n        }\n    }\n    delete[] ${array};\n`

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

const totalString = document.querySelector('#totalString');
const totalBatch = document.querySelector('#totalBatch');

function updateCode()
{
    batch_count = 0;
    string_count = 0;
    batch_count += validBatches;
    batch_count += wrongCaseBatches;
    batch_count += extraCharBatches;
    batch_count += wrongOrderBatches;
    batch_count += repeatCheckBatches;
    batch_count += qZeroCheckBatches;
    batch_count += noNumCheckBatches;
    batch_count += wrongSumCheckBatches;
    batch_count += leadingZerosCheckBatches;

    string_count += validStrings;
    string_count += wrongCaseStrings;
    string_count += extraCharStrings;
    string_count += wrongOrderStrings;
    string_count += repeatCheckStrings;
    string_count += qZeroCheckStrings;
    string_count += noNumCheckStrings;
    string_count += wrongSumCheckStrings;
    string_count += leadingZerosCheckStrings;
    totalString.textContent = `Total Test Strings: ${string_count}`;
    totalBatch.textContent = `Total Batches: ${batch_count}`
    code = codePrefix;
    code += validTestCheckCode;
    code += wrongCaseCheckCode;
    code += extraCharCheckCode;
    code += wrongOrderCheckCode;
    code += repeatCheckCode;
    code += qZeroCheckCode;
    code += noNumCheckCode;
    code += wrongSumCheckCode;
    code += leadingZerosCheckCode;
    code += codeSuffix;
    output.textContent = code;
    Prism.highlightAll();
}

// Generate Valid Cases
let validBatches = 0;
let validStrings = 0;
let validTestCheckCode = "";
const validTestCheck = document.querySelector('#validTestCheck');
validTestCheck.addEventListener('change', validTestCheckGenerate);

function validTestCheckGenerate(e)
{
    validBatches = 0;
    validStrings = 0;
    validTestCheckCode = "";
    if (validTestCheck.checked)
    {
        let batches = "";
        // No Zeros
        validnums();
        validBatches = 6;
        let prefix = multiBatchString();
        let suffix = multiBatchString();
        if (multiBatchState)
        {
            validBatches += (prefix.split("Q").length - 1);
            validBatches += (suffix.split("Q").length - 1);
        }
        batches += `"${prefix}Q${q}p${p}d${d}${suffix}", `;
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            validBatches += (prefix.split("Q").length - 1);
            validBatches += (suffix.split("Q").length - 1);
        }
        batches += `"${prefix}Q${q}d${d}p${p}${suffix}", `;

        // With Zeros
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            validBatches += (prefix.split("Q").length - 1);
            validBatches += (suffix.split("Q").length - 1);
        }
        q = randomNum();
        batches += `"${prefix}Q${q}p${0}d${q}${suffix}", `;
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            validBatches += (prefix.split("Q").length - 1);
            validBatches += (suffix.split("Q").length - 1);
        }
        q = randomNum();
        batches += `"${prefix}Q${q}p${q}d${0}${suffix}", `;
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            validBatches += (prefix.split("Q").length - 1);
            validBatches += (suffix.split("Q").length - 1);
        }
        q = randomNum();
        batches += `"${prefix}Q${q}d${0}p${q}${suffix}", `;
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            validBatches += (prefix.split("Q").length - 1);
            validBatches += (suffix.split("Q").length - 1);
        }
        q = randomNum();
        batches += `"${prefix}Q${q}d${q}p${0}${suffix}"`;
        validStrings = 6;
        validTestCheckCode = forLoopValidation("validTestStrings", "6", batches, "false", "isValidQC: Valid Test Case returned False: ");
    }
    updateCode();
}

// ===========================
// LETTER TESTS

// Generate Wrong Upper/Lowercase
let wrongCaseBatches = 0;
let wrongCaseStrings = 0;
let wrongCaseCheckCode = "";
const wrongCaseCheck = document.querySelector('#wrongCaseCheck');
wrongCaseCheck.addEventListener('change', wrongCaseCheckGenerate);

function wrongCaseCheckGenerate(e)
{
    wrongCaseCheckCode = "";
    wrongCaseBatches = 0;
    wrongCaseStrings = 0;
    if (wrongCaseCheck.checked)
    {
        wrongCaseBatches = 14;
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
                            let prefix = multiBatchString();
                            let suffix = multiBatchString();
                            if (multiBatchState)
                            {
                                wrongCaseBatches += (prefix.split("Q").length - 1);
                                wrongCaseBatches += (suffix.split("Q").length - 1);
                            }
                            batches += `"${prefix}${letter1}${q}${letter2}${p}${letter21}${d}${suffix}", `;
                        }
                    }
                }
                else
                {
                    for (const letter22 of letters22)
                    {
                        if (!(letter1 == 'Q' && letter2 == 'd' && letter22 == 'p'))
                        {
                            let prefix = multiBatchString();
                            let suffix = multiBatchString();
                            if (multiBatchState)
                            {
                                wrongCaseBatches += (prefix.split("Q").length - 1);
                                wrongCaseBatches += (suffix.split("Q").length - 1);
                            }
                            batches += `"${prefix}${letter1}${q}${letter2}${p}${letter22}${d}${suffix}", `;
                        }
                    }
                }
            }
        }
        batches = batches.slice(0, -2);
        wrongCaseStrings += 14;
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
    let randomChar = "";
    for (let i = 0; i < count; i++)
    {
        randomChar += alphanum.charAt(Math.floor(Math.random() * alphanum.length))
    }
    return randomChar;
}

let extraCharBatches = 0;
let extraCharStrings = 0;
let extraCharCheckCode = "";
const extraCharCheck = document.querySelector('#extraCharCheck');
extraCharCheck.addEventListener('change', extraCharCheckGenerate);

function extraCharCheckGenerate(e)
{
    extraCharBatches = 0;
    extraCharStrings = 0;
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
                let prefix = multiBatchString();
                let suffix = multiBatchString();
                if (multiBatchState)
                {
                    extraCharBatches += (prefix.split("Q").length - 1);
                    extraCharBatches += (suffix.split("Q").length - 1);
                }
                batches += `"${prefix}${batch.insert(i, randomChar(1))}${suffix}", `;
                prefix = multiBatchString();
                suffix = multiBatchString();
                if (multiBatchState)
                {
                    extraCharBatches += (prefix.split("Q").length - 1);
                    extraCharBatches += (suffix.split("Q").length - 1);
                }
                batches += `"${prefix}${batch.insert(i, randomChar(randomNum(2, 10)))}${suffix}", `;
            }
        }
        extraCharBatches += batchCount;
        batches = batches.slice(0, -2);
        extraCharStrings += batchCount;
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

let wrongOrderBatches = 0;
let wrongOrderStrings = 0;
let wrongOrderCheckCode = "";
const wrongOrderCheck = document.querySelector('#wrongOrderCheck');
wrongOrderCheck.addEventListener('change', wrongOrderCheckGenerate);

function wrongOrderCheckGenerate(e)
{
    wrongOrderBatches = 0;
    wrongOrderStrings = 0;
    wrongOrderCheckCode = "";
    var batchCount = 0;
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
        for (const perm of perms)
        {
            let permstring = perm.join('');
            if (permstring != `Q${q}p${p}d${d}` && permstring != `Q${q}d${d}p${p}` && permstring != `Q${q}p${d}d${p}` && permstring != `Q${q}d${p}p${d}`)
            {
                let prefix = multiBatchString();
                let suffix = multiBatchString();
                if (multiBatchState)
                {
                    wrongOrderBatches += (prefix.split("Q").length - 1);
                    wrongOrderBatches += (suffix.split("Q").length - 1);
                }
                if (permstring.startsWith(q) || permstring.startsWith(p) || permstring.startsWith(d))
                {
                    prefix = "";
                }
                if (permstring.endsWith(q) || permstring.endsWith(p) || permstring.endsWith(d))
                {
                    suffix = "";
                }
                batches += `"${prefix}${permstring}${suffix}", `;
                batchCount++;
            }
        }
        wrongOrderBatches += batchCount;
        batches = batches.slice(0, -2);
        wrongOrderStrings += batchCount;
        wrongOrderCheckCode = forLoopValidation("wrongOrderStrings", `${batchCount}`, batches, "true", "isValidQC: Wrong Order Test returned True: ");
    }
    updateCode();
}

let repeatCheckBatches = 0;
let repeatCheckStrings = 0;
let repeatCheckCode = "";
const repeatCheck = document.querySelector('#repeatCheck');
repeatCheck.addEventListener('change', repeatCheckGenerate);

function repeatCheckGenerate(e)
{
    repeatCheckBatches = 0;
    repeatCheckStrings = 0;
    repeatCheckCode = "";
    var batchCount = 0;
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
                let prefix = multiBatchString();
                let suffix = multiBatchString();
                if (multiBatchState)
                {
                    repeatCheckBatches += (prefix.split("Q").length - 1);
                    repeatCheckBatches += (suffix.split("Q").length - 1);
                }
                batchArray.push(`"${prefix}${batch.insert(i, letter)}${suffix}", `);
            }
        }
        repeatCheckBatches += batchCount;
        batchArray = [...new Set(batchArray)];
        batchCount = batchArray.length;
        let batches = batchArray.join('');
        batches = batches.slice(0, -2);
        repeatCheckStrings += batchCount;
        repeatCheckCode = forLoopValidation("repeatCheck", batchCount, batches, "true", "isValidQC: Repeat Letter Test returned True: ");
    }
    updateCode();
}

let qZeroCheckBatches = 0;
let qZeroCheckStrings = 0;
let qZeroCheckCode = "";
const qZeroCheck = document.querySelector('#qZeroCheck');
qZeroCheck.addEventListener('change', qZeroCheckGenerate);

function qZeroCheckGenerate(e)
{
    qZeroCheckBatches = 0;
    qZeroCheckStrings = 0;
    qZeroCheckCode = "";
    if (qZeroCheck.checked)
    {
        qZeroCheckBatches = 2;
        validnums();
        let prefix = multiBatchString();
        let suffix = multiBatchString();
        if (multiBatchState)
        {
            qZeroCheckBatches += (prefix.split("Q").length - 1);
            qZeroCheckBatches += (suffix.split("Q").length - 1);
        }
        let batches = `"${prefix}${multiBatchString()}Q0p${p}d${d}${suffix}", `;
        validnums();
        batches += `"Q0d${d}p${p}"`;
        qZeroCheckStrings += 2;
        qZeroCheckCode = forLoopValidation("zeroAfterQStrings", "2", batches, "true", "isValidQC: Zero after Q Test returned True: ");
    }
    updateCode();
}

let noNumCheckBatches = 0;
let noNumCheckStrings = 0;
let noNumCheckCode = "";
const noNumCheck = document.querySelector('#noNumCheck');
noNumCheck.addEventListener('change', noNumCheckGenerate);

function noNumCheckGenerate(e)
{
    noNumCheckBatches = 0;
    noNumCheckStrings = 0;
    noNumCheckCode = "";
    if (noNumCheck.checked)
    {
        noNumCheckBatches = 14;
        let batches = "";
        for (let i = 0; i < 3; i++)
        {
            validnums();
            let nums1 = [q, p, d];
            let nums2 = [q, d, p];
            nums1[i] = '';
            nums2[i] = '';
            let prefix = multiBatchString();
            let suffix = multiBatchString();
            if (multiBatchState)
            {
                noNumCheckBatches += (prefix.split("Q").length - 1);
                noNumCheckBatches += (suffix.split("Q").length - 1);
            }
            batches += `"${prefix}Q${nums1[0]}p${nums1[1]}d${nums1[2]}${suffix}", `;
            prefix = multiBatchString();
            suffix = multiBatchString();
            if (multiBatchState)
            {
                noNumCheckBatches += (prefix.split("Q").length - 1);
                noNumCheckBatches += (suffix.split("Q").length - 1);
            }
            batches += `"${prefix}Q${nums2[0]}d${nums2[1]}p${nums2[2]}${suffix}", `;
        }
        let perms = permute([0, 1, 2]);
        let perms2 = perms;
        for (let i = 0; i < perms.length; i++)
        {
            perms2[i] = [perms2[i][0], perms2[i][1]];
        }
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            noNumCheckBatches += (prefix.split("Q").length - 1);
            noNumCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += `"${prefix}Qpd${d}${suffix}", `;
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            noNumCheckBatches += (prefix.split("Q").length - 1);
            noNumCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += `"${prefix}Qd${d}p${suffix}", `;
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            noNumCheckBatches += (prefix.split("Q").length - 1);
            noNumCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += `"${prefix}Qp${p}d${suffix}", `;
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            noNumCheckBatches += (prefix.split("Q").length - 1);
            noNumCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += `"${prefix}Qdp${p}${suffix}", `;
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            noNumCheckBatches += (prefix.split("Q").length - 1);
            noNumCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += `"${prefix}Q${d}pd${suffix}", `;
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            noNumCheckBatches += (prefix.split("Q").length - 1);
            noNumCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += `"${prefix}Q${d}dp${suffix}", `;
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            noNumCheckBatches += (prefix.split("Q").length - 1);
            noNumCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += `"${prefix}Qpd${suffix}", `;
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            noNumCheckBatches += (prefix.split("Q").length - 1);
            noNumCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += `"${prefix}Qdp${suffix}", `;

        batches = batches.slice(0, -2);
        noNumCheckStrings += 14;
        noNumCheckCode = forLoopValidation("noNumAfterLetterStrings", "14", batches, "true", "isValidQC: No Number After Letter Test returned True: ");
    }
    updateCode();
}

let wrongSumCheckBatches = 0;
let wrongSumCheckStrings = 0;
let wrongSumCheckCode = "";
const wrongSumCheck = document.querySelector('#wrongSumCheck');
wrongSumCheck.addEventListener('change', wrongSumCheckGenerate);

function wrongSumCheckGenerate(e)
{
    wrongSumCheckBatches = 0;
    wrongSumCheckStrings = 0;
    wrongSumCheckCode = "";
    if (wrongSumCheck.checked)
    {
        wrongSumCheckBatches = 2;
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
        let prefix = multiBatchString();
        let suffix = multiBatchString();
        if (multiBatchState)
        {
            wrongSumCheckBatches += (prefix.split("Q").length - 1);
            wrongSumCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += `"${prefix}Q${q}p${p}d${d}${suffix}", `
        q = randomNum();
        p = randomNum();
        d = randomNum();
        while (q == p + d)
        {
            q = randomNum();
            p = randomNum();
            d = randomNum();
        }
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            wrongSumCheckBatches += (prefix.split("Q").length - 1);
            wrongSumCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += `"${multiBatchString()}Q${q}p${p}d${d}${multiBatchString()}", `

        let q1 = randomNum();
        let q2 = randomNum();
        batches += `"Q${q1}p${q2}d0", "Q${q2}p0d${q1}"`
        wrongSumCheckStrings += 4;
        wrongSumCheckCode = forLoopValidation("wrongSumStrings", "4", batches, "true", "isValidQC: Wrong Sum Test returned True: ");
    }
    updateCode();
}

let leadingZerosCheckBatches = 0;
let leadingZerosCheckStrings = 0;
let leadingZerosCheckCode = "";
const leadingZerosCheck = document.querySelector('#leadingZerosCheck');
leadingZerosCheck.addEventListener('change', leadingZerosCheckGenerate);

function leadingZerosCheckGenerate(e)
{
    leadingZerosCheckBatches = 0;
    leadingZerosCheckStrings = 0;
    leadingZerosCheckCode = "";
    if (leadingZerosCheck.checked)
    {
        leadingZerosCheckBatches = 6;
        let batches = "";
        validnums();
        let batch1 = `Q${q}p${p}d${d}`
        let batch2 = `Q${q}d${d}p${p}`
        let batch1_p = batch1.indexOf('p');
        let batch1_d = batch1.indexOf('d');
        let batch2_p = batch2.indexOf('p');
        let batch2_d = batch2.indexOf('d');
        
        let prefix = multiBatchString();
        let suffix = multiBatchString();
        if (multiBatchState)
        {
            leadingZerosCheckBatches += (prefix.split("Q").length - 1);
            leadingZerosCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += '"' + prefix + batch1.insert(batch1_p + 1, '0'.repeat(randomNum(min = 1, max = 9))) + suffix + '" ,';
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            leadingZerosCheckBatches += (prefix.split("Q").length - 1);
            leadingZerosCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += '"' + prefix + batch2.insert(batch2_p + 1, '0'.repeat(randomNum(min = 1, max = 9))) + suffix + '" ,';
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            leadingZerosCheckBatches += (prefix.split("Q").length - 1);
            leadingZerosCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += '"' + prefix + batch1.insert(batch1_d + 1, '0'.repeat(randomNum(min = 1, max = 9))) + suffix + '" ,';
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            leadingZerosCheckBatches += (prefix.split("Q").length - 1);
            leadingZerosCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += '"' + prefix + batch2.insert(batch2_d + 1, '0'.repeat(randomNum(min = 1, max = 9))) + suffix + '" ,';
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            leadingZerosCheckBatches += (prefix.split("Q").length - 1);
            leadingZerosCheckBatches += (suffix.split("Q").length - 1);
        }


        let doubleBatch1 = batch1.insert(batch1.indexOf('p') + 1, '0'.repeat(randomNum(min = 1, max = 9)));
        doubleBatch1 = doubleBatch1.insert(doubleBatch1.indexOf('d') + 1, '0'.repeat(randomNum(min = 1, max = 9)));
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            leadingZerosCheckBatches += (prefix.split("Q").length - 1);
            leadingZerosCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += '"' + prefix + doubleBatch1 + suffix + '" ,';

        let doubleBatch2 = batch2.insert(batch2.indexOf('p') + 1, '0'.repeat(randomNum(min = 1, max = 9)));
        doubleBatch2 = doubleBatch2.insert(doubleBatch2.indexOf('d') + 1, '0'.repeat(randomNum(min = 1, max = 9)));
        prefix = multiBatchString();
        suffix = multiBatchString();
        if (multiBatchState)
        {
            leadingZerosCheckBatches += (prefix.split("Q").length - 1);
            leadingZerosCheckBatches += (suffix.split("Q").length - 1);
        }
        batches += '"' + prefix + doubleBatch2 + suffix + '" ,';

        batches = batches.slice(0, -2);
        leadingZerosCheckStrings += 6;
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
