
// Smooth scroll for back button
document.querySelector('.back-button').addEventListener('click', function (e) {
    if (document.referrer) {
        e.preventDefault();
        window.history.back();
    }
});

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

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Publication card click handlers
document.querySelectorAll('.publication-card').forEach(card => {
    card.addEventListener('click', function (e) {
        if (!e.target.closest('.pub-btn')) {
            const title = this.querySelector('.publication-title').textContent;
            console.log('Viewing publication:', title);
            // Add navigation logic here
        }
    });
});

// Button click handlers
document.querySelectorAll('.pub-btn-primary').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const card = this.closest('.publication-card');
        const title = card.querySelector('.publication-title').textContent;
        alert(`Opening: ${title}`);
        // Add navigation or modal logic here
    });
});

document.querySelectorAll('.pub-btn-secondary').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const card = this.closest('.publication-card');
        const title = card.querySelector('.publication-title').textContent;

        if (this.textContent.includes('Download')) {
            alert(`Downloading: ${title}`);
            // Add download logic here
        } else if (this.textContent.includes('Cite')) {
            alert(`Citation copied for: ${title}`);
            // Add citation copy logic here
        }
    });
});

// Social link handlers
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const platform = this.title;
        alert(`Opening ${platform} profile...`);
        // Add actual social media links here
    });
});

// Contact item click handlers
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function () {
        const heading = this.querySelector('h4').textContent;
        const content = this.querySelector('p').textContent;

        if (heading.includes('Email')) {
            window.location.href = `mailto:${content}`;
        } else if (heading.includes('Phone')) {
            window.location.href = `tel:${content.replace(/[^0-9+]/g, '')}`;
        } else if (heading.includes('Website')) {
            window.open(`https://${content}`, '_blank');
        }
    });
});

// Add ripple effect to clickable items
document.querySelectorAll('.publication-card, .conference-card, .award-item, .contact-item, .stat-item').forEach(element => {
    element.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    border-radius: 50%;
                    background: rgba(255, 193, 7, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to styles
const style = document.createElement('style');
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Expertise tags interaction
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function () {
        const expertise = this.textContent;
        alert(`Searching for publications related to: ${expertise}`);
        // Add search/filter logic here
    });
});

// Scroll to top functionality
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Show/hide scroll to top button
        if (scrollTop > 500 && !document.querySelector('.scroll-top-btn')) {
            const scrollBtn = document.createElement('button');
            scrollBtn.className = 'scroll-top-btn';
            scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollBtn.style.cssText = `
                        position: fixed;
                        bottom: 30px;
                        right: 30px;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
                        color: white;
                        border: none;
                        cursor: pointer;
                        font-size: 20px;
                        box-shadow: 0 5px 20px rgba(30, 60, 114, 0.4);
                        z-index: 1000;
                        transition: all 0.3s ease;
                    `;

            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            scrollBtn.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 25px rgba(30, 60, 114, 0.5)';
            });

            scrollBtn.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 20px rgba(30, 60, 114, 0.4)';
            });

            document.body.appendChild(scrollBtn);
        } else if (scrollTop <= 500 && document.querySelector('.scroll-top-btn')) {
            document.querySelector('.scroll-top-btn').remove();
        }
    }, 100);
});

// Print functionality
const addPrintButton = () => {
    const contactSection = document.querySelector('.contact-grid');
    if (contactSection && !document.querySelector('.print-profile-btn')) {
        const printBtn = document.createElement('button');
        printBtn.className = 'print-profile-btn';
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print Profile';
        printBtn.style.cssText = `
                    margin-top: 20px;
                    padding: 12px 30px;
                    background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
                    color: white;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 15px;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(30, 60, 114, 0.3);
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                `;

        printBtn.addEventListener('click', () => window.print());
        printBtn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 20px rgba(30, 60, 114, 0.4)';
        });
        printBtn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(30, 60, 114, 0.3)';
        });

        contactSection.parentElement.appendChild(printBtn);
    }
};

// Initialize print button after page load
setTimeout(addPrintButton, 500);

// Page load animations
window.addEventListener('load', () => {
    document.body.style.opacity = '1';

    // Stagger animation for stat items
    document.querySelectorAll('.stat-item').forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add print styles
const printStyle = document.createElement('style');
printStyle.textContent = `
            @media print {
                .author-hero,
                .back-button,
                .social-links,
                .publication-actions,
                .scroll-top-btn,
                .print-profile-btn {
                    display: none !important;
                }
                
                .section {
                    page-break-inside: avoid;
                    box-shadow: none;
                    margin-bottom: 20px;
                }
                
                .profile-header {
                    page-break-inside: avoid;
                }
                
                body {
                    background: white;
                }
                
                .author-profile-card {
                    margin-top: 0;
                }
            }
        `;
document.head.appendChild(printStyle);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial states for animations
    document.querySelectorAll('.stat-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
    });
});
