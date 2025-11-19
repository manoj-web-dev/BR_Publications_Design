// Form submission handler
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.manuscript-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your submission! We will review your manuscript and get back to you soon.');
            this.reset();
        });
    }
});