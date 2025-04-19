// --- Navigation Bar & Active Link Logic ---
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

// Function to update the active navigation link based on scroll position
function updateActiveLink() {
     let current = 'home';
     sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Ensure sectionHeight is positive, default to window height if not
        const sectionHeight = section.clientHeight > 0 ? section.clientHeight : window.innerHeight;
        // Adjust offset calculation for better accuracy
        if (pageYOffset >= sectionTop - window.innerHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    // Update desktop nav links
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').substring(1) === current);
    });
    // Update mobile nav links background
     if (mobileNavLinks.length > 0) {
         mobileNavLinks.forEach(link => {
            link.classList.toggle('bg-gray-700', link.getAttribute('href').substring(1) === current); // Use a visual indicator like background
            link.classList.toggle('text-[var(--star-bright)]', link.getAttribute('href').substring(1) === current); // Optionally change text color too
         });
     }
 }
// Add event listeners for scroll and initial load
window.addEventListener('scroll', updateActiveLink);
document.addEventListener('DOMContentLoaded', updateActiveLink);


// --- tsParticles Initialization (Static Emitter + Enhanced Decorations) ---
// Ensure tsParticles is loaded before using it
if (typeof tsParticles !== 'undefined') {
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
        background: { opacity: 0 } // Transparent background for tsParticles canvas
    }).catch(error => {
        console.error("Error loading tsParticles:", error); // Add error handling
    });
} else {
    console.warn("tsParticles library not found.");
}


// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal');
// Check if IntersectionObserver is supported
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => { // Add observer parameter
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to improve performance
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove 'visible' if you want the animation to repeat when scrolling out and back in
                 // entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });
    revealElements.forEach(el => { revealObserver.observe(el); });
} else {
    // Fallback for browsers that don't support IntersectionObserver
    console.warn("IntersectionObserver not supported. Reveal animations may not work.");
    revealElements.forEach(el => el.classList.add('visible')); // Make elements visible immediately
}


// --- Hero Content Parallax Effect ---
const heroContent = document.getElementById('hero-content');
if (heroContent) {
     // Use requestAnimationFrame for smoother performance
     let rafId = null;
     let mouseX = 0, mouseY = 0;
     const centerX = window.innerWidth / 2;
     const centerY = window.innerHeight / 2;
     const factor = 0.01; // Movement sensitivity factor

     document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX - centerX;
        mouseY = e.clientY - centerY;
        // Request animation frame if not already requested
        if (!rafId) {
            rafId = requestAnimationFrame(updateHeroPosition);
        }
    });

     function updateHeroPosition() {
         const moveX = mouseX * factor;
         const moveY = mouseY * factor;
         heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
         rafId = null; // Reset rafId after execution
     }
 }


// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuButton && mobileMenu) {
     mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        // Optional: Add ARIA attribute for accessibility
        mobileMenuButton.setAttribute('aria-expanded', !isHidden);
    });
    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
             mobileMenu.classList.add('hidden');
             mobileMenuButton.setAttribute('aria-expanded', 'false');
             // Update active link immediately after closing
             setTimeout(updateActiveLink, 50); // Short delay might still be needed depending on scroll behavior
        });
    });
 }

// --- Lightbox Logic ---
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const photoItems = document.querySelectorAll('.photo-item img'); // Select the images directly

if (lightboxOverlay && lightboxImg && lightboxClose && photoItems.length > 0) {
    // Function to open the lightbox
    const openLightbox = (imgSrc) => {
        lightboxImg.setAttribute('src', imgSrc);
        lightboxOverlay.classList.remove('hidden');
        // Use timeout to allow display change before adding visible class for transition
        setTimeout(() => {
            lightboxOverlay.classList.add('visible');
        }, 10); // Small delay
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Function to close the lightbox
    const closeLightbox = () => {
        lightboxOverlay.classList.remove('visible');
        // Wait for transition to finish before hiding completely
        setTimeout(() => {
            lightboxOverlay.classList.add('hidden');
            lightboxImg.setAttribute('src', ''); // Clear src
            document.body.style.overflow = ''; // Restore background scrolling
        }, 300); // Match CSS transition duration
    };

    // Add click listener to each photo image
    photoItems.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering other clicks if nested
            const fullSrc = img.getAttribute('src'); // Get the src of the clicked image
            if (fullSrc) {
                openLightbox(fullSrc);
            }
        });
    });

    // Add click listener to the close button
    lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent closing event from bubbling to overlay
        closeLightbox();
    });

    // Add click listener to the overlay itself to close it
    lightboxOverlay.addEventListener('click', (e) => {
        // Only close if the click is directly on the overlay, not the image
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    // Add keyboard accessibility (close with Escape key)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('visible')) {
            closeLightbox();
        }
    });

} else {
    console.warn("Lightbox elements not found. Lightbox functionality disabled.");
}
