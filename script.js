document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const yesBtn = document.getElementById('yes-btn');
    const maybeBtn = document.getElementById('maybe-btn');
    const noBtn = document.getElementById('no-btn');
    const yesModal = document.getElementById('yes-modal');
    const maybeModal = document.getElementById('maybe-modal');
    const noModal = document.getElementById('no-modal');
    const closeModal = document.querySelector('.close-modal');
    const closeMaybeModal = document.querySelector('.close-maybe-modal');
    const closeNoModal = document.querySelector('.close-no-modal');
    
    // Countdown elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // Set Valentine's Day date
    const currentYear = new Date().getFullYear();
    let valentinesDate = new Date(currentYear, 1, 14);
    
    if (new Date() > valentinesDate) {
        valentinesDate = new Date(currentYear + 1, 1, 14);
    }
    
    // Update countdown
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = valentinesDate.getTime() - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Button click handlers
    yesBtn.addEventListener('click', function() {
        yesModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    maybeBtn.addEventListener('click', function() {
        maybeModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    noBtn.addEventListener('click', function() {
        noModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal handlers
    closeModal.addEventListener('click', function() {
        yesModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    closeMaybeModal.addEventListener('click', function() {
        maybeModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    closeNoModal.addEventListener('click', function() {
        noModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === yesModal) {
            yesModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === maybeModal) {
            maybeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === noModal) {
            noModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Contact option buttons
    const contactOptionBtns = document.querySelectorAll('.contact-option-btn');
    const contactDetailForm = document.getElementById('contact-detail-form');
    const contactInfoInput = document.getElementById('contact-info');
    const submitContactBtn = document.getElementById('submit-contact');
    
    contactOptionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            contactOptionBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show contact detail form
            contactDetailForm.style.display = 'block';
            
            // Update placeholder based on selection
            const contactType = this.getAttribute('data-contact');
            let placeholder = '';
            
            switch(contactType) {
                case 'email':
                    placeholder = 'Your email address...';
                    break;
                case 'whatsapp':
                    placeholder = 'Your WhatsApp number...';
                    break;
                case 'call':
                    placeholder = 'Your phone number (best time to call)...';
                    break;
                case 'letter':
                    placeholder = 'Your mailing address...';
                    break;
            }
            
            contactInfoInput.placeholder = placeholder;
        });
    });
    
    // Submit contact info
    submitContactBtn.addEventListener('click', function() {
        const contactInfo = contactInfoInput.value.trim();
        
        if (contactInfo) {
            // In a real application, you would send this to a server
            // For now, we'll just show a success message
            alert(`Thank you, Thandolwethu! I've received your contact information: ${contactInfo}\n\nI'll be in touch soon. Until then, know that you've made me incredibly happy!`);
            
            // Reset form
            contactInfoInput.value = '';
            contactDetailForm.style.display = 'none';
            contactOptionBtns.forEach(b => b.classList.remove('active'));
            yesModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Change the Yes button to show success
            yesBtn.innerHTML = '<i class="fas fa-heart-circle"></i> Contact Sent!';
            yesBtn.style.background = 'linear-gradient(to right, #4CAF50, #8BC34A)';
            yesBtn.disabled = true;
        } else {
            alert('Please enter your contact information.');
        }
    });
    
    // Reconnect buttons
    const reconnectBtns = document.querySelectorAll('.reconnect-btn');
    
    reconnectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const reconnectType = this.getAttribute('data-type');
            let message = '';
            
            if (reconnectType === 'casual') {
                message = "That's perfect! A casual chat to catch up after all these years sounds wonderful. How would you prefer we connect?";
            } else {
                message = "I appreciate your openness to discussing possibilities. Let's find a way to connect that works with your military schedule.";
            }
            
            alert(message + "\n\n(Since this is a demo, in a real scenario you would be prompted for contact details here)");
            
            maybeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Update the Maybe button
            maybeBtn.innerHTML = '<i class="fas fa-comments"></i> Waiting to connect...';
            maybeBtn.style.background = 'linear-gradient(to right, #FF9800, #FFB74D)';
        });
    });
    
    // Close no button
    const closeNoBtn = document.getElementById('close-no');
    
    closeNoBtn.addEventListener('click', function() {
        noModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Update the No button
        noBtn.innerHTML = '<i class="fas fa-hand-peace"></i> With Respect';
        noBtn.style.background = 'linear-gradient(to right, #666, #888)';
        noBtn.disabled = true;
    });
    
    // Military-themed background effect
    function createStar() {
        const star = document.createElement('div');
        star.style.position = 'fixed';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.opacity = Math.random() * 0.5 + 0.2;
        star.style.pointerEvents = 'none';
        star.style.zIndex = '-1';
        document.body.appendChild(star);
        
        // Twinkle effect
        setInterval(() => {
            star.style.opacity = Math.random() * 0.5 + 0.2;
        }, Math.random() * 1000 + 500);
        
        // Remove after a while
        setTimeout(() => {
            star.remove();
        }, 10000);
    }
    
    // Create some stars
    for (let i = 0; i < 50; i++) {
        setTimeout(createStar, i * 200);
    }
    
    // Continue creating stars
    setInterval(() => {
        if (Math.random() > 0.7) {
            createStar();
        }
    }, 1000);
    
    // Add a special effect when scrolling to the marriage intent
    const marriageIntent = document.querySelector('.marriage-intent');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                marriageIntent.style.animation = 'pulse 2s 3';
                setTimeout(() => {
                    marriageIntent.style.animation = '';
                }, 6000);
            }
        });
    }, { threshold: 0.5 });
    
    if (marriageIntent) {
        observer.observe(marriageIntent);
    }
    
    // Add a subtle heartbeat sound effect on Yes click
    yesBtn.addEventListener('click', function() {
        try {
            // Create heartbeat sound using Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create oscillator for heartbeat
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 120;
            oscillator.type = 'sine';
            
            // Heartbeat pattern
            const now = audioContext.currentTime;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.1);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.3);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.4);
            
            oscillator.start(now);
            oscillator.stop(now + 0.5);
        } catch (e) {
            // Audio not supported, continue silently
        }
    });
});