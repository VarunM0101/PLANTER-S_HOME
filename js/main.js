/**
 * Planter's Home - Main JavaScript File
 * Created for Business: Planter's Home
 * Author: Web Developer
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuIcon) {
        // Create close menu icon
        const closeMenu = document.createElement('div');
        closeMenu.className = 'close-menu';
        closeMenu.innerHTML = '<i class="fas fa-times"></i>';
        navMenu.appendChild(closeMenu);
        
        // Toggle mobile menu
        mobileMenuIcon.addEventListener('click', function() {
            navMenu.classList.add('active');
        });
        
        // Close mobile menu
        closeMenu.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuIcon.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Testimonial Slider
    const testimonialContainer = document.querySelector('.testimonial-container');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    if (testimonialContainer && testimonials.length > 0) {
        let currentIndex = 0;
        
        // Set initial position
        updateTestimonialPosition();
        
        // Previous testimonial button
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
                updateTestimonialPosition();
            });
        }
        
        // Next testimonial button
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
                updateTestimonialPosition();
            });
        }
        
        // Auto slide testimonials every 5 seconds
        let autoSlide = setInterval(function() {
            currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
            updateTestimonialPosition();
        }, 5000);
        
        // Pause auto slide when hovering over testimonials
        testimonialContainer.addEventListener('mouseenter', function() {
            clearInterval(autoSlide);
        });
        
        // Resume auto slide when mouse leaves testimonials
        testimonialContainer.addEventListener('mouseleave', function() {
            autoSlide = setInterval(function() {
                currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
                updateTestimonialPosition();
            }, 5000);
        });
        
        // Update testimonial position
        function updateTestimonialPosition() {
            testimonials.forEach((testimonial, index) => {
                testimonial.style.transform = `translateX(-${currentIndex * 100}%)`;
            });
        }
    }
    
    // Accordion for FAQ section
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', function() {
                // Toggle active class
                item.classList.toggle('active');
                
                // Close other accordion items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (name === '' || email === '' || message === '') {
                showFormStatus('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }
            
            // In a real implementation, send form data to server
            // For this demo, simulate successful form submission
            showFormStatus('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
    
    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show form status message
    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = 'form-status ' + type;
            
            // Hide status message after 5 seconds
            setTimeout(function() {
                formStatus.className = 'form-status';
                formStatus.textContent = '';
            }, 5000);
        }
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to elements when they come into view
    const animatedElements = document.querySelectorAll('.feature-box, .category, .product-card, .value-item');
    
    const options = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
});
