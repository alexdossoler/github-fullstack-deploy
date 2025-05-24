/**
 * Handyman Services - Main JavaScript
 * Author: Cline
 * Date: May 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav && nav.classList.contains('active') && !event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            nav.classList.remove('active');
            
            // Reset hamburger icon
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    
                    // Reset hamburger icon
                    const spans = mobileMenuBtn.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky Header Effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '15px 0';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Service Card Hover Effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Feature Card Hover Effect
    const featureCards = document.querySelectorAll('.feature');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Form Validation and Submission for Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const serviceInput = document.getElementById('service');
            const messageInput = document.getElementById('message');
            const urgentInput = document.getElementById('urgent');
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validate Name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Validate Email
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate Phone (optional but must be valid if provided)
            if (phoneInput.value.trim() && !isValidPhone(phoneInput.value)) {
                showError(phoneInput, 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate Message
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
                
                // Prepare form data
                const formData = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    phone: phoneInput.value.trim(),
                    service: serviceInput.value,
                    message: messageInput.value.trim(),
                    urgent: urgentInput.checked
                };
                
                // Configure API base URL - localhost for development, Render for production
                const API_BASE = window.location.hostname.includes('localhost')
                               ? 'http://localhost:10000'
                               : 'https://handyman-services.onrender.com';
                
                // Send AJAX request to server
                fetch(`${API_BASE}/api/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => {
                    if (!response.ok) {
                        // Get the status code for better error handling
                        const statusCode = response.status;
                        throw new Error(`Server responded with status: ${statusCode}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Show success message
                    const formContainer = contactForm.parentElement;
                    
                    // Create success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 15px;"></i>
                        <h3>Thank you for your message!</h3>
                        <p>We have received your inquiry and will get back to you soon.</p>
                        <p>Your reference number: <strong>${data.referenceNumber}</strong></p>
                        <p>A confirmation email has been sent to <strong>${emailInput.value}</strong></p>
                    `;
                    
                    // Replace form with success message
                    contactForm.innerHTML = '';
                    contactForm.appendChild(successMessage);
                    
                    // Add tracking for analytics
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_submission', {
                            'event_category': 'Contact',
                            'event_label': formData.service || 'General Inquiry'
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    
                    // Show detailed error message
                    const errorBanner = document.createElement('div');
                    errorBanner.className = 'error-banner';
                    
                    // Create more informative error message
                    let errorMessage = 'There was a problem submitting your form. ';
                    
                    // Add more specific error information based on the error
                    if (error.message.includes('status: 500')) {
                        errorMessage += 'The server encountered an internal error. This might be due to database or email configuration issues. ';
                    } else if (error.message.includes('status: 404')) {
                        errorMessage += 'The server endpoint could not be found. ';
                    } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                        errorMessage += 'Could not connect to the server. Please check your internet connection. ';
                    }
                    
                    errorMessage += 'Please try again later or contact us directly at (864) 743-3178.';
                    
                    errorBanner.innerHTML = `
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>${errorMessage}</p>
                        <button class="close-btn"><i class="fas fa-times"></i></button>
                    `;
                    
                    // Add error banner to top of form
                    contactForm.insertBefore(errorBanner, contactForm.firstChild);
                    
                    // Add close button functionality
                    errorBanner.querySelector('.close-btn').addEventListener('click', function() {
                        errorBanner.remove();
                    });
                    
                    // Reset button
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                });
            }
        });
    }
    
    // Helper Functions
    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = 'var(--danger-color)';
        
        input.addEventListener('input', function() {
            errorDiv.remove();
            input.style.borderColor = '';
        }, { once: true });
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function isValidPhone(phone) {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(String(phone));
    }
    
    // Placeholder Image Replacement
    // This would be removed in a production environment once real images are added
    const logoPlaceholder = document.getElementById('logo-placeholder');
    const mascotPlaceholder = document.getElementById('mascot-placeholder');
    const footerLogoPlaceholder = document.getElementById('footer-logo-placeholder');
    
    // Create a simple placeholder for the logo if it doesn't exist
    if (logoPlaceholder && !logoPlaceholder.src) {
        createPlaceholderLogo(logoPlaceholder, 60);
    }
    
    // Create a simple placeholder for the mascot if it doesn't exist
    if (mascotPlaceholder && !mascotPlaceholder.src) {
        createPlaceholderMascot(mascotPlaceholder);
    }
    
    // Create a simple placeholder for the footer logo if it doesn't exist
    if (footerLogoPlaceholder && !footerLogoPlaceholder.src) {
        createPlaceholderLogo(footerLogoPlaceholder, 80);
    }
    
    function createPlaceholderLogo(imgElement, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Draw circle background
        ctx.fillStyle = '#0077b6';
        ctx.beginPath();
        ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw text
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${size/2}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('HS', size/2, size/2);
        
        imgElement.src = canvas.toDataURL();
    }
    
    function createPlaceholderMascot(imgElement) {
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        
        // Draw circle background
        ctx.fillStyle = '#0077b6';
        ctx.beginPath();
        ctx.arc(150, 150, 150, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw simple handyman icon
        ctx.fillStyle = '#ffffff';
        
        // Draw wrench
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(120, 120);
        ctx.lineTo(180, 60);
        ctx.lineTo(200, 80);
        ctx.lineTo(220, 60);
        ctx.lineTo(240, 80);
        ctx.lineTo(220, 100);
        ctx.lineTo(160, 160);
        ctx.lineTo(140, 140);
        ctx.closePath();
        ctx.fill();
        
        // Draw hammer
        ctx.beginPath();
        ctx.moveTo(100, 200);
        ctx.lineTo(120, 180);
        ctx.lineTo(180, 240);
        ctx.lineTo(160, 260);
        ctx.closePath();
        ctx.fill();
        
        // Draw handle
        ctx.fillRect(180, 240, 20, 60);
        
        imgElement.src = canvas.toDataURL();
    }
});
