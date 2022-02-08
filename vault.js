function randomNum(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setc(name, val, hr)
{
    let d = new Date();
    d.setTime(d.getTime() + (hr * 3600000));
    document.cookie = `${name}=${val}; expires=${d.toUTCString()}; path=/`;
}

const getc = (name) => (
document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

const submit = document.querySelector('#submit');
submit.addEventListener('click', deleteCookies);

function deleteCookies(e)
{
    document.cookie = "m=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "l=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "p=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "s=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

var m = randomNum(5, 10)
var l = randomNum(2, 5)
var p = randomNum(2, 5)
var s = randomNum(1, 3)
var animal = "monkey";

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

console.log(m, l, p, s);
console.log (a(m, l, p, s) + b(m, l, p, s));

var plural = '';
if (s > 1)
{
    plural = 's';
}
let date = new Date();
console.log(date.getTime())

if (typeof('m')  === 'undefined')
{
    setc('m', m, 0.1);
    setc('l', l, 0.1);
    setc('p', p, 0.1);
    setc('s', s, 0.1);
} else 
{
    m = parseInt(getc('m'));
    l = parseInt(getc('l'));
    p = parseInt(getc('p'));
    s = parseInt(getc('s'));
}

const prompt = document.querySelector('#prompt');
prompt.innerHTML = `You begin your lifelong dream of being a ${animal} farmer! You start with <strong>${s} pair${plural}</strong> of newborn baby ${animal}s. 
The adults of this species of ${animal} produce <strong>${p} baby pairs</strong> every month.
It takes <strong>1 month</strong> for the babies to grow into adults.
You sell ${animal}s once they reach <strong>${l} months old</strong>, but after they produce their baby pairs.<br><br>
How many ${animal}s do you currently own (unsold) after <strong>${m}</strong> months (from when you started with your pair)?`;