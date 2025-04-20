// --- Navigation Bar & Active Link Logic ---
// ... (keep existing code) ...

// --- tsParticles Initialization ---
// ... (keep existing code) ...

// --- Scroll Reveal Animation ---
// ... (keep existing code) ...

// --- Hero Content Parallax Effect ---
// ... (keep existing code) ...

// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
// *** Get mobile language elements ***
const mobileLangToggle = document.getElementById('mobile-lang-toggle');
const mobileLangDropdown = document.getElementById('mobile-lang-dropdown');

if (mobileMenuButton && mobileMenu) {
     mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', !isHidden);
        // *** Close mobile lang dropdown when main mobile menu closes ***
        if (isHidden && mobileLangDropdown) {
            mobileLangDropdown.classList.add('hidden');
        }
    });
    // Close menu when a link is clicked (excluding language toggle)
    mobileMenu.querySelectorAll('a:not([data-lang])').forEach(link => { // Exclude lang links
        link.addEventListener('click', () => {
             mobileMenu.classList.add('hidden');
             mobileMenuButton.setAttribute('aria-expanded', 'false');
             // Close mobile lang dropdown too
             if (mobileLangDropdown) mobileLangDropdown.classList.add('hidden');
             // Update active link immediately after closing
             setTimeout(updateActiveLink, 50);
        });
    });

     // *** Add listener for mobile language toggle ***
     if (mobileLangToggle && mobileLangDropdown) {
         mobileLangToggle.addEventListener('click', (e) => {
             e.stopPropagation(); // Prevent menu from closing
             mobileLangDropdown.classList.toggle('hidden');
         });
     }
 }

// --- Lightbox Logic ---
// ... (keep existing code) ...


// --- *** NEW: Language Switching Logic *** ---

const translations = {
    'en': {
        'page_title': "MaxCaulfield's Little Station",
        'nav_home': "Home",
        'nav_about': "About Me",
        'nav_photos': "Photo Gallery",
        'nav_contact': "Contact Me",
        'language_select': "Select Language", // For mobile dropdown button
        'hero_greeting': "Hello, I'm MaxCaulfield",
        'hero_subtitle': "Student at Beijing International Studies University | Love Creating & Exploring",
        'hero_blog_button': "Enter Blog",
        'hero_scroll_prompt': "Scroll down for more ↓",
        'about_title': "About Me",
        'about_para1': "I am someone who madly absorbs information in the vast flow of the internet. Always curious about new things, passionate about exploring the boundaries of technology and the charm of design.",
        'about_para2': "As a student at Beijing International Studies University, I not only focus on my studies but also spend my spare time immersed in the digital world, learning programming, experiencing different software tools, and trying to turn ideas into reality. I believe continuous learning and hands-on practice are the best ways to grow.",
        'about_tag1': "Fast Learner",
        'about_tag2': "Digital Explorer",
        'about_tag3': "Stay Curious",
        'photos_title': "Photo Gallery",
        'photos_caption': "Actually cute anime characters created by AI",
        'contact_title': "Contact Me",
        'contact_prompt': "Contact me via email:",
        'contact_email_tooltip': "Click to send email",
        'footer_text': "Built with ❤️ and code.",
        'current_lang_display': "EN" // Short display for button
    },
    'zh-CN': {
        'page_title': "麦青春的小小站",
        'nav_home': "主页",
        'nav_about': "关于我",
        'nav_photos': "照片展览",
        'nav_contact': "联系我",
        'language_select': "选择语言",
        'hero_greeting': "你好，我是 MaxCaulfield",
        'hero_subtitle': "北京市第二外国语学院 学生 | 热爱创造与探索",
        'hero_blog_button': "进入博客",
        'hero_scroll_prompt': "下滑了解更多 ↓",
        'about_title': "关于我",
        'about_para1': "我是一个在网络宏流中疯狂汲取信息的人。对新鲜事物永远保持好奇，热衷于探索技术的边界和设计的魅力。",
        'about_para2': "作为北京市第二外国语学院的学生，我不仅专注于学业，更利用课余时间沉浸在数字世界，学习编程、体验不同的软件工具，并尝试将创意变为现实。我相信持续学习和动手实践是成长的最佳途径。",
        'about_tag1': "快速学习",
        'about_tag2': "数字探索",
        'about_tag3': "保持好奇",
        'photos_title': "照片展览",
        'photos_caption': "其实是主包丢AI创作出来的卡哇伊二刺螈",
        'contact_title': "联系我",
        'contact_prompt': "通过邮箱联系我:",
        'contact_email_tooltip': "点击发送邮件",
        'footer_text': "用 ❤️ 和代码构建.",
        'current_lang_display': "简"
    },
    'zh-TW': {
        'page_title': "麥青春的小小站",
        'nav_home': "主頁",
        'nav_about': "關於我",
        'nav_photos': "照片展覽",
        'nav_contact': "聯繫我",
        'language_select': "選擇語言",
        'hero_greeting': "你好，我是 MaxCaulfield",
        'hero_subtitle': "北京第二外國語學院 學生 | 熱愛創造與探索",
        'hero_blog_button': "進入部落格",
        'hero_scroll_prompt': "下滑了解更多 ↓",
        'about_title': "關於我",
        'about_para1': "我是一個在網路宏流中瘋狂汲取資訊的人。對新鮮事物永遠保持好奇，熱衷於探索技術的邊界和設計的魅力。",
        'about_para2': "作為北京第二外國語學院的學生，我不僅專注於學業，更利用課餘時間沉浸在數位世界，學習程式設計、體驗不同的軟體工具，並嘗試將創意變為現實。我相信持續學習和動手實踐是成長的最佳途徑。",
        'about_tag1': "快速學習",
        'about_tag2': "數位探索",
        'about_tag3': "保持好奇",
        'photos_title': "照片展覽",
        'photos_caption': "其實是主包丟AI創作出來的卡哇伊二次元", // Slightly different phrasing maybe
        'contact_title': "聯繫我",
        'contact_prompt': "透過郵箱聯繫我:",
        'contact_email_tooltip': "點擊發送郵件",
        'footer_text': "用 ❤️ 和程式碼構建.",
        'current_lang_display': "繁"
    }
};

