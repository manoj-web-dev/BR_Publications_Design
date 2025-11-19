
// Animation observer for elements
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

// Smooth scroll for sidebar links
document.querySelectorAll('.resNova-sidebar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);

        // Activate the corresponding tab
        const buttons = document.querySelectorAll(".tab-btn");
        const contents = document.querySelectorAll(".tab-content");

        buttons.forEach(btn => {
            if (btn.dataset.tab === targetId) {
                buttons.forEach(b => b.classList.remove("active"));
                contents.forEach(c => c.classList.remove("active"));

                btn.classList.add("active");
                document.getElementById(targetId).classList.add("active");
            }
        });

        // Smooth scroll to tabs section
        const tabsContainer = document.querySelector('.tabs-container');
        if (tabsContainer) {
            tabsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function initTabs() {

    // TAB SWITCHING LOGIC
    const buttons = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(btn.dataset.tab).classList.add("active");

            // Smooth scroll to content
            document.getElementById(btn.dataset.tab).scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        });
    });
}

// Contact card click handlers
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', function () {
        const text = this.querySelector('p').textContent;
        const contact = this.querySelector('small').textContent;

        if (text.includes('Call')) {
            window.location.href = `tel:${contact.replace(/\s/g, '')}`;
        } else if (text.includes('WhatsApp')) {
            window.open(`https://wa.me/${contact.replace(/[\s+-]/g, '')}`, '_blank');
        } else if (text.includes('Email')) {
            window.location.href = `mailto:${contact}`;
        }
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.tab-btn, .contact-card').forEach(element => {
    element.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Animate elements on scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.book-cover, .book-details, .tab-content.active');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial opacity for animation
    document.querySelectorAll('.book-cover, .book-details').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease';
    });

    // Trigger animation after short delay
    setTimeout(() => {
        document.querySelectorAll('.book-cover, .book-details').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 200);

    // Add keyboard navigation for tabs
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const activeTab = document.querySelector('.tab-btn.active');
            const allTabs = Array.from(document.querySelectorAll('.tab-btn'));
            const currentIndex = allTabs.indexOf(activeTab);

            let nextIndex;
            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % allTabs.length;
            } else {
                nextIndex = (currentIndex - 1 + allTabs.length) % allTabs.length;
            }

            allTabs[nextIndex].click();
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.resNova-hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add smooth scroll behavior for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add copy to clipboard for DOI and ISBN
document.querySelectorAll('.meta-info p').forEach(p => {
    const text = p.textContent;
    if (text.includes('DOI:') || text.includes('ISBN:')) {
        p.style.cursor = 'pointer';
        p.title = 'Click to copy';

        p.addEventListener('click', function () {
            const value = this.textContent.split(':')[1].trim();
            navigator.clipboard.writeText(value).then(() => {
                // Show copied feedback
                const originalText = this.innerHTML;
                this.innerHTML = this.innerHTML.replace(value, `${value} <span style="color: #28a745; font-size: 12px;">✓ Copied!</span>`);

                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    }
});

// Mobile menu toggle for sidebar
if (window.innerWidth <= 968) {
    const sidebar = document.querySelector('.resNova-sidebar');
    if (sidebar) {
        const cards = sidebar.querySelectorAll('.sidebar-card');
        cards.forEach(card => {
            card.addEventListener('click', function (e) {
                if (e.target.tagName !== 'A') {
                    this.classList.toggle('expanded');
                }
            });
        });
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Print functionality
const addPrintButton = () => {
    const metaInfo = document.querySelector('.meta-info');
    if (metaInfo && !document.querySelector('.print-btn')) {
        const printBtn = document.createElement('button');
        printBtn.className = 'print-btn';
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print Details';
        printBtn.style.cssText = `
                    margin-top: 15px;
                    padding: 10px 20px;
                    background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
                    color: white;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(30, 60, 114, 0.3);
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

        metaInfo.appendChild(printBtn);
    }
};

// Initialize print button
setTimeout(addPrintButton, 500);

// Add share functionality
const addShareButton = () => {
    const bookDetails = document.querySelector('.book-details');
    if (bookDetails && !document.querySelector('.share-btn') && navigator.share) {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'share-btn';
        shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share';
        shareBtn.style.cssText = `
                    margin-left: 10px;
                    padding: 10px 20px;
                    background: linear-gradient(135deg, var(--accent-gold), #ff8c00);
                    color: white;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
                `;

        shareBtn.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: document.querySelector('.book-details h1').textContent,
                    text: 'Check out this book from BR Publications',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        });

        shareBtn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 20px rgba(255, 193, 7, 0.4)';
        });
        shareBtn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(255, 193, 7, 0.3)';
        });

        const printBtn = document.querySelector('.print-btn');
        if (printBtn) {
            printBtn.parentElement.appendChild(shareBtn);
        }
    }
};

// Initialize share button
setTimeout(addShareButton, 600);

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            @media print {
                .resNova-hero,
                .resNova-sidebar,
                .contact-options,
                .tabs-container,
                .tab-buttons,
                .print-btn,
                .share-btn {
                    display: none !important;
                }
                
                .resNova-section {
                    box-shadow: none;
                }
                
                body {
                    background: white;
                }
            }
        `;
document.head.appendChild(style);
