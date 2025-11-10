
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

/* home section Functionality ends here */

/**
 * Home page slider wallpaper section
 */
let slideIndex = 1;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = "block";
    // setTimeout(showSlides, 5000); // 15 seconds
}
showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Auto slide
setInterval(() => {
    showSlides(slideIndex += 1);
}, 5000); // 15 seconds

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (i = 0; i < slides.length; i++)
        slides[i].style.display = "none";

    for (i = 0; i < dots.length; i++)
        dots[i].classList.remove("active-dot");

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active-dot");
}

/**
 * Trending books carousel
 * This code creates a simple carousel for the trending books section.
 * It automatically slides through the books every 3 seconds and pauses on hover.
 */
function getVisibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 4;
}

/* BOOK CAROUSEL */
const bookTrack = document.querySelector('.book-track');
const bookCards = document.querySelectorAll('.book-card');
const totalBooks = bookCards.length;
let bookIndex = 0;
let bookVisible = getVisibleCount();
let bookAutoSlide;

function moveBookCarousel() {
    bookIndex++;
    if (bookIndex > totalBooks - bookVisible) bookIndex = 0;
    bookTrack.style.transform = `translateX(-${bookIndex * (100 / bookVisible)}%)`;
}

function startBookAutoSlide() {
    bookAutoSlide = setInterval(moveBookCarousel, 3000);
}
function stopBookAutoSlide() {
    clearInterval(bookAutoSlide);
}

bookCards.forEach(card => {
    card.addEventListener('mouseenter', stopBookAutoSlide);
    card.addEventListener('mouseleave', startBookAutoSlide);
});

startBookAutoSlide();


/**
 * Trending Journal Section
 * This code creates a simple carousel for the trending journals section.
 * It automatically slides through the journals every 3 seconds and pauses on hover.
 */

/* JOURNAL CAROUSEL */
const journalTrack = document.querySelector('.journal-track');
const journalCards = document.querySelectorAll('.journal-card');
const totalJournals = journalCards.length;
let journalIndex = 0;
let journalVisible = getVisibleCount();
let journalAutoSlide;

function moveJournalCarousel() {
    journalIndex++;
    if (journalIndex > totalJournals - journalVisible) journalIndex = 0;
    journalTrack.style.transform = `translateX(-${journalIndex * (100 / journalVisible)}%)`;
}

function startJournalSlide() {
    journalAutoSlide = setInterval(moveJournalCarousel, 3000);
}
function stopJournalSlide() {
    clearInterval(journalAutoSlide);
}

journalCards.forEach(card => {
    card.addEventListener('mouseenter', stopJournalSlide);
    card.addEventListener('mouseleave', startJournalSlide);
});

startJournalSlide();

/* SWIPE SUPPORT */
function enableSwipe(track, moveFn, stopFn, startFn, type) {
    let startX = 0, moveX = 0;
    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        stopFn();
    });
    track.addEventListener('touchmove', e => {
        moveX = e.touches[0].clientX - startX;
    });
    track.addEventListener('touchend', () => {
        if (Math.abs(moveX) > 50) {
            if (moveX < 0) moveFn();
            else {
                if (type === 'book') {
                    bookIndex = bookIndex <= 0 ? totalBooks - bookVisible : bookIndex - 1;
                    bookTrack.style.transform = `translateX(-${bookIndex * (100 / bookVisible)}%)`;
                } else {
                    journalIndex = journalIndex <= 0 ? totalJournals - journalVisible : journalIndex - 1;
                    journalTrack.style.transform = `translateX(-${journalIndex * (100 / journalVisible)}%)`;
                }
            }
        }
        startFn();
    });
}

enableSwipe(bookTrack, moveBookCarousel, stopBookAutoSlide, startBookAutoSlide, 'book');
enableSwipe(journalTrack, moveJournalCarousel, stopJournalSlide, startJournalSlide, 'journal');

/* RESIZE HANDLER */
window.addEventListener('resize', () => {
    bookVisible = getVisibleCount();
    journalVisible = getVisibleCount();
    bookTrack.style.transform = `translateX(0%)`;
    journalTrack.style.transform = `translateX(0%)`;
    bookIndex = 0;
    journalIndex = 0;
});

/* home section Functionality ends here */

function showSection(section, page) {


    const sections = document.querySelectorAll('main > section');
    sections.forEach(sec => {
        sec.style.display = 'none';
    });

    const activeSection = document.getElementById(section);
    if (activeSection) {

        activeSection.classList.add('active'); // Add active class
        activeSection.removeAttribute('style'); // Ensure no inline style overrides

    } else {
        console.error(`Section with id "${section}" not found.`);
    }
};

/* Function to handle the "About Us" section */

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
    observer.observe(el);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Enhanced hover effects
document.querySelectorAll('.division-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.borderLeftColor = '#ffa500';
    });
    item.addEventListener('mouseleave', function () {
        this.style.borderLeftColor = '#1e3c72';
    });
});

// Function to handle the "Contact Us" section



// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');

    // Reset form
    this.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Add floating animation to form inputs on focus
const formControls = document.querySelectorAll('.form-control');
formControls.forEach(control => {
    control.addEventListener('focus', function () {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.parentElement.style.transition = 'transform 0.3s';
    });

    control.addEventListener('blur', function () {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

/* * Function to handle the "IPR" section */

// Intersection Observer for scroll animations
const observerOptionsIpr = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observerIpr = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptionsIpr);

document.querySelectorAll('.animate-in').forEach(el => {
    observerIpr.observe(el);
});

// Smooth scroll for CTA button
document.querySelector('.cta-button').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

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
