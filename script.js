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
        // Adjust offset calculation for better accuracy (adjust 150 as needed)
        if (pageYOffset >= sectionTop - 150) {
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
            const linkTarget = link.getAttribute('href').substring(1);
            link.classList.toggle('bg-gray-700', linkTarget === current);
            link.classList.toggle('text-[var(--star-bright)]', linkTarget === current);
         });
     }
 }
// Add event listeners for scroll and initial load for active link highlighting
window.addEventListener('scroll', updateActiveLink);
// DOMContentLoaded listener moved to the end to include language init


// --- tsParticles Initialization (Emitter Removed) ---
if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        particles: {
            number: { value: 70, density: { enable: false } },
            color: { value: ["#FFFFFF", "#ADD8E6", "#F0F8FF", "#86efac", "#67e8f9"] },
            shape: { type: ["circle", "star"] },
            opacity: { value: {min: 0.1, max: 0.6}, animation: { enable: true, speed: 0.8, minimumValue: 0.1, sync: false, destroy: "none", startValue: "random" } },
            size: { value: { min: 0.5, max: 2.5 }, animation: { enable: true, speed: 4, minimumValue: 0.5, sync: false, destroy: "none", startValue: "random"} },
            links: { color: "random", distance: 130, enable: true, opacity: 0.15, width: 1, warp: true },
            collisions: { enable: false },
            move: { direction: "none", enable: true, outModes: { default: "out" }, random: true, speed: 0.5, straight: false, noise: { enable: true, delay: { value: 0.5 }, factor: { value: 0.5 } } }
        },
        interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" }, resize: true },
            modes: { repulse: { distance: 70, duration: 0.4, speed: 0.6 }, push: { quantity: 3 } }
        },
        // *** EMITTERS CONFIGURATION REMOVED ***
        // emitters: {
        //     name: "avatarEmitter",
        //     position: { x: 50, y: 50 },
        //     rate: { quantity: 2, delay: 0.1 },
        //     size: { width: 100, height: 100, mode: "percent" },
        //     particles: {
        //         size: { value: {min: 1, max: 3} },
        //         opacity: { value: {min: 0.5, max: 0.9} },
        //         color: { value: ["#ffffff", "#a78bfa", "#6ee7b7", "#22d3ee"] },
        //         shape: { type: "star" },
        //         move: {
        //             speed: 1.8,
        //             decay: 0.05,
        //             direction: "outside",
        //             straight: false,
        //             outModes: { default: "destroy", top: "none", bottom: "none" }
        //         },
        //         life: { duration: 2.0, count: 1 },
        //         links: { enable: false }
        //     }
        // },
        detectRetina: true,
        background: { opacity: 0 }
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
                // observer.unobserve(entry.target); // Optional: uncomment to animate only once
            } else {
                // entry.target.classList.remove('visible'); // Optional: uncomment to re-animate
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => { revealObserver.observe(el); });
} else {
    console.warn("IntersectionObserver not supported. Reveal animations may not work.");
    revealElements.forEach(el => el.classList.add('visible'));
}


// --- Hero Content Parallax Effect ---
const heroContent = document.getElementById('hero-content');
if (heroContent) {
     let rafId = null;
     let mouseX = 0, mouseY = 0;
     const factor = 0.01;
     let centerX = window.innerWidth / 2; // Initialize center X
     let centerY = window.innerHeight / 2; // Initialize center Y

     // Update center on resize
     window.addEventListener('resize', () => {
         centerX = window.innerWidth / 2;
         centerY = window.innerHeight / 2;
     });

     document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX - centerX;
        mouseY = e.clientY - centerY;
        if (!rafId) {
            rafId = requestAnimationFrame(updateHeroPosition);
        }
    });

     function updateHeroPosition() {
         const moveX = mouseX * factor;
         const moveY = mouseY * factor;
         // Apply transform using style for potentially better performance than class toggling
         heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
         rafId = null;
     }
 }


// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLangToggle = document.getElementById('mobile-lang-toggle'); // Get mobile lang elements
const mobileLangDropdown = document.getElementById('mobile-lang-dropdown');

