const sections = document.querySelector('#sections');
const sectionsGrade = document.querySelector('#sections-grade');
const sectionsColor = document.querySelector('#sections-color');
sections.nums = {};
sections.weights = {};
function updateSections(value)
{
    let classSettings = 'col s8 m6 offset-s2 offset-m3 card-panel ';
    if (value >= 95)
    {
        classSettings += 'green darken-1'
    }
    else if (value >= 90)
    {
        classSettings += 'light-green darken-3'
    }
    else if (value >= 85)
    {
        classSettings += 'light-green darken-2'
    }
    else if (value >= 80)
    {
        classSettings += 'light-green darken-1'
    }
    else if (value >= 75)
    {
        classSettings += 'yellow darken-3'
    }
    else if (value >= 70)
    {
        classSettings += 'yellow darken-4'
    }
    else if (value >= 65)
    {
        classSettings += 'deep-orange darken-1'
    }
    else if (value >= 60)
    {
        classSettings += 'deep-orange darken-3'
    }
    else if (value >= 55)
    {
        classSettings += 'red darken-2'
    }
    else if (value >= 50)
    {
        classSettings += 'red darken-4'
    }
    else 
    {
        classSettings += 'black'
    }
    sectionsColor.className = classSettings;
    sectionsGrade.textContent = `${value}%`;
}
let start = 100
updateSections(start.toFixed(2));
function sumSections()
{
    let total = 0;
    let totalWeights = 100;
    if (Object.keys(sections.weights).length != 0)
    {
        for (const property in sections.weights)
        {
            if (sections.nums[property])
            {
                total += sections.nums[property] * (sections.weights[property] / 100);
            }
            else
            {
                total += sections.weights[property];
            }
            totalWeights -= sections.weights[property];
        }
        total += totalWeights;
    }
    else
    {
        total = 100;
    }
    updateSections(total.toFixed(2))
}

