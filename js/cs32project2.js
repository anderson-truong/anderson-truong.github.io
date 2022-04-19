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

output.textContent = `#include "Sequence.h"
#include <iostream>
#include <cassert>

int main()
{
    const int maxFill = 20;

    // Default constructor
    {
        Sequence test;
        assert(test.empty() == true);
        assert(test.size() == 0);
    }
    // Copy constructor
    {
        Sequence base;
        for (int i = 0; i < maxFill; i++)
            assert(base.insert(i) == i);
        Sequence test = base;
        for (int i = 0; i < maxFill; i++)
            assert(test.find(i) == i);
        base.erase(maxFill - 1);
        test.erase(0);
        for (int i = 0; i < maxFill - 1; i++)
        {
            assert(base.find(i) == i);
            assert(test.find(i + 1) == i);
        }
    }
    // Assignment operator
    {
        Sequence base, test;
        // Create different Sequences
        for (int i = 0; i < maxFill; i++)
        {
            assert(base.insert(i) == i);
            assert(test.insert(i + maxFill) == i);
        }
        // Validate different Sequences
        for (int i = 0; i < maxFill; i++)
        {
            assert(base.find(i) == i);
            assert(test.find(i + maxFill) == i);
        }
        // Check if Sequences are the same after assignment
        test = base;
        for (int i = 0; i < maxFill; i++)
        {
            assert(base.find(i) == i);
            assert(test.find(i) == i);
        }
        // Check if modifying one does not modify the other
        base.erase(maxFill - 1);
        test.erase(0);
        for (int i = 0; i < maxFill - 1; i++)
        {
            assert(base.find(i) == i);
            assert(test.find(i + 1) == i);
        }

        // Assign to empty
        Sequence testFull, testEmpty;
        for (int i = 0; i < maxFill; i++)
            assert(testFull.insert(i) == i);
        for (int i = 0; i < maxFill; i++)
            assert(testFull.find(i) == i);
        testFull = testEmpty;
        for (int i = 0; i < maxFill; i++)
        {
            assert(testFull.find(i) == -1);
            assert(testEmpty.find(i) == -1);
        }

        // Aliasing
        Sequence testAlias;
        for (int i = 0; i < maxFill; i++)
            assert(testAlias.insert(i) == i);
        for (int i = 0; i < maxFill; i++)
            assert(testAlias.find(i) == i);
        testAlias = testAlias;
        for (int i = 0; i < maxFill; i++)
            assert(testAlias.find(i) == i);
    }
    // empty(), size()
    {
        Sequence test;
        assert(test.empty());
        assert(test.size() == 0);
        for (int i = 0; i < maxFill; i++)
        {
            assert(test.insert(i) == i);
            assert(test.empty() == false);
            assert(test.size() == i + 1);
        }
    }
    // insert(pos, value)
    {
        Sequence test;
        int mid = 0;
        for (int i = 0; i < maxFill; i++)
        {
            assert(test.insert(mid, i) == mid);
            assert(test.size() == i + 1);
            mid = test.size() / 2;
        }
        for (int i = 0; i < mid; i++)
        {
            assert(test.find(2 * i + 1) == i);
            assert(test.find(2 * i) == maxFill - 1 - i);
        }
    }
    // insert(value)
    {
        Sequence test1, test2;
        for (int i = 0; i < maxFill; i++)
        {
            assert(test1.insert(i) == i);
            assert(test2.insert(maxFill - i - 1) == 0);
            assert(test1.size() == i + 1);
            assert(test2.size() == i + 1);
        }
        for (int i = 0; i < maxFill; i++)
        {
            assert(test1.find(i) == i);
            assert(test2.find(i) == i);
        }
    }
    // erase(pos)
    {
        Sequence test;

        // Remove from end
        for (int i = 0; i < maxFill; i++)
            assert(test.insert(i) == i);
        for (int i = 0; i < maxFill; i++)
        {
            assert(test.erase(test.size() - 1));
            assert(test.size() == maxFill - 1 - i);
            for (int j = 0; j < test.size(); j++)
                assert(test.find(j) == j);
        }

        // Remove from front
        for (int i = 0; i < maxFill; i++)
            assert(test.insert(i) == i);
        for (int i = 0; i < maxFill; i++)
        {
            assert(test.erase(0));
            assert(test.size() == maxFill - 1 - i);
            for (int j = 0; j < test.size(); j++)
                assert(test.find(j + i + 1) == j);
        }
    }
    // remove(value)
    {
        Sequence test;
        ItemType arr[] = { 0, 7, 1, 7, 2, 7, 3, 7, 4, 7 };
        for (int i = 0; i < 10; i++)
            assert(test.insert(i, arr[i]) == i);
        assert(test.remove(7) == 5);
        for (int i = 0; i < 5; i++)
            assert(test.find(i) == i);
        assert(test.remove(7) == 0);
    }
    // get(pos, value)
    {
        Sequence test;
        ItemType IT;
        for (int i = 0; i < maxFill; i++)
            assert(test.insert(i) == i);
        for (int i = 0; i < maxFill; i++)
        {
            assert(test.get(i, IT));
            assert(IT == i);
        }
        assert(test.get(-1, IT) == false);
        assert(test.get(test.size(), IT) == false);
    }
    // set(pos, value)
    {
        Sequence test;
        for (int i = 0; i < maxFill; i++)
            assert(test.insert(i) == i);
        for (int i = 0; i < maxFill; i++)
            assert(test.find(i) == i);
        for (int i = 0; i < maxFill; i++)
            assert(test.set(i, i + maxFill));
        assert(test.set(-1, 1) == false);
        assert(test.set(test.size(), 1) == false);
        for (int i = 0; i < maxFill; i++)
            assert(test.find(i + maxFill) == i);
    }
    // swap(Seq1, Seq2)
    {
        Sequence test1, test2;
        for (int i = 0; i < maxFill; i++)
            assert(test1.insert(i) == i);
        for (int i = 0; i < 2 * maxFill; i++)
            assert(test2.insert(i + maxFill) == i);
        assert(test1.size() == maxFill);
        assert(test2.size() == maxFill * 2);

        for (int i = 0; i < maxFill; i++)
            assert(test1.find(i) == i);
        for (int i = 0; i < 2 * maxFill; i++)
            assert(test2.find(i + maxFill) == i);

        test1.swap(test2);
        assert(test1.size() == maxFill * 2);
        assert(test2.size() == maxFill);
        for (int i = 0; i < maxFill; i++)
            assert(test2.find(i) == i);
        for (int i = 0; i < 2 * maxFill; i++)
            assert(test1.find(i + maxFill) == i);

        // Empty swap
        Sequence testFull, testEmpty;
        for (int i = 0; i < maxFill; i++)
            assert(testFull.insert(i) == i);
        for (int i = 0; i < maxFill; i++)
            assert(testFull.find(i) == i);
        assert(testFull.size() == maxFill);
        assert(testEmpty.empty());

        testFull.swap(testEmpty);
        assert(testFull.empty());
        assert(testEmpty.size() == maxFill);
        for (int i = 0; i < maxFill; i++)
        {
            assert(testFull.find(i) == -1);
            assert(testEmpty.find(i) == i);
        }

        // Aliasing
        Sequence testAlias;
        for (int i = 0; i < maxFill; i++)
            assert(testAlias.insert(i) == i);
        testAlias.swap(testAlias);
        for (int i = 0; i < maxFill; i++)
            assert(testAlias.find(i) == i);
    }
    // subsequence
    {
        {
            Sequence t1, t2;
            ItemType t1a[] = { 1, 2, 2, 3, 2, 3, 4, 5 };
            ItemType t2a[] = { 2, 3, 4, 5 };
            for (int i = 0; i < 8; i++)
                t1.insert(i, t1a[i]);
            for (int i = 0; i < 4; i++)
                t2.insert(i, t2a[i]);
            assert(subsequence(t1, t2) == 4);
        }
        {
            Sequence t1, t2;
            ItemType t1a[] = { 1, 2, 2, 3, 2, 3, 4, 5 };
            ItemType t2a[] = { 2, 3, 4 };
            for (int i = 0; i < 8; i++)
                t1.insert(i, t1a[i]);
            for (int i = 0; i < 3; i++)
                t2.insert(i, t2a[i]);
            assert(subsequence(t1, t2) == 4);
        }
        {
            Sequence t1, t2;
            ItemType t1a[] = { 1, 2, 2, 3, 5 };
            ItemType t2a[] = { 2, 3, 4, 5 };
            for (int i = 0; i < 5; i++)
                t1.insert(i, t1a[i]);
            for (int i = 0; i < 4; i++)
                t2.insert(i, t2a[i]);
            assert(subsequence(t1, t2) == -1);
        }
        {
            Sequence t1, t2;
            ItemType t1a[] = { 1, 2, 2, 3, 5 };
            for (int i = 0; i < 5; i++)
                t1.insert(i, t1a[i]);
            assert(subsequence(t1, t2) == -1);
        }
        {
            Sequence t1, t2;
            ItemType t2a[] = { 2, 3, 4, 5 };
            for (int i = 0; i < 4; i++)
                t2.insert(i, t2a[i]);
            assert(subsequence(t1, t2) == -1);
        }
        {
            // Aliasing
            Sequence t1;
            ItemType t1a[] = { 1, 2, 3, 4, 5 };
            for (int i = 0; i < 4; i++)
                t1.insert(i, t1a[i]);
            assert(subsequence(t1, t1) == 0);
        }
    }
    // interleave
    {
        {
            Sequence t1, t2, t3;
            for (int i = 0; i < 5; i++)
            {
                t1.insert(2 * i);
                t2.insert(2 * i + 1);
                t3.insert(-1);
            }
            interleave(t1, t2, t3);
            assert(t3.size() == 10);
            for (int i = 0; i < 10; i++)
                assert(t3.find(i) == i);
        }
        {
            Sequence t1, t2, t3;
            ItemType t1a[] = { 1, 2, 3, 4, 5 };
            ItemType t2a[] = { 6, 7, 8 };
            ItemType t3a[] = { 1, 6, 2, 7, 3, 8, 4, 5 };
            for (ItemType elem : t1a)
                t1.insert(elem);
            for (ItemType elem : t2a)
                t2.insert(elem);
            interleave(t1, t2, t3);
            assert(t3.size() == 8);
            int i = 0;
            for (ItemType elem : t3a)
            {
                ItemType temp;
                t3.get(i, temp);
                assert(temp == elem);
                i++;
            }
        }
        {
            Sequence t1, t2, t3;
            ItemType t1a[] = { 6, 7, 8 };
            ItemType t2a[] = { 1, 2, 3, 4, 5 };
            ItemType t3a[] = { 6, 1, 7, 2, 8, 3, 4, 5 };
            for (ItemType elem : t1a)
                t1.insert(elem);
            for (ItemType elem : t2a)
                t2.insert(elem);
            interleave(t1, t2, t3);
            assert(t3.size() == 8);
            int i = 0;
            for (ItemType elem : t3a)
            {
                ItemType temp;
                t3.get(i, temp);
                assert(temp == elem);
                i++;
            }
        }
        {
            Sequence t1, t2, t3;
            ItemType t1a[] = { 1, 2, 3, 4, 5 };
            for (ItemType elem : t1a)
                t1.insert(elem);
            interleave(t1, t2, t3);
            assert(t3.size() == 5);
            int i = 0;
            for (ItemType elem : t1a)
            {
                ItemType temp;
                t3.get(i, temp);
                assert(temp == elem);
                i++;
            }
        }
        {
            Sequence t1, t2, t3;
            ItemType t2a[] = { 1, 2, 3, 4, 5 };
            for (ItemType elem : t2a)
                t2.insert(elem);
            interleave(t1, t2, t3);
            assert(t3.size() == 5);
            int i = 0;
            for (ItemType elem : t2a)
            {
                ItemType temp;
                t3.get(i, temp);
                assert(temp == elem);
                i++;
            }
        }
        {
            Sequence t1, t2, t3;
            interleave(t1, t2, t3);
            assert(t3.size() == 0);
        }
        {
            // Aliasing
            Sequence t1, t2;
            ItemType t1a[] = { 6, 7, 8 };
            ItemType t2a[] = { 1, 2, 3, 4, 5 };
            ItemType t3a[] = { 6, 1, 7, 2, 8, 3, 4, 5 };
            for (ItemType elem : t1a)
                t1.insert(elem);
            for (ItemType elem : t2a)
                t2.insert(elem);
            interleave(t1, t2, t1);
            int i = 0;
            for (ItemType elem : t3a)
            {
                ItemType temp;
                t1.get(i, temp);
                assert(temp == elem);
                i++;
            }
        }
        {
            // Aliasing
            Sequence t1, t2;
            ItemType t1a[] = { 6, 7, 8 };
            ItemType t2a[] = { 1, 2, 3, 4, 5 };
            ItemType t3a[] = { 6, 1, 7, 2, 8, 3, 4, 5 };
            for (ItemType elem : t1a)
                t1.insert(elem);
            for (ItemType elem : t2a)
                t2.insert(elem);
            interleave(t1, t2, t2);
            int i = 0;
            for (ItemType elem : t3a)
            {
                ItemType temp;
                t2.get(i, temp);
                assert(temp == elem);
                i++;
            }
        }
    }
    std::cout << "           ',\\n        .-\`-,\\\\__\\n          .\\"\`   \`,\\n        .'_.  ._  \`;.\\n    __ / \`      \`  \`.\\\\ .--.\\n   /--,| 0)   0)     )\`_.-,)\\n  |    ;.-----.__ _-');   /\\n   '--./         \`.\`/  \`\\"\`\\n      :   '\`      |.\\n      | \\     /  //\\n       \\\\ '---'  /'\\n        \`------' \\\\\\n         _/       \`--..." << std::endl;
}`