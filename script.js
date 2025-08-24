// Loading Screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    // Always remove loading class to enable scrolling
    document.body.classList.remove('loading');
}

// Hide loading screen after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(hideLoadingScreen, 1500);
});

// Backup - hide loading screen after window load
window.addEventListener('load', function() {
    setTimeout(hideLoadingScreen, 500);
});

// Emergency backup - hide loading screen after 3 seconds no matter what
setTimeout(hideLoadingScreen, 3000);

// Emergency backup - ensure scrolling is enabled after 1 second
setTimeout(() => {
    document.body.classList.remove('loading');
    document.body.style.overflow = '';
}, 1000);

// Navigation
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
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

// Removed counter animation for minimal design

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attributes
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Removed stats section observation
});

// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});

// Particle background effect
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(79, 172, 254, 0.5);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        
        particleContainer.appendChild(particle);
    }
}

// Add particle animation CSS
const particleCSS = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
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
`;

const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Simple MSMP fade in animation
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.title-main');
    if (heroTitle && (window.location.pathname.includes('index.html') || window.location.pathname === '/')) {
        heroTitle.textContent = 'MSMP';
    }
});

// Real Minecraft server status checker
async function updateServerStatus() {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.status-text');
    const playerCount = document.querySelector('.player-count');
    const serverIP = document.getElementById('server-ip');
    
    if (!statusIndicator || !statusText) return;
    
    // Get server IP from the page
    const ip = serverIP ? serverIP.textContent.trim() : 's1.ssnetwork.io:52353';
    
    try {
        // Using a CORS proxy to access Minecraft server API
        const response = await fetch(`https://api.mcsrvstat.us/3/${ip}`);
        const data = await response.json();
        
        console.log('Server API response:', data); // デバッグ用
        
        if (data.online) {
            statusIndicator.className = 'status-indicator online';
            statusText.textContent = 'オンライン';
            if (playerCount && data.players) {
                const onlinePlayers = data.players.online || 0;
                const maxPlayers = data.players.max;
                
                // maxPlayersが存在しない、null、undefined、0の場合は接続確認できない
                if (!maxPlayers || maxPlayers === 0) {
                    statusIndicator.className = 'status-indicator offline';
                    statusText.textContent = '接続確認できません';
                    playerCount.textContent = '- / -';
                } else {
                    playerCount.textContent = `${onlinePlayers} / ${maxPlayers}`;
                }
            } else {
                // playersデータが存在しない場合
                statusIndicator.className = 'status-indicator offline';
                statusText.textContent = '接続確認できません';
                if (playerCount) {
                    playerCount.textContent = '- / -';
                }
            }
        } else {
            statusIndicator.className = 'status-indicator offline';
            statusText.textContent = 'オフライン';
            if (playerCount) {
                playerCount.textContent = '- / -';
            }
        }
    } catch (error) {
        console.log('Server status check failed:', error);
        // Fallback to connection error status
        statusIndicator.className = 'status-indicator offline';
        statusText.textContent = '接続確認できません';
        if (playerCount) {
            playerCount.textContent = '- / -';
        }
    }
}

// Update server status every 30 seconds
setInterval(updateServerStatus, 30000);

// Copy IP functionality
function copyIP() {
    const ip = document.getElementById('server-ip');
    if (ip) {
        const text = ip.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.querySelector('.copy-btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#10b981';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
            } catch (err) {
                console.log('Copy failed');
            }
            document.body.removeChild(textArea);
            
            const btn = document.querySelector('.copy-btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
            }, 2000);
        });
    }
}

// Make copyIP function globally available
window.copyIP = copyIP;

// Parallax effect for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const heroBackground = document.querySelector('.hero-bg-img');
    
    if (heroBackground) {
        const speed = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${speed}px)`;
    }
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .staff-card, .rule-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});



// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Ensure scrolling is enabled on all pages
    document.body.classList.remove('loading');
    

    
    // Update server status on page load
    updateServerStatus();
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
});