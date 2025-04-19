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


// --- Remove tsParticles Initialization ---
// tsParticles.load(...) code removed


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

// --- Three.js Globe Background ---
// Ensure Three.js library is loaded before this script runs (defer attribute helps)
if (typeof THREE !== 'undefined') {
    let scene, camera, renderer, earthMesh;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 }; // Target rotation based on drag
    let currentRotation = { x: 0, y: 0 }; // Current smoothed rotation
    const rotationSpeed = 0.001; // Auto-rotation speed
    const dragFactor = 0.005; // How much mouse movement affects rotation
    const lerpFactor = 0.1; // Smoothing factor for rotation

    function initGlobe() {
        const container = document.getElementById('globe-container');
        if (!container) {
            console.error("Globe container not found!");
            return;
        }

        // Scene
        scene = new THREE.Scene();

        // Camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 3; // Adjust camera distance from Earth

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true for transparent background
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // Adjust for high-DPI screens
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Soft ambient light
        scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xffffff, 1.0); // Bright directional light (sun)
        sunLight.position.set(5, 3, 5); // Position the light source
        scene.add(sunLight);

        // Earth Geometry and Material
        const earthGeometry = new THREE.SphereGeometry(1, 64, 32); // Radius 1, detail levels
        // Simple blue material, day/night effect comes from lighting
        const earthMaterial = new THREE.MeshStandardMaterial({
            color: 0x2563eb, // Blue color
            metalness: 0.3,
            roughness: 0.7
        });
        earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earthMesh);

        // Initial rotation offset (optional, to show different starting face)
        earthMesh.rotation.y = Math.PI * 1.5;
        targetRotation.y = earthMesh.rotation.y;
        currentRotation.y = earthMesh.rotation.y;


        // Add Mouse Event Listeners for Interaction
        container.addEventListener('mousedown', onMouseDown);
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseup', onMouseUp);
        container.addEventListener('mouseleave', onMouseUp); // Stop dragging if mouse leaves container
        // container.addEventListener('wheel', onMouseWheel); // Optional: Zoom

        // Handle Window Resize
        window.addEventListener('resize', onWindowResize);

        // Start Animation
        animate();
    }

    function onMouseDown(event) {
        isDragging = true;
        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;
    }

    function onMouseMove(event) {
        if (!isDragging) return;

        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;

        // Update target rotation based on mouse movement
        targetRotation.y += deltaX * dragFactor;
        targetRotation.x += deltaY * dragFactor;

        // Clamp vertical rotation to avoid flipping upside down
        targetRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.x));

        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;
    }

    function onMouseUp() {
        isDragging = false;
    }

    // Optional: Zoom functionality
    // function onMouseWheel(event) {
    //     camera.position.z += event.deltaY * 0.005;
    //     camera.position.z = Math.max(1.5, Math.min(5, camera.position.z)); // Clamp zoom
    // }


    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);

        // Auto-rotate if not dragging
        if (!isDragging) {
            targetRotation.y += rotationSpeed;
        }

        // Smoothly interpolate current rotation towards target rotation (Lerp)
        currentRotation.x += (targetRotation.x - currentRotation.x) * lerpFactor;
        currentRotation.y += (targetRotation.y - currentRotation.y) * lerpFactor;

        // Apply the smoothed rotation
        earthMesh.rotation.x = currentRotation.x;
        earthMesh.rotation.y = currentRotation.y;

        renderer.render(scene, camera);
    }

    // Initialize the globe when the DOM is ready
    if (document.readyState === 'loading') { // Loading hasn't finished yet
        document.addEventListener('DOMContentLoaded', initGlobe);
    } else { // `DOMContentLoaded` has already fired
        initGlobe();
    }

} else {
    console.error("THREE.js library not loaded!");
}
