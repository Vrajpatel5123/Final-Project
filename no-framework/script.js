document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('h1, p');
    elements.forEach(element => {
        element.classList.add('fade-in');
    });

    const button = document.querySelector('button');
    if (button) {
        button.addEventListener('click', () => {
            alert('Button clicked!');
        });
    }

    // Add slide-in animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('slide-in');
    });

    // Interactive buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.innerHTML = '<span>Loading...</span>';
            
            setTimeout(() => {
                this.innerHTML = 'Done!';
                this.style.background = 'linear-gradient(45deg, #45a049 0%, #4CAF50 100%)';
            }, 1000);
        });
    });

    // Add parallax effect to cards
    window.addEventListener('mousemove', (e) => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.transform = `perspective(1000px) rotateX(${(y - rect.height/2)/20}deg) rotateY(${-(x - rect.width/2)/20}deg)`;
        });
    });

    // Animate statistics when in view
    const stats = document.querySelectorAll('.stat-counter');
    const animateStats = () => {
        stats.forEach(stat => {
            const value = parseInt(stat.innerText);
            let current = 0;
            const increment = value / 30;
            const updateStats = () => {
                if (current < value) {
                    current += increment;
                    stat.innerText = Math.round(current) + (stat.innerText.includes('%') ? '%' : '+');
                    requestAnimationFrame(updateStats);
                }
            };
            updateStats();
        });
    };

    // Intersection Observer for stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.disconnect();
            }
        });
    });

    if (stats.length) {
        observer.observe(stats[0]);
    }

    // Dynamic background pattern movement on scroll
    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset;
        document.body.style.backgroundPosition = `${offset * 0.5}px ${offset * 0.5}px`;
    });

    // Add smooth scroll behavior
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav items on scroll
    const sections = document.querySelectorAll('section, .content-grid, .testimonial');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('nav a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });

    // Enhanced scroll behavior for all pages
    const handleScroll = () => {
        const sections = document.querySelectorAll('section, .content-grid, .testimonial');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    // Initialize animations for new elements
    const initializeAnimations = () => {
        document.querySelectorAll('.feature-box, .card').forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
            element.classList.add('slide-in');
        });
    };

    initializeAnimations();

    // Add scroll to top button
    const scrollButton = document.createElement('div');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    document.body.appendChild(scrollButton);

    // Add scroll indicators
    const sectionsWithId = document.querySelectorAll('section, .content-grid, .testimonial[id]');
    const indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'scroll-indicator-container';
    
    sectionsWithId.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'scroll-indicator-dot';
        const label = document.createElement('span');
        label.className = 'scroll-label';
        label.textContent = section.id || `Section ${index + 1}`;
        dot.appendChild(label);
        
        dot.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });
        
        indicatorContainer.appendChild(dot);
    });
    
    document.body.appendChild(indicatorContainer);

    // Handle scroll events
    window.addEventListener('scroll', () => {
        // Show/hide scroll button
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }

        // Update active indicators
        const dots = document.querySelectorAll('.scroll-indicator-dot');
        sectionsWithId.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2) {
                dots[index].classList.add('active');
            } else {
                dots[index].classList.remove('active');
            }
        });
    });

    // Scroll to top functionality
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Enhance existing scroll behavior
    const smoothScroll = (target, offset = 80) => {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - offset;
        
        window.scrollTo({
            top: startPosition + distance,
            behavior: 'smooth'
        });
    };

    // Update existing scroll listeners
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) smoothScroll(target);
        });
    });

    // Enhanced Scroll Controls
    const sectionsArray = Array.from(document.querySelectorAll('section, .content-grid, .testimonial[id]'));
    let currentSectionIndex = 0;

    // Function to scroll to specific section
    const scrollToSection = (index) => {
        if (index >= 0 && index < sectionsArray.length) {
            currentSectionIndex = index;
            sectionsArray[index].scrollIntoView({ behavior: 'smooth' });
            updateScrollIndicators(index);
        }
    };

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                scrollToSection(currentSectionIndex + 1);
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                scrollToSection(currentSectionIndex - 1);
                break;
            case 'Home':
                e.preventDefault();
                scrollToSection(0);
                break;
            case 'End':
                e.preventDefault();
                scrollToSection(sectionsArray.length - 1);
                break;
        }
    });

    // Mouse wheel control
    let wheelTimeout;
    document.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (e.deltaY > 0) {
                scrollToSection(currentSectionIndex + 1);
            } else {
                scrollToSection(currentSectionIndex - 1);
            }
        }, 50); // Debounce scroll events
    }, { passive: false });

    // Update scroll indicators
    const updateScrollIndicators = (activeIndex) => {
        document.querySelectorAll('.scroll-indicator-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    };

    // Create scroll progress indicator
    const createScrollProgress = () => {
        const progress = document.createElement('div');
        progress.className = 'scroll-progress';
        document.body.appendChild(progress);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progress.style.width = `${scrolled}%`;
        });
    };

    // Create scroll controls UI
    const createScrollControls = () => {
        const controls = document.createElement('div');
        controls.className = 'scroll-controls';
        controls.innerHTML = `
            <button class="scroll-up">↑</button>
            <button class="scroll-down">↓</button>
        `;
        document.body.appendChild(controls);

        controls.querySelector('.scroll-up').addEventListener('click', () => 
            scrollToSection(currentSectionIndex - 1));
        controls.querySelector('.scroll-down').addEventListener('click', () => 
            scrollToSection(currentSectionIndex + 1));
    };

    createScrollProgress();
    createScrollControls();

    // Observer for current section
    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentSectionIndex = sectionsArray.indexOf(entry.target);
                updateScrollIndicators(currentSectionIndex);
            }
        });
    }, observerOptions);

    sectionsArray.forEach(section => sectionObserver.observe(section));
});
