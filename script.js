// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
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
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-card, .audience-card, .skill-item, .material-item, .instructor-card').forEach(el => {
    observer.observe(el);
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .stat-card, .audience-card, .skill-item, .material-item, .instructor-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// SVG Chart animation
const animateSVGCharts = () => {
    const charts = document.querySelectorAll('.growth-chart');
    charts.forEach((chart, index) => {
        const paths = chart.querySelectorAll('path[stroke]');
        const circles = chart.querySelectorAll('circle');
        
        setTimeout(() => {
            // Animate the line drawing
            paths.forEach(path => {
                const length = path.getTotalLength();
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
                path.style.animation = `drawLine 2s ease-out forwards`;
            });
            
            // Animate circles appearing
            circles.forEach((circle, circleIndex) => {
                setTimeout(() => {
                    circle.style.opacity = '0';
                    circle.style.transform = 'scale(0)';
                    circle.style.transition = 'all 0.3s ease-out';
                    setTimeout(() => {
                        circle.style.opacity = '1';
                        circle.style.transform = 'scale(1)';
                    }, 50);
                }, circleIndex * 100);
            });
        }, index * 500);
    });
};

// Add CSS animation for line drawing
const chartStyle = document.createElement('style');
chartStyle.textContent = `
    @keyframes drawLine {
        to {
            stroke-dashoffset: 0;
        }
    }
    
    .growth-chart path[stroke] {
        stroke-dasharray: 0;
        stroke-dashoffset: 0;
    }
`;
document.head.appendChild(chartStyle);

// Initialize chart animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSVGCharts();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.statistics');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Button click effects
document.querySelectorAll('.cta-button, .contact-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .cta-button, .contact-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.nav');
    
    if (window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.classList.add('mobile-menu-toggle');
        menuButton.innerHTML = '☰';
        menuButton.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #6366f1;
            cursor: pointer;
            display: block;
        `;
        
        header.appendChild(menuButton);
        
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('mobile-nav-open');
        });
    }
};

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroDecoration = document.querySelector('.hero-decoration');
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroDecoration) {
        heroDecoration.style.transform = `translate(50%, -50%) rotate(${scrolled * 0.1}deg)`;
    }
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Form validation and submission (placeholder)
const handleFormSubmission = (formElement) => {
    formElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'ОТПРАВЛЯЕМ...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = 'ОТПРАВЛЕНО ✓';
            submitButton.style.background = 'linear-gradient(45deg, #4caf50, #8bc34a)';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 2000);
        }, 1500);
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create mobile menu if needed
    createMobileMenu();
    
    // Initialize any forms
    document.querySelectorAll('form').forEach(handleFormSubmission);
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Resize handler
window.addEventListener('resize', () => {
    // Recreate mobile menu if screen size changes
    const existingToggle = document.querySelector('.mobile-menu-toggle');
    if (existingToggle) {
        existingToggle.remove();
    }
    createMobileMenu();
});

// Add some interactive hover effects
document.querySelectorAll('.audience-card, .skill-item, .material-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for hero title (optional enhancement)
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Initialize typing effect if desired
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 50);
// }
