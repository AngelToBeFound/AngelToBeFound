// --- Navigation Bar & Active Link Logic ---
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    // Add 'scrolled' class to nav when page is scrolled down
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

// Function to update the active state of navigation links based on scroll position
function updateActiveLink() {
     let current = 'home'; // Default to home section
     sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Determine the current section based on scroll position
        if (pageYOffset >= sectionTop - sectionHeight / 2.5) {
            current = section.getAttribute('id');
        }
    });

    // Update desktop navigation links
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').substring(1) === current);
    });

    // Update mobile navigation links (if they exist)
     if (mobileNavLinks.length > 0) {
         mobileNavLinks.forEach(link => {
            // Use background color to indicate active state on mobile
            link.classList.toggle('bg-gray-700', link.getAttribute('href').substring(1) === current);
         });
     }
 }
// Update active link on scroll and initial load
window.addEventListener('scroll', updateActiveLink);
document.addEventListener('DOMContentLoaded', updateActiveLink);


// --- tsParticles Initialization with Starry Sky Colors ---
tsParticles.load("tsparticles", {
    fpsLimit: 60, // Limit frames per second for performance
    // Base background particles configuration
    particles: {
        number: { value: 80, density: { enable: true, area: 800 } }, // Number of base particles
        // Star colors: White, Light Blue, Alice Blue
        color: { value: ["#FFFFFF", "#ADD8E6", "#F0F8FF"] },
        shape: { type: "circle" }, // Particle shape
        opacity: {
            value: {min: 0.2, max: 0.7}, // Random opacity range
             animation: { enable: true, speed: 0.8, minimumValue: 0.1, sync: false } // Animate opacity
        },
        size: {
            value: { min: 0.5, max: 2 }, // Random size range
            animation: { enable: true, speed: 3, minimumValue: 0.5, sync: false} // Animate size
        },
        links: {
            color: "#ffffff", // Link color
            distance: 150, // Max distance for links
            enable: true, // Enable links
            opacity: 0.1, // Link opacity
            width: 1 // Link width
        },
        collisions: { enable: false }, // Disable particle collisions
        move: {
            direction: "none", // Random direction
            enable: true, // Enable movement
            outModes: { default: "out" }, // Behavior when particles leave canvas
            random: true, // Randomize movement
            speed: 0.4, // Movement speed
            straight: false // Particles don't move in straight lines
        }
    },
    // Interactivity configuration
    interactivity: {
        events: {
            onHover: { enable: true, mode: "repulse" }, // Repulse particles on hover
            onClick: { enable: true, mode: "push" }, // Push particles on click
            resize: true, // Adapt particles on window resize
        },
        modes: {
            repulse: { distance: 60, duration: 0.4, speed: 0.5 }, // Repulse effect settings
            push: { quantity: 3 }, // Push effect settings
        },
    },
    // Static Emitter Configuration (near the center/avatar area)
    emitters: {
        name: "avatarEmitter", // Emitter name
        position: { x: 50, y: 50 }, // Emitter position (% from top-left)
        rate: {
            quantity: 1, // Number of particles per emission
            delay: 0.2 // Time delay between emissions (seconds)
        },
        size: { width: 100, height: 100, mode: "percent" }, // Emitter area size
        // Configuration for particles emitted by this emitter
        particles: {
            size: { value: {min: 1, max: 3} }, // Size of emitted particles
            opacity: { value: {min: 0.5, max: 0.9} }, // Opacity of emitted particles
            // Emitter colors: White, Pale Yellows
            color: { value: ["#FFFFFF", "#FFFFE0", "#FFFACD"] },
            move: {
                speed: 1.8, // Speed of emitted particles
                decay: 0.05, // Speed decay over time
                direction: "outside", // Move outwards from the emitter center
                straight: false,
                outModes: { default: "destroy", top: "destroy", bottom: "destroy" } // Destroy when off edges
            },
            life: {
                duration: 2.0, // Lifespan in seconds
                count: 1 // Emit only once (particle dies after duration)
            },
            links: { enable: false } // Disable links for emitted particles
        }
    },
    detectRetina: true, // Adjust particle density for high-DPI screens
    background: { opacity: 0 } // Make tsParticles canvas background transparent
});


// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal');
// Create an Intersection Observer instance
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Add 'visible' class when element enters viewport
        entry.target.classList.toggle('visible', entry.isIntersecting);
        // Optional: Stop observing after revealed once
        // if (entry.isIntersecting) {
        //     revealObserver.unobserve(entry.target);
        // }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the element is visible

// Observe each element with the 'reveal' class
revealElements.forEach(el => { revealObserver.observe(el); });


// --- Hero Content Parallax Effect ---
const heroContent = document.getElementById('hero-content');
if (heroContent) {
     // Add mouse move listener to the document
     document.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        // Calculate mouse position relative to the center of the window
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        // Define sensitivity factor for parallax movement
        const factor = 0.01;
        // Calculate movement offset
        const moveX = mouseX * factor;
        const moveY = mouseY * factor;
        // Apply transform to the hero content element
        heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
 }


// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuButton && mobileMenu) {
     // Toggle mobile menu visibility on button click
     mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    // Add click listener to each link in the mobile menu
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
             // Hide the menu when a link is clicked
             mobileMenu.classList.add('hidden');
             // Update active link state shortly after closing menu
             setTimeout(updateActiveLink, 50);
        });
    });
 }
