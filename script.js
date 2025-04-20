// --- Navigation Bar & Active Link Logic ---
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

const sections = document.querySelectorAll('section[id], header[id]');
// Select desktop nav links excluding the language switcher itself
const navLinks = document.querySelectorAll('.nav-link');
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
    // Update desktop nav links (ensure 'active' class is handled correctly)
     navLinks.forEach(link => {
         // Check if the link is internal before adding/removing active class based on scroll
         if (link.getAttribute('href').startsWith('#')) {
             link.classList.toggle('active', link.getAttribute('href').substring(1) === current);
         } else {
             link.classList.remove('active'); // External links shouldn't be 'active' based on scroll
         }
     });
     // Update mobile nav links
     if (mobileNavLinks.length > 0) {
         mobileNavLinks.forEach(link => {
             if (link.getAttribute('href').startsWith('#')) {
                 const linkTarget = link.getAttribute('href').substring(1);
                 link.classList.toggle('bg-gray-700', linkTarget === current);
                 link.classList.toggle('text-[var(--star-bright)]', linkTarget === current);
             } else {
                  // Reset styles for external mobile links if needed
                  link.classList.remove('bg-gray-700', 'text-[var(--star-bright)]');
             }
         });
     }
 }
window.addEventListener('scroll', updateActiveLink);
// DOMContentLoaded listener at the end


// --- tsParticles Initialization (Tuned Density, Interaction, and Emitter Speed) ---
if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        particles: { number: { value: 35, density: { enable: true, area: 800 } }, color: { value: ["#FFFFFF", "#ADD8E6", "#F0F8FF"] }, shape: { type: ["circle", "star"] }, opacity: { value: { min: 0.1, max: 0.4 }, animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false } }, size: { value: { min: 1, max: 3 } }, links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.15, width: 1 }, collisions: { enable: false }, move: { direction: "none", enable: true, outModes: { default: "out" }, random: true, speed: 0.4, straight: false } },
        interactivity: { events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" }, resize: true }, modes: { repulse: { distance: 80, duration: 0.4 }, push: { quantity: 3 } } },
        emitters: { direction: "none", rate: { quantity: 1, delay: 0.05 }, size: { width: 100, height: 100, mode: "percent" }, position: { x: 50, y: 50 }, particles: { shape: { type: "star" }, size: { value: { min: 1, max: 3 } }, color: { value: ["#FFFFFF", "#86efac", "#67e8f9", "#a7c7e7"] }, opacity: { value: { min: 0.3, max: 0.8 }, animation: { enable: true, speed: 0.9, minimumValue: 0.3 } }, links: { enable: false }, move: { speed: 0.8, decay: 0.05, direction: "none", straight: false, random: true, outModes: { default: "destroy" } }, life: { duration: { min: 5, max: 10 }, count: 1 } } },
        detectRetina: true, background: { opacity: 0 }
    }).then(container => { console.log("tsParticles loaded (tuned linked density, click push, faster stars)"); }).catch(error => { console.error("Error loading tsParticles:", error); });
} else { console.warn("tsParticles library not found."); }


// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) { /* ... (keep existing IntersectionObserver logic) ... */ }
else { console.warn("IntersectionObserver not supported."); revealElements.forEach(el => el.classList.add('visible')); }


// --- Hero Content Parallax Effect ---
const heroContent = document.getElementById('hero-content');
if (heroContent) { /* ... (keep existing parallax logic) ... */ }


// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLangToggle = document.getElementById('mobile-lang-toggle');
const mobileLangDropdown = document.getElementById('mobile-lang-dropdown');
if (mobileMenuButton && mobileMenu) {
     mobileMenuButton.addEventListener('click', () => {
        console.log("Mobile menu button clicked"); // Debug log
        const isHidden = mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', !isHidden);
        if (isHidden && mobileLangDropdown && !mobileLangDropdown.classList.contains('hidden')) { mobileLangDropdown.classList.add('hidden'); }
    });
    // Close menu when a NAV link (internal or external) is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        // Exclude language links from closing the *entire* menu instantly
        if (!link.hasAttribute('data-lang')) {
            link.addEventListener('click', () => {
                console.log("Mobile menu link clicked:", link.href); // Debug log
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                if (mobileLangDropdown) mobileLangDropdown.classList.add('hidden');
            });
        }
    });
     // Mobile language toggle listener
     if (mobileLangToggle && mobileLangDropdown) {
         mobileLangToggle.addEventListener('click', (e) => {
             console.log("Mobile language toggle clicked"); // Debug log
             e.stopPropagation();
             mobileLangDropdown.classList.toggle('hidden');
         });
     } else {
          console.warn("Mobile language toggle/dropdown elements not found"); // Debug log
     }
 } else {
      console.warn("Mobile menu button/menu element not found"); // Debug log
 }

