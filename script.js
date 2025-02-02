var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var downloadPDFButton = document.getElementById('download-pdf');
form.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    var picture = (_a = document.getElementById('picture').files) === null || _a === void 0 ? void 0 : _a[0];
    var pictureURL = '';
    if (picture) {
        pictureURL = URL.createObjectURL(picture);
    }
    var resumeHTML = "\n        <h2><b>Resume</b></h2>\n        ".concat(pictureURL ? "<img src=\"".concat(pictureURL, "\" alt=\"Profile Picture\" style=\"width: 100px; height: 100px; border-radius: 50%;\">") : '', "\n        <h3>Personal Information</h3>\n        <p><b>Name:</b> <span contenteditable=\"true\">").concat(name, "</span></p>\n        <p><b>Email:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n        <p><b>Phone:</b> <span contenteditable=\"true\">").concat(phone, "</span></p>\n\n        <h3>Education</h3>\n        <p contenteditable=\"true\">").concat(education, "</p>\n\n        <h3>Experience</h3>\n        <p contenteditable=\"true\">").concat(experience, "</p>\n\n        <h3>Skills</h3>\n        <p contenteditable=\"true\">").concat(skills, "</p>\n    ");
    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHTML;
        downloadPDFButton.style.display = 'block'; // Show the download button
    }
    else {
        console.log('The resume display element is missing');
    }
});
// Download as PDF
downloadPDFButton.addEventListener('click', function () {
    var element = document.getElementById('resume-display');
    if (element) {
        html2pdf()
            .from(element)
            .save('resume.pdf');
    }
});
