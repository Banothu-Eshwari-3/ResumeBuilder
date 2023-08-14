var experienceCount = 1;
var educationCount = 1;
const skillSet = new Set();
var fileName = "";



function previewImage(event) {

    console.log("previewImage(event) <<");
    console.log(typeof event);
    var imagePreview = document.getElementById("image-preview");


    if (event.target.files[0]) {
        imagePreview.src = URL.createObjectURL(event.target.files[0]);
        imagePreview.style.display = "block";
        imagePreview.onload = function () {
            URL.revokeObjectURL(imagePreview.src);//free memory
        }


    }
    console.log("previewImage(event) >>");
}
function addSkill() {
    console.log("addSkill() <<");

    if (document.querySelector("#skill-input").value.length == 0) {
        alert("Please enter a skill");
    } else {
        var skillValue = document.querySelector("#skill-input").value;
        if (skillSet.has(skillValue)) {
            alert("Skill already exists");
            return;
        }
        skillSet.add(skillValue);

        document.querySelector("#skills").innerHTML += `
        <div class="skill mt-1">
        <span class="skill-name">${skillValue}</span>
        <button class="btn btn-outline-danger delete">
        <i class="fa-solid fa-trash-can"></i>
        </div>
        `;
        document.querySelector("#skill-input").value = "";


        var current_tasks = document.querySelectorAll(".delete");
        console.log(typeof (current_tasks));

        for (var i = 0; i < current_tasks.length; i++) {
            current_tasks[i].onclick = function () {
                this.parentNode.remove();

            };
        }
    }
    console.log("addSkill() >>");
}

function addWorkExperience() {
    console.log("addWorkExperience() <<");
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control", "we-field", "mt-1");
    newNode.setAttribute("rows", 3);
    newNode.setAttribute("id", "experience-", + ++experienceCount);
    newNode.setAttribute("placeholder", "Enter work/project experience - " + experienceCount);

    let experienceDiv = document.getElementById("experience-div");
    let experienceAddbuttonDiv = document.getElementById("we-btns-div");
    let we_del_btn = document.getElementById("we-del-div");

    experienceDiv.insertBefore(newNode, experienceAddbuttonDiv);
    console.log("addWorkExperience() >>");
}

function removeWorkExperience() {
    console.log("removeWorkExperience() << " + experienceCount);
    let latestExperience = document.getElementById("experience-" + experienceCount);
    latestExperience.remove();
    --experienceCount;


    console.log("removeWorkExperience() >>");



}

function addEducation() {
    console.log("addEducation() <<");
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control", "ed-field", "mt-1");
    newNode.setAttribute("rows", 3);
    newNode.setAttribute("id", "education-", + ++educationCount);
    newNode.setAttribute("placeholder", "Enter education details - " + educationCount);

    let educationDiv = document.getElementById("education-div");
    let educationAddbuttonDiv = document.getElementById("ed-btns-div");
    let we_del_btn = document.getElementById("ed-del-div");

    educationDiv.insertBefore(newNode, educationAddbuttonDiv);
    console.log("addEducation() >>");
}
function removeEducation() {
    console.log("removeEducation() << " + educationCount);
    let latestExperience = document.getElementById("education-" + educationCount);
    latestExperience.remove();
    --educationCount;


    console.log("removeEducation() >>");

}
function startOver() {
    console.log("startOver() <<");
    window.location.reload();
    console.log("startOver() >>");
}

function generateResume() {
    console.log("generateResume() <<");
    let fullName = document.getElementById("full-name").value;
    let fullNameTempalte = document.getElementById("full-name-template");
    fullNameTempalte.innerHTML = fullName;

    let address = document.getElementById("address").value;
    let addressTempalte = document.getElementById("address-template");
    addressTempalte.innerHTML = address;

    let dob = document.getElementById("dob").value;
    let dobTempalte = document.getElementById("dob-template");
    dobTempalte.innerHTML = dob;

    let email = document.getElementById("email").value;
    let emailTempalte = document.getElementById("email-template");
    emailTempalte.innerHTML = email;

    let phone = document.getElementById("phone").value;
    let phoneTempalte = document.getElementById("phone-template");
    phoneTempalte.innerHTML = phone;

    let linkedin = document.getElementById("linkedin").value;
    let linkedinTempalte = document.getElementById("linkedin-template");
    linkedinTempalte.innerHTML = linkedin;

    let github = document.getElementById("github").value;
    let githubTempalte = document.getElementById("github-template");
    githubTempalte.innerHTML = github;

    let objective = document.getElementById("objective").value;
    let objectiveTempalte = document.getElementById("objective-template");
    objectiveTempalte.innerHTML = objective;

    ///Skills Template
    let skillString = "";
    for (let skill of skillSet) {
        skillString += `<span class="badge rounded-pill bg-secondary skill-pill">${skill}</span>`;
    }
    let skillsTemplate = document.getElementById("skill-template-div");
    skillsTemplate.innerHTML = skillString;

    //work experience
    let experiences = document.getElementsByClassName("we-field");

    let experiencesListString = "";
    for (let experience of experiences) {
        experiencesListString += `<li>${experience.value}</li>`;

    }
    let experiencesTemplate = document.getElementById("we-template");
    experiencesTemplate.innerHTML = experiencesListString;

    //Education Template
    let academicQualifications = document.getElementsByClassName("ed-field");
    let academicQualificationsString = "";

    for (let qualification of academicQualifications) {
        academicQualificationsString += `<li>${qualification.value}</li>`;

    }
    let edTemplate = document.getElementById("ed-template");
    edTemplate.innerHTML = academicQualificationsString;

    //Profile picture
    let file = document.getElementById("profile-img").files[0];
    if (file == undefined) {
        console.log("filenot selected");
    } else {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            document.getElementById("profile-img-template").src = reader.result;
        };

    }
    //unhiding the resume template
    document.getElementById("resume-template").style.display = "block";
    document.getElementById("save-btn").style.display = "block";

    //hiding the resume template
    document.getElementById("resume-form").style.display = "none";
    console.log("generateResume() >>");
}
function printResume(templateID){
    console.log("printResume() <<");
    var printContent = document.getElementById(templateID).innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    console.log("printResume() >>");

}