const addSectionButton = document.querySelector('#addSection');
addSectionButton.addEventListener('click', createSection);
var sectionList = [];
var section_count = 1;
function createSection()
{
    const section = document.createElement('div');
    section.className = 'section';
    section.nums = {};
    section.dens = {};
    section.sID = section_count;
    section.id = `section-${section.sID}`
    section.assignmentCount = 1;
    section.innerHTML = 
`<div class="row card-panel" style="margin-bottom: 0;">
    <div class="section-card col s12 valign-wrapper">
        <div class="grade-num col s3 m2 card-panel center-align green darken-1" id="section-${section.sID}-color" style="margin-left: 0">
            <h5 class="grey-text text-lighten-5" id="section-${section.sID}-grade">
                100%
            </h5>
        </div>
        <div class="input-field col s4">
            <input placeholder="ex. Exams" type="text" class="validate" id="section-${section.sID}-label">
            <label>Section</label>
        </div>
        <div class="input-field col s3">
            <input placeholder="ex. 15" type="number" step=any class="validate" id="section-${section.sID}-weight">
            <label>Percent</label>
        </div>
        <div class="col s1 center-align">
            <a class="btn-floating waves-effect waves-light light-blue accent-4" id="section-${section.sID}-config"><i class="material-icons">create</i></a>
        </div>
    </div>
</div>

<div id="section-${section.sID}-dropdown" class="hide">
    <div class="row card-panel center-align grey lighten-4" style="margin-top: 0; margin-bottom: 0;">
        <div class="col s2 offset-s5 center-align">
            <a class="btn-floating btn-small pulse waves-effect waves-light purple darken-1" id="section-${section.sID}-addAssignment"><i class="material-icons">add</i></a>
        </div>
        <div class="col s3 m2 offset-s2 offset-m3" id="section-${section.sID}-delete" style="padding: 0;">
            <a class="btn red darken-1">Delete</a>
        </div>
    </div>
</div>`
    sections.appendChild(section);

    const sectionGrade = document.querySelector(`#section-${section.sID}-grade`)
    const sectionColor = document.querySelector(`#section-${section.sID}-color`)
    const sectionWeight = document.querySelector(`#section-${section.sID}-weight`)
    sectionWeight.addEventListener('input', sumWeights);
    function sumWeights()
    {
        if (sectionWeight.value)
        {
            sections.weights[section.sID] = parseFloat(sectionWeight.value);
        }
        else
        {
            delete sections.weights[section.sID];
        }
        sumSections();
    }
    function updateSectionGrade(value)
    {
        let classSettings = 'grade-num col s3 m2 card-panel center-align ';
        if (value >= 95)
        {
            classSettings += 'green darken-1'
        }
        else if (value >= 90)
        {
            classSettings += 'light-green darken-3'
        }
        else if (value >= 85)
        {
            classSettings += 'light-green darken-2'
        }
        else if (value >= 80)
        {
            classSettings += 'light-green darken-1'
        }
        else if (value >= 75)
        {
            classSettings += 'yellow darken-3'
        }
        else if (value >= 70)
        {
            classSettings += 'yellow darken-4'
        }
        else if (value >= 65)
        {
            classSettings += 'deep-orange darken-1'
        }
        else if (value >= 60)
        {
            classSettings += 'deep-orange darken-3'
        }
        else if (value >= 55)
        {
            classSettings += 'red darken-2'
        }
        else if (value >= 50)
        {
            classSettings += 'red darken-4'
        }
        else 
        {
            classSettings += 'black'
        }
        sectionColor.className = classSettings;
        sections.nums[section.sID] = value;
        sectionGrade.textContent = `${Math.trunc(value)}%`;
        sumSections()
    }

    // Delete Section
    const newSection = document.querySelector(`#section-${section.sID}`);
    const deleteButton = document.querySelector(`#section-${section.sID}-delete`);
    deleteButton.addEventListener('click', deleteSection);
    function deleteSection()
    {
        delete sections.nums[section.sID];
        newSection.remove();
    }

    // Dropdown
    const drop = document.querySelector(`#section-${section.sID}-dropdown`);

    // Open/Close dropdown
    const configButton = document.querySelector(`#section-${section.sID}-config`);
    configButton.on = false;
    configButton.addEventListener('click', function(e){
        if (configButton.on)
        {
            configButton.on = false;
            drop.classList.add('hide')
        }
        else
        {
            configButton.on = true;
            drop.classList.remove('hide')
        }
    });

    function sumAssignments()
    {
        let nums = 0;
        let dens = 0;
        for (const property in section.nums)
        {
            nums += section.nums[property];
            dens += section.dens[property];
        }
        updateSectionGrade(100*nums / dens)
    }

    // Add Assignments
    const addAssignmentButton = document.querySelector(`#section-${section.sID}-addAssignment`);
    addAssignmentButton.addEventListener('click', function(e)
    {
        const newAssignment = document.createElement('div');
        newAssignment.aID = section.assignmentCount;
        newAssignment.id = `section-${section.sID}-assignment-${newAssignment.aID}`;
        newAssignment.className = 'row card-panel';
        newAssignment.style.marginTop = 0;
        newAssignment.style.marginBottom = 0;
        newAssignment.innerHTML = 
`<div class="col s12 valign-wrapper">
    <div class="input-field col s4">
        <input placeholder="ex. Exam 1" type="text" class="validate">
        <label>Assignment</label>
    </div>
    <div class="input-field col s2">
        <input placeholder="ex. 30" type="number" step="any" class="validate" id="section-${section.sID}-assignment-${newAssignment.aID}-num">
        <label>Points</label>
    </div>
    <div class="input-field col s2">
        <input placeholder="ex. 50" type="number" step="any" class="validate" id="section-${section.sID}-assignment-${newAssignment.aID}-den">
        <label>Max</label>
    </div>
    <div class="col s1 center-align">
        <a class="btn-floating btn-small waves-effect waves-light red darken-1" id="section-${section.sID}-assignment-${newAssignment.aID}-delete"><i class="material-icons">close</i></a>
    </div>
</div>`;
        drop.appendChild(newAssignment);

        const numerator = document.querySelector(`#section-${section.sID}-assignment-${newAssignment.aID}-num`)
        const denominator = document.querySelector(`#section-${section.sID}-assignment-${newAssignment.aID}-den`)
        numerator.addEventListener('input', changeRatio)
        denominator.addEventListener('input', changeRatio)
        function changeRatio()
        {
            if (numerator.value && denominator.value)
            {
                section.nums[newAssignment.aID] = parseFloat(numerator.value);
                section.dens[newAssignment.aID] = parseFloat(denominator.value);
                sumAssignments();
            }
        }

        // Delete Assignment
        const newAssignmentDeleteButton = document.querySelector(`#section-${section.sID}-assignment-${newAssignment.aID}-delete`);
        newAssignmentDeleteButton.addEventListener('click', function(e){
            delete section.nums[newAssignment.aID];
            delete section.dens[newAssignment.aID];
            newAssignment.remove();
        })
        section.assignmentCount++;
        M.updateTextFields();
    })

    section_count++;
    M.updateTextFields();
}
createSection();