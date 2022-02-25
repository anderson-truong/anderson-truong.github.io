

const mainPrefix = "int main()\n{\n";
const mainSuffix = "}";

const output = document.querySelector('#outputCode');
const totalTest = document.querySelector('#totalTest');

var text = `int main()
{
    int idSet[10] = { 1, 89, 690, 7941, 18857, 134738, 9346187, 37984845, 320655416, 1585758428 };
    int idGet[10] = { -1, -1, -1, -1, -1, 134738, -1, -1, -1, -1 };
    int ageSet[5] = { 20, 21, 40, 65, 66 };
    int ageGet[5] = { -1, 21, 40, 65, -1 };
    double weightSet[5] = { 100.999999, 101, 200, 280, 280.000001 };
    double weightGet[5] = { -1, 101, 200, 280, -1 };

    for (int i{}; i < 10; i++)
    {
        for (int j{}; j < 5; j++)
        {
            for (int k{}; k < 5; k++)
            {
                BloodDonation* donateTest = new BloodDonation{ idSet[i], ageSet[j], weightSet[k] };
                if (donateTest->getID() != idGet[i])
                {
                    cout << "BloodDonation: ID = " << idSet[i] << " Age = " << ageSet[j] << " Weight = " << weightSet[k] << " | getID() should return: " << idGet[i] << ", You returned: " << donateTest->getID() << endl;
                }
                if (donateTest->getAge() != ageGet[j])
                {
                    cout << "BloodDonation: ID = " << idSet[i] << " Age = " << ageSet[j] << " Weight = " << weightSet[k] << " | getAge() should return: " << ageGet[i] << ", You returned: " << donateTest->getAge() << endl;
                }
                if (donateTest->getWeight() != weightGet[k])
                {
                    cout << "BloodDonation: ID = " << idSet[i] << " Age = " << ageSet[j] << " Weight = " << weightSet[k] << " | getWeight() should return: " << weightGet[i] << ", You returned: " << donateTest->getWeight() << endl;
                }
                delete donateTest;
            }
        }
    }
    int id{ 384783 };
    int age{ 30 };
    double weight{ 150 };
    int n = 8;
    BloodDonation validDonate{ id, age, weight };
    BloodDonation invalidDonate[7]{ BloodDonation( id, age, 0 ), BloodDonation( id, 0, weight ), BloodDonation( 0, age, weight ), BloodDonation( id, 0, 0 ), BloodDonation( 0, age, 0 ), BloodDonation( 0, weight, 0 ), BloodDonation( 0, 0, 0 ) };

    VacationAccount validTest{ id };
    VacationAccount invalidTest[2]{ VacationAccount(448384), VacationAccount(3483384) };
    if (validTest.getID() != id)
    {
        cout << "Vacation: ID = " << id  << " | getID() should return: " << id << ", You returned: " << validTest.getID() << endl;
    }
    if (validTest.getBalance() != 0)
    {
        cout << "Vacation: ID = " << id << " | getBalance() should return: " << 0 << ", You returned: " << validTest.getBalance() << endl;
    }
    for (VacationAccount invalid : invalidTest)
    {
        if (invalid.getBalance() != 0)
        {
            cout << "Vacation: ID = " << invalid.getID() << " | getBalance() should return: " << 0 << ", You returned: " << invalid.getBalance() << endl;
        }
    }
    for (int i{1}; i <= n; i++)
    {
        if (!validTest.addVacationToAccount(validDonate))
        {
            cout << "Vacation: ID = " << id << " | addVacationToAccount() should return: true, You returned: false" << endl;
        }
        else if (validTest.getBalance() != 4 * i)
        {
            cout << "Vacation: ID = " << id << " | getBalance() should return: " << 4 * i << ", You returned: " << validTest.getBalance() << endl;
        }
        for (BloodDonation invalid : invalidDonate)
        {
            if (validTest.addVacationToAccount(invalid))
            {
                cout << "Vacation: ID = " << id << " | addVacationToAccount() should return: false, You returned: true" << endl;
            }
            else if (validTest.getBalance() != 4 * i)
            {
                cout << "Vacation: ID = " << id << " | getBalance() should return: " << 4 * i << ", You returned: " << validTest.getBalance() << endl;
            }
        }
        for (VacationAccount invalid : invalidTest)
        {
            if (invalid.addVacationToAccount(validDonate))
            {
                cout << "Vacation: ID = " << id << " | addVacationToAccount() should return: false, You returned: true" << endl;
            }
            else if (invalid.getBalance() != 0)
            {
                cout << "Vacation: ID = " << id << " | getBalance() should return: " << 0 << ", You returned: " << invalid.getBalance() << endl;
            }
            for (BloodDonation donate : invalidDonate)
            {
                if (invalid.addVacationToAccount(donate))
                {
                    cout << "Vacation: ID = " << id << " | addVacationToAccount() should return: false, You returned: true" << endl;
                }
                else if (invalid.getBalance() != 0)
                {
                    cout << "Vacation: ID = " << id << " | getBalance() should return: " << 0 << ", You returned: " << invalid.getBalance() << endl;
                }
            }
        }
    }
}`

window.onload = regenerate;
function regenerate()
{
    //output.textContent = text;
    Prism.highlightAll();
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
