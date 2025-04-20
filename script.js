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

    // --- Theme Switching Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const sunIcon = themeToggle.querySelector('.fa-sun');
        const moonIcon = themeToggle.querySelector('.fa-moon');
        // Determine initial theme from localStorage or system preference (optional)
        // For simplicity, defaulting to dark unless 'light' is stored
        const currentTheme = localStorage.getItem('theme') || 'dark';

        function applyTheme(theme) {
            if (theme === 'light') {
                document.body.classList.add('light-theme');
                document.body.classList.remove('dark-theme');
                if(sunIcon) sunIcon.classList.add('hidden');
                if(moonIcon) moonIcon.classList.remove('hidden');
            } else {
                document.body.classList.add('dark-theme');
                document.body.classList.remove('light-theme');
                if(sunIcon) sunIcon.classList.remove('hidden');
                if(moonIcon) moonIcon.classList.add('hidden');
            }
        }

        // Apply initial theme
        applyTheme(currentTheme);

        themeToggle.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    } else {
        console.warn("Theme toggle button not found.");
    }

    // --- Language Switching Logic ---
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    const currentLangSpan = document.getElementById('current-lang');

    if (langToggle && langDropdown && currentLangSpan) {
        const langLinks = langDropdown.querySelectorAll('a[data-lang]');
        // Determine initial language from localStorage or browser default (optional)
        // Defaulting to 'zh-CN'
        let currentLang = localStorage.getItem('language') || 'zh-CN';

        // Function to apply translations
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
                    // Handle specific elements like placeholders or titles if needed
                    if (el.tagName === 'TITLE') {
                         document.title = translations[lang][key]; // Update page title
                    } else if (el.tagName === 'INPUT' && el.placeholder) {
                         el.placeholder = translations[lang][key];
                    } else if (el.title) {
                         el.title = translations[lang][key];
                    } else {
                         el.textContent = translations[lang][key];
                    }
                } else {
                    console.warn(`Translation key "${key}" not found for language "${lang}"`);
                }
            });
             // Update the language display in the button
             if(translations[lang]['current_lang_display']) {
                currentLangSpan.textContent = translations[lang]['current_lang_display'];
             } else {
                 currentLangSpan.textContent = lang.split('-')[0].toUpperCase();
             }
        }

        // Apply initial language
        applyTranslations(currentLang);

        // Toggle dropdown visibility
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from closing immediately
            // Use 'show' class for better control with CSS transitions if added later
            langDropdown.classList.toggle('show');
            langDropdown.classList.toggle('hidden'); // Still toggle hidden for basic show/hide
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.add('hidden');
                langDropdown.classList.remove('show');
            }
        });

        // Handle language selection
        langLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedLang = link.getAttribute('data-lang');
                if (selectedLang !== currentLang) {
                    currentLang = selectedLang;
                    localStorage.setItem('language', currentLang);
                    applyTranslations(currentLang);
                    // Update active link highlighting after language change might redraw nav
                    setTimeout(updateActiveLink, 50);
                }
                langDropdown.classList.add('hidden'); // Close dropdown after selection
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
            // Add a class 'scrolled' to the navbar when scrolled down
            nav.classList.toggle('scrolled', window.scrollY > 30); // Trigger slightly earlier
        });
    }

    // --- Active Navigation Link Highlighting ---
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link'); // Desktop links
    const mobileNavLinks = document.querySelectorAll('.mobile-menu-item'); // Mobile links

    function updateActiveLink() {
        let currentSectionId = 'home'; // Default to home
        let minDistance = Infinity;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.pageYOffset;
            const distance = Math.abs((scrollPosition + window.innerHeight / 3) - (sectionTop + sectionHeight / 2)); // Find center distance

             // Alternative: Check if section is in viewport
             const rect = section.getBoundingClientRect();
             const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
             const isInViewport = !(rect.bottom < 50 || rect.top - viewHeight >= -50); // Check if at least 50px is visible

             if (isInViewport) {
                 // Prioritize section closest to the middle-top of the viewport
                 const distanceToTop = Math.abs(rect.top - 100); // Distance from 100px below top
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
    }
    // Initial call and on scroll
    updateActiveLink(); // Call on load
    window.addEventListener('scroll', updateActiveLink); // Update on scroll


    // --- tsParticles Initialization (Optimized from blog page) ---
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                number: { value: 70, density: { enable: false } },
                color: { value: ["#FFFFFF", "#ADD8E6", "#F0F8FF", "#a7c7e7", "#60a5fa"] },
                shape: { type: ["circle", "star"] },
                opacity: { value: {min: 0.1, max: 0.5}, animation: { enable: true, speed: 0.9, minimumValue: 0.1, sync: false } },
                size: { value: { min: 0.5, max: 2.0 }, animation: { enable: false } },
                links: { color: "random", distance: 140, enable: true, opacity: 0.1, width: 1, warp: false },
                collisions: { enable: false },
                move: { direction: "none", enable: true, outModes: { default: "out" }, random: true, speed: 0.6, straight: false, attract: { enable: false } }
            },
            interactivity: {
                events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" }, resize: true },
                modes: { repulse: { distance: 80, duration: 0.4, speed: 0.8 }, push: { quantity: 2 } }
            },
            detectRetina: true,
            background: { opacity: 0 }
        }).catch(error => { console.error("Error loading tsParticles:", error); });
    } else {
        console.warn("tsParticles library not found.");
    }


    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Add 'visible' class when element enters viewport
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
                // Optional: Remove class when it leaves viewport to re-trigger animation
                // else {
                //    entry.target.classList.remove('visible');
                // }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });
        revealElements.forEach(el => { revealObserver.observe(el); });
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('visible'));
    }


    // --- Hero Content Parallax Effect ---
    const heroContent = document.getElementById('hero-content');
    if (heroContent) {
        let rafId = null;
        let mouseX = 0, mouseY = 0;
        const factor = 0.01; // Movement intensity

        document.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            mouseX = e.clientX - centerX;
            mouseY = e.clientY - centerY;
            // Use rAF for performance
            if (!rafId) {
                rafId = requestAnimationFrame(updateHeroPosition);
            }
        });

        function updateHeroPosition() {
            const moveX = mouseX * factor;
            const moveY = mouseY * factor;
            // Apply transform using translate3d for potential hardware acceleration
            heroContent.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            rafId = null; // Allow next frame request
        }
    }


    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', !isHidden);
        });
        // Close menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                // Update active link highlighting shortly after closing
                setTimeout(updateActiveLink, 50);
            });
        });
    }

    // --- Lightbox Logic ---
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    // Select images within photo items for lightbox trigger
    const photoItems = document.querySelectorAll('.photo-item img');

    if (lightboxOverlay && lightboxImg && lightboxClose && photoItems.length > 0) {
        const openLightbox = (imgSrc, imgAlt) => {
            lightboxImg.setAttribute('src', imgSrc);
            lightboxImg.setAttribute('alt', imgAlt || 'Enlarged photo'); // Use original alt text
            lightboxOverlay.classList.remove('hidden');
            setTimeout(() => lightboxOverlay.classList.add('visible'), 10);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        };

        const closeLightbox = () => {
            lightboxOverlay.classList.remove('visible');
            setTimeout(() => {
                lightboxOverlay.classList.add('hidden');
                lightboxImg.setAttribute('src', ''); // Clear src
                lightboxImg.setAttribute('alt', '');
                document.body.style.overflow = ''; // Restore scroll
            }, 350); // Match CSS transition duration
        };

        photoItems.forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(img.getAttribute('src'), img.getAttribute('alt'));
            });
        });

        lightboxClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });

        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) { // Close only if clicking overlay bg
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxOverlay.classList.contains('visible')) {
                closeLightbox();
            }
        });
    } else {
        console.warn("Lightbox elements not found.");
    }

}); // End DOMContentLoaded