// --- Language Switching Elements ---
const langToggle = document.getElementById('lang-toggle');
const langDropdown = document.getElementById('lang-dropdown');
const currentLangSpan = document.getElementById('current-lang');
const langLinks = document.querySelectorAll('#lang-dropdown a[data-lang]'); // Desktop links

// Mobile language elements already selected above (mobileLangToggle, mobileLangDropdown)
const mobileCurrentLangSpan = document.getElementById('mobile-current-lang');
const mobileLangLinks = document.querySelectorAll('#mobile-lang-dropdown a[data-lang]'); // Mobile links

let currentLang = localStorage.getItem('language') || 'zh-CN'; // Default language

function applyTranslations(lang) {
    if (!translations[lang]) return;

    // Set overall page language
    document.documentElement.lang = lang.split('-')[0]; // Use base language code (e.g., 'zh')

    const elements = document.querySelectorAll('[data-translate-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate-key');
        if (translations[lang][key] !== undefined) {
            if (el.tagName === 'TITLE') { // Handle page title
                 document.title = translations[lang][key];
            } else if (el.tagName === 'INPUT' && el.placeholder) { // Handle input placeholders
                el.placeholder = translations[lang][key];
            } else if (el.title) { // Handle title attributes (tooltips)
                 el.title = translations[lang][key];
            } else if (el.tagName === 'IMG' && el.alt) { // Handle image alt text (optional)
                 el.alt = translations[lang][key];
            }
             else { // Handle general text content
                el.textContent = translations[lang][key];
            }
        } else {
            console.warn(`Translation key "${key}" not found for language "${lang}"`);
        }
    });

    // Update the language display in the buttons
    const displayLang = translations[lang]['current_lang_display'] || lang.split('-')[0].toUpperCase();
    if (currentLangSpan) currentLangSpan.textContent = displayLang;
    if (mobileCurrentLangSpan) mobileCurrentLangSpan.textContent = displayLang;

     // Update active state for language links (optional visual feedback)
     const allLangLinks = document.querySelectorAll('a[data-lang]');
     allLangLinks.forEach(link => {
         link.classList.toggle('font-bold', link.getAttribute('data-lang') === lang); // Example: make active bold
         link.classList.toggle('text-[var(--star-bright)]', link.getAttribute('data-lang') === lang); // Example: change color
     });

}

function setupLangSwitcher(toggleButton, dropdownMenu, links) {
    if (!toggleButton || !dropdownMenu || !links) return;

    // Toggle dropdown visibility
    toggleButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click listener from closing immediately
        dropdownMenu.classList.toggle('hidden');
    });

    // Select language
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
            // If inside mobile menu, maybe close the whole mobile menu? Optional.
            // if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            //     mobileMenu.classList.add('hidden');
            //     mobileMenuButton.setAttribute('aria-expanded', 'false');
            // }
        });
    });
}

// Setup both desktop and mobile switchers
setupLangSwitcher(langToggle, langDropdown, langLinks);
setupLangSwitcher(mobileLangToggle, mobileLangDropdown, mobileLangLinks); // Use the mobile elements

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (langDropdown && !langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.add('hidden');
    }
    if (mobileLangDropdown && !mobileLangToggle.contains(e.target) && !mobileLangDropdown.contains(e.target)) {
         // Don't close if the click was inside the main mobile menu button area
         if (!mobileMenuButton.contains(e.target)) {
             mobileLangDropdown.classList.add('hidden');
         }
    }
});

// Apply initial translation on page load
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations(currentLang);
    // Also run updateActiveLink on load (you likely already have this)
    updateActiveLink();
});

// --- End Language Switching Logic ---