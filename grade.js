const sections = document.querySelector('#sections');
const addSectionButton = document.querySelector('#addSection');
addSectionButton.addEventListener('click', createSection);
var sectionList = [];
var section_count = 1;
function createSection()
{
    const section = document.createElement('div');
    section.className = 'section';
    section.id = `section-${section_count}`;
    section.assignmentCount = 1;
    section.innerHTML = 
`<div class="row card-panel" style="margin-bottom: 0;">
    <div class="section-card col s12 valign-wrapper">
        <div class="grade-num col s3 m2 card-panel center-align green darken-1" style="margin-left: 0">
            <h5 class="grey-text text-lighten-5" id="section-${section_count}-grade">
                100%
            </h5>
        </div>
        <div class="input-field col s4">
            <input placeholder="ex. Exams" type="text" class="validate" id="section-${section_count}-label">
            <label>Section</label>
        </div>
        <div class="input-field col s3">
            <input placeholder="ex. 15" type="number" step=any class="validate" id="section-${section_count}-weight">
            <label>Percent</label>
        </div>
        <div class="col s1 center-align">
            <a class="btn-floating waves-effect waves-light light-blue accent-4" id="section-${section_count}-config"><i class="material-icons">create</i></a>
        </div>
    </div>
</div>

<div id="section-${section_count}-dropdown" class="hide">
    <div class="row card-panel center-align grey lighten-4" style="margin-top: 0; margin-bottom: 0;">
        <div class="col s2 offset-s5 center-align">
            <a class="btn-floating btn-small pulse waves-effect waves-light purple darken-1" id="section-${section_count}-addAssignment"><i class="material-icons">add</i></a>
        </div>
        <div class="col s3 m2 offset-s2 offset-m3" id="section-${section_count}-delete" style="padding: 0;">
            <a class="btn red darken-1">Delete</a>
        </div>
    </div>
</div>`
    sections.appendChild(section);

    const sectionGrade = document.querySelector(`#section-${section_count}-grade`)
    function updateSectionGrade(value)
    {
        sectionGrade.textContent = `${value}%`;
    }
    const sectionWeight = document.querySelector(`#section-${section_count}-weight`)

    // Delete Section
    const newSection = document.querySelector(`#section-${section_count}`);
    const deleteButton = document.querySelector(`#section-${section_count}-delete`);
    deleteButton.addEventListener('click', function(e){
        newSection.remove();
    });

    // Dropdown
    const drop = document.querySelector(`#section-${section_count}-dropdown`);

    // Open/Close dropdown
    const configButton = document.querySelector(`#section-${section_count}-config`);
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

    }

    // Add Assignments
    const addAssignmentButton = document.querySelector(`#section-${section_count}-addAssignment`);
    addAssignmentButton.addEventListener('click', function(e)
    {
        const newAssignment = document.createElement('div');
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
        <input placeholder="ex. 30" type="number" step="any" class="validate" id="section-${section_count}-assignment-${section.assignmentCount}-num">
        <label>Points</label>
    </div>
    <div class="input-field col s2">
        <input placeholder="ex. 50" type="number" step="any" class="validate" id="section-${section_count}-assignment-${section.assignmentCount}-den">
        <label>Max</label>
    </div>
    <div class="col s1 center-align">
        <a class="btn-floating btn-small waves-effect waves-light red darken-1" id="section-${section_count}-assignment-${section.assignmentCount}"><i class="material-icons">close</i></a>
    </div>
</div>`;
        drop.appendChild(newAssignment);

        const numerator = document.querySelector(`#section-${section_count}-assignment-${section.assignmentCount}-num`)
        const denominator = document.querySelector(`#section-${section_count}-assignment-${section.assignmentCount}-den`)
        numerator.addEventListener('input', changeRatio)
        denominator.addEventListener('input', changeRatio)
        function changeRatio()
        {
            section.grades[section.assignmentCount] = parseFloat(numerator.value) / parseFloat(denominator.value);
            console.log(section.grades[section.assignmentCount])
        }

        // Delete Assignment
        const newAssignmentDeleteButton = document.querySelector(`#section-${section_count}-assignment-${section.assignmentCount}`);
        newAssignmentDeleteButton.addEventListener('click', function(e){
            newAssignment.remove();
        })
        section.assignmentCount++;
        M.updateTextFields();
    })

    section_count++;
    M.updateTextFields();
}
createSection();