const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const downloadPDFButton = document.getElementById('download-pdf') as HTMLButtonElement;

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
        <p><b>Name:</b> <span class="editable" data-field="name">${name}</span></p>
        <p><b>Email:</b> <span class="editable" data-field="email">${email}</span></p>
        <p><b>Phone:</b> <span class="editable" data-field="phone">${phone}</span></p>

        <h3>Education</h3>
        <p class="editable" data-field="education">${education}</p>

        <h3>Experience</h3>
        <p class="editable" data-field="experience">${experience}</p>

        <h3>Skills</h3>
        <p class="editable" data-field="skills">${skills}</p>
    `;

    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = `
            <div class="resume-overlay">
                <button class="edit-button">Edit Resume</button>
            </div>
            ${resumeHTML}
        `;
        downloadPDFButton.style.display = 'block'; // Show the download button
    } else {
        console.log('The resume display element is missing');
    }
});

// Handle Edit Button Click
resumeDisplayElement.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('edit-button')) {
        // Move data back into the form for editing
        const name = resumeDisplayElement.querySelector('[data-field="name"]')?.textContent || '';
        const email = resumeDisplayElement.querySelector('[data-field="email"]')?.textContent || '';
        const phone = resumeDisplayElement.querySelector('[data-field="phone"]')?.textContent || '';
        const education = resumeDisplayElement.querySelector('[data-field="education"]')?.textContent || '';
        const experience = resumeDisplayElement.querySelector('[data-field="experience"]')?.textContent || '';
        const skills = resumeDisplayElement.querySelector('[data-field="skills"]')?.textContent || '';

        (document.getElementById('name') as HTMLInputElement).value = name;
        (document.getElementById('email') as HTMLInputElement).value = email;
        (document.getElementById('phone') as HTMLInputElement).value = phone;
        (document.getElementById('education') as HTMLInputElement).value = education;
        (document.getElementById('experience') as HTMLInputElement).value = experience;
        (document.getElementById('skills') as HTMLInputElement).value = skills;

        // Clear the resume display
        resumeDisplayElement.innerHTML = '';
        downloadPDFButton.style.display = 'none'; // Hide the download button
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