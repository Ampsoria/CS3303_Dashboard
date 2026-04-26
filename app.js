/* ========================================
   App Logic - Navigation, Animations, Particles
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initAllCharts();
    initNavigation();
    initParticles();
    initCounterAnimation();
});

// ========== NAVIGATION ==========
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            sections.forEach(s => s.classList.remove('active'));
            const target = document.getElementById(targetId);
            if (target) {
                target.classList.add('active');
                target.style.animation = 'none';
                target.offsetHeight; // trigger reflow
                target.style.animation = 'fadeInUp 0.5s ease forwards';
            }

            // Close mobile sidebar
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    });

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });
}

// ========== PARTICLES ==========
function initParticles() {
    const container = document.getElementById('particles');
    const count = 30;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (8 + Math.random() * 12) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.width = (1 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = 0.2 + Math.random() * 0.4;
        container.appendChild(particle);
    }
}

// ========== COUNTER ANIMATION ==========
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-value[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
    // Also trigger immediately for visible ones
    counters.forEach(c => animateCounter(c));
}

function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const isDecimal = el.dataset.decimal === 'true';
    const duration = 1500;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const current = eased * target;
        el.textContent = isDecimal ? current.toFixed(2) : Math.round(current);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}
