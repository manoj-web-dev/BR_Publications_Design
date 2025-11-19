
// Intersection Observer for animations
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

// Observe all animate-in elements
document.querySelectorAll('.animate-in').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for CTA button
document.addEventListener('DOMContentLoaded', function () {
    const ctaButton = document.querySelector('.books-cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function (e) {
            e.preventDefault();
            // You can add form submission logic or scroll to submission form here
            alert('Thank you for your interest! Please contact us to submit your manuscript.');
        });
    }
});

// Add scroll reveal effect for cards
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.books-services-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Initialize card animations
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.books-services-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
    });
});