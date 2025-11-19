
// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
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
document.querySelectorAll('.subject-section, .domain-card-preview').forEach(section => {
    observer.observe(section);
});

// Add hover effects to topic cards
document.querySelectorAll('.topic-card').forEach(card => {
    card.addEventListener('click', function () {
        const topic = this.querySelector('span').textContent;
        console.log('Topic selected:', topic);
        // Add navigation or filter logic here
    });
});

// Counter animation for stats
function animateCounter(element, target, duration) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats bar is in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(num => {
                const target = parseInt(num.textContent);
                animateCounter(num, target, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-bar').forEach(bar => {
    statsObserver.observe(bar);
});

// Add active state to domain cards
document.querySelectorAll('.domain-card-preview').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(-10px)';
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial opacity for animated elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease';
    });

    // Trigger animations after short delay
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
});

// Add ripple effect to clickable cards
document.querySelectorAll('.topic-card, .research-field, .domain-card-preview').forEach(element => {
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

// Add CSS for ripple animation
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

// Highlight current section in viewport
const sections = document.querySelectorAll('.subject-section');
const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visual indicator or update navigation
            console.log('Currently viewing:', entry.target.id);
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => {
    highlightObserver.observe(section);
});

// Scroll to top button
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 500 && !document.querySelector('.scroll-top-btn')) {
            const scrollBtn = document.createElement('button');
            scrollBtn.className = 'scroll-top-btn';
            scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollBtn.style.cssText = `
                        position: fixed;
                        bottom: 30px;
                        right: 30px;
                        width: 55px;
                        height: 55px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
                        color: white;
                        border: none;
                        cursor: pointer;
                        font-size: 20px;
                        box-shadow: 0 5px 20px rgba(30, 60, 114, 0.4);
                        z-index: 1000;
                        transition: all 0.3s ease;
                        animation: fadeIn 0.3s ease;
                    `;

            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            scrollBtn.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-5px) scale(1.1)';
                this.style.boxShadow = '0 8px 25px rgba(30, 60, 114, 0.5)';
            });

            scrollBtn.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 5px 20px rgba(30, 60, 114, 0.4)';
            });

            document.body.appendChild(scrollBtn);
        } else if (scrollTop <= 500 && document.querySelector('.scroll-top-btn')) {
            const btn = document.querySelector('.scroll-top-btn');
            btn.style.opacity = '0';
            setTimeout(() => btn.remove(), 300);
        }
    }, 100);
});

// Topic card search/filter functionality
const addSearchFunctionality = () => {
    let searchInput = document.querySelector('.topic-search');
    if (!searchInput) {
        // Create search input for each section
        document.querySelectorAll('.subsection-title').forEach((title, index) => {
            if (title.textContent.includes('Key Topic Coverage')) {
                const searchContainer = document.createElement('div');
                searchContainer.style.cssText = `
                            margin: 20px 0;
                            position: relative;
                        `;

                searchInput = document.createElement('input');
                searchInput.type = 'text';
                searchInput.className = 'topic-search';
                searchInput.placeholder = 'Search topics...';
                searchInput.style.cssText = `
                            width: 100%;
                            padding: 12px 45px 12px 20px;
                            border: 2px solid #e9ecef;
                            border-radius: 50px;
                            font-size: 15px;
                            transition: all 0.3s ease;
                        `;

                const searchIcon = document.createElement('i');
                searchIcon.className = 'fas fa-search';
                searchIcon.style.cssText = `
                            position: absolute;
                            right: 20px;
                            top: 50%;
                            transform: translateY(-50%);
                            color: #999;
                            pointer-events: none;
                        `;

                searchContainer.appendChild(searchInput);
                searchContainer.appendChild(searchIcon);
                title.parentElement.insertBefore(searchContainer, title.nextSibling);

                // Add search functionality
                searchInput.addEventListener('focus', function () {
                    this.style.borderColor = 'var(--primary-blue)';
                    this.style.boxShadow = '0 0 0 3px rgba(30, 60, 114, 0.1)';
                });

                searchInput.addEventListener('blur', function () {
                    this.style.borderColor = '#e9ecef';
                    this.style.boxShadow = 'none';
                });

                searchInput.addEventListener('input', function () {
                    const searchTerm = this.value.toLowerCase();
                    const section = this.closest('.subject-section');
                    const topics = section.querySelectorAll('.topic-card');

                    topics.forEach(topic => {
                        const text = topic.textContent.toLowerCase();
                        if (text.includes(searchTerm)) {
                            topic.style.display = 'flex';
                            topic.style.animation = 'fadeIn 0.3s ease';
                        } else {
                            topic.style.display = 'none';
                        }
                    });
                });
            }
        });
    }
};

// Initialize search after page load
setTimeout(addSearchFunctionality, 1000);

