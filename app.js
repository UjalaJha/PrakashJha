// Portfolio JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const fadeElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .about-content, .contact-content');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Animate skill tags on hover with stagger effect
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        const skillTags = category.querySelectorAll('.skill-tag');
        
        category.addEventListener('mouseenter', function() {
            skillTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                    tag.style.boxShadow = '0 4px 12px rgba(var(--color-primary-rgb), 0.3)';
                }, index * 50);
            });
        });

        category.addEventListener('mouseleave', function() {
            skillTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(0)';
                    tag.style.boxShadow = 'none';
                }, index * 30);
            });
        });
    });

    // Contact form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formFields = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Clear previous error messages
            clearErrorMessages();

            // Validate form
            let isValid = true;
            
            if (!formFields.name || formFields.name.trim().length < 2) {
                showError('name-error', 'Name must be at least 2 characters long');
                isValid = false;
            }

            if (!formFields.email || !isValidEmail(formFields.email)) {
                showError('email-error', 'Please enter a valid email address');
                isValid = false;
            }

            if (!formFields.subject || formFields.subject.trim().length < 3) {
                showError('subject-error', 'Subject must be at least 3 characters long');
                isValid = false;
            }

            if (!formFields.message || formFields.message.trim().length < 10) {
                showError('message-error', 'Message must be at least 10 characters long');
                isValid = false;
            }

            if (isValid) {
                handleFormSubmission(formFields);
            }
        });
    }

    // Form validation helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearErrorMessages() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }

    function handleFormSubmission(formData) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            showSuccessMessage();
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    function showSuccessMessage() {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.cssText = `
            background: rgba(var(--color-success-rgb), 0.1);
            border: 1px solid var(--color-success);
            color: var(--color-success);
            padding: var(--space-16);
            border-radius: var(--radius-base);
            margin-bottom: var(--space-16);
            text-align: center;
        `;
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
        
        // Insert before form
        contactForm.parentNode.insertBefore(successMessage, contactForm);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    // Smooth scroll for CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading animation to download resume button
    const downloadButton = document.querySelector('.download-resume');
    if (downloadButton) {
        downloadButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Download...';
            this.style.pointerEvents = 'none';
            
            // Simulate download preparation
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Resume Ready!';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.pointerEvents = 'auto';
                }, 1500);
            }, 2000);
        });
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add typing effect to hero tagline
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const originalText = heroTagline.textContent;
        heroTagline.textContent = '';
        heroTagline.style.borderRight = '2px solid var(--color-primary)';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTagline.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTagline.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing animation after page load
        setTimeout(typeWriter, 1000);
    }

    // Social links hover effect
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // Add click handler for social links to show placeholder message
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create temporary message
            const message = document.createElement('div');
            message.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--color-primary);
                color: var(--color-btn-primary-text);
                padding: var(--space-12) var(--space-16);
                border-radius: var(--radius-base);
                z-index: 10000;
                font-size: var(--font-size-sm);
                box-shadow: var(--shadow-lg);
                opacity: 0;
                transform: translateX(100px);
                transition: all var(--duration-normal) var(--ease-standard);
            `;
            message.textContent = 'Social links will be configured soon!';
            
            document.body.appendChild(message);
            
            // Animate in
            setTimeout(() => {
                message.style.opacity = '1';
                message.style.transform = 'translateX(0)';
            }, 100);
            
            // Remove after 3 seconds
            setTimeout(() => {
                message.style.opacity = '0';
                message.style.transform = 'translateX(100px)';
                setTimeout(() => message.remove(), 300);
            }, 3000);
        });
    });

    // Add scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Create progress bar if it doesn't exist
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${scrollPercent}%;
                height: 3px;
                background: var(--color-primary);
                z-index: 10001;
                transition: width 0.1s ease-out;
            `;
            document.body.appendChild(progressBar);
        } else {
            progressBar.style.width = scrollPercent + '%';
        }
    }

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call

    // Add intersection observer for section animations
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Trigger specific animations based on section
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, { threshold: 0.3 });

    // Observe all main sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Animate skill bars (visual enhancement)
    function animateSkillBars() {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }, index * 100);
        });
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    console.log('Portfolio website loaded successfully! 🚀');
});