// --- Lightbox Logic ---
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const photoItems = document.querySelectorAll('.photo-item img');
if (lightboxOverlay && lightboxImg && lightboxClose && photoItems.length > 0) { /* ... (keep existing lightbox logic) ... */ }
else { console.warn("Lightbox elements not found."); }


// --- Language Switching Logic (Integrated) ---

const translations = {
    'en': {
        'page_title': "MaxCaulfield's Little Station", 'nav_home': "Home", 'nav_about': "About Me", 'nav_photos': "Photo Gallery", 'nav_contact': "Contact Me", 'nav_blog': "Blog", 'language_select': "Select Language", 'hero_greeting': "Hello, I'm MaxCaulfield", 'hero_subtitle': "Student at Beijing International Studies University | Love Creating & Exploring", 'hero_blog_button': "Enter Blog", 'hero_scroll_prompt': "Scroll down for more ↓", 'about_title': "About Me", 'about_para1': "I am someone who madly absorbs information in the vast flow of the internet. Always curious about new things, passionate about exploring the boundaries of technology and the charm of design.", 'about_para2': "As a student at Beijing International Studies University, I not only focus on my studies but also spend my spare time immersed in the digital world, learning programming, experiencing different software tools, and trying to turn ideas into reality. I believe continuous learning and hands-on practice are the best ways to grow.", 'about_tag1': "Fast Learner", 'about_tag2': "Digital Explorer", 'about_tag3': "Stay Curious", 'photos_title': "Photo Gallery", 'photos_caption': "Actually cute anime characters created by AI", 'contact_title': "Contact Me", 'contact_prompt': "Contact me via email:", 'contact_email_tooltip': "Click to send email", 'footer_text': "Built with ❤️ and code.", 'current_lang_display': "EN"
    },
    'zh-CN': {
        'page_title': "麦青春的小小站", 'nav_home': "主页", 'nav_about': "关于我", 'nav_photos': "照片展览", 'nav_contact': "联系我", 'nav_blog': "博客", 'language_select': "选择语言", 'hero_greeting': "你好，我是 MaxCaulfield", 'hero_subtitle': "北京市第二外国语学院 学生 | 热爱创造与探索", 'hero_blog_button': "进入博客", 'hero_scroll_prompt': "下滑了解更多 ↓", 'about_title': "关于我", 'about_para1': "我是一个在网络宏流中疯狂汲取信息的人。对新鲜事物永远保持好奇，热衷于探索技术的边界和设计的魅力。", 'about_para2': "作为北京市第二外国语学院的学生，我不仅专注于学业，更利用课余时间沉浸在数字世界，学习编程、体验不同的软件工具，并尝试将创意变为现实。我相信持续学习和动手实践是成长的最佳途径。", 'about_tag1': "快速学习", 'about_tag2': "数字探索", 'about_tag3': "保持好奇", 'photos_title': "照片展览", 'photos_caption': "其实是主包丢AI创作出来的卡哇伊二刺螈", 'contact_title': "联系我", 'contact_prompt': "通过邮箱联系我:", 'contact_email_tooltip': "点击发送邮件", 'footer_text': "用 ❤️ 和代码构建.", 'current_lang_display': "简"
    },
    'zh-TW': {
        'page_title': "麥青春的小小站", 'nav_home': "主頁", 'nav_about': "關於我", 'nav_photos': "照片展覽", 'nav_contact': "聯繫我", 'nav_blog': "部落格", 'language_select': "選擇語言", 'hero_greeting': "你好，我是 MaxCaulfield", 'hero_subtitle': "北京第二外國語學院 學生 | 熱愛創造與探索", 'hero_blog_button': "進入部落格", 'hero_scroll_prompt': "下滑了解更多 ↓", 'about_title': "關於我", 'about_para1': "我是一個在網路宏流中瘋狂汲取資訊的人。對新鮮事物永遠保持好奇，熱衷於探索技術的邊界和設計的魅力。", 'about_para2': "作為北京第二外國語學院的學生，我不僅專注於學業，更利用課餘時間沉浸在數位世界，學習程式設計、體驗不同的軟體工具，並嘗試將創意變為現實。我相信持續學習和動手實踐是成長的最佳途徑。", 'about_tag1': "快速學習", 'about_tag2': "數位探索", 'about_tag3': "保持好奇", 'photos_title': "照片展覽", 'photos_caption': "其實是主包丟AI創作出來的卡哇伊二次元", 'contact_title': "聯繫我", 'contact_prompt': "透過郵箱聯繫我:", 'contact_email_tooltip': "點擊發送郵件", 'footer_text': "用 ❤️ 和程式碼構建.", 'current_lang_display': "繁"
    }
};

