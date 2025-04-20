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
// 更新导航链接激活状态的函数
function updateActiveLink() {
     let current = 'home';
     sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Consider section height or fallback to window height if section has no height (e.g., display:none initially)
        // 考虑分区高度，如果分区没有高度（例如初始时 display:none），则回退到窗口高度
        const sectionHeight = section.clientHeight > 0 ? section.clientHeight : window.innerHeight;
        if (pageYOffset >= sectionTop - 150) { // Adjust offset as needed // 根据需要调整偏移量
            current = section.getAttribute('id');
        }
    });
    // Update desktop nav links (ensure 'active' class is handled correctly)
    // 更新桌面导航链接（确保正确处理 'active' 类）
     navLinks.forEach(link => {
         // Check if the link is internal before adding/removing active class based on scroll
         // 在根据滚动添加/删除活动类之前检查链接是否为内部链接
         if (link.getAttribute('href').startsWith('#')) {
             link.classList.toggle('active', link.getAttribute('href').substring(1) === current);
         } else {
             link.classList.remove('active'); // External links shouldn't be 'active' based on scroll // 外部链接不应根据滚动而处于 'active' 状态
         }
     });
     // Update mobile nav links
     // 更新移动导航链接
     if (mobileNavLinks.length > 0) {
         mobileNavLinks.forEach(link => {
             if (link.getAttribute('href').startsWith('#')) {
                 const linkTarget = link.getAttribute('href').substring(1);
                 // Toggle active styles for mobile nav links
                 // 切换移动导航链接的活动样式
                 link.classList.toggle('bg-gray-700', linkTarget === current); // Example active background // 示例活动背景
                 link.classList.toggle('text-[var(--star-bright)]', linkTarget === current); // Example active text color // 示例活动文本颜色
             } else {
                  // Reset styles for external mobile links if needed
                  // 如果需要，重置外部移动链接的样式
                  link.classList.remove('bg-gray-700', 'text-[var(--star-bright)]');
             }
         });
     }
 }
// Add scroll listener for updating active link
// 添加滚动监听器以更新活动链接
window.addEventListener('scroll', updateActiveLink);


// --- tsParticles Initialization (Tuned Density, Interaction, and Emitter Speed) ---
// tsParticles 初始化（调整了链接密度、点击推送、更快的星星）
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
// 滚动显现动画
const revealElements = document.querySelectorAll('.reveal');
// Check if IntersectionObserver is supported
// 检查是否支持 IntersectionObserver
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after revealing to improve performance
                // 可选：显现后取消观察以提高性能
                // observer.unobserve(entry.target);
            }
            // Optional: Remove 'visible' class if element scrolls out of view
            // 可选：如果元素滚动出视图，则移除 'visible' 类
            // else {
            //     entry.target.classList.remove('visible');
            // }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible // 当元素 10% 可见时触发
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
} else {
    // Fallback for browsers that don't support IntersectionObserver
    // 对于不支持 IntersectionObserver 的浏览器的回退方案
    console.warn("IntersectionObserver not supported. Reveal animations will not work dynamically.");
    // Make all elements visible immediately as a fallback
    // 作为回退方案，立即显示所有元素
    revealElements.forEach(el => el.classList.add('visible'));
}


// --- Hero Content Parallax Effect ---
// 英雄内容视差效果
const heroContent = document.getElementById('hero-content');
if (heroContent) {
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        // Apply a subtle parallax effect by moving the content slightly slower than the scroll
        // 通过使内容移动速度略慢于滚动来应用微妙的视差效果
        heroContent.style.transform = `translateY(${scrollY * 0.1}px)`;
    });
}


// --- Mobile Menu Toggle ---
// 移动菜单切换
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLangToggle = document.getElementById('mobile-lang-toggle');
const mobileLangDropdown = document.getElementById('mobile-lang-dropdown');

