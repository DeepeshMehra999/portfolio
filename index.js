// Add click functionality to download resume circles
document.addEventListener('DOMContentLoaded', function() {
    const downloadCircles = document.querySelectorAll('.circle[data-tooltip="Download Resume"]');
    
    downloadCircles.forEach(circle => {
        circle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Option 1: Direct download if resume file exists
            const resumeUrl = 'assets/resume.pdf'; // Path to your resume file
            
            // Create temporary anchor element
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.download = 'Deepesh_Mehra_Resume.pdf';
            
            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Optional: Show success message
            showTooltipMessage(this, 'Resume Downloaded!');
        });
    });
    
    // Function to show temporary tooltip message
    function showTooltipMessage(element, message) {
        const originalTooltip = element.getAttribute('data-tooltip');
        
        // Change tooltip text temporarily
        element.setAttribute('data-tooltip', message);
        
        // Restore original tooltip after 2 seconds
        setTimeout(() => {
            element.setAttribute('data-tooltip', originalTooltip);
        }, 2000);
        
        // Optional: Add visual feedback
        element.style.backgroundColor = 'rgba(250, 96, 1, 0.3)';
        setTimeout(() => {
            element.style.backgroundColor = '';
        }, 500);
    }
});

// If you want to handle the other circles too (View Projects, Contact Me):
document.addEventListener('DOMContentLoaded', function() {
    const circles = document.querySelectorAll('.circle');
    
    circles.forEach(circle => {
        circle.addEventListener('click', function(e) {
            const tooltip = this.getAttribute('data-tooltip');
            
            switch(tooltip) {
                case 'Download Resume':
                    handleResumeDownload();
                    break;
                    
                case 'View Projects':
                    // Scroll to projects section
                    const projectsSection = document.querySelector('.layout-container') || 
                                           document.querySelector('#projects');
                    if (projectsSection) {
                        projectsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    break;
                    
                case 'Contact Me':
                    // Scroll to contact section
                    const contactSection = document.querySelector('.contact') || 
                                          document.querySelector('#contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    break;
            }
        });
    });
    
    function handleResumeDownload() {
        // Your resume download logic here
        const resumeUrl = 'assets/resume.pdf';
        
        // Check if file exists
        fetch(resumeUrl, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    // File exists, proceed with download
                    const link = document.createElement('a');
                    link.href = resumeUrl;
                    link.download = 'Deepesh_Mehra_Frontend_Developer_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Show success message
                    console.log('Resume downloaded successfully');
                } else {
                    // File doesn't exist, show alert
                    alert('Resume file not found. Please contact me directly for my resume.');
                }
            })
            .catch(error => {
                console.error('Error checking resume file:', error);
                alert('Unable to download resume. Please try again later.');
            });
    }
});



// ======================================================================================
// 1. LOADER FUNCTIONALITY
// ======================================================================================
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const main = document.querySelector('.main');
    
    // Show main content after loader completes
    setTimeout(() => {
        loader.classList.add('hide');
        main.style.display = 'block';
    }, 1500); // 1.5 seconds loading animation
    
    // Optional: Remove loader from DOM after transition
    setTimeout(() => {
        loader.style.display = 'none';
    }, 2000);
});

// Also handle case if page is already loaded
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    // Make loader visible initially
    loader.style.display = 'flex';
});

