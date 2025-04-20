// --- Navigation Bar & Active Link Logic ---
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link'); // Desktop links only
const mobileNavLinks = document.querySelectorAll('#mobile-menu a[href^="#"]'); // Mobile links starting with #

// Function to update the active navigation link based on scroll position
function updateActiveLink() {
     let current = 'home';
     sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight > 0 ? section.clientHeight : window.innerHeight;
        if (pageYOffset >= sectionTop - 150) { // Adjust offset as needed
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => { // Update desktop links
        link.classList.toggle('active', link.getAttribute('href').substring(1) === current);
    });
     if (mobileNavLinks.length > 0) { // Update mobile links
         mobileNavLinks.forEach(link => {
            const linkTarget = link.getAttribute('href').substring(1);
            link.classList.toggle('bg-gray-700', linkTarget === current);
            link.classList.toggle('text-[var(--star-bright)]', linkTarget === current);
         });
     }
 }
window.addEventListener('scroll', updateActiveLink);
// DOMContentLoaded listener at the end


// --- tsParticles Initialization (Combined Linked Background + Scattered Unlinked Stars) ---
if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        // particles: Configures the main background (e.g., linked circles)
        particles: {
            number: {
                value: 50, // Reduced number for linked particles
                density: { enable: true, area: 800 }
            },
            color: { value: ["#FFFFFF", "#ADD8E6", "#F0F8FF"] }, // Simple colors for linked ones
            shape: { type: "circle" }, // Use circles for the linked background
            opacity: { value: { min: 0.1, max: 0.4 }, animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false } },
            size: { value: { min: 1, max: 3 } }, // Smaller size for linked ones
            // *** LINKS ENABLED for this background layer ***
            links: {
                color: "#ffffff", // Link color
                distance: 150,
                enable: true,
                opacity: 0.15, // Fainter links
                width: 1
            },
            collisions: { enable: false },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "out" },
                random: true,
                speed: 0.4, // Slower speed for background
                straight: false
            }
        },
        // interactivity: Applies to all particles unless specified by group
        interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: false, mode: "push" }, resize: true }, // Disabled push on click for cleaner background
            modes: { repulse: { distance: 80, duration: 0.4 } }
        },
        // *** MODIFIED EMITTER for Scattered Unlinked Stars ***
        emitters: {
            // Emitter now configured to scatter slowly across the screen
            direction: "none",
            rate: {
                quantity: 1, // Emit only 1 star...
                delay: 0.5 // ...every 0.5 seconds (adjust for density)
            },
            size: {
                width: 100,
                height: 100,
                 mode: "percent" // Emit from anywhere on the canvas
            },
            position: { // Positioned at center, but size covers all
                x: 50,
                y: 50
            },
            // Particles emitted by THIS emitter (Unlinked Stars)
            particles: {
                shape: { type: "star" }, // Emitted particles are stars
                size: { value: { min: 1, max: 3 } }, // Size of stars
                color: { value: ["#FFFFFF", "#86efac", "#67e8f9", "#a7c7e7"] }, // Star colors
                opacity: { value: { min: 0.3, max: 0.8 }, animation: { enable: true, speed: 0.9, minimumValue: 0.3 } },
                // *** LINKS DISABLED for emitted stars ***
                links: { enable: false },
                // Stars move outwards slightly faster and fade
                move: {
                    speed: 0.8,
                    decay: 0.05, // Optional: slow down over time
                    direction: "none", // Random direction
                    straight: false,
                    random: true,
                    outModes: { default: "destroy" } // Remove when they go off screen
                },
                // Stars have a limited lifespan
                life: {
                    duration: { min: 5, max: 10 }, // Last between 5 and 10 seconds
                    count: 1 // Emit only once per emission cycle
                }
            }
        },
        detectRetina: true,
        background: { opacity: 0 }
    }).then(container => {
        console.log("tsParticles loaded successfully (linked background + scattered stars)");
    }).catch(error => {
        console.error("Error loading tsParticles:", error);
    });
} else {
    console.warn("tsParticles library not found.");
}


// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Optional
            } else {
                // entry.target.classList.remove('visible'); // Optional
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => { revealObserver.observe(el); });
} else {
    console.warn("IntersectionObserver not supported.");
    revealElements.forEach(el => el.classList.add('visible'));
}