if (mobileMenuButton && mobileMenu) {
     mobileMenuButton.addEventListener('click', () => {
        console.log("Mobile menu button clicked"); // Debug log // 调试日志
        const isHidden = mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', String(!isHidden)); // Set aria-expanded state // 设置 aria-expanded 状态
        // If menu is hidden, also hide the language dropdown if it's open
        // 如果菜单隐藏，并且语言下拉菜单是打开的，则也隐藏它
        if (isHidden && mobileLangDropdown && !mobileLangDropdown.classList.contains('hidden')) {
             mobileLangDropdown.classList.add('hidden');
        }
    });

    // Close menu when a NAV link (internal or external) is clicked
    // 点击导航链接（内部或外部）时关闭菜单
    mobileMenu.querySelectorAll('a').forEach(link => {
        // Exclude language links from closing the *entire* menu instantly
        // 排除语言链接，避免立即关闭*整个*菜单
        if (!link.hasAttribute('data-lang')) {
            link.addEventListener('click', () => {
                console.log("Mobile menu link clicked:", link.href); // Debug log // 调试日志
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                // Also hide language dropdown when a main link is clicked
                // 点击主链接时也隐藏语言下拉菜单
                if (mobileLangDropdown) mobileLangDropdown.classList.add('hidden');
            });
        }
    });

     // Mobile language toggle listener
     // 移动语言切换监听器
     if (mobileLangToggle && mobileLangDropdown) {
         mobileLangToggle.addEventListener('click', (e) => {
             console.log("Mobile language toggle clicked"); // Debug log // 调试日志
             e.stopPropagation(); // Prevent event bubbling // 阻止事件冒泡
             mobileLangDropdown.classList.toggle('hidden');
         });
     } else {
          console.warn("Mobile language toggle/dropdown elements not found"); // Debug log // 调试日志
     }
 } else {
      console.warn("Mobile menu button/menu element not found"); // Debug log // 调试日志
 }


// --- Lightbox Logic ---
// 灯箱逻辑
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const photoItems = document.querySelectorAll('.photo-item img.gallery-photo'); // Select only gallery photos

if (lightboxOverlay && lightboxImg && lightboxClose && photoItems.length > 0) {
    photoItems.forEach(item => {
        // Add click listener only after the image has successfully loaded via JS
        // 仅在图片通过 JS 成功加载后才添加点击监听器
        item.addEventListener('load', () => {
             // Make sure the image is actually visible before adding the listener
             // 在添加监听器之前，确保图片实际可见
             if (window.getComputedStyle(item).display !== 'none') {
                item.addEventListener('click', () => {
                    console.log("Lightbox opened for:", item.src); // Debug log // 调试日志
                    lightboxImg.src = item.src; // Set the source for the lightbox image // 设置灯箱图片的源
                    lightboxOverlay.classList.remove('hidden');
                    lightboxOverlay.classList.add('flex'); // Use flex to center // 使用 flex 居中
                });
             }
        });
         // Handle cases where the image might already be loaded from cache
         // 处理图片可能已从缓存加载的情况
         if (item.complete && item.naturalWidth > 0 && window.getComputedStyle(item).display !== 'none') {
              item.addEventListener('click', () => {
                    console.log("Lightbox opened for (cached):", item.src); // Debug log // 调试日志
                    lightboxImg.src = item.src;
                    lightboxOverlay.classList.remove('hidden');
                    lightboxOverlay.classList.add('flex');
              });
         }
    });

    // Close lightbox when clicking overlay or close button
    // 点击遮罩层或关闭按钮时关闭灯箱
    lightboxOverlay.addEventListener('click', (e) => {
        // Close only if clicking the overlay itself or the close button
        // 仅在点击遮罩层本身或关闭按钮时关闭
        if (e.target === lightboxOverlay || e.target === lightboxClose) {
            console.log("Lightbox closed"); // Debug log // 调试日志
            lightboxOverlay.classList.add('hidden');
            lightboxOverlay.classList.remove('flex');
            lightboxImg.src = ""; // Clear src to prevent showing old image briefly // 清除 src 以防止短暂显示旧图像
        }
    });

    // Also close lightbox with the Escape key
    // 也使用 Escape 键关闭灯箱
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightboxOverlay.classList.contains('hidden')) {
             console.log("Lightbox closed (Escape key)"); // Debug log // 调试日志
             lightboxOverlay.classList.add('hidden');
             lightboxOverlay.classList.remove('flex');
             lightboxImg.src = "";
        }
    });

} else {
     console.warn("Lightbox elements not found or no gallery photos detected."); // Debug log // 调试日志
}


// --- Language Switching Logic (Integrated) ---
// 语言切换逻辑（集成）

// Translations object (ensure keys match data-translate-key attributes)
// 翻译对象（确保键与 data-translate-key 属性匹配）
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
// 语言切换元素 - 检查它们是否存在
const langToggle = document.getElementById('lang-toggle');
const langDropdown = document.getElementById('lang-dropdown');
const currentLangSpan = document.getElementById('current-lang');
const langLinks = document.querySelectorAll('#lang-dropdown a[data-lang]'); // Desktop links // 桌面链接
const mobileCurrentLangSpan = document.getElementById('mobile-current-lang');
const mobileLangLinks = document.querySelectorAll('#mobile-lang-dropdown a[data-lang]'); // Mobile links // 移动链接

// Get language from local storage or default to 'zh-CN'
// 从本地存储获取语言，或默认为 'zh-CN'
let currentLang = localStorage.getItem('language') || 'zh-CN';

