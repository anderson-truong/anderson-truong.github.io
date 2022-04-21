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

output.textContent = ``