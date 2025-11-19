/* home section Functionality starts here */

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