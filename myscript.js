

// Utility Functions
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Scroll Progress Indicator
function updateScrollIndicator() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scrollIndicator').style.width = scrollPercent + '%';
}

// Initialize scroll indicator
window.addEventListener('scroll', updateScrollIndicator);
updateScrollIndicator();

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form submission

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(contactForm));
    // Honeypot check
    if (formData.honeypot) {
      alert("Spam detected.");
      return;
    }

    try {
      // NOTE: 'no-cors' is used commonly for Apps Script web apps to avoid CORS issues.
      // The response will be opaque, so we assume success if fetch doesn't throw.
      await fetch("https://script.google.com/macros/s/AKfycbxb6QCyzhWddlaHLukoAli1wwlaJ0uYB8qB6sT4PgQW3BkVotMPFZRFMKWOXHc-f5xeQw/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      showNotification("✅ Thank you for your message! I will get back to you soon.");
      contactForm.reset();

    } catch (err) {
      console.error("Form submit error:", err);
      showNotification("❌ Error sending message. Please try again.");
        contactForm.reset();
    }
  });
});
// Resume Download Functionality
const downloadResume = document.getElementById('download-resume');
        
downloadResume.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a temporary link for downloading
    const link = document.createElement('a');
    link.href = '/Shashivadhan_Cheepiri.pdf'; // Replace with actual path to your PDF
    link.download = 'Shashivadhan-Cheepiri-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Project Modal
const projectModals = document.querySelectorAll('.project-modal');
const modalCloseButtons = document.querySelectorAll('.modal-close');

projectModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
        }
    });
});

modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.project-modal');
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
    });
});

// AI Chatbot
const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotWindow = document.getElementById('chatbot-window');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

chatbotBtn.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
});

chatClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
});

function addMessage(message, isBot = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isBot ? 'bot-message' : 'user-message');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatSend.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, false);
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            let response = '';
            if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
                response = 'Hello there! How can I help you today?';
            } else if (message.toLowerCase().includes('project')) {
                return "I can tell you about Shashivadhan's projects. Which one are you interested in? AI/ML, Web Development, Cybersecurity, or IoT?";
            } else if (message.toLowerCase().includes('contact')) {
                return 'You can contact Shashivadhan via email at shashivadhan1911@gmail.com or phone at +91 9573027533.';
            } else if (message.toLowerCase().includes('skill')) {
                return 'Shashivadhan has expertise in Python, Java, C++, JavaScript, Machine Learning, IoT, and Cybersecurity. Which area interests you most?';
            } else if (message.toLowerCase().includes('education')) {
                return 'Shashivadhan is currently pursuing B.Tech in Computer Science at SR University with a CGPA of 8.8/10.0.';
            } else {
                return "I'm still learning. Please ask me about projects, skills, education, or how to contact Shashivadhan.";
            }
            addMessage(response, true);
        }, 1000);
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chatSend.click();
    }
});
// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--card-bg);
        border: 2px solid var(--neon-${type === 'success' ? 'green' : type === 'error' ? 'pink' : 'cyan'});
        border-radius: 8px;
        color: var(--text-primary);
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 0 20px var(--neon-${type === 'success' ? 'green' : type === 'error' ? 'pink' : 'cyan'});
        animation: slideIn 0.3s ease forwards;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
// Initialize animations on page load
window.addEventListener('DOMContentLoaded', () => {
    // Initialize Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    document.querySelectorAll('.fade-in.delay-1').forEach(el => {
        el.style.animationDelay = '0.3s';
        observer.observe(el);
    });

    // Initialize typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle'); 
    const originalText = heroSubtitle.textContent.trim();
    heroSubtitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
        heroSubtitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100); // typing speed
        } else {
        // after typing finishes, append blinking dots
        const dots = document.createElement('span');
        dots.className = 'dots';
        dots.textContent = ' ,,,,,';
        heroSubtitle.appendChild(dots);
        
        }
    };

    typeWriter();
});


