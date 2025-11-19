
// ResNova animation observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-in').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for sidebar links
document.querySelectorAll('.resNova-sidebar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});



// Get all cards
const books = Array.from(document.querySelectorAll(".book-card"));

// Pagination settings
const itemsPerPage = 20;
let currentPage = 1;

function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    books.forEach((book, index) => {
        book.style.display = (index >= start && index < end) ? "block" : "none";
    });

    document.querySelectorAll(".page").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`.page[data-page="${page}"]`)?.classList.add("active");

    currentPage = page;
}

// Add page attributes
document.querySelectorAll(".page").forEach(btn => {
    btn.addEventListener("click", () => {
        showPage(parseInt(btn.dataset.page));
    });
});

// Back, Next, First, Last
document.querySelector(".pag-btn:nth-child(1)").addEventListener("click", () => showPage(1));
document.querySelector(".pag-btn:nth-child(2)").addEventListener("click", () => {
    if (currentPage > 1) showPage(currentPage - 1);
});
document.querySelector(".pag-btn:nth-last-child(2)").addEventListener("click", () => {
    const lastPage = Math.ceil(books.length / itemsPerPage);
    if (currentPage < lastPage) showPage(currentPage + 1);
});
document.querySelector(".pag-btn:last-child").addEventListener("click", () => {
    const lastPage = Math.ceil(books.length / itemsPerPage);
    showPage(lastPage);
});

// Assign data-page to 1–6 number buttons
document.querySelectorAll(".page").forEach((p, i) => {
    p.setAttribute("data-page", i + 1);
});

// Load page 1 by default
showPage(1);

