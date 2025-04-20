// --- Translations Object for index.html ---
const translations = {
    'en': {
        'home_page_title': "MaxCaulfield's Little Station",
        'nav_home': "Home",
        'nav_about': "About Me",
        'nav_photos': "Photo Gallery",
        'nav_contact': "Contact Me",
        'nav_blog': "Blog",
        'hero_title': "Hello, I'm MaxCaulfield",
        'hero_subtitle': "Student at Beijing International Studies University | Love Creating & Exploring",
        'hero_cta_blog': "Enter Blog",
        'hero_cta_scroll': "Scroll Down to Learn More ↓",
        'about_title': "About Me",
        'about_para1': "I am someone who crazily absorbs information in the vast stream of the internet. Always curious about new things, passionate about exploring the boundaries of technology and the charm of design.",
        'about_para2': "As a student at Beijing International Studies University, I not only focus on my studies but also spend my spare time immersed in the digital world, learning programming, experiencing different software tools, and trying to turn ideas into reality. I believe continuous learning and hands-on practice are the best ways to grow.",
        'skill_learn': "Quick Learner",
        'skill_explore': "Digital Explorer",
        'skill_curious': "Stay Curious",
        'photos_title': "Photo Gallery",
        'photos_ai_note': "Actually, these cute anime characters were created by AI.",
        'contact_title': "Contact Me",
        'contact_via_email': "Contact me via Email:",
        'footer_built_with': "Built with ❤️ and code.",
        'current_lang_display': "EN" // Text for language button
    },
    'zh-CN': {
        'home_page_title': "麦青春的小小站",
        'nav_home': "主页",
        'nav_about': "关于我",
        'nav_photos': "照片展览",
        'nav_contact': "联系我",
        'nav_blog': "博客",
        'hero_title': "你好，我是 MaxCaulfield",
        'hero_subtitle': "北京市第二外国语学院 学生 | 热爱创造与探索",
        'hero_cta_blog': "进入博客",
        'hero_cta_scroll': "下滑了解更多 ↓",
        'about_title': "关于我",
        'about_para1': "我是一个在网络宏流中疯狂汲取信息的人。对新鲜事物永远保持好奇，热衷于探索技术的边界和设计的魅力。",
        'about_para2': "作为北京市第二外国语学院的学生，我不仅专注于学业，更利用课余时间沉浸在数字世界，学习编程、体验不同的软件工具，并尝试将创意变为现实。我相信持续学习和动手实践是成长的最佳途径。",
        'skill_learn': "快速学习",
        'skill_explore': "数字探索",
        'skill_curious': "保持好奇",
        'photos_title': "照片展览",
        'photos_ai_note': "其实是主包丢AI创作出来的卡哇伊二刺螈",
        'contact_title': "联系我",
        'contact_via_email': "通过邮箱联系我:",
        'footer_built_with': "用 ❤️ 和代码构建.",
        'current_lang_display': "简" // Text for language button
    },
    'zh-TW': {
        'home_page_title': "麥青春的小小站",
        'nav_home': "主頁",
        'nav_about': "關於我",
        'nav_photos': "照片展覽",
        'nav_contact': "聯繫我",
        'nav_blog': "部落格",
        'hero_title': "你好，我是 MaxCaulfield",
        'hero_subtitle': "北京市第二外國語學院 學生 | 熱愛創造與探索",
        'hero_cta_blog': "進入部落格",
        'hero_cta_scroll': "下滑了解更多 ↓",
        'about_title': "關於我",
        'about_para1': "我是一個在網路洪流中瘋狂汲取資訊的人。對新鮮事物永遠保持好奇，熱衷於探索技術的邊界和設計的魅力。",
        'about_para2': "作為北京市第二外國語學院的學生，我不僅專注於學業，更利用課餘時間沉浸在數位世界，學習程式設計、體驗不同的軟體工具，並嘗試將創意變為現實。我相信持續學習和動手實踐是成長的最佳途徑。",
        'skill_learn': "快速學習",
        'skill_explore': "數位探索",
        'skill_curious': "保持好奇",
        'photos_title': "照片展覽",
        'photos_ai_note': "其實是主包丟AI創作出來的卡哇伊二次元",
        'contact_title': "聯繫我",
        'contact_via_email': "透過郵箱聯繫我:",
        'footer_built_with': "用 ❤️ 和程式碼構建.",
        'current_lang_display': "繁" // Text for language button
    }
};


