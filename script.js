// --- Translations Object for index.html ---
// 存储不同语言的文本内容
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
        'current_lang_display': "EN" // 语言按钮显示的文本
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
        'current_lang_display': "简" // 语言按钮显示的文本
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
        'current_lang_display': "繁" // 语言按钮显示的文本
    }
};


// --- 等待 DOM 完全加载后执行脚本 ---
document.addEventListener('DOMContentLoaded', () => {

    // --- 语言切换逻辑 ---
    const langToggle = document.getElementById('lang-toggle'); // 获取切换按钮
    const langDropdown = document.getElementById('lang-dropdown'); // 获取下拉菜单
    const currentLangSpan = document.getElementById('current-lang'); // 获取显示当前语言的元素
    let updateActiveLink = () => {}; // 占位符，稍后定义更新导航链接的函数

    // 检查相关元素是否存在
    if (langToggle && langDropdown && currentLangSpan) {
        const langLinks = langDropdown.querySelectorAll('a[data-lang]'); // 获取所有语言选项链接
        // 从 localStorage 获取上次选择的语言，或默认为简体中文
        let currentLang = localStorage.getItem('language') || 'zh-CN';

        // 应用翻译的函数
        function applyTranslations(lang) {
            // 检查是否存在该语言的翻译
            if (!translations[lang]) {
                console.warn(`Translations for language "${lang}" not found.`);
                // 如果选择的语言无效，则回退到默认语言
                if (lang !== 'zh-CN') {
                    applyTranslations('zh-CN'); // 应用默认中文
                }
                return;
            }
            // 设置 HTML 元素的 lang 属性
            document.documentElement.lang = lang.startsWith('zh') ? lang : lang.split('-')[0];

            // 更新所有带 data-translate-key 属性的元素的文本内容
            const elements = document.querySelectorAll('[data-translate-key]');
            elements.forEach(el => {
                const key = el.getAttribute('data-translate-key');
                if (translations[lang][key] !== undefined) {
                    // 根据元素类型更新内容
                    if (el.tagName === 'TITLE') { // 更新页面标题
                        document.title = translations[lang][key];
                    } else if (el.tagName === 'INPUT' && el.placeholder) { // 更新输入框占位符
                         el.placeholder = translations[lang][key];
                    } else if (el.title) { // 更新 title 属性 (鼠标悬停提示)
                         el.title = translations[lang][key];
                    } else { // 更新元素的文本内容
                         el.textContent = translations[lang][key];
                    }
                } else {
                    // 如果缺少某个翻译键，在控制台发出警告
                    console.warn(`Translation key "${key}" not found for language "${lang}"`);
                }
            });

            // 更新语言切换按钮上显示的文本
            if (translations[lang]['current_lang_display']) {
                currentLangSpan.textContent = translations[lang]['current_lang_display'];
            } else {
                 // 如果缺少显示文本，则显示语言代码的大写形式
                 currentLangSpan.textContent = lang.split('-')[0].toUpperCase();
            }
        }

        // 页面加载时应用初始语言
        applyTranslations(currentLang);

        // 点击切换按钮时，切换下拉菜单的显示/隐藏
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡，防止立即关闭
            langDropdown.classList.toggle('show'); // 使用 'show' 类以支持 CSS 过渡
            langDropdown.classList.toggle('hidden'); // 同时切换 'hidden' 类
        });

        // 点击页面其他地方时，关闭下拉菜单
        document.addEventListener('click', (e) => {
            // 检查点击事件是否发生在切换按钮或下拉菜单之外
            if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.add('hidden');
                langDropdown.classList.remove('show');
            }
        });

        // 为每个语言选项链接添加点击事件监听器
        langLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // 阻止链接的默认跳转行为
                const selectedLang = link.getAttribute('data-lang'); // 获取选择的语言代码
                // 如果选择了不同的语言
                if (selectedLang !== currentLang) {
                    currentLang = selectedLang; // 更新当前语言
                    localStorage.setItem('language', currentLang); // 将选择存储到 localStorage
                    applyTranslations(currentLang); // 应用新的翻译
                    // 稍微延迟后更新激活的导航链接（因为文本变化可能影响布局）
                    setTimeout(updateActiveLink, 50);
                }
                // 隐藏下拉菜单
                langDropdown.classList.add('hidden');
                langDropdown.classList.remove('show');
            });
        });

    } else {
         // 如果找不到语言切换相关元素，发出警告
         console.warn("Language toggle elements not found.");
    }


    // --- 导航栏滚动效果 ---
    const nav = document.getElementById('navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            // 如果页面滚动超过 30px，添加 'scrolled' 类，否则移除
            nav.classList.toggle('scrolled', window.scrollY > 30);
        });
    }

    // --- 激活导航链接高亮 ---
    const sections = document.querySelectorAll('section[id], header[id]'); // 获取所有带 ID 的区块
    const navLinks = document.querySelectorAll('.nav-link'); // 获取桌面导航链接
    const mobileNavLinks = document.querySelectorAll('.mobile-menu-item'); // 获取移动端导航链接

    // 检查是否存在区块和导航链接
    if (sections.length > 0 && (navLinks.length > 0 || mobileNavLinks.length > 0)) {
         // 定义更新激活链接的函数
         updateActiveLink = () => {
            let currentSectionId = 'home'; // 默认激活 'home'
            let minDistance = Infinity; // 用于追踪哪个区块离视口顶部最近

            // 遍历所有区块
            sections.forEach(section => {
                const rect = section.getBoundingClientRect(); // 获取区块相对于视口的位置和大小
                const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight); // 获取视口高度
                // 判断区块是否在视口内或接近视口 (上下 50px 边距)
                const isInViewport = !(rect.bottom < 50 || rect.top - viewHeight >= -50);

                if (isInViewport) {
                    // 计算区块顶部到视口顶部下方 100px 处的距离
                    // （选择 100px 是为了在区块刚进入视口时就切换高亮）
                    const distanceToTop = Math.abs(rect.top - 100);
                    // 如果当前区块更近，则更新 currentSectionId
                    if (distanceToTop < minDistance) {
                        minDistance = distanceToTop;
                        currentSectionId = section.getAttribute('id');
                    }
                }
            });

            // 根据 currentSectionId 更新桌面导航链接的 'active' 类
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
            });
            // 根据 currentSectionId 更新移动端导航链接的 'active' 类
            mobileNavLinks.forEach(link => {
                 link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
            });
        };
        updateActiveLink(); // 页面加载时立即执行一次
        window.addEventListener('scroll', updateActiveLink); // 页面滚动时执行
    }


    // --- tsParticles 初始化 (更新后的星空效果) ---
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60, // 帧率限制
            particles: {
                number: {
                    value: 100, // 粒子数量增加
                    density: { enable: true, value_area: 800 } // 根据区域密度调整数量
                 },
                color: { // 粒子颜色 (多种星空色)
                    value: ["#FFFFFF", "#a0aec0", "#8cb5e5", "#bfdbfe", "#e0f2fe", "#fbcfe8", "#fef3c7"]
                },
                shape: {
                    type: "star" // 使用内置的星星形状
                 },
                opacity: { // 粒子透明度
                    value: { min: 0.3, max: 0.8 }, // 随机透明度范围
                    animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false } // 透明度闪烁动画
                },
                size: { // 粒子大小
                    value: { min: 0.5, max: 2.5 }, // 随机大小范围
                    animation: { enable: true, speed: 3, minimumValue: 0.3, sync: false } // 大小变化动画
                },
                links: { // 粒子连接线
                    enable: true, // 启用连接线
                    distance: 120, // 连接线的最大距离
                    color: "random", // 随机连接线颜色
                    opacity: 0.2, // 连接线透明度 (降低)
                    width: 1, // 连接线宽度
                    warp: false
                },
                collisions: { // 粒子碰撞
                     enable: false // 禁用碰撞
                 },
                move: { // 粒子移动
                    direction: "none", // 随机方向
                    enable: true, // 启用移动
                    outModes: { default: "out" }, // 移出画布边界后的行为
                    random: true, // 随机移动
                    speed: 0.5, // 移动速度减慢
                    straight: false, // 非直线移动
                    attract: { enable: false } // 禁用粒子间吸引
                }
            },
            interactivity: { // 交互性设置
                events: {
                    onHover: {
                        enable: true, // 启用悬停交互
                        mode: "repulse" // 悬停时排斥粒子
                     },
                    onClick: {
                        enable: true, // 启用点击交互
                        mode: "push" // 点击时推出粒子
                    },
                    resize: true // 窗口大小调整时重新计算
                },
                modes: {
                    repulse: { // 排斥模式配置
                         distance: 80, // 排斥距离
                         duration: 0.4,
                         speed: 1
                     },
                    push: { // 推出模式配置
                         quantity: 3 // 推出 3 个粒子
                     },
                    // 可以添加 grab, bubble 等其他交互模式
                }
            },
            detectRetina: true, // 启用 Retina 屏幕检测
            background: {
                opacity: 0 // 背景透明，以显示 CSS 背景
            }
        }).catch(error => { console.error("Error loading tsParticles:", error); });
    } else {
        console.warn("tsParticles library not found."); // 如果库未加载，发出警告
    }


    // --- 滚动浮现动画 ---
    const revealElements = document.querySelectorAll('.reveal'); // 获取所有需要浮现的元素
    // 检查浏览器是否支持 IntersectionObserver
    if ('IntersectionObserver' in window) {
        // 创建观察器实例
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // 如果元素进入视口
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); // 添加 'visible' 类触发动画
                    // (可选) 观察一次后停止观察，以提高性能
                    // revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // 元素可见 10% 时触发

        // 让观察器观察所有目标元素
        revealElements.forEach(el => { revealObserver.observe(el); });
    } else {
        // 如果浏览器不支持，则直接显示所有元素
        revealElements.forEach(el => el.classList.add('visible'));
    }


    // --- 英雄区域内容视差效果 ---
    const heroContent = document.getElementById('hero-content');
    if (heroContent) {
        let rafId = null; // 用于存储 requestAnimationFrame 的 ID
        let mouseX = 0; let mouseY = 0; // 鼠标相对于屏幕中心的位置
        const factor = 0.01; // 移动因子，控制移动幅度

        // 监听鼠标移动事件
        document.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2; // 屏幕中心 X 坐标
            const centerY = window.innerHeight / 2; // 屏幕中心 Y 坐标
            mouseX = e.clientX - centerX; // 计算鼠标 X 偏移量
            mouseY = e.clientY - centerY; // 计算鼠标 Y 偏移量
            // 使用 requestAnimationFrame 优化性能
            if (!rafId) {
                rafId = requestAnimationFrame(updateHeroPosition);
            }
        });

        // 更新英雄区域内容的 transform 属性
        function updateHeroPosition() {
            const moveX = mouseX * factor; // 计算 X 轴移动距离
            const moveY = mouseY * factor; // 计算 Y 轴移动距离
            // 使用 translate3d 开启硬件加速
            heroContent.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            rafId = null; // 重置 rafId，允许下一次更新
        }
    }


    // --- 移动端菜单切换 ---
    const mobileMenuButton = document.getElementById('mobile-menu-button'); // 获取菜单按钮
    const mobileMenu = document.getElementById('mobile-menu'); // 获取菜单本身
    if (mobileMenuButton && mobileMenu) {
        // 点击按钮时切换菜单的显示/隐藏
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden'); // 切换 'hidden' 类
            mobileMenuButton.setAttribute('aria-expanded', !isHidden); // 更新 aria 属性
        });
        // 点击菜单项后关闭菜单
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden'); // 隐藏菜单
                mobileMenuButton.setAttribute('aria-expanded', 'false'); // 更新 aria 属性
                // 稍微延迟后更新激活链接
                setTimeout(updateActiveLink, 50);
            });
        });
    }

    // --- 灯箱逻辑 ---
    const lightboxOverlay = document.getElementById('lightbox-overlay'); // 获取遮罩层
    const lightboxImg = document.getElementById('lightbox-img'); // 获取图片容器
    const lightboxClose = document.getElementById('lightbox-close'); // 获取关闭按钮
    const photoItems = document.querySelectorAll('.photo-item img'); // 获取所有照片图片

    // 检查灯箱相关元素是否存在
    if (lightboxOverlay && lightboxImg && lightboxClose && photoItems.length > 0) {
        // 打开灯箱的函数
        const openLightbox = (imgSrc, imgAlt) => {
            lightboxImg.setAttribute('src', imgSrc); // 设置图片源
            lightboxImg.setAttribute('alt', imgAlt || 'Enlarged photo'); // 设置 alt 文本
            lightboxOverlay.classList.remove('hidden'); // 移除隐藏类
            // 稍微延迟后添加 'visible' 类以触发过渡动画
            setTimeout(() => lightboxOverlay.classList.add('visible'), 10);
            document.body.style.overflow = 'hidden'; // 禁止背景滚动
        };
        // 关闭灯箱的函数
        const closeLightbox = () => {
            lightboxOverlay.classList.remove('visible'); // 移除 'visible' 类
            // 等待过渡动画结束后再隐藏并清除图片源
            setTimeout(() => {
                lightboxOverlay.classList.add('hidden');
                lightboxImg.setAttribute('src', '');
                lightboxImg.setAttribute('alt', '');
                document.body.style.overflow = ''; // 恢复背景滚动
            }, 350); // 延迟时间应与 CSS 过渡时间匹配
        };
        // 为每张照片添加点击事件监听器
        photoItems.forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation(); // 阻止事件冒泡
                openLightbox(img.getAttribute('src'), img.getAttribute('alt')); // 打开灯箱
            });
        });
        // 为关闭按钮添加点击事件监听器
        lightboxClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox(); // 关闭灯箱
        });
        // 点击遮罩层本身时关闭灯箱
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                closeLightbox();
            }
        });
        // 按 Esc 键关闭灯箱
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxOverlay.classList.contains('visible')) {
                closeLightbox();
            }
        });
    } else {
        console.warn("Lightbox elements not found."); // 如果找不到灯箱元素，发出警告
    }

}); // DOMContentLoaded 事件结束