if (mobileMenuButton && mobileMenu) {
     mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', !isHidden);
        // Close mobile lang dropdown when main mobile menu closes
        if (isHidden && mobileLangDropdown && !mobileLangDropdown.classList.contains('hidden')) {
            mobileLangDropdown.classList.add('hidden');
        }
    });

    // Close menu when a NAV link (not lang link) is clicked
    mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => { // Select only internal nav links
        link.addEventListener('click', () => {
             mobileMenu.classList.add('hidden');
             mobileMenuButton.setAttribute('aria-expanded', 'false');
             if (mobileLangDropdown) mobileLangDropdown.classList.add('hidden');
             // Update active link highlighting might be needed here too if scroll doesn't trigger fast enough
             // setTimeout(updateActiveLink, 50); // Update active link after closing
        });
    });

     // Add listener for mobile language toggle
     if (mobileLangToggle && mobileLangDropdown) {
         mobileLangToggle.addEventListener('click', (e) => {
             e.stopPropagation(); // Prevent menu from closing if already open
             mobileLangDropdown.classList.toggle('hidden');
         });
     }
 }

// --- Lightbox Logic ---
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const photoItems = document.querySelectorAll('.photo-item img');

if (lightboxOverlay && lightboxImg && lightboxClose && photoItems.length > 0) {
    const openLightbox = (imgSrc) => {
        lightboxImg.setAttribute('src', imgSrc);
        lightboxOverlay.classList.remove('hidden');
        setTimeout(() => { lightboxOverlay.classList.add('visible'); }, 10);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightboxOverlay.classList.remove('visible');
        setTimeout(() => {
            lightboxOverlay.classList.add('hidden');
            lightboxImg.setAttribute('src', '');
            document.body.style.overflow = '';
        }, 300);
    };

    photoItems.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            const fullSrc = img.getAttribute('src');
            if (fullSrc) { openLightbox(fullSrc); }
        });
    });

    lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) { closeLightbox(); }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('visible')) {
            closeLightbox();
        }
    });
} else {
    console.warn("Lightbox elements not found. Lightbox functionality disabled.");
}


// --- Language Switching Logic (Integrated) ---

const translations = {
    'en': {
        'page_title': "MaxCaulfield's Little Station", 'nav_home': "Home", 'nav_about': "About Me", 'nav_photos': "Photo Gallery", 'nav_contact': "Contact Me", 'language_select': "Select Language", 'hero_greeting': "Hello, I'm MaxCaulfield", 'hero_subtitle': "Student at Beijing International Studies University | Love Creating & Exploring", 'hero_blog_button': "Enter Blog", 'hero_scroll_prompt': "Scroll down for more ↓", 'about_title': "About Me", 'about_para1': "I am someone who madly absorbs information in the vast flow of the internet. Always curious about new things, passionate about exploring the boundaries of technology and the charm of design.", 'about_para2': "As a student at Beijing International Studies University, I not only focus on my studies but also spend my spare time immersed in the digital world, learning programming, experiencing different software tools, and trying to turn ideas into reality. I believe continuous learning and hands-on practice are the best ways to grow.", 'about_tag1': "Fast Learner", 'about_tag2': "Digital Explorer", 'about_tag3': "Stay Curious", 'photos_title': "Photo Gallery", 'photos_caption': "Actually cute anime characters created by AI", 'contact_title': "Contact Me", 'contact_prompt': "Contact me via email:", 'contact_email_tooltip': "Click to send email", 'footer_text': "Built with ❤️ and code.", 'current_lang_display': "EN"
    },
    'zh-CN': {
        'page_title': "麦青春的小小站", 'nav_home': "主页", 'nav_about': "关于我", 'nav_photos': "照片展览", 'nav_contact': "联系我", 'language_select': "选择语言", 'hero_greeting': "你好，我是 MaxCaulfield", 'hero_subtitle': "北京市第二外国语学院 学生 | 热爱创造与探索", 'hero_blog_button': "进入博客", 'hero_scroll_prompt': "下滑了解更多 ↓", 'about_title': "关于我", 'about_para1': "我是一个在网络宏流中疯狂汲取信息的人。对新鲜事物永远保持好奇，热衷于探索技术的边界和设计的魅力。", 'about_para2': "作为北京市第二外国语学院的学生，我不仅专注于学业，更利用课余时间沉浸在数字世界，学习编程、体验不同的软件工具，并尝试将创意变为现实。我相信持续学习和动手实践是成长的最佳途径。", 'about_tag1': "快速学习", 'about_tag2': "数字探索", 'about_tag3': "保持好奇", 'photos_title': "照片展览", 'photos_caption': "其实是主包丢AI创作出来的卡哇伊二刺螈", 'contact_title': "联系我", 'contact_prompt': "通过邮箱联系我:", 'contact_email_tooltip': "点击发送邮件", 'footer_text': "用 ❤️ 和代码构建.", 'current_lang_display': "简"
    },
    'zh-TW': {
        'page_title': "麥青春的小小站", 'nav_home': "主頁", 'nav_about': "關於我", 'nav_photos': "照片展覽", 'nav_contact': "聯繫我", 'language_select': "選擇語言", 'hero_greeting': "你好，我是 MaxCaulfield", 'hero_subtitle': "北京第二外國語學院 學生 | 熱愛創造與探索", 'hero_blog_button': "進入部落格", 'hero_scroll_prompt': "下滑了解更多 ↓", 'about_title': "關於我", 'about_para1': "我是一個在網路宏流中瘋狂汲取資訊的人。對新鮮事物永遠保持好奇，熱衷於探索技術的邊界和設計的魅力。", 'about_para2': "作為北京第二外國語學院的學生，我不僅專注於學業，更利用課餘時間沉浸在數位世界，學習程式設計、體驗不同的軟體工具，並嘗試將創意變為現實。我相信持續學習和動手實踐是成長的最佳途徑。", 'about_tag1': "快速學習", 'about_tag2': "數位探索", 'about_tag3': "保持好奇", 'photos_title': "照片展覽", 'photos_caption': "其實是主包丟AI創作出來的卡哇伊二次元", 'contact_title': "聯繫我", 'contact_prompt': "透過郵箱聯繫我:", 'contact_email_tooltip': "點擊發送郵件", 'footer_text': "用 ❤️ 和程式碼構建.", 'current_lang_display': "繁"
    }
};

