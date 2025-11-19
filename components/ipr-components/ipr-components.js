/* * Function to handle the "IPR" section */

// // Intersection Observer for scroll animations
// const observerOptionsIpr = {
//     threshold: 0.1,
//     rootMargin: '0px 0px -50px 0px'
// };

// const observerIpr = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('visible');
//         }
//     });
// }, observerOptionsIpr);

// document.querySelectorAll('.animate-in').forEach(el => {
//     observerIpr.observe(el);
// });

// Smooth scroll for CTA button
document.querySelector('.cta-button').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});