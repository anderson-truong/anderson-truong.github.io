function randomNum(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setc(name, val, hr)
{
    const d = new Date();
    d.setTime(d.getTime() + (hr*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + val + ";" + expires + ";path=/";
}

function setcday(name, val, day)
{
    const d = new Date();
    d.setTime(d.getTime() + (day*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + val + ";" + expires + ";path=/";
}

function getc(name) {
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? match[1] : null;
}

const submit = document.querySelector('#submit');
submit.addEventListener('click', corr);

function a(m, l, p, s)
{
    if (m <= 0)
    {
        return 0;
    }
    return b(m-1, l, p, s) + a(m-1, l, p, s) - b(m-l, l, p, s)
}

function b(m, l, p, s)
{
    if (m == 0)
    {
        return s;
    }
    else if (m < 0)
    {
        return 0;
    }
    return a(m-1, l, p, s) * p;
}

function so(m, l, p, s)
{
    let sum = 0;
    for (let i = 0; i <= m; i++)
    {
        sum += b(i-l, l, p, s);
    }
    return sum;
}

const answer = document.querySelector('#answer')
const title = document.querySelector("#title")
const pprompt = document.querySelector("#puzzleprompt")
const panswer = document.querySelector("#puzzleanswer")
function corr(e)
{
    if (parseInt(answer.value) == a)
    {
        console.log("TRUE");
        deleteCookies();
        unlock(1);
    }
}

function unlock(num)
{
    title.textContent = `You have been granted ${num} day access.`;
    pprompt.style.visibility = "hidden";
    panswer.style.visibility = "hidden";
    setcday('acc', 1, num);
}

function deleteCookies()
{
    document.cookie = `${'a'.charCodeAt() + 1}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${'m'.charCodeAt() + 3}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${'l'.charCodeAt() + 2}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${'p'.charCodeAt() + 3}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${'s'.charCodeAt() + 4}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${'c'.charCodeAt() + 3}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

const anims = ['baboon', 'dodo bird', 'iguana', 'capybara', 'camel', 
'kangaroo', 'axolotl', 'manatee', 'naked mole rat', 'jerboa', 
'pangolin', 'alpaca', 'porcupine', 'newt', 'gorilla', 'llama',
'marmoset', 'dung beetle', 'polar bear', 'gila monster', 'skunk',
'giraffe', 'orangutan', 'zebra', 'hedgehog', 'koala', 'cougar',
'aardvark', 'hyena'
]
if (getc('m'.charCodeAt() + 3) != null)
{
    var animal = getc('a'.charCodeAt() + 1);
    var m = parseInt(getc('m'.charCodeAt() + 3), 3);
    var l = parseInt(getc('l'.charCodeAt() + 2), 2);
    var p = parseInt(getc('p'.charCodeAt() + 3), 3);
    var s = parseInt(getc('s'.charCodeAt() + 4), 4);
    var choice = parseInt(getc('c'.charCodeAt() + 3), 3);
} 
else 
{
    var animal = anims[anims.length * Math.random() | 0]
    var m = randomNum(3, 8)
    var l = randomNum(2, 5)
    var p = randomNum(2, 5)
    var s = randomNum(1, 3)
    var choice = randomNum(1, 4);
    setc('a'.charCodeAt() + 1, animal, 0.1);
    setc('m'.charCodeAt() + 3, m.toString(3), 0.1);
    setc('l'.charCodeAt() + 2, l.toString(2), 0.1);
    setc('p'.charCodeAt() + 3, p.toString(3), 0.1);
    setc('s'.charCodeAt() + 4, s.toString(4), 0.1);
    setc('c'.charCodeAt() + 3, choice.toString(3), 0.1);
}

var plural = '';
if (s > 1)
{
    plural = 's';
}

var ctext = "";
var a;
if (choice == 1)
{
    ctext = `How many <strong>total</strong> ${animal}s do you currently own (unsold) after <strong>${m}</strong> months?`;
    a = a(m, l, p, s) + b(m, l, p, s);
}
else if (choice == 2)
{
    ctext = `How many <strong>adult</strong> ${animal}s do you currently own (unsold) after <strong>${m}</strong> months?`
    a = a(m, l, p, s);
}
else if (choice == 3)
{
    ctext = `How many <strong>baby</strong> ${animal}s do you currently own (unsold) after <strong>${m}</strong> months?`
    a = b(m, l, p, s);
}
else if (choice == 4)
{
    ctext = `How many ${animal}s have you <strong>sold</strong> after <strong>${m}</strong> months?`
    a = so(m, l, p, s);
}
console.log(a);
const prompt = document.querySelector('#prompt');
    prompt.innerHTML = `You begin your lifelong dream of being a <strong>${animal}</strong> farmer! You start with <strong>${s} pair${plural}</strong> of newborn baby ${animal}s. 
    Each pair of adult ${animal}s produce <strong>${p} baby pairs</strong> every month.
    It takes <strong>1 month</strong> for the babies to grow into adults.
    You sell ${animal}s once they reach <strong>${l} months old</strong>, but after they produce their baby pairs.<br><br>
    ${ctext}`;