// Language Switching Elements - Check if they exist
const langToggle = document.getElementById('lang-toggle');
const langDropdown = document.getElementById('lang-dropdown');
const currentLangSpan = document.getElementById('current-lang');
const langLinks = document.querySelectorAll('#lang-dropdown a[data-lang]'); // Desktop links
const mobileCurrentLangSpan = document.getElementById('mobile-current-lang');
const mobileLangLinks = document.querySelectorAll('#mobile-lang-dropdown a[data-lang]'); // Mobile links

let currentLang = localStorage.getItem('language') || 'zh-CN'; // Default language

function applyTranslations(lang) {
    if (!translations[lang]) {
        console.error(`Translations not found for language: ${lang}`); // Debug log
        return;
    }
    console.log(`Applying translations for: ${lang}`); // Debug log
    document.documentElement.lang = lang.split('-')[0];
    const elements = document.querySelectorAll('[data-translate-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate-key');
        if (translations[lang][key] !== undefined) {
            // Keep existing logic for different elements (TITLE, INPUT, title, IMG alt, textContent)
            if (el.tagName === 'TITLE') { document.title = translations[lang][key]; }
            else if (el.tagName === 'INPUT' && el.placeholder) { el.placeholder = translations[lang][key]; }
            else if (el.title) { el.title = translations[lang][key]; }
            else if (el.tagName === 'IMG' && el.alt) { el.alt = translations[lang][key]; }
            else { el.textContent = translations[lang][key]; }
        } else {
            console.warn(`Translation key "${key}" not found for language "${lang}"`);
        }
    });
    const displayLang = translations[lang]['current_lang_display'] || lang.split('-')[0].toUpperCase();
    if (currentLangSpan) currentLangSpan.textContent = displayLang; else console.warn("currentLangSpan not found");
    if (mobileCurrentLangSpan) mobileCurrentLangSpan.textContent = displayLang; else console.warn("mobileCurrentLangSpan not found");

    const allLangLinks = document.querySelectorAll('a[data-lang]');
    allLangLinks.forEach(link => {
        link.classList.toggle('font-bold', link.getAttribute('data-lang') === lang);
        link.classList.toggle('text-[var(--star-bright)]', link.getAttribute('data-lang') === lang);
    });
}

function setupLangSwitcher(toggleButton, dropdownMenu, links) {
    if (!toggleButton || !dropdownMenu || !links) {
        console.warn("Language switcher elements missing for setup:", {toggleButton, dropdownMenu, linksExists: links && links.length > 0 }); // Debug log
        return; // Exit if elements are missing
    }
    console.log("Setting up lang switcher for:", toggleButton.id); // Debug log

    // Toggle dropdown visibility
    toggleButton.addEventListener('click', (e) => {
        console.log(`Language toggle clicked: ${toggleButton.id}`); // Debug log
        e.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
    });

    // Select language
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = link.getAttribute('data-lang');
            console.log(`Language link clicked: ${selectedLang}`); // Debug log
            if (selectedLang !== currentLang) {
                currentLang = selectedLang;
                localStorage.setItem('language', currentLang);
                applyTranslations(currentLang); // Apply new language
            }
            dropdownMenu.classList.add('hidden'); // Hide dropdown after selection

            // Special handling for mobile menu closure
            if (mobileMenu && !mobileMenu.classList.contains('hidden') && dropdownMenu === mobileLangDropdown) {
                 mobileMenu.classList.add('hidden');
                 mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Setup both switchers - These calls must happen AFTER the elements exist in the DOM.
// We move the setup calls into the DOMContentLoaded listener to be safe.

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    // Close Desktop Dropdown
    if (langToggle && langDropdown && !langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.add('hidden');
    }
    // Close Mobile Dropdown (only if click is outside mobile menu entirely)
    if (mobileLangToggle && mobileLangDropdown && !mobileLangToggle.contains(e.target) && !mobileLangDropdown.contains(e.target)) {
         if (!e.target.closest('#mobile-menu') && !mobileMenuButton.contains(e.target)) {
             mobileLangDropdown.classList.add('hidden');
         }
     }
});

// Apply initial states and setup listeners on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired."); // Debug log
    // Setup language switchers only after DOM is ready
    setupLangSwitcher(langToggle, langDropdown, langLinks);
    setupLangSwitcher(mobileLangToggle, mobileLangDropdown, mobileLangLinks);

    // Apply initial translation and nav state
    applyTranslations(currentLang);
    updateActiveLink();
});
// --- End Language Switching Logic ---