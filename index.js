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