// --- Wait for DOM to be fully loaded ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Switching Logic REMOVED ---
    // No theme toggle button or logic needed for permanent dark theme.
    // Ensure the <body> tag has the 'dark-theme' class by default in HTML.

    // --- Language Switching Logic ---
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    const currentLangSpan = document.getElementById('current-lang');

    // Function to update active link highlighting (defined later)
    let updateActiveLink = () => {};

    if (langToggle && langDropdown && currentLangSpan) {
        const langLinks = langDropdown.querySelectorAll('a[data-lang]');
        // Detect browser language or default to 'zh-CN'
        let currentLang = localStorage.getItem('language') || navigator.language || 'zh-CN';
        // Simplify language code if needed (e.g., 'zh-Hans-CN' -> 'zh-CN')
        if (currentLang.length > 5) {
            currentLang = currentLang.slice(0, 5);
        }
        // Fallback if detected language isn't supported
        if (!translations[currentLang]) {
            currentLang = 'zh-CN';
        }


        function applyTranslations(lang) {
            if (!translations[lang]) {
                console.warn(`Translations for language "${lang}" not found.`);
                return;
            }
            // Set HTML lang attribute
            document.documentElement.lang = lang.startsWith('zh') ? lang : lang.split('-')[0];
            const elements = document.querySelectorAll('[data-translate-key]');
            elements.forEach(el => {
                const key = el.getAttribute('data-translate-key');
                if (translations[lang][key] !== undefined) {
                    // Handle different element types
                    if (el.tagName === 'TITLE') { document.title = translations[lang][key]; }
                    else if (el.tagName === 'INPUT' && el.placeholder) { el.placeholder = translations[lang][key]; }
                    else if (el.title) { el.title = translations[lang][key]; }
                    else { el.textContent = translations[lang][key]; }
                } else {
                    // Warn if a key is missing for the selected language
                    console.warn(`Translation key "${key}" not found for language "${lang}"`);
                }
            });
            // Update the language display text in the button
             if(translations[lang]['current_lang_display']) {
                currentLangSpan.textContent = translations[lang]['current_lang_display'];
             } else {
                 // Fallback to uppercase language code if display text is missing
                 currentLangSpan.textContent = lang.split('-')[0].toUpperCase();
             }
        }

        // Apply initial translations on page load
        applyTranslations(currentLang);

        // Toggle dropdown visibility on button click
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from closing the dropdown immediately
            langDropdown.classList.toggle('show');
            langDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.add('hidden');
                langDropdown.classList.remove('show');
            }
        });

        // Handle language selection from dropdown
        langLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior
                const selectedLang = link.getAttribute('data-lang');
                if (selectedLang !== currentLang) {
                    currentLang = selectedLang;
                    localStorage.setItem('language', currentLang); // Save preference
                    applyTranslations(currentLang);
                    // Update active nav link after text content might change width
                    setTimeout(updateActiveLink, 50);
                }
                // Hide dropdown after selection
                langDropdown.classList.add('hidden');
                langDropdown.classList.remove('show');
            });
        });

    } else {
         console.warn("Language toggle elements not found.");
    }


    // --- Navigation Bar Scroll Effect ---
    const nav = document.getElementById('navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            // Add 'scrolled' class when scrolled down, remove otherwise
            nav.classList.toggle('scrolled', window.scrollY > 30);
        });
    }

    // --- Active Navigation Link Highlighting ---
    const sections = document.querySelectorAll('section[id], header[id]'); // Sections to track
    const navLinks = document.querySelectorAll('.nav-link'); // Desktop nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-menu-item'); // Mobile nav links

    if (sections.length > 0 && (navLinks.length > 0 || mobileNavLinks.length > 0)) {
         // Define the function to update active links
         updateActiveLink = () => {
            let currentSectionId = 'home'; // Default to home
            let minDistance = Infinity;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
                // Check if section is roughly in the viewport (adjust offset as needed)
                const isInViewport = !(rect.bottom < 100 || rect.top - viewHeight >= -100);

                if (isInViewport) {
                    // Find the section closest to the top of the viewport (adjust offset)
                    const distanceToTop = Math.abs(rect.top - 100);
                    if (distanceToTop < minDistance) {
                        minDistance = distanceToTop;
                        currentSectionId = section.getAttribute('id');
                    }
                }
            });

            // Update desktop links
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
            });
            // Update mobile links
            mobileNavLinks.forEach(link => {
                 link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
            });
        };
        updateActiveLink(); // Call initially to set the state
        window.addEventListener('scroll', updateActiveLink); // Update on scroll events
    }


    // --- tsParticles Initialization (Updated Configuration) ---
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60, // Limit FPS for performance
            particles: {
                number: {
                    value: 80, // Number of particles
                    density: {
                        enable: true, // Enable density calculation
                        value_area: 800 // Area for density calculation
                    }
                },
                color: {
                    // Array of possible colors for particles
                    value: ["#ffffff", "#a7c7e7", "#60a5fa", "#ADD8E6", "#F0F8FF", "#E0FFFF"]
                },
                shape: {
                    type: "star", // Shape of the particles
                },
                opacity: {
                    value: { min: 0.2, max: 0.8 }, // Random opacity between 0.2 and 0.8
                    animation: { // Animate opacity
                        enable: true,
                        speed: 1,
                        minimumValue: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: { min: 0.5, max: 2.5 }, // Random size between 0.5 and 2.5
                    animation: { // Animate size (subtle pulsing)
                        enable: true,
                        speed: 2,
                        minimumValue: 0.5,
                        sync: false
                    }
                },
                links: {
                    enable: true, // Enable links between particles
                    distance: 150, // Max distance to draw a link
                    color: "random", // Use random colors from the particle color array for links
                    opacity: 0.4, // Link opacity
                    width: 1, // Link width
                    warp: false // Don't warp links at edges
                },
                collisions: {
                    enable: false // Disable particle collisions
                },
                move: {
                    enable: true, // Enable particle movement
                    direction: "none", // Random direction
                    outModes: {
                        default: "out" // Particles disappear when hitting edges
                    },
                    random: true, // Random movement
                    speed: 0.6, // Movement speed
                    straight: false, // Non-straight paths
                    attract: { // No attraction between particles
                        enable: false
                    }
                }
            },
            interactivity: {
                detect_on: "canvas", // Detect interactions on the canvas
                events: {
                    onHover: {
                        enable: true, // Enable hover effect
                        mode: "repulse" // Repulse particles on hover
                    },
                    onClick: {
                        enable: true, // Enable click effect
                        mode: "push" // Push particles on click
                    },
                    resize: true // Re-adjust on window resize
                },
                modes: {
                    repulse: {
                        distance: 100, // Repulsion distance
                        duration: 0.4, // Repulsion duration
                        speed: 1 // Repulsion speed
                    },
                    push: {
                        quantity: 4 // Number of particles to push on click
                    }
                }
            },
            detectRetina: true, // Enable retina display support
            background: {
                opacity: 0 // Make the tsParticles canvas background transparent
            }
        }).catch(error => {
            // Log error if tsParticles fails to load
            console.error("Error loading tsParticles:", error);
        });
    } else {
        // Warn if the library wasn't found
        console.warn("tsParticles library not found.");
    }


    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If element is intersecting (visible)
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); // Add 'visible' class to trigger animation
                    // Optional: Stop observing once visible to save resources
                    // revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });
        // Observe each reveal element
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers: make all elements visible immediately
        revealElements.forEach(el => el.classList.add('visible'));
    }


    // --- Hero Content Parallax Effect ---
    const heroContent = document.getElementById('hero-content');
    if (heroContent) {
        let rafId = null; // RequestAnimationFrame ID
        let mouseX = 0;
        let mouseY = 0;
        const factor = 0.01; // Movement intensity factor

        // Update mouse coordinates on mouse move
        document.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            mouseX = e.clientX - centerX;
            mouseY = e.clientY - centerY;
            // Request animation frame if not already requested
            if (!rafId) {
                rafId = requestAnimationFrame(updateHeroPosition);
            }
        });

        // Function to update hero position based on mouse coordinates
        function updateHeroPosition() {
            const moveX = mouseX * factor;
            const moveY = mouseY * factor;
            // Apply 3D transform for smoother animation
            heroContent.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            rafId = null; // Reset RAF ID
        }
    }


    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        // Toggle menu visibility on button click
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            // Update ARIA attribute for accessibility
            mobileMenuButton.setAttribute('aria-expanded', !isHidden);
        });
        // Close menu when a link inside it is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                // Update active link highlight after closing menu
                setTimeout(updateActiveLink, 50);
            });
        });
    }

    // --- Lightbox Logic ---
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const photoItems = document.querySelectorAll('.photo-item img'); // Select images within photo items

    if (lightboxOverlay && lightboxImg && lightboxClose && photoItems.length > 0) {
        // Function to open the lightbox
        const openLightbox = (imgSrc, imgAlt) => {
            lightboxImg.setAttribute('src', imgSrc);
            lightboxImg.setAttribute('alt', imgAlt || 'Enlarged photo');
            lightboxOverlay.classList.remove('hidden'); // Make overlay block-level
            // Use setTimeout to allow CSS transition for opacity
            setTimeout(() => lightboxOverlay.classList.add('visible'), 10);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        };

        // Function to close the lightbox
        const closeLightbox = () => {
            lightboxOverlay.classList.remove('visible'); // Start fade-out transition
            // Wait for transition to finish before hiding and resetting
            setTimeout(() => {
                lightboxOverlay.classList.add('hidden');
                lightboxImg.setAttribute('src', ''); // Clear image source
                lightboxImg.setAttribute('alt', '');
                document.body.style.overflow = ''; // Restore background scrolling
            }, 350); // Match transition duration in CSS
        };

        // Add click listener to each photo image
        photoItems.forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering clicks on parent elements
                openLightbox(img.getAttribute('src'), img.getAttribute('alt'));
            });
        });

        // Add click listener to close button
        lightboxClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });

        // Add click listener to overlay (close when clicking outside the image)
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) { // Check if click was directly on the overlay
                closeLightbox();
            }
        });

        // Add keyboard listener (close on Escape key)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxOverlay.classList.contains('visible')) {
                closeLightbox();
            }
        });
    } else {
        console.warn("Lightbox elements not found or no photo items present.");
    }

}); // End DOMContentLoaded
