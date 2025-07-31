// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing NuruSafe website...');
    
    // Check if main sections exist
    const aboutSection = document.getElementById('about');
    const techSection = document.getElementById('technology');
    const servicesSection = document.getElementById('services');
    const newsSection = document.getElementById('news');
    const teamSection = document.getElementById('cast');

    console.log('About Section found:', !!aboutSection);
    console.log('Technology Section found:', !!techSection);
    console.log('Services Section found:', !!servicesSection);
    console.log('News Section found:', !!newsSection);
    console.log('Team Section found:', !!teamSection);
    
    // Check if sections are visible
    if (aboutSection) {
        const aboutStyles = window.getComputedStyle(aboutSection);
        console.log('About section display:', aboutStyles.display);
        console.log('About section visibility:', aboutStyles.visibility);
        console.log('About section opacity:', aboutStyles.opacity);
    }
    
    if (techSection) {
        const techStyles = window.getComputedStyle(techSection);
        console.log('Technology section display:', techStyles.display);
        console.log('Technology section visibility:', techStyles.visibility);
        console.log('Technology section opacity:', techStyles.opacity);
    }
    // Navigation functionality
    initNavigation();
    
    // Gallery filtering
    initGalleryFilter();
    
    // Form handling
    initForms();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Scroll animations
    initScrollAnimations();
    
    // Active navigation highlighting
    initActiveNavigation();

    console.log('NuruSafe website initialized successfully.');
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an internal link (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Remove active class from all nav links
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    // Scroll to target with offset for fixed header
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Gallery filtering functionality
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    
                    // Animate in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    // Hide after animation
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Form handling
function initForms() {
    // Request Services Form
    const requestForm = document.getElementById('requestForm');
    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRequestFormSubmission(this);
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this);
        });
    }
}

// Handle Request Services form submission
function handleRequestFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = ['requestType', 'fullName', 'email'];
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
    
    if (missingFields.length > 0) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email format
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Your request has been submitted successfully! We will get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Log form data (for demonstration)
        console.log('Request Form Data:', data);
    }, 2000);
}

// Handle Contact form submission
function handleContactFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
    
    if (missingFields.length > 0) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email format
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Your message has been sent successfully! We will respond within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // Log form data (for demonstration)
        console.log('Contact Form Data:', data);
    }, 2000);
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        max-width: 400px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body scroll
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add scroll animation class to elements
    const sectionsToAnimate = document.querySelectorAll('.service-card, .tech-feature, .news-item, .team-member, .stat-item');
    sectionsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
    });
}

// Active navigation highlighting based on scroll position
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 150; // Offset for header
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle scroll event for performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateActiveNavigation);
            ticking = true;
            setTimeout(() => { ticking = false; }, 100);
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Initial call
    updateActiveNavigation();
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Gallery lightbox functionality (optional enhancement)
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            createLightbox(this.src, this.alt);
        });
    });
}

function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Close functionality
    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Initialize lightbox (uncomment to enable)
// initGalleryLightbox();

// Form field enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add floating label effect
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        // Add focus/blur events for enhanced styling
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

// Add loading animation for images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '1';
            });
        }
    });
}
// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.onscroll = function() {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};
scrollToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Initialize image loading
initImageLoading();

// Console welcome message
console.log('%c🌾 Welcome to Nurusafe Post-Harvest Pack House! %c\n\nWe provide world-class post-harvest agricultural solutions.\nVisit our services section to learn more about our offerings.', 
    'color: #059669; font-size: 16px; font-weight: bold;', 
    'color: #6b7280; font-size: 14px;'
);