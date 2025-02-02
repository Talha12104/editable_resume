export const form = document.getElementById('resume-form') as HTMLFormElement;
export const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
export const downloadPDFButton = document.getElementById('download-pdf') as HTMLButtonElement;

form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
    const picture = (document.getElementById('picture') as HTMLInputElement).files?.[0];

    let pictureURL = '';
    if (picture) {
        pictureURL = URL.createObjectURL(picture);
    }

    const resumeHTML = `
        <h2><b>Resume</b></h2>
        ${pictureURL ? `<img src="${pictureURL}" alt="Profile Picture" style="width: 100px; height: 100px; border-radius: 50%;">` : ''}
        <h3>Personal Information</h3>
        <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
        <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
        <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>

        <h3>Education</h3>
        <p contenteditable="true">${education}</p>

        <h3>Experience</h3>
        <p contenteditable="true">${experience}</p>

        <h3>Skills</h3>
        <p contenteditable="true">${skills}</p>
    `;

    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHTML;
        downloadPDFButton.style.display = 'block'; // Show the download button
    } else {
        console.log('The resume display element is missing');
    }
});

// Download as PDF
downloadPDFButton.addEventListener('click', () => {
    const element = document.getElementById('resume-display') as HTMLElement;
    if (element) {
        html2pdf()
            .from(element)
            .save('resume.pdf');
    }
});