// Function to apply translations based on the selected language
// 根据所选语言应用翻译的函数
function applyTranslations(lang) {
    if (!translations[lang]) {
        console.error(`Translations not found for language: ${lang}`); // Debug log // 调试日志
        return;
    }
    console.log(`Applying translations for: ${lang}`); // Debug log // 调试日志
    // Set the lang attribute on the HTML element
    // 在 HTML 元素上设置 lang 属性
    document.documentElement.lang = lang.startsWith('zh') ? lang : lang.split('-')[0]; // Handle zh-CN/zh-TW properly // 正确处理 zh-CN/zh-TW

    // Select all elements with data-translate-key attribute
    // 选择所有具有 data-translate-key 属性的元素
    const elements = document.querySelectorAll('[data-translate-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate-key');
        if (translations[lang][key] !== undefined) {
            // Handle different element types appropriately
            // 适当地处理不同的元素类型
            if (el.tagName === 'TITLE') { document.title = translations[lang][key]; }
            else if (el.tagName === 'INPUT' && el.placeholder) { el.placeholder = translations[lang][key]; }
            else if (el.title) { el.title = translations[lang][key]; } // Tooltips // 工具提示
            else if (el.tagName === 'IMG' && el.alt) { el.alt = translations[lang][key]; } // Image alt text // 图片 alt 文本
            else { el.textContent = translations[lang][key]; } // Default to textContent // 默认为 textContent
        } else {
            // Warn if a translation key is missing for the current language
            // 如果当前语言缺少翻译键，则发出警告
            console.warn(`Translation key "${key}" not found for language "${lang}"`);
        }
    });

    // Update the displayed language name/code in the buttons
    // 更新按钮中显示的语言名称/代码
    const displayLang = translations[lang]['current_lang_display'] || lang.split('-')[0].toUpperCase();
    if (currentLangSpan) currentLangSpan.textContent = displayLang; else console.warn("currentLangSpan not found");
    if (mobileCurrentLangSpan) mobileCurrentLangSpan.textContent = displayLang; else console.warn("mobileCurrentLangSpan not found");

    // Update active state styling for language links
    // 更新语言链接的活动状态样式
    const allLangLinks = document.querySelectorAll('a[data-lang]');
    allLangLinks.forEach(link => {
        const linkLang = link.getAttribute('data-lang');
        // Add/remove classes to indicate the currently selected language
        // 添加/删除类以指示当前选择的语言
        link.classList.toggle('font-bold', linkLang === lang); // Example: make active bold // 示例：将活动项加粗
        link.classList.toggle('text-[var(--star-bright)]', linkLang === lang); // Example: change text color // 示例：更改文本颜色
    });
}

