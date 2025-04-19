// --- Navigation Bar & Active Link Logic ---
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

function updateActiveLink() {
     let current = 'home';
     sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Ensure sectionHeight is positive, default to window height if not
        const sectionHeight = section.clientHeight > 0 ? section.clientHeight : window.innerHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 2.5) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').substring(1) === current);
    });
     if (mobileNavLinks.length > 0) {
         mobileNavLinks.forEach(link => {
            link.classList.toggle('bg-gray-700', link.getAttribute('href').substring(1) === current);
         });
     }
 }
window.addEventListener('scroll', updateActiveLink);
document.addEventListener('DOMContentLoaded', updateActiveLink);


// --- tsParticles Initialization (Static Emitter + Enhanced Decorations) ---
tsParticles.load("tsparticles", {
    fpsLimit: 60,
    particles: {
        number: { value: 90, density: { enable: true, area: 800 } }, // Slightly more base particles
        // Star colors
        color: { value: ["#FFFFFF", "#ADD8E6", "#F0F8FF", "#86efac", "#67e8f9"] },
        // Add star shape
        shape: { type: ["circle", "star"] },
        opacity: {
            value: {min: 0.1, max: 0.6}, // Slightly higher max opacity
             // Twinkling effect
             animation: { enable: true, speed: 0.8, minimumValue: 0.1, sync: false, destroy: "none", startValue: "random" }
        },
        size: {
            value: { min: 0.5, max: 2.5 }, // Slightly larger max size
             // Size pulsing effect
            animation: { enable: true, speed: 4, minimumValue: 0.5, sync: false, destroy: "none", startValue: "random"}
        },
        links: {
            color: "random",
            distance: 130,
            enable: true,
            opacity: 0.15, // Slightly fainter links
            width: 1,
            warp: true
        },
        collisions: { enable: false },
        move: {
            direction: "none", enable: true, outModes: { default: "out" },
            random: true, speed: 0.5, // Slightly slower base speed
            straight: false,
            // Add slight wobble/noise
            noise: {
                enable: true,
                delay: { value: 0.5 },
                factor: { value: 0.5 }
            }
        }
    },
    interactivity: {
        events: {
            onHover: { enable: true, mode: "repulse" }, // Simplified hover
            onClick: { enable: true, mode: "push" },
            resize: true,
        },
        modes: {
            repulse: { distance: 70, duration: 0.4, speed: 0.6 }, // Adjust repulse
            push: { quantity: 3 },
            // grab: { distance: 140, links: { opacity: 0.3 } } // Removed grab
        },
    },
    // Static Emitter Configuration
    emitters: {
        name: "avatarEmitter",
        position: { x: 50, y: 50 },
        rate: { quantity: 2, delay: 0.1 },
        size: { width: 100, height: 100, mode: "percent" },
        particles: { // Properties of emitted particles
            size: { value: {min: 1, max: 3} },
            opacity: { value: {min: 0.5, max: 0.9} },
            color: { value: ["#ffffff", "#a78bfa", "#6ee7b7", "#22d3ee"] },
            shape: { type: "star" }, // Emit stars
            move: {
                speed: 1.8,
                decay: 0.05,
                direction: "outside",
                straight: false,
                outModes: { default: "destroy", top: "none", bottom: "none" }
            },
            life: { duration: 2.0, count: 1 },
            links: { enable: false }
        }
    },
    detectRetina: true,
    background: { opacity: 0 }
});


// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        entry.target.classList.toggle('visible', entry.isIntersecting);
    });
}, { threshold: 0.1 });
revealElements.forEach(el => { revealObserver.observe(el); });


// --- Hero Content Parallax Effect ---
const heroContent = document.getElementById('hero-content');
if (heroContent) {
     document.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        const factor = 0.01;
        const moveX = mouseX * factor;
        const moveY = mouseY * factor;
        heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
 }


// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuButton && mobileMenu) {
     mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
             mobileMenu.classList.add('hidden');
             setTimeout(updateActiveLink, 50);
        });
    });
 }