// --- Hero Content Parallax Effect ---
const heroContent = document.getElementById('hero-content');
if (heroContent) {
     let rafId = null;
     let mouseX = 0, mouseY = 0;
     const factor = 0.01;
     let centerX = window.innerWidth / 2;
     let centerY = window.innerHeight / 2;
     window.addEventListener('resize', () => { centerX = window.innerWidth / 2; centerY = window.innerHeight / 2; });
     document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX - centerX; mouseY = e.clientY - centerY;
        if (!rafId) { rafId = requestAnimationFrame(updateHeroPosition); }
    });
     function updateHeroPosition() {
         const moveX = mouseX * factor; const moveY = mouseY * factor;
         heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
         rafId = null;
     }
 }


// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLangToggle = document.getElementById('mobile-lang-toggle');
const mobileLangDropdown = document.getElementById('mobile-lang-dropdown');
if (mobileMenuButton && mobileMenu) {
     mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', !isHidden);
        if (isHidden && mobileLangDropdown && !mobileLangDropdown.classList.contains('hidden')) { mobileLangDropdown.classList.add('hidden'); }
    });
    mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
             mobileMenu.classList.add('hidden'); mobileMenuButton.setAttribute('aria-expanded', 'false');
             if (mobileLangDropdown) mobileLangDropdown.classList.add('hidden');
        });
    });
     if (mobileLangToggle && mobileLangDropdown) {
         mobileLangToggle.addEventListener('click', (e) => { e.stopPropagation(); mobileLangDropdown.classList.toggle('hidden'); });
     }
 }

// --- Lightbox Logic ---
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const photoItems = document.querySelectorAll('.photo-item img');
if (lightboxOverlay && lightboxImg && lightboxClose && photoItems.length > 0) {
    const openLightbox = (imgSrc) => {
        lightboxImg.setAttribute('src', imgSrc); lightboxOverlay.classList.remove('hidden');
        setTimeout(() => { lightboxOverlay.classList.add('visible'); }, 10); document.body.style.overflow = 'hidden';
    };
    const closeLightbox = () => {
        lightboxOverlay.classList.remove('visible');
        setTimeout(() => { lightboxOverlay.classList.add('hidden'); lightboxImg.setAttribute('src', ''); document.body.style.overflow = ''; }, 300);
    };
    photoItems.forEach(img => { img.addEventListener('click', (e) => { e.stopPropagation(); const fullSrc = img.getAttribute('src'); if (fullSrc) { openLightbox(fullSrc); } }); });
    lightboxClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
    lightboxOverlay.addEventListener('click', (e) => { if (e.target === lightboxOverlay) { closeLightbox(); } });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightboxOverlay.classList.contains('visible')) { closeLightbox(); } });
} else { console.warn("Lightbox elements not found."); }


// --- Language Switching Logic (Integrated) ---
const translations = {
    'en': { /* ... English translations ... */ 'current_lang_display': "EN" },
    'zh-CN': { /* ... Simplified Chinese translations ... */ 'current_lang_display': "简" },
    'zh-TW': { /* ... Traditional Chinese translations ... */ 'current_lang_display': "繁" }
}; // Keep your full translations object here

const langToggle = document.getElementById('lang-toggle'); const langDropdown = document.getElementById('lang-dropdown'); const currentLangSpan = document.getElementById('current-lang'); const langLinks = document.querySelectorAll('#lang-dropdown a[data-lang]');
const mobileCurrentLangSpan = document.getElementById('mobile-current-lang'); const mobileLangLinks = document.querySelectorAll('#mobile-lang-dropdown a[data-lang]');
let currentLang = localStorage.getItem('language') || 'zh-CN';

function applyTranslations(lang) { /* ... (keep existing applyTranslations function) ... */ }
function setupLangSwitcher(toggleButton, dropdownMenu, links) { /* ... (keep existing setupLangSwitcher function) ... */ }
setupLangSwitcher(langToggle, langDropdown, langLinks); setupLangSwitcher(mobileLangToggle, mobileLangDropdown, mobileLangLinks);
document.addEventListener('click', (e) => { /* ... (keep existing document click listener) ... */ });

// Apply initial states on page load
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations(currentLang); // Apply language first
    updateActiveLink(); // Then update nav link state
});
// --- End Language Switching Logic ---