// Function to set up a language switcher (desktop or mobile)
// 设置语言切换器（桌面或移动）的函数
function setupLangSwitcher(toggleButton, dropdownMenu, links) {
    if (!toggleButton || !dropdownMenu || !links || links.length === 0) {
        console.warn("Language switcher elements missing for setup:", {toggleButtonExists: !!toggleButton, dropdownMenuExists: !!dropdownMenu, linksExists: links && links.length > 0 }); // Debug log // 调试日志
        return; // Exit if essential elements are missing // 如果缺少基本元素则退出
    }
    console.log("Setting up lang switcher for:", toggleButton.id); // Debug log // 调试日志

    // Toggle dropdown visibility on button click
    // 点击按钮时切换下拉菜单可见性
    toggleButton.addEventListener('click', (e) => {
        console.log(`Language toggle clicked: ${toggleButton.id}`); // Debug log // 调试日志
        e.stopPropagation(); // Prevent click from immediately closing dropdown // 防止点击立即关闭下拉菜单
        dropdownMenu.classList.toggle('hidden');
    });

    // Handle language selection when a link is clicked
    // 单击链接时处理语言选择
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior // 阻止默认链接行为
            const selectedLang = link.getAttribute('data-lang');
            console.log(`Language link clicked: ${selectedLang}`); // Debug log // 调试日志
            if (selectedLang !== currentLang) {
                currentLang = selectedLang;
                localStorage.setItem('language', currentLang); // Store preference // 存储偏好
                applyTranslations(currentLang); // Apply new language // 应用新语言
            }
            dropdownMenu.classList.add('hidden'); // Hide dropdown after selection // 选择后隐藏下拉菜单

            // Special handling for mobile menu closure: close the main mobile menu as well
            // 移动菜单关闭的特殊处理：也关闭主移动菜单
            if (mobileMenu && !mobileMenu.classList.contains('hidden') && dropdownMenu === mobileLangDropdown) {
                 mobileMenu.classList.add('hidden');
                 mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Close dropdowns when clicking outside of them
// 在它们外部单击时关闭下拉菜单
document.addEventListener('click', (e) => {
    // Close Desktop Dropdown if click is outside
    // 如果单击在外部，则关闭桌面下拉菜单
    if (langToggle && langDropdown && !langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.add('hidden');
    }
    // Close Mobile Language Dropdown if click is outside its toggle and the dropdown itself
    // 如果单击在其切换按钮和下拉菜单本身之外，则关闭移动语言下拉菜单
    if (mobileLangToggle && mobileLangDropdown && !mobileLangToggle.contains(e.target) && !mobileLangDropdown.contains(e.target)) {
         // Ensure the click wasn't inside the main mobile menu button either if the dropdown is part of it
         // 如果下拉菜单是其中的一部分，请确保单击也不在主移动菜单按钮内
         // This check might be redundant depending on exact structure, but safer
         // 根据具体结构，此检查可能是多余的，但更安全
         // if (!mobileMenuButton || !mobileMenuButton.contains(e.target)) {
              mobileLangDropdown.classList.add('hidden');
         // }
     }
});


// --- NEW: Function to load images via JavaScript ---
// --- 新增：通过 JavaScript 加载图片的函数 ---
function loadImages() {
    console.log("Attempting to load images via JS..."); // 尝试通过JS加载图片...

    // Load Avatar Image
    // 加载头像图片
    const avatarImg = document.getElementById('avatar-img');
    if (avatarImg && avatarImg.dataset.src) {
        avatarImg.onload = () => {
            console.log(`Avatar image loaded successfully: ${avatarImg.src}`); // 头像加载成功
            avatarImg.style.display = ''; // Ensure display is not none if loaded // 如果加载成功，确保 display 不是 none
        };
        avatarImg.onerror = () => {
            console.error(`ERROR loading avatar image via JS: ${avatarImg.dataset.src}. Check path and file.`); // 通过 JS 加载头像失败
            // Optionally set a placeholder or leave the alt text visible
            // 可选：设置占位符或保持 alt 文本可见
            avatarImg.alt = `无法加载: ${avatarImg.dataset.src}`;
            // Keep the element potentially visible to show alt text or a broken icon
            // 保持元素可能可见以显示 alt 文本或损坏的图标
             avatarImg.style.border = '1px dashed red'; // Add visual indicator of error // 添加错误的视觉指示器
        };
        // Set the src attribute to trigger loading
        // 设置 src 属性以触​​发加载
        avatarImg.src = avatarImg.dataset.src;
        console.log(`Set src for avatar via JS: ${avatarImg.src}`); // 通过 JS 设置头像 src
    } else {
         console.warn("Avatar image element or data-src not found."); // 未找到头像元素或 data-src
    }

    // Load Gallery Photos
    // 加载图库照片
    const galleryPhotos = document.querySelectorAll('.gallery-photo');
     galleryPhotos.forEach((photo, index) => {
        if (photo.dataset.src) {
             photo.onload = () => {
                 console.log(`Gallery photo ${index + 1} loaded successfully: ${photo.src}`); // 图库照片加载成功
                 photo.style.display = ''; // Ensure display is not none if loaded // 如果加载成功，确保 display 不是 none
             };
             photo.onerror = () => {
                 console.error(`ERROR loading gallery photo ${index + 1} via JS: ${photo.dataset.src}. Check path and file.`); // 通过 JS 加载图库照片失败
                 photo.alt = `无法加载: ${photo.dataset.src}`;
                 photo.style.border = '1px dashed red'; // Add visual indicator of error // 添加错误的视觉指示器
             };
             // Set the src attribute to trigger loading
             // 设置 src 属性以触​​发加载
             photo.src = photo.dataset.src;
             console.log(`Set src for gallery photo ${index + 1} via JS: ${photo.src}`); // 通过 JS 设置图库照片 src
         } else {
              console.warn(`Gallery photo ${index + 1} missing data-src.`); // 图库照片缺少 data-src
         }
     });
}


// --- Apply initial states and setup listeners on page load ---
// --- 页面加载时应用初始状态并设置监听器 ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired."); // Debug log // 调试日志

    // Setup language switchers only after DOM is ready
    // 仅在 DOM 准备就绪后设置语言切换器
    setupLangSwitcher(langToggle, langDropdown, langLinks);
    setupLangSwitcher(mobileLangToggle, mobileLangDropdown, mobileLangLinks);

    // Apply initial translation and nav state
    // 应用初始翻译和导航状态
    applyTranslations(currentLang);
    updateActiveLink(); // Update nav link state based on initial scroll position // 根据初始滚动位置更新导航链接状态

    // *** Call the new image loading function ***
    // *** 调用新的图片加载函数 ***
    loadImages();
});
// --- End Language Switching Logic ---
