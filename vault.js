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

function deleteCookies()
{
    document.cookie = `${'a'.charCodeAt() + 1}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${'m'.charCodeAt() + 3}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${'l'.charCodeAt() + 2}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${'p'.charCodeAt() + 3}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${'s'.charCodeAt() + 4}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${'c'.charCodeAt() + 3}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = 'acc=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
var pprompt;
var panswer;
function start()
{
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
    if (!getc('acc'))
    {
        document.body.innerHTML += `<div id="test">
        <div class="d-flex justify-content-center my-5" id="puzzletitle">
            <h1 class="display-6" id="title">oh no! the tester seems to be locked by a puzzle.</h1>
        </div>
        <div class="d-flex justify-content-center" id="puzzleprompt">
            <div class="col-8 col-md-6 col-lg-4">
                <p id="prompt">
                </p>
            </div>
        </div>
        <div class="d-flex justify-content-center" id="puzzleanswer">
            <div class="col-8 col-md-6 col-lg-4">
                <div class="input-group mb-3">
                    <span class="input-group-text">Answer here</span>
                    <input type="text" class="form-control" id="answer">
                    <button class="btn btn-outline-secondary" type="button" id="submit">Submit</button>
                </div>
            </div>
        </div>
    </div>`
    pprompt = document.querySelector("#puzzleprompt")
    panswer = document.querySelector("#puzzleanswer")
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
        var animal = anims[Math.floor(Math.random()*anims.length)]
        var m = randomNum(4, 8)
        var l = randomNum(2, 5)
        var p = randomNum(2, 8)
        var s = randomNum(1, 3)
        while (m < l + 1)
        {
            m = randomNum(4, 8)
            l = randomNum(2, 5)
        }
        var choice = randomNum(1, 4);
        setc('a'.charCodeAt() + 1, animal, 0.1);
        setc('m'.charCodeAt() + 3, m.toString(3), 0.5);
        setc('l'.charCodeAt() + 2, l.toString(2), 0.5);
        setc('p'.charCodeAt() + 3, p.toString(3), 0.5);
        setc('s'.charCodeAt() + 4, s.toString(4), 0.5);
        setc('c'.charCodeAt() + 3, choice.toString(3), 0.5);
    }
    
    var plural = '';
    if (s > 1)
    {
        plural = 's';
    }
    
    var ctext = "";
    var ans;
    if (choice == 1)
    {
        ctext = `How many <strong>total</strong> ${animal}s do you currently own (unsold) after <strong>${m}</strong> months?`;
        ans = a(m, l, p, s) + b(m, l, p, s);
    }
    else if (choice == 2)
    {
        ctext = `How many <strong>adult</strong> ${animal}s do you currently own (unsold) after <strong>${m}</strong> months?`
        ans = a(m, l, p, s);
    }
    else if (choice == 3)
    {
        ctext = `How many <strong>baby</strong> ${animal}s do you currently own (unsold) after <strong>${m}</strong> months?`
        ans = b(m, l, p, s);
    }
    else if (choice == 4)
    {
        ctext = `How many ${animal}s have you <strong>sold</strong> after <strong>${m}</strong> months?`
        ans = so(m, l, p, s);
    }
    //console.log(a);
    const prompt = document.querySelector('#prompt');
        prompt.innerHTML = `You begin your lifelong dream of being a <strong>${animal}</strong> farmer! You start with <strong>${s} pair${plural}</strong> of newborn baby ${animal}s. 
        Each pair of adult ${animal}s produce <strong>${p} baby pairs</strong> every month.
        It takes <strong>1 month</strong> for the babies to grow into adults.
        You sell ${animal}s the month after they reach <strong>${l} months old</strong>, but you first let them produce their baby pairs for that month.<br><br>
        ${ctext}`;
    const submit = document.querySelector('#submit');
    submit.addEventListener('click', corr);
    const answer = document.querySelector('#answer')
    const title = document.querySelector("#title")
    function corr(e)
    {
        var poss = [ans.toString(), 'pineapple on pizza'];
        if (poss.includes(answer.value))
        {
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
        setTimeout(function(){
            window.location.reload();
        }, 2000);
    }
    }
    else
    {
        document.body.innerHTML += "<p>Hey</p>"
    }
}

window.onload = function()
{
    start();
}