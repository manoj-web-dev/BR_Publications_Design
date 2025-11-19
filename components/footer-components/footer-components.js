/* Floating Action Buttons Functionality starts here */
// Floating Action Buttons

const floatingButtons = document.querySelector('.floating-buttons');

// Define which sections should HIDE the floating buttons
const hideSections = ['contactPage'];

window.addEventListener('scroll', () => {
    let hide = false;

    hideSections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                hide = true; // currently viewing this section
            }
        }
    });

    floatingButtons.classList.toggle('hidden', hide);
});

/* Floating Action Buttons Functionality ends here */