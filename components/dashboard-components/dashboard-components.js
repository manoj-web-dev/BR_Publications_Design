
const header = document.getElementById('header');
const navBar = document.getElementById('navBar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const dropdowns = document.querySelectorAll('[data-dropdown]');

let lastScroll = 0;

// ✅ Function to handle sticky nav + header visibility
function handleScroll() {
    const headerHeight = header.offsetHeight;
    const currentScroll = window.pageYOffset;

    // Stick nav and hide header
    if (currentScroll > headerHeight) {
        header.classList.add('hidden');
        navBar.classList.add('sticky');
    } else {
        header.classList.remove('hidden');
        navBar.classList.remove('sticky');
    }

    // ✅ Close hamburger menu if user scrolls
    if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        hamburger.classList.remove('active');
        dropdowns.forEach(d => d.classList.remove('active'));
    }

    // ✅ If menu is open (e.g., user scrolls slightly), keep its top position synced
    if (navLinks.classList.contains('show')) {
        updateHamburgerMenuTop();
    }

    lastScroll = currentScroll;
}

// ✅ Function to dynamically adjust dropdown top position
function updateHamburgerMenuTop() {
    if (navBar.classList.contains('sticky')) {
        navLinks.style.top = `${navBar.offsetHeight}px`;
    } else {
        navLinks.style.top = `${header.offsetHeight + navBar.offsetHeight}px`;
    }
}

// ✅ Hamburger menu toggle
hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navLinks.classList.toggle('show', isActive);

    if (isActive) {
        updateHamburgerMenuTop();
    } else {
        navLinks.style.top = '';
    }
});

// ✅ Dropdown toggle for mobile
dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');

    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 1050) {
            e.preventDefault();

            // Close other dropdowns
            dropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('active');
            });

            // Toggle current dropdown
            dropdown.classList.toggle('active');
        }
    });
});

// ✅ Improved outside click logic
document.addEventListener('click', (e) => {
    const isDropdownToggle = e.target.closest('.dropdown-toggle');
    const isDropdownContent = e.target.closest('.dropdown-content');
    const isHamburger = e.target.closest('#hamburger');

    // ✅ If clicked outside all dropdowns
    if (!isDropdownToggle && !isDropdownContent && !isHamburger) {
        dropdowns.forEach(d => d.classList.remove('active'));
    }

    // ✅ Close the hamburger menu completely if clicked outside nav
    if (!navBar.contains(e.target) && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        hamburger.classList.remove('active');
    }
});


// ✅ Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 1050) {
        navLinks.classList.remove('show');
        hamburger.classList.remove('active');
        dropdowns.forEach(d => d.classList.remove('active'));
    } else if (navLinks.classList.contains('show')) {
        updateHamburgerMenuTop();
    }
});

// ✅ Active link highlight
const navLinksAll = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');
navLinksAll.forEach(link => {
    link.addEventListener('click', () => {
        // Prevent default scroll jump if you handle navigation dynamically
        e.preventDefault();

        if (!link.closest('.dropdown')) {
            navLinksAll.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }

        // ✅ Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Optional: Close mobile menu if open
        navLinks.classList.remove('show');
        hamburger.classList.remove('active');

    });
});

// ✅ Scroll event listener
window.addEventListener('scroll', handleScroll, { passive: true });

// ✅ Keep dropdowns visible on mobile reflow
window.addEventListener('orientationchange', () => {
    if (navLinks.classList.contains('show')) {
        updateHamburgerMenuTop();
    }
});

// Initial check
handleScroll();

/* header section Functionality ends here */

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

