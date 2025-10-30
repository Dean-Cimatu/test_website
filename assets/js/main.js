// Interactive Business Card JavaScript

// Global state
let currentTab = 'home';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    createParticleEffect();
    initializeAnimations();
});

// Initialize main app functionality
function initializeApp() {
    // Set up navigation
    setupNavigation();
    
    // Set up social link interactions
    setupSocialLinks();
    
    // Set up stat items interactions
    setupStatItems();
    
    // Set up intersection observer for animations
    setupScrollAnimations();
}

// Navigation functionality
function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showTab(tabName);
        });
    });
}

// Show specific tab with smooth transition
function showTab(tabName) {
    if (currentTab === tabName) return;
    
    // Remove active class from current tab
    document.querySelector('.nav-tab.active')?.classList.remove('active');
    document.querySelector('.tab-content.active')?.classList.remove('active');
    
    // Add active class to new tab
    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    document.querySelector(`#${tabName}-tab`)?.classList.add('active');
    
    currentTab = tabName;
    
    // Trigger animations for the new tab
    setTimeout(() => {
        animateTabContent(tabName);
    }, 100);
    
    // Add haptic feedback (if supported)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

// Animate tab content on show
function animateTabContent(tabName) {
    const tabContent = document.querySelector(`#${tabName}-tab`);
    const animatedElements = tabContent.querySelectorAll('.content-card, .skill-category-card, .timeline-item, .stat-item, .project-card, .experience-card, .education-card, .key-skill-card');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Expandable content functionality
function toggleContent(button) {
    const expandableText = button.closest('.expandable-text');
    const fullText = expandableText.querySelector('.full-text');
    const preview = expandableText.querySelector('.preview');
    
    const isExpanded = expandableText.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse
        fullText.style.maxHeight = '0';
        expandableText.classList.remove('expanded');
        button.textContent = 'Read More';
        button.innerHTML = '<i class="fas fa-chevron-down"></i> Read More';
        preview.style.display = 'block';
    } else {
        // Expand
        expandableText.classList.add('expanded');
        fullText.style.maxHeight = fullText.scrollHeight + 'px';
        button.textContent = 'Show Less';
        button.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less';
        preview.style.display = 'none';
    }
    
    // Add smooth scroll to content
    setTimeout(() => {
        button.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
}

// Skill category toggle
function toggleSkillCategory(header) {
    const categoryCard = header.closest('.skill-category-card');
    const content = categoryCard.querySelector('.category-content');
    const expandIcon = header.querySelector('.expand-icon');
    
    const isExpanded = categoryCard.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse
        categoryCard.classList.remove('expanded');
        content.style.maxHeight = '0';
        expandIcon.style.transform = 'rotate(0deg)';
    } else {
        // Collapse all other categories first
        document.querySelectorAll('.skill-category-card.expanded').forEach(card => {
            if (card !== categoryCard) {
                card.classList.remove('expanded');
                card.querySelector('.category-content').style.maxHeight = '0';
                card.querySelector('.expand-icon').style.transform = 'rotate(0deg)';
            }
        });
        
        // Expand current category
        categoryCard.classList.add('expanded');
        content.style.maxHeight = content.scrollHeight + 'px';
        expandIcon.style.transform = 'rotate(180deg)';
        
        // Animate skill bars
        setTimeout(() => {
            animateSkillBars(content);
        }, 300);
    }
}

// Animate skill bars
function animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.skill-bar');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.getPropertyValue('--width');
            bar.style.width = '0%';
            bar.style.transition = 'width 1s ease';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }, index * 100);
    });
}

// Social links setup
function setupSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        link.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Stat items setup
function setupStatItems() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.querySelector('.stat-icon').style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.querySelector('.stat-icon').style.transform = 'scale(1)';
        });
    });
}



// Particle effect for background
function createParticleEffect() {
    const container = document.querySelector('.floating-particles');
    if (!container) return;
    
    // Create multiple particles
    for (let i = 0; i < 20; i++) {
        createParticle(container, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(102, 126, 234, 0.3);
        border-radius: 50%;
        left: ${left}%;
        top: 100%;
        animation: float-up ${animationDuration}s linear infinite;
        animation-delay: ${delay}s;
    `;
    
    container.appendChild(particle);
}

// Scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    setTimeout(() => {
                        entry.target.querySelector('.timeline-marker').classList.add('pulse');
                    }, 300);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    document.querySelectorAll('.content-card, .timeline-item, .skill-category-card, .project-card, .experience-card, .education-card, .key-skill-card').forEach(el => {
        observer.observe(el);
    });
}

// Add CSS animations dynamically
function initializeAnimations() {
    // Add float-up animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .typing-complete::after {
            content: '|';
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        .animate-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .timeline-marker.pulse {
            animation: pulse-marker 2s ease-in-out infinite;
        }
        
        @keyframes pulse-marker {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
            }
            50% {
                transform: scale(1.1);
                box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const tabs = ['home', 'projects', 'experience', 'education'];
    const currentIndex = tabs.indexOf(currentTab);
    
    if (e.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
        showTab(tabs[currentIndex + 1]);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        showTab(tabs[currentIndex - 1]);
    } else if (e.key === 'Escape') {
        showTab('home');
    }
});

// Touch/swipe support for mobile
let startX = 0;
let startY = 0;

document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // Minimum swipe distance
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const tabs = ['home', 'projects', 'experience', 'education'];
        const currentIndex = tabs.indexOf(currentTab);
        
        if (diffX > 0 && currentIndex < tabs.length - 1) {
            // Swipe left - next tab
            showTab(tabs[currentIndex + 1]);
        } else if (diffX < 0 && currentIndex > 0) {
            // Swipe right - previous tab
            showTab(tabs[currentIndex - 1]);
        }
    }
});





// Performance optimization - throttle resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Recalculate any position-dependent elements
        const expandedContent = document.querySelectorAll('.category-content[style*="max-height"]');
        expandedContent.forEach(content => {
            if (content.style.maxHeight !== '0px') {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    }, 250);
});