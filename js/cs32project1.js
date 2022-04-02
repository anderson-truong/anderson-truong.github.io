
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

output.textContent = `#include <iostream>
#include <sstream>
#include <streambuf>
#include <string>
#include <cassert>
#include "globals.h"
#include "Gark.h"
#include "Player.h"
#include "Mesa.h"
#include "Game.h"
#include "History.h"
using namespace std;

class StreambufSwitcher
{
public:
    StreambufSwitcher(ios& dest, streambuf* sb,
        ios::iostate exceptions = ios::goodbit)
        : dest_stream(dest), oldsb(dest.rdbuf(sb)), oldex(dest.exceptions())
    {
        dest_stream.exceptions(exceptions);
    }
    StreambufSwitcher(ios& dest, ios& src)
        : StreambufSwitcher(dest, src.rdbuf(), src.exceptions())
    {}
    ~StreambufSwitcher()
    {
        dest_stream.rdbuf(oldsb); dest_stream.exceptions(oldex);
    }
private:
    ios& dest_stream;
    streambuf* oldsb;
    ios::iostate oldex;
};

bool test(int DIR, int size=5, int garkCount=5)
{
    if (size < 2 || garkCount <= 0)
        return false;
    Mesa* m;
    int mR, mC;
    int pR, pC;
    int gR, gC;
    int checkR, checkC;
    string output{};
    switch (DIR)
    {
    case UP:
        mR = pR = size;
        mC = pC = gC = checkC = 1;
        gR = 1;
        checkR = pR - 1;
        for (int i{}; i < size - 2; i++)
            output += ".\\n";
        if ('@' + garkCount > 'Z')
            output += 'Z';
        else
            output += ('@' + garkCount);
        output += "\\n.\\n\\n";
        if (size == 2)
            output = ".\\n.\\n\\n";
        break;
    case DOWN:
        mR = gR = size;
        mC = pC = checkC = gC = 1;
        pR = 1;
        checkR = 2;
        output += ".\\n";
        if ('@' + garkCount > 'Z')
            output += 'Z';
        else
            output += ('@' + garkCount);
        for (int i{}; i < size - 2; i++)
            output += "\\n.";
        output += "\\n\\n";
        if (size == 2)
            output = ".\\n.\\n\\n";
        break;
    case LEFT:
        mR = pR = gR = checkR = 1;
        mC = pC = size;
        gC = 1;
        checkC = size - 1;
        for (int i{}; i < size - 2; i++)
            output += ".";
        if ('@' + garkCount > 'Z')
            output += 'Z';
        else
            output += ('@' + garkCount);
        output += ".\\n\\n";
        if (size == 2)
            output = "..\\n\\n";
        break;
    case RIGHT:
        mR = pR = gR = checkR = 1;
        mC = gC = size;
        pC = 1;
        checkC = 2;
        output += ".";
        if ('@' + garkCount > 'Z')
            output += 'Z';
        else
            output += ('@' + garkCount);
        for (int i{}; i < size - 2; i++)
            output += ".";
        output += "\\n\\n";
        if (size == 2)
            output = "..\\n\\n";
        break;
    default:
        return false;
    }
    m = new Mesa(mR, mC);
    m->addPlayer(pR, pC);
    for (int i{}; i < garkCount; i++)
        m->addGark(gR, gC);
    while (m->garkCount() > 0)
    {
        while (m->numGarksAt(checkR, checkC) == 0)
            m->moveGarks();
        m->player()->moveOrAttack(DIR);
    }
    ostringstream oss;
    StreambufSwitcher sso2(cout, oss);
    m->history().display();
    string s = oss.str();
    delete m;
    return (s == output);
}

int main()
{
    for (int i = 2; i <= 3; i++)
        for (int j = 1; j <= 30; j++)
        {
            assert(test(UP, i, j));
            assert(test(DOWN, i, j));
            assert(test(LEFT, i, j));
            assert(test(RIGHT, i, j));
        }
    cout << "           ',\\n        .-\`-,\\\\__\\n          .\\"\`   \`,\\n        .'_.  ._  \`;.\\n    __ / \`      \`  \`.\\\\ .--.\\n   /--,| 0)   0)     )\`_.-,)\\n  |    ;.-----.__ _-');   /\\n   '--./         \`.\`/  \`\\"\`\\n      :   '\`      |.\\n      | \\     /  //\\n       \\\\ '---'  /'\\n        \`------' \\\\\\n         _/       \`--..." << endl;
}`