// Print functionality
const addPrintButton = () => {
    document.querySelectorAll('.subject-section').forEach(section => {
        if (!section.querySelector('.print-section-btn')) {
            const printBtn = document.createElement('button');
            printBtn.className = 'print-section-btn';
            printBtn.innerHTML = '<i class="fas fa-print"></i> Print This Section';
            printBtn.style.cssText = `
                        margin-top: 30px;
                        padding: 12px 30px;
                        background: white;
                        color: var(--primary-blue);
                        border: 2px solid var(--primary-blue);
                        border-radius: 50px;
                        cursor: pointer;
                        font-weight: 600;
                        font-size: 14px;
                        transition: all 0.3s ease;
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                    `;

            printBtn.addEventListener('click', function () {
                window.print();
            });

            printBtn.addEventListener('mouseenter', function () {
                this.style.background = 'var(--primary-blue)';
                this.style.color = 'white';
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 5px 15px rgba(30, 60, 114, 0.3)';
            });

            printBtn.addEventListener('mouseleave', function () {
                this.style.background = 'white';
                this.style.color = 'var(--primary-blue)';
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });

            section.appendChild(printBtn);
        }
    });
};

// Initialize print buttons
setTimeout(addPrintButton, 1500);

// Add print styles
const printStyle = document.createElement('style');
printStyle.textContent = `
            @media print {
                .hero-section,
                .domains-overview,
                .scroll-top-btn,
                .print-section-btn,
                .topic-search {
                    display: none !important;
                }
                
                .subject-section {
                    page-break-inside: avoid;
                    box-shadow: none;
                    margin-bottom: 20px;
                    padding: 30px;
                }
                
                .stats-bar {
                    page-break-inside: avoid;
                }
                
                body {
                    background: white;
                }
                
                .topic-card,
                .research-field {
                    page-break-inside: avoid;
                }
            }
        `;
document.head.appendChild(printStyle);

// Track user interactions for analytics
const trackInteraction = (action, element) => {
    console.log('User interaction:', action, element);
    // Add analytics tracking here (Google Analytics, etc.)
};

// Track clicks on topic cards
document.querySelectorAll('.topic-card').forEach(card => {
    card.addEventListener('click', function () {
        trackInteraction('topic_click', this.textContent);
    });
});

// Track clicks on research fields
document.querySelectorAll('.research-field').forEach(field => {
    field.addEventListener('click', function () {
        trackInteraction('research_field_click', this.querySelector('h4').textContent);
    });
});

// Add tooltips to icons
document.querySelectorAll('.topic-icon, .subject-icon, .domain-icon-preview').forEach(icon => {
    icon.setAttribute('title', 'Click to learn more');
});

// Lazy load images if any
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to top
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Press numbers 1-3 to navigate to sections
    if (e.key >= '1' && e.key <= '3') {
        const sections = ['engineering', 'medical', 'interdisciplinary'];
        const sectionIndex = parseInt(e.key) - 1;
        const targetSection = document.getElementById(sections[sectionIndex]);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});

// Show keyboard shortcuts hint
const showKeyboardHints = () => {
    const hint = document.createElement('div');
    hint.style.cssText = `
                position: fixed;
                bottom: 100px;
                right: 30px;
                background: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
                font-size: 13px;
                color: #666;
                z-index: 999;
                animation: fadeIn 0.3s ease;
                max-width: 250px;
            `;
    hint.innerHTML = `
                <strong style="color: var(--primary-blue); display: block; margin-bottom: 8px;">
                    <i class="fas fa-keyboard"></i> Keyboard Shortcuts
                </strong>
                <div style="line-height: 1.8;">
                    <strong>H</strong> - Scroll to top<br>
                    <strong>1-3</strong> - Navigate sections<br>
                </div>
            `;

    document.body.appendChild(hint);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        hint.style.opacity = '0';
        setTimeout(() => hint.remove(), 300);
    }, 5000);
};

// Show hints after page loads
setTimeout(() => {
    if (!sessionStorage.getItem('hintsShown')) {
        showKeyboardHints();
        sessionStorage.setItem('hintsShown', 'true');
    }
}, 3000);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
const optimizedScroll = debounce(() => {
    // Scroll-based operations
}, 100);

window.addEventListener('scroll', optimizedScroll);

// Page visibility API to pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations
        document.querySelectorAll('.hero-section::before, .hero-section::after').forEach(el => {
            if (el.style) el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations
        document.querySelectorAll('.hero-section::before, .hero-section::after').forEach(el => {
            if (el.style) el.style.animationPlayState = 'running';
        });
    }
});

console.log('%c✨ BR Publications - Subjects Page Loaded Successfully!', 'color: #1e3c72; font-size: 16px; font-weight: bold;');
console.log('%cKeyboard Shortcuts: H (top), 1-3 (sections)', 'color: #ffc107; font-size: 12px;');

// /* Function to show a specific section and hide others */

// function showSection(section) {


//     const sections = document.querySelectorAll('main > section');
//     sections.forEach(sec => {
//         sec.style.display = 'none';
//     });

//     const activeSection = document.getElementById(section);
//     if (activeSection) {

//         activeSection.classList.add('active'); // Add active class
//         activeSection.removeAttribute('style'); // Ensure no inline style overrides

//     } else {
//         console.error(`Section with id "${section}" not found.`);
//     }
// };


