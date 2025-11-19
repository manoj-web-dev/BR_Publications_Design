
// Smooth scroll for navigation tabs
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // update active state on click
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // update url hash without jumping
            history.replaceState(null, '', targetId);
        }
    });
});

// Highlight active nav-tab on scroll using IntersectionObserver
(function () {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const matchingTab = document.querySelector(`.nav-tab[href="#${id}"]`);
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
                if (matchingTab) matchingTab.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(s => observer.observe(s));
})();

// Basic form submit handler (client-side only)
(function () {
    const form = document.getElementById('submissionForm');
    if (!form) return;

    function removeExistingMessage() {
        const existing = form.querySelector('.submission-success');
        if (existing) existing.remove();
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        removeExistingMessage();

        const submitBtn = form.querySelector('.submit-button');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        }

        // simple required-fields check
        const requiredFields = form.querySelectorAll('[required]');
        for (const field of requiredFields) {
            if (!field.value || !field.value.toString().trim()) {
                alert('Please fill all required fields.');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
                }
                return;
            }
        }

        // Collect form data (for actual use replace with fetch to your endpoint)
        const formData = new FormData(form);

        try {
            // Simulate network delay - replace this block with real submission (fetch)
            await new Promise(resolve => setTimeout(resolve, 900));

            // On success show inline confirmation and reset form
            const success = document.createElement('div');
            success.className = 'submission-success form-note';
            success.style.marginTop = '15px';
            success.innerHTML = '<strong><i class="fas fa-check-circle"></i> Success:</strong> Your submission has been received. Our team will contact you within 3-5 business days.';
            form.appendChild(success);

            form.reset();
        } catch (err) {
            alert('An error occurred while submitting. Please try again later.');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
            }
        }
    });
})();