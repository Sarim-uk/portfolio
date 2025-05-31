// Wait for DOM to load
console.log('🔧 Script.js loaded - starting execution');
console.log('🔧 Document ready state:', document.readyState);

document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation
    const dynamicText = document.getElementById('dynamic-text');
    const titles = [
        "Associate Software Engineer at Techwards",
        "AI & ML Enthusiast",
        "Product Lead @ Nexus Academy",
        "Educator at SeekMath"
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed

    function typeAnimation() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            // Deleting text
            dynamicText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            dynamicText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }

        // If word is complete
        if (!isDeleting && charIndex === currentTitle.length) {
            // Pause at the end of a word
            isDeleting = true;
            typingSpeed = 1500; // Wait before deleting
        } 
        // If deletion is complete
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length; // Move to next title
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeAnimation, typingSpeed);
    }

    // Start the typing animation
    setTimeout(typeAnimation, 1000);

    // Initialize Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00e6e6"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8a2be2",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Navigation Menu Toggle for Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        const navLinksItems = document.querySelectorAll('.nav-links a');
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinksForActive = document.querySelectorAll('.nav-links a');
    
    if (sections.length > 0 && navLinksForActive.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinksForActive.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Timeline accordion functionality
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        // Toggle timeline item details
        function toggleTimelineItem(item) {
            // Close all items first
            timelineItems.forEach(el => {
                if (el !== item) {
                    el.classList.remove('active');
                }
            });
            
            // Toggle the clicked item
            item.classList.toggle('active');
        }
        
        // Add click event to timeline headers
        timelineItems.forEach(item => {
            const header = item.querySelector('.timeline-header');
            const toggleBtn = item.querySelector('.toggle-btn');
            
            if (header) {
                // Toggle on header click
                header.addEventListener('click', () => {
                    toggleTimelineItem(item);
                });
            }
            
            if (toggleBtn) {
                // Toggle on button click (prevent event bubbling)
                toggleBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleTimelineItem(item);
                });
            }
            
            // Keyboard accessibility
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTimelineItem(item);
                }
            });
        });
    }
    
    // Scroll animations
    const scrollElements = document.querySelectorAll('.fade-in, .slide-in, .about-text p');
    
    if (scrollElements.length > 0) {
        const elementInView = (el, offset = 100) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
            );
        };
        
        const displayScrollElement = (element) => {
            element.style.animation = element.classList.contains('slide-in') 
                ? 'slideIn 1s ease forwards'
                : 'fadeIn 1s ease forwards';
        };
        
        const hideScrollElement = (element) => {
            element.style.animation = 'none';
            element.style.opacity = '0';
        };
        
        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 100)) {
                    displayScrollElement(el);
                } else {
                    hideScrollElement(el);
                }
            });
        };
        
        // Initial check on page load
        setTimeout(() => {
            handleScrollAnimation();
        }, 100);
        
        // Listen for scroll events
        window.addEventListener('scroll', () => {
            handleScrollAnimation();
        });
    }
    
    // Project Modal Functionality
    const projectCards = document.querySelectorAll('.project-card');
    const modalContainer = document.getElementById('project-modal-container');
    const projectModals = document.querySelectorAll('.project-modal');
    
    if (projectCards.length > 0 && modalContainer) {
        console.log('Found project cards:', projectCards.length);
        console.log('Found project modals:', projectModals.length);
        
        // Project Cards 3D Effect
        projectCards.forEach(card => {
            // 3D effect on hover
            card.addEventListener('mousemove', (e) => {
                const cardInner = card.querySelector('.project-card-inner');
                if (!cardInner) return;
                
                const { left, top, width, height } = card.getBoundingClientRect();
                
                const x = e.clientX - left;
                const y = e.clientY - top;
                
                const centerX = width / 2;
                const centerY = height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                cardInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                const cardInner = card.querySelector('.project-card-inner');
                if (cardInner) {
                    cardInner.style.transform = '';
                }
            });
            
            // Open modal on card click
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on the button (it has its own handler)
                if (e.target.closest('.view-details-btn')) {
                    return;
                }
                
                const projectId = card.getAttribute('data-project');
                const modal = document.getElementById(`${projectId}-modal`);
                
                console.log('Card clicked for project:', projectId);
                console.log('Modal found:', modal ? 'yes' : 'no');
                
                if (modal) {
                    openModal(modal);
                }
            });
            
            // Open modal on button click
            const viewDetailsBtn = card.querySelector('.view-details-btn');
            if (viewDetailsBtn) {
                viewDetailsBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const projectId = card.getAttribute('data-project');
                    const modal = document.getElementById(`${projectId}-modal`);
                    
                    console.log('Button clicked for project:', projectId);
                    console.log('Modal found:', modal ? 'yes' : 'no');
                    
                    if (modal) {
                        openModal(modal);
                    }
                });
            }
        });
        
        // Close modal on close button click
        const closeButtons = document.querySelectorAll('.modal-close');
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                closeModal();
            });
        });
        
        // Close modal when clicking outside
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                closeModal();
            }
        });
        
        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
        
        // Open modal function
        function openModal(modal) {
            // Hide all modals first
            projectModals.forEach(m => {
                m.classList.remove('active');
            });
            
            // Show modal container
            modalContainer.classList.add('active');
            
            // Show selected modal with slight delay for animation
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Prevent scrolling on body
            document.body.style.overflow = 'hidden';
        }
        
        // Close modal function
        function closeModal() {
            modalContainer.classList.remove('active');
            
            projectModals.forEach(modal => {
                modal.classList.remove('active');
            });
            
            // Re-enable scrolling
            document.body.style.overflow = '';
        }
    }

    // EmailJS Configuration - Updated for v4
    emailjs.init({
        publicKey: "-96bhH6DhqoesGnJx"
    });

    class ContactForm {
        constructor() {
            this.form = document.getElementById('contact-form');
            this.submitBtn = this.form?.querySelector('.submit-btn');
            this.successMessage = document.getElementById('success-message');
            this.toggleSwitch = document.getElementById('dark-mode-toggle');
            this.toggleMessage = document.getElementById('toggle-message');
            
            // EmailJS Service Configuration
            this.emailConfig = {
                serviceID: 'service_b43wlpr', // Your EmailJS service ID
                templateID: 'template_vomrhjs', // You'll need to replace this
                userID: '-96bhH6DhqoesGnJx' // You'll need to replace this
            };
            
            this.init();
        }

        init() {
            if (this.form) {
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
                this.setupFieldValidation();
            }
            
            if (this.toggleSwitch) {
                this.toggleSwitch.addEventListener('change', () => this.handleDarkModeToggle());
            }
            
            this.addStarfield();
        }

        setupFieldValidation() {
            const fields = this.form.querySelectorAll('input, textarea');
            fields.forEach(field => {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('input', () => this.clearError(field));
            });
        }

        validateField(field) {
            const value = field.value.trim();
            const fieldName = field.name;
            let isValid = true;
            let errorMessage = '';

            switch(fieldName) {
                case 'name':
                    if (!value) {
                        errorMessage = 'Name is required';
                        isValid = false;
                    } else if (value.length < 2) {
                        errorMessage = 'Name must be at least 2 characters';
                        isValid = false;
                    }
                    break;
                case 'email':
                    if (!value) {
                        errorMessage = 'Email is required';
                        isValid = false;
                    } else if (!this.isValidEmail(value)) {
                        errorMessage = 'Please enter a valid email address';
                        isValid = false;
                    }
                    break;
                case 'message':
                    if (!value) {
                        errorMessage = 'Message is required';
                        isValid = false;
                    } else if (value.length < 10) {
                        errorMessage = 'Message must be at least 10 characters';
                        isValid = false;
                    }
                    break;
            }

            const errorElement = document.getElementById(`${fieldName}-error`);
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.classList.toggle('show', !isValid);
            }

            return isValid;
        }

        clearError(field) {
            const errorElement = document.getElementById(`${field.name}-error`);
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }

        isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        capitalizeFirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        async handleSubmit(e) {
            e.preventDefault();
            
            const formData = new FormData(this.form);
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const message = formData.get('message')?.trim();
            
            // Validate all fields
            const nameValid = this.validateField(this.form.querySelector('[name="name"]'));
            const emailValid = this.validateField(this.form.querySelector('[name="email"]'));
            const messageValid = this.validateField(this.form.querySelector('[name="message"]'));
            
            if (!nameValid || !emailValid || !messageValid) {
                return;
            }
            
            // Show loading state
            const originalText = this.submitBtn.querySelector('.btn-text').textContent;
            this.submitBtn.querySelector('.btn-text').textContent = 'Sending...';
            this.submitBtn.disabled = true;
            this.submitBtn.style.opacity = '0.7';
            
            try {
                // Send email using EmailJS v4
                const templateParams = {
                    from_name: this.capitalizeFirst(name),
                    from_email: email,
                    message: message
                };

                console.log('Sending email with params:', templateParams);
                console.log('Using config:', this.emailConfig);

                const response = await emailjs.send(
                    this.emailConfig.serviceID,
                    this.emailConfig.templateID,
                    templateParams
                );

                console.log('Email sent successfully:', response);
                this.showSuccessMessage();
                this.form.reset();
                
            } catch (error) {
                console.error('Failed to send email:', error);
                console.error('Error details:', {
                    message: error.message,
                    status: error.status,
                    text: error.text
                });
                
                // Show detailed error message
                let errorMsg = 'Failed to send message. ';
                if (error.status === 418) {
                    errorMsg += 'Template configuration issue detected. Please check that your EmailJS template has the correct variables: {{from_name}}, {{from_email}}, {{message}}';
                } else if (error.status === 422) {
                    errorMsg += 'Please check your EmailJS template configuration.';
                } else if (error.status === 400) {
                    errorMsg += 'Invalid request. Please check your EmailJS service settings.';
                } else {
                    errorMsg += 'Please try again or contact me directly at sarim.uk@outlook.com';
                }
                
                alert(errorMsg);
                
            } finally {
                // Reset button state
                this.submitBtn.querySelector('.btn-text').textContent = originalText;
                this.submitBtn.disabled = false;
                this.submitBtn.style.opacity = '1';
            }
        }

        showSuccessMessage() {
            this.successMessage.classList.add('show');
            
            setTimeout(() => {
                this.successMessage.classList.remove('show');
            }, 5000);
        }

        handleDarkModeToggle() {
            const isChecked = this.toggleSwitch.checked;
            const message = isChecked 
                ? "Haha! We're already in the cool mode 😎"
                : "Welcome to the light side! ☀️ (Just kidding, switching back...)";
            
            this.toggleMessage.textContent = message;
            this.toggleMessage.classList.add('show');
            
            setTimeout(() => {
                this.toggleMessage.classList.remove('show');
                if (!isChecked) {
                    this.toggleSwitch.checked = true;
                }
            }, 2000);
        }

        addStarfield() {
            const starfield = document.querySelector('.starfield');
            if (!starfield) return;
            
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.style.position = 'absolute';
                star.style.width = Math.random() * 2 + 'px';
                star.style.height = star.style.width;
                star.style.backgroundColor = '#00e6e6';
                star.style.borderRadius = '50%';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite`;
                star.style.animationDelay = Math.random() * 2 + 's';
                starfield.appendChild(star);
            }
        }
    }

    // Smooth scrolling for navigation links
    function smoothScrollToContact() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Add contact link to navigation if it doesn't exist
    function addContactNavigation() {
        const nav = document.querySelector('.nav-links');
        const contactLink = document.querySelector('a[href="#contact"]');
        
        if (nav && !contactLink) {
            const contactNavItem = document.createElement('li');
            contactNavItem.innerHTML = '<a href="#contact" onclick="smoothScrollToContact()">Contact</a>';
            nav.appendChild(contactNavItem);
        }
    }

    // Enhanced form accessibility
    function enhanceAccessibility() {
        // Add keyboard navigation for social icons
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.setAttribute('tabindex', '0');
            
            icon.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    icon.click();
                }
            });
        });
        
        // Add keyboard support for toggle switch
        const toggleSwitch = document.querySelector('.toggle-label');
        if (toggleSwitch) {
            toggleSwitch.setAttribute('tabindex', '0');
            
            toggleSwitch.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const checkbox = toggleSwitch.querySelector('input[type="checkbox"]');
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            });
        }
    }

    // Resume Download Functionality
    class ResumeDownloader {
        constructor() {
            console.log('🔧 ResumeDownloader: Constructor called');
            this.downloadBtn = document.getElementById('download-btn');
            this.progressElement = document.getElementById('download-progress');
            this.successElement = document.getElementById('download-success');
            this.progressFill = document.querySelector('.progress-fill');
            this.percentageElement = document.querySelector('.percentage');
            
            console.log('🔍 ResumeDownloader elements found:', {
                downloadBtn: !!this.downloadBtn,
                progressElement: !!this.progressElement,
                successElement: !!this.successElement,
                progressFill: !!this.progressFill,
                percentageElement: !!this.percentageElement
            });
            
            // Configuration
            this.config = {
                downloadUrl: './Sarim_Resume.pdf', // Relative path for GitHub Pages
                viewOnlineUrl: 'https://sarimukhan.tiiny.site/', // Updated with actual online resume URL
                downloadDuration: 3000, // 3 seconds simulation
                progressSteps: 30
            };
            
            console.log('⚙️ ResumeDownloader config:', this.config);
            
            this.init();
        }
        
        init() {
            console.log('🔧 ResumeDownloader: init() called');
            
            if (this.downloadBtn) {
                console.log('✅ Download button found, adding click listener');
                this.downloadBtn.addEventListener('click', this.handleDownload.bind(this));
                
                // Add a test click listener to verify event binding
                this.downloadBtn.addEventListener('click', function() {
                    console.log('🎯 DOWNLOAD BUTTON CLICKED! Event listener working.');
                });
            } else {
                console.error('❌ Download button not found!');
            }
            
            this.addKeyboardSupport();
            console.log('✅ ResumeDownloader initialization complete');
        }
        
        handleDownload() {
            console.log('🚀 handleDownload() called!');
            console.log('📊 Button state before:', {
                disabled: this.downloadBtn.disabled,
                opacity: this.downloadBtn.style.opacity
            });
            
            // Disable button to prevent multiple clicks
            this.downloadBtn.disabled = true;
            this.downloadBtn.style.opacity = '0.7';
            
            console.log('📊 Button state after disable:', {
                disabled: this.downloadBtn.disabled,
                opacity: this.downloadBtn.style.opacity
            });
            
            // Hide success message if visible
            this.successElement.classList.remove('active');
            
            // Show progress indicator
            this.progressElement.classList.add('active');
            console.log('✅ Progress element activated');
            
            // Start progress simulation
            this.simulateProgress();
        }
        
        simulateProgress() {
            let progress = 0;
            const stepSize = 100 / this.config.progressSteps;
            const stepDuration = this.config.downloadDuration / this.config.progressSteps;
            
            const interval = setInterval(() => {
                progress += stepSize;
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Update final progress
                    this.updateProgress(progress);
                    
                    // Complete download after a short delay
                    setTimeout(() => {
                        this.completeDownload();
                    }, 500);
                } else {
                    this.updateProgress(progress);
                }
            }, stepDuration);
        }
        
        updateProgress(percentage) {
            const roundedPercentage = Math.round(percentage);
            this.progressFill.style.width = `${percentage}%`;
            this.percentageElement.textContent = `${roundedPercentage}%`;
        }
        
        completeDownload() {
            // Hide progress indicator
            this.progressElement.classList.remove('active');
            
            // Show success message
            this.successElement.classList.add('active');
            
            // Trigger actual download
            this.triggerDownload();
            
            // Re-enable button and reset after delay
            setTimeout(() => {
                this.resetDownloadState();
            }, 4000);
        }
        
        triggerDownload() {
            console.log('⬇️ triggerDownload() called!');
            console.log('📁 Attempting to download:', this.config.downloadUrl);
            
            // Method 1: Try direct download first
            try {
                const link = document.createElement('a');
                link.href = this.config.downloadUrl;
                link.download = 'Sarim_Resume.pdf';
                link.style.display = 'none';
                
                console.log('🔗 Download link created:', {
                    href: link.href,
                    download: link.download,
                    resolvedUrl: new URL(this.config.downloadUrl, window.location.href).href
                });
                
                // Test if the file exists before triggering download
                fetch(this.config.downloadUrl, { method: 'HEAD' })
                    .then(response => {
                        if (response.ok) {
                            console.log('✅ File exists, triggering download...');
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            console.log('✅ Resume download triggered successfully');
                        } else {
                            console.warn('⚠️ File not found, trying fallback...');
                            this.fallbackDownload();
                        }
                    })
                    .catch(error => {
                        console.warn('⚠️ Download check failed, trying fallback...', error);
                        this.fallbackDownload();
                    });
                    
            } catch (error) {
                console.error('❌ Direct download failed:', error);
                this.fallbackDownload();
            }
        }
        
        fallbackDownload() {
            console.log('🔄 Using fallback download method...');
            
            // Fallback: Open the file in a new window/tab
            const fallbackUrl = this.config.downloadUrl.startsWith('./') 
                ? this.config.downloadUrl.substring(2) 
                : this.config.downloadUrl;
                
            console.log('🔗 Fallback URL:', fallbackUrl);
            
            // Try different fallback approaches
            try {
                // Method 1: Open in new tab
                window.open(fallbackUrl, '_blank');
                console.log('✅ Fallback method 1: Opened in new tab');
            } catch (error) {
                console.warn('⚠️ Fallback method 1 failed, trying method 2...');
                
                try {
                    // Method 2: Direct navigation
                    window.location.href = fallbackUrl;
                    console.log('✅ Fallback method 2: Direct navigation');
                } catch (error2) {
                    console.error('❌ All download methods failed:', error2);
                    
                    // Method 3: Show manual download instruction
                    alert(`Download failed. Please manually navigate to: ${window.location.origin}/${fallbackUrl}`);
                }
            }
        }
        
        resetDownloadState() {
            // Hide success message
            this.successElement.classList.remove('active');
            
            // Re-enable download button
            this.downloadBtn.disabled = false;
            this.downloadBtn.style.opacity = '1';
            
            // Reset progress
            this.updateProgress(0);
        }
        
        addKeyboardSupport() {
            // Add keyboard support for download button
            if (this.downloadBtn) {
                this.downloadBtn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (!this.downloadBtn.disabled) {
                            this.handleDownload();
                        }
                    }
                });
            }
        }
        
        // Public method to update configuration
        updateConfig(newConfig) {
            this.config = { ...this.config, ...newConfig };
        }
        
        // Debug method for testing download functionality
        testDownload() {
            console.log('🧪 Testing direct download...');
            console.log('📁 File path:', this.config.downloadUrl);
            
            // Try different approaches
            const approaches = [
                // Approach 1: Direct download link
                () => {
                    console.log('🔄 Trying approach 1: Direct link click');
                    const link = document.createElement('a');
                    link.href = this.config.downloadUrl;
                    link.download = 'Sarim_Resume.pdf';
                    link.click();
                },
                // Approach 2: Force download with absolute URL
                () => {
                    console.log('🔄 Trying approach 2: Absolute URL');
                    const link = document.createElement('a');
                    link.href = window.location.origin + '/' + this.config.downloadUrl;
                    link.download = 'Sarim_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                },
                // Approach 3: Open in new window
                () => {
                    console.log('🔄 Trying approach 3: Open in new window');
                    window.open(this.config.downloadUrl, '_blank');
                }
            ];
            
            // Try each approach with delay
            approaches.forEach((approach, index) => {
                setTimeout(() => {
                    try {
                        approach();
                        console.log(`✅ Approach ${index + 1} executed`);
                    } catch (error) {
                        console.error(`❌ Approach ${index + 1} failed:`, error);
                    }
                }, index * 1000);
            });
        }
    }

    // Add Resume section to navigation
    function addResumeNavigation() {
        const nav = document.querySelector('.nav-links');
        const resumeLink = document.querySelector('a[href="#resume"]');
        
        if (nav && !resumeLink) {
            // Find the contact link and insert resume before it
            const contactLink = nav.querySelector('a[href="#contact"]');
            if (contactLink) {
                const resumeNavItem = document.createElement('li');
                resumeNavItem.innerHTML = '<a href="#resume">Resume</a>';
                contactLink.parentElement.insertAdjacentElement('beforebegin', resumeNavItem);
            }
        }
    }

    // Enhanced scroll animation for resume section
    function enhanceResumeAnimations() {
        const resumeSection = document.getElementById('resume');
        const resumeTitle = document.querySelector('.resume-title');
        const downloadBtn = document.querySelector('.download-btn');
        const previewCard = document.querySelector('.preview-card');
        
        if (!resumeSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate title
                    if (resumeTitle) {
                        resumeTitle.style.animation = 'fadeInUp 1s ease 0.2s both';
                    }
                    
                    // Animate download button
                    if (downloadBtn) {
                        downloadBtn.style.animation = 'fadeInUp 1s ease 0.4s both';
                    }
                    
                    // Animate preview card
                    if (previewCard) {
                        previewCard.style.animation = 'fadeInRight 1s ease 0.6s both, cardFloat 4s ease-in-out 1s infinite';
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(resumeSection);
    }

    // Floating Easter Egg Functionality
    class FloatingEasterEgg {
        constructor() {
            console.log('🔧 FloatingEasterEgg: Constructor called');
            this.easterEgg = document.getElementById('floating-easter-egg');
            this.modal = document.getElementById('easter-egg-modal');
            this.messageElement = document.getElementById('easter-egg-message');
            this.closeBtn = document.querySelector('.easter-egg-close');
            this.anotherBtn = document.querySelector('.easter-egg-another-btn');
            this.modalOverlay = document.querySelector('.modal-overlay');
            
            console.log('🔧 Elements found:', {
                easterEgg: !!this.easterEgg,
                modal: !!this.modal,
                messageElement: !!this.messageElement,
                closeBtn: !!this.closeBtn,
                anotherBtn: !!this.anotherBtn,
                modalOverlay: !!this.modalOverlay
            });
            
            // Fun surprise messages
            this.surpriseMessages = [
                "🤫 I started coding because I thought websites were just magic... turns out they still are! ✨",
                "🎯 Secret goal: Build an AI so smart it can debug my code while I sleep 😴",
                "☕ I've consumed enough caffeine to power a small data center just this week",
                "🌟 Plot twist: This portfolio took me 3x longer than expected because I kept adding 'just one more feature'",
                "🚀 I dream of working at a company where my code doesn't just work—it changes the world",
                "🔥 I once spent 6 hours debugging... only to realize I forgot a semicolon. Classic me! 😅",
                "🧠 My brain runs on algorithms and random shower thoughts about better code architecture",
                "🎮 I learned JavaScript by trying to mod browser games. Who says gaming isn't educational?",
                "💡 I have a secret folder of 'genius' project ideas I wrote at 3 AM that make no sense in daylight",
                "🏆 My proudest achievement? Making my grandma understand what I do for a living (sort of)",
                "🌱 Every project teaches me something new. This portfolio taught me I need more coffee ☕",
                "🎯 Fun fact: I practice coding problems instead of counting sheep to fall asleep",
                "🔮 I can predict which line of code will break in production just by looking at it",
                "🌟 My coding superpower? Turning 'it should work' into 'wait, it actually works!' 🎉",
                "🚀 Confession: I sometimes name my variables after my favorite TV characters. No regrets!",
                "💭 I measure project success by how few times I had to Google 'why isn't this working'",
                "🎪 I'm basically a digital architect, but instead of buildings, I create experiences that hopefully don't crash",
                "🌊 Some people surf waves. I surf Stack Overflow trying to solve that one weird bug 🏄‍♂️"
            ];
            
            this.currentMessageIndex = 0;
            this.isFloating = true;
            this.floatingInterval = null;
            this.boundaryPadding = 50;
            
            this.init();
        }
        
        init() {
            console.log('🔧 FloatingEasterEgg: init() called');
            if (!this.easterEgg) {
                console.error('❌ Easter egg element not found!');
                return;
            }
            
            console.log('✅ Easter egg element found, setting up...');
            this.setupEventListeners();
            this.startFloating();
            this.positionRandomly();
            
            // Optional: Play subtle sound effect on load (placeholder)
            // this.playSound('easter-egg-ambient.mp3');
        }
        
        setupEventListeners() {
            console.log('🔧 Setting up event listeners...');
            
            // Click and keyboard events for easter egg
            this.easterEgg.addEventListener('click', (e) => {
                console.log('🎯 Easter egg clicked!', e);
                this.showSurprise();
            });
            
            this.easterEgg.addEventListener('keydown', (e) => {
                console.log('⌨️ Easter egg key pressed:', e.key);
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showSurprise();
                }
            });
            
            // Modal events
            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', this.hideSurprise.bind(this));
            }
            if (this.anotherBtn) {
                this.anotherBtn.addEventListener('click', this.showAnotherSecret.bind(this));
            }
            if (this.modalOverlay) {
                this.modalOverlay.addEventListener('click', this.hideSurprise.bind(this));
            }
            
            // Escape key to close modal
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
                    this.hideSurprise();
                }
            });
            
            // Pause floating when hovered
            this.easterEgg.addEventListener('mouseenter', this.pauseFloating.bind(this));
            this.easterEgg.addEventListener('mouseleave', this.resumeFloating.bind(this));
            
            console.log('✅ Event listeners set up successfully');
        }
        
        positionRandomly() {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            const x = Math.random() * (viewportWidth - this.boundaryPadding * 2) + this.boundaryPadding;
            const y = Math.random() * (viewportHeight - this.boundaryPadding * 2) + this.boundaryPadding;
            
            this.easterEgg.style.left = `${x}px`;
            this.easterEgg.style.top = `${y}px`;
        }
        
        startFloating() {
            this.floatingInterval = setInterval(() => {
                if (this.isFloating) {
                    this.moveRandomly();
                }
            }, 8000 + Math.random() * 4000); // Random interval between 8-12 seconds
        }
        
        moveRandomly() {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Calculate new position
            const currentLeft = parseInt(this.easterEgg.style.left) || 0;
            const currentTop = parseInt(this.easterEgg.style.top) || 0;
            
            // Generate movement delta (smaller movements)
            const deltaX = (Math.random() - 0.5) * 200; // -100 to +100px
            const deltaY = (Math.random() - 0.5) * 200;
            
            let newX = currentLeft + deltaX;
            let newY = currentTop + deltaY;
            
            // Keep within boundaries
            newX = Math.max(this.boundaryPadding, Math.min(viewportWidth - this.boundaryPadding, newX));
            newY = Math.max(this.boundaryPadding, Math.min(viewportHeight - this.boundaryPadding, newY));
            
            // Apply smooth transition
            this.easterEgg.style.transition = 'all 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.easterEgg.style.left = `${newX}px`;
            this.easterEgg.style.top = `${newY}px`;
            
            // Reset transition after movement
            setTimeout(() => {
                this.easterEgg.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 3000);
        }
        
        pauseFloating() {
            this.isFloating = false;
        }
        
        resumeFloating() {
            setTimeout(() => {
                this.isFloating = true;
            }, 2000); // Resume after 2 seconds
        }
        
        showSurprise() {
            console.log('🎉 showSurprise() called!');
            console.log('📊 Current message index:', this.currentMessageIndex);
            console.log('📊 Total messages available:', this.surpriseMessages.length);
            
            if (!this.modal) {
                console.error('❌ Modal element not found!');
                return;
            }

            console.log('✅ Modal found, showing surprise...');
            
            // Pause floating
            this.pauseFloating();
            
            // Show current surprise message
            const message = this.surpriseMessages[this.currentMessageIndex];
            console.log('📝 Showing message #' + this.currentMessageIndex + ':', message);
            
            if (this.messageElement) {
                this.messageElement.textContent = message;
                console.log('✅ Message set successfully');
            } else {
                console.error('❌ Message element not found!');
            }
            
            // Show modal
            this.modal.classList.add('active');
            this.modal.setAttribute('aria-hidden', 'false');
            console.log('✅ Modal activated');
            
            // Focus management for accessibility
            if (this.closeBtn) {
                this.closeBtn.focus();
                console.log('✅ Focus set to close button');
            }
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
            
            // Optional: Play sound effect (placeholder)
            // this.playSound('surprise-reveal.mp3');
            
            // Increment message index for next time
            this.currentMessageIndex = (this.currentMessageIndex + 1) % this.surpriseMessages.length;
            console.log('✅ Next message index set to:', this.currentMessageIndex);
        }
        
        hideSurprise() {
            if (!this.modal) return;
            
            // Hide modal
            this.modal.classList.remove('active');
            this.modal.setAttribute('aria-hidden', 'true');
            
            // Restore body scrolling
            document.body.style.overflow = '';
            
            // Return focus to easter egg
            this.easterEgg.focus();
            
            // Resume floating after a delay
            setTimeout(() => {
                this.resumeFloating();
            }, 1000);
        }
        
        showAnotherSecret() {
            // Get another random message
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * this.surpriseMessages.length);
            } while (newIndex === this.currentMessageIndex && this.surpriseMessages.length > 1);
            
            const message = this.surpriseMessages[newIndex];
            this.messageElement.textContent = message;
            
            // Add a fun animation to the modal content
            const content = document.querySelector('.easter-egg-content');
            content.style.animation = 'none';
            setTimeout(() => {
                content.style.animation = 'modalAppear 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 10);
            
            // Optional: Play sound effect (placeholder)
            // this.playSound('another-secret.mp3');
        }
        
        // Placeholder for sound effects
        playSound(filename) {
            // Uncomment and use when you have actual sound files
            /*
            try {
                const audio = new Audio(`sounds/${filename}`);
                audio.volume = 0.3; // Keep it subtle
                audio.play().catch(e => console.log('Could not play sound:', e));
            } catch (error) {
                console.log('Sound file not found:', filename);
            }
            */
            console.log(`🎵 Playing sound: ${filename}`);
        }
        
        // Cleanup method
        destroy() {
            if (this.floatingInterval) {
                clearInterval(this.floatingInterval);
            }
        }
        
        // Public method to add custom messages
        addCustomMessages(messages) {
            this.surpriseMessages = [...this.surpriseMessages, ...messages];
        }
        
        // Public method to set specific position
        setPosition(x, y) {
            this.easterEgg.style.left = `${x}px`;
            this.easterEgg.style.top = `${y}px`;
        }
    }

    // Enhanced window resize handler
    function handleEasterEggResize() {
        // Reposition easter egg if it's outside viewport after resize
        const easterEgg = document.getElementById('floating-easter-egg');
        if (easterEgg) {
            const rect = easterEgg.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            if (rect.left < 0 || rect.right > viewportWidth || rect.top < 0 || rect.bottom > viewportHeight) {
                const newX = Math.random() * (viewportWidth - 100) + 50;
                const newY = Math.random() * (viewportHeight - 100) + 50;
                easterEgg.style.left = `${newX}px`;
                easterEgg.style.top = `${newY}px`;
            }
        }
    }

    // Immediate test for Easter egg
    setTimeout(() => {
        console.log('🔧 Testing Easter egg element...');
        const easterEgg = document.getElementById('floating-easter-egg');
        const modal = document.getElementById('easter-egg-modal');
        const messageEl = document.getElementById('easter-egg-message');
        
        console.log('🔍 Elements test:', {
            easterEgg: !!easterEgg,
            modal: !!modal,
            messageEl: !!messageEl
        });
        
        if (easterEgg) {
            console.log('✅ Easter egg found! Ready for FloatingEasterEgg class initialization...');
            
            // Store all your personalized messages for backup use
            const personalizedMessages = [
                "🤫 I started coding because I thought websites were just magic... turns out they still are! ✨",
                "🎯 Secret goal: Build an AI so smart it can debug my code while I sleep 😴",
                "☕ I've consumed enough caffeine to power a small data center just this week",
                "🌟 Plot twist: This portfolio took me 3x longer than expected because I kept adding 'just one more feature'",
                "🚀 I dream of working at a company where my code doesn't just work—it changes the world",
                "🔥 I once spent 6 hours debugging... only to realize I forgot a semicolon. Classic me! 😅",
                "🧠 My brain runs on algorithms and random shower thoughts about better code architecture",
                "🎮 I learned JavaScript by trying to mod browser games. Who says gaming isn't educational?",
                "💡 I have a secret folder of 'genius' project ideas I wrote at 3 AM that make no sense in daylight",
                "🏆 My proudest achievement? Making my grandma understand what I do for a living (sort of)",
                "🌱 Every project teaches me something new. This portfolio taught me I need more coffee ☕",
                "🎯 Fun fact: I practice coding problems instead of counting sheep to fall asleep",
                "🔮 I can predict which line of code will break in production just by looking at it",
                "🌟 My coding superpower? Turning 'it should work' into 'wait, it actually works!' 🎉",
                "🚀 Confession: I sometimes name my variables after my favorite TV characters. No regrets!",
                "💭 I measure project success by how few times I had to Google 'why isn't this working'",
                "🎪 I'm basically a digital architect, but instead of buildings, I create experiences that hopefully don't crash",
                "🌊 Some people surf waves. I surf Stack Overflow trying to solve that one weird bug 🏄‍♂️"
            ];
            
            let backupMessageIndex = 0;
            
            // Add backup click handler in case FloatingEasterEgg class fails
            easterEgg.addEventListener('click', function(e) {
                console.log('🎯 BACKUP: Easter egg clicked!');
                if (modal && messageEl) {
                    // Check if FloatingEasterEgg instance exists and use it
                    if (window.floatingEasterEgg && window.floatingEasterEgg.showSurprise) {
                        console.log('🎉 Using FloatingEasterEgg class method');
                        window.floatingEasterEgg.showSurprise();
                    } else {
                        console.log('⚠️ FloatingEasterEgg not available, using backup system');
                        messageEl.textContent = personalizedMessages[backupMessageIndex];
                        modal.classList.add('active');
                        modal.setAttribute('aria-hidden', 'false');
                        backupMessageIndex = (backupMessageIndex + 1) % personalizedMessages.length;
                        console.log('📝 Next backup message index:', backupMessageIndex);
                    }
                } else {
                    console.error('❌ Modal or message element not found');
                }
            });
            
            // Add backup "Show Another Secret" button handler
            const anotherBtn = document.querySelector('.easter-egg-another-btn');
            if (anotherBtn) {
                anotherBtn.addEventListener('click', function() {
                    console.log('🔄 Show Another Secret clicked!');
                    if (window.floatingEasterEgg && window.floatingEasterEgg.showAnotherSecret) {
                        console.log('🎉 Using FloatingEasterEgg class method');
                        window.floatingEasterEgg.showAnotherSecret();
                    } else {
                        console.log('⚠️ FloatingEasterEgg not available, using backup system');
                        if (messageEl) {
                            messageEl.textContent = personalizedMessages[backupMessageIndex];
                            backupMessageIndex = (backupMessageIndex + 1) % personalizedMessages.length;
                            console.log('📝 Backup message shown, next index:', backupMessageIndex);
                            
                            // Add animation
                            const content = document.querySelector('.easter-egg-content');
                            if (content) {
                                content.style.animation = 'none';
                                setTimeout(() => {
                                    content.style.animation = 'modalAppear 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                                }, 10);
                            }
                        }
                    }
                });
            }
            
            // Add close functionality back
            const closeBtn = document.querySelector('.easter-egg-close');
            const overlay = document.querySelector('.modal-overlay');
            
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    console.log('🔒 Closing modal');
                    modal.classList.remove('active');
                    modal.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                });
            }
            
            if (overlay) {
                overlay.addEventListener('click', function() {
                    console.log('🔒 Closing modal via overlay');
                    modal.classList.remove('active');
                    modal.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                });
            }
        } else {
            console.error('❌ Easter egg element not found!');
        }
    }, 1000);

    // Check DOM ready state and initialize immediately if ready
    console.log('🔍 Current document ready state:', document.readyState);
    
    if (document.readyState === 'loading') {
        console.log('📝 DOM still loading, waiting for DOMContentLoaded...');
        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', initializeAll);
    } else {
        console.log('📝 DOM already ready, initializing immediately...');
        // DOM is already ready, initialize immediately
        initializeAll();
    }

    function initializeAll() {
        console.log('🚀 initializeAll() fired');
        console.log('🔍 Document ready state at init:', document.readyState);
        
        // Initialize existing functionality
        console.log('🔧 Initializing ContactForm...');
        new ContactForm();
        addContactNavigation();
        enhanceAccessibility();
        
        // Initialize Resume functionality
        console.log('🔧 Initializing ResumeDownloader...');
        const resumeDownloader = new ResumeDownloader();
        addResumeNavigation();
        enhanceResumeAnimations();
        
        // Initialize Easter Egg
        console.log('🔧 Initializing FloatingEasterEgg...');
        
        // Debug: Check if elements exist
        const easterEggElement = document.getElementById('floating-easter-egg');
        const modalElement = document.getElementById('easter-egg-modal');
        console.log('🔍 DOM check:', {
            easterEggElement: !!easterEggElement,
            modalElement: !!modalElement,
            easterEggVisible: easterEggElement ? getComputedStyle(easterEggElement).display : 'not found',
            easterEggPosition: easterEggElement ? getComputedStyle(easterEggElement).position : 'not found'
        });
        
        try {
            const floatingEasterEgg = new FloatingEasterEgg();
            console.log('✅ FloatingEasterEgg created successfully:', floatingEasterEgg);
            
            // Handle window resize for easter egg
            window.addEventListener('resize', handleEasterEggResize);
            
            // Make instances globally accessible
            window.resumeDownloader = resumeDownloader;
            window.floatingEasterEgg = floatingEasterEgg;
            
            console.log('✅ All initialization complete');
        } catch (error) {
            console.error('❌ Error creating FloatingEasterEgg:', error);
        }
        
        // Fun console message for developers who inspect the code
        console.log(`
    🎉 Congratulations! You found the developer console!
    🔍 Here's a secret: Try interacting with the floating mystery element on the page...
    🚀 Want to add your own surprise messages? Use:
       window.floatingEasterEgg.addCustomMessages(['Your message here!'])
        `);
    }

    // Emergency manual initialization after delay
    setTimeout(() => {
        console.log('🆘 Emergency check - is ResumeDownloader initialized?');
        if (!window.resumeDownloader) {
            console.log('❌ ResumeDownloader not found, attempting manual initialization...');
            try {
                window.resumeDownloader = new ResumeDownloader();
                console.log('✅ Manual ResumeDownloader initialization successful!');
            } catch (error) {
                console.error('❌ Manual initialization failed:', error);
            }
        } else {
            console.log('✅ ResumeDownloader already initialized');
        }
    }, 2000);

    // Add CSS for background pulse animation
    const style = document.createElement('style');
    style.textContent = `
        .background-pulse {
            animation: backgroundPulse 1s ease !important;
        }
    `;
    document.head.appendChild(style);
}); 