// Language Switching Elements
const langToggle = document.getElementById('lang-toggle');
const langDropdown = document.getElementById('lang-dropdown');
const currentLangSpan = document.getElementById('current-lang');
const langLinks = document.querySelectorAll('#lang-dropdown a[data-lang]'); // Desktop links
// Mobile elements already selected: mobileLangToggle, mobileLangDropdown
const mobileCurrentLangSpan = document.getElementById('mobile-current-lang');
const mobileLangLinks = document.querySelectorAll('#mobile-lang-dropdown a[data-lang]'); // Mobile links

let currentLang = localStorage.getItem('language') || 'zh-CN'; // Default language

function applyTranslations(lang) {
    if (!translations[lang]) return;
    document.documentElement.lang = lang.split('-')[0];
    const elements = document.querySelectorAll('[data-translate-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate-key');
        if (translations[lang][key] !== undefined) {
            if (el.tagName === 'TITLE') { document.title = translations[lang][key]; }
            else if (el.tagName === 'INPUT' && el.placeholder) { el.placeholder = translations[lang][key]; }
            else if (el.title) { el.title = translations[lang][key]; }
            else if (el.tagName === 'IMG' && el.alt) { el.alt = translations[lang][key]; }
            else { el.textContent = translations[lang][key]; }
        } else { console.warn(`Translation key "${key}" not found for language "${lang}"`); }
    });
    const displayLang = translations[lang]['current_lang_display'] || lang.split('-')[0].toUpperCase();
    if (currentLangSpan) currentLangSpan.textContent = displayLang;
    if (mobileCurrentLangSpan) mobileCurrentLangSpan.textContent = displayLang;
    const allLangLinks = document.querySelectorAll('a[data-lang]');
    allLangLinks.forEach(link => {
        link.classList.toggle('font-bold', link.getAttribute('data-lang') === lang);
        link.classList.toggle('text-[var(--star-bright)]', link.getAttribute('data-lang') === lang);
    });
}

function setupLangSwitcher(toggleButton, dropdownMenu, links) {
    if (!toggleButton || !dropdownMenu || !links) return;
    toggleButton.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
    });
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = link.getAttribute('data-lang');
            if (selectedLang !== currentLang) {
                currentLang = selectedLang;
                localStorage.setItem('language', currentLang);
                applyTranslations(currentLang);
            }
            dropdownMenu.classList.add('hidden');
            // If inside mobile menu, close the whole mobile menu after selection
            if (mobileMenu && !mobileMenu.classList.contains('hidden') && dropdownMenu === mobileLangDropdown) {
                 mobileMenu.classList.add('hidden');
                 mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Setup both switchers
setupLangSwitcher(langToggle, langDropdown, langLinks);
setupLangSwitcher(mobileLangToggle, mobileLangDropdown, mobileLangLinks);

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (langDropdown && !langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.add('hidden');
    }
    // Use closest to check if click is inside the mobile menu container OR the toggle button itself
    if (mobileLangDropdown && !mobileLangToggle.contains(e.target) && !mobileLangDropdown.contains(e.target)) {
         if (!e.target.closest('#mobile-menu') && !mobileMenuButton.contains(e.target)) {
             mobileLangDropdown.classList.add('hidden');
         }
     }
});

// Apply initial states on page load
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations(currentLang); // Apply language first
    updateActiveLink(); // Then update nav link state
});

// --- End Language Switching Logic ---