// ======================================================================================
// 2. DOCK NAVIGATION - Active State Management
// ======================================================================================
document.addEventListener('DOMContentLoaded', function() {
    const dockButtons = document.querySelectorAll('.dbtn');
    const sections = document.querySelectorAll('section, #about, #skills, #project, #works, #certi,#contact');
    
    // Function to update active dock button based on scroll position
    function updateActiveDockButton() {
        const scrollPosition = window.scrollY + 300; // Offset for better detection
        
        sections.forEach(section => {
            if (!section.id) return; // Skip sections without ID
            
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all buttons
                dockButtons.forEach(btn => {
                    btn.classList.remove('act');
                });
                
                // Add active class to corresponding button
                const activeButton = Array.from(dockButtons).find(btn => {
                    const href = btn.getAttribute('href');
                    return href && href.includes(section.id);
                });
                
                if (activeButton) {
                    activeButton.classList.add('act');
                }
            }
        });
        
        // Special case for home/top of page
        if (window.scrollY < 100) {
            dockButtons.forEach(btn => {
                btn.classList.remove('act');
                if (btn.getAttribute('href') === 'index.html' || btn.getAttribute('href') === '#') {
                    btn.classList.add('act');
                }
            });
        }
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveDockButton);
    
    // Initial update
    updateActiveDockButton();
    
    // Smooth scroll for dock buttons
    dockButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's an internal link (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active state
                    dockButtons.forEach(b => b.classList.remove('act'));
                    this.classList.add('act');
                }
            }
            // If it's index.html with hash
            else if (href && href.includes('#')) {
                e.preventDefault();
                const hashPart = href.split('#')[1];
                const targetSection = document.getElementById(hashPart);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    dockButtons.forEach(b => b.classList.remove('act'));
                    this.classList.add('act');
                }
            }
        });
    });
});

// ======================================================================================
// 3. TYPEWRITER EFFECT FOR HERO SECTION
// ======================================================================================
document.addEventListener('DOMContentLoaded', function() {
    const typedTextElement = document.querySelector('.hero .hero-left .left1 .theme-font:last-child, .hero .hero-left h3 .theme-font');
    
    // If the specific element isn't found, try to find it differently
    let targetElement;
    if (typedTextElement) {
        targetElement = typedTextElement;
    } else {
        // Create the element if it doesn't exist
        const left1 = document.querySelector('.hero .hero-left .left1');
        if (left1) {
            const h3Elements = left1.querySelectorAll('h3');
            // Find the one containing "Frontend Developer"
            h3Elements.forEach(h3 => {
                if (h3.textContent.includes('Frontend Developer')) {
                    const span = h3.querySelector('.theme-font');
                    if (span) {
                        targetElement = span;
                    }
                }
            });
        }
    }
    
    if (targetElement) {
        const roles = [
            'Frontend Developer',
            'Backend Developer',
            'UI/UX Designer',
            'Unity Developer',
            'Full Stack Developer',
            'React Native Developer'
           
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isWaiting = false;
        
        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                // Deleting text
                targetElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Typing text
                targetElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            // Apply the theme font color
            targetElement.style.color = '#FF721B';
            
            // Logic for typing speed and transitions
            if (!isDeleting && charIndex === currentRole.length) {
                // Finished typing - wait before deleting
                isWaiting = true;
                setTimeout(() => {
                    isDeleting = true;
                    isWaiting = false;
                    typeEffect();
                }, 2000); // Wait 2 seconds before deleting
                return;
            }
            
            if (isDeleting && charIndex === 0) {
                // Finished deleting - move to next role
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeEffect, 500); // Small pause before typing next
                return;
            }
            
            // Set typing speed
            let typeSpeed = isDeleting ? 50 : 100;
            
            // Random variation for more natural effect
            typeSpeed = isDeleting ? typeSpeed - 20 : typeSpeed + Math.random() * 50;
            
            if (!isWaiting) {
                setTimeout(typeEffect, typeSpeed);
            }
        }
        
        // Start the typewriter effect
        setTimeout(typeEffect, 1000);
        
        // Add blinking cursor effect
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typewriter-cursor';
        cursorSpan.textContent = '|';
        cursorSpan.style.animation = 'blink 0.7s infinite';
        cursorSpan.style.marginLeft = '2px';
        cursorSpan.style.color = '#FF721B';
        
        // Insert cursor after the element
        targetElement.parentNode.insertBefore(cursorSpan, targetElement.nextSibling);
        
        // Add CSS for cursor blink if not already present
        if (!document.querySelector('#typewriter-cursor-style')) {
            const style = document.createElement('style');
            style.id = 'typewriter-cursor-style';
            style.textContent = `
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .typewriter-cursor {
                    font-weight: 100;
                }
            `;
            document.head.appendChild(style);
        }
    } else {
        console.warn('Typewriter target element not found');
    }
});