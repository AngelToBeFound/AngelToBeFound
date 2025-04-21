# MaxCaulfield 的个人网站 (MaxCaulfield's Personal Website)

欢迎来到 MaxCaulfield 的个人网站源代码仓库！这个项目包含了我的个人主页和博客页面。

(Welcome to the source code repository for MaxCaulfield's personal website! This project includes my personal homepage and blog pages.)

## ✨ 功能 (Features)

* **响应式设计 (Responsive Design):** 适应不同屏幕尺寸 (桌面、平板、手机)。 (Adapts to different screen sizes: desktop, tablet, mobile.)
* **单页主页 (Single-Page Homepage):** 包含主页、关于我、照片展览、联系我等部分。 (Includes Home, About, Photo Gallery, Contact sections.)
* **独立博客页面 (Separate Blog Page):** 包含博客文章列表和文章详情页。 (Includes a blog post list and detail pages.)
* **动态背景 (Dynamic Background):** 使用 tsParticles 实现动态粒子和渐变背景效果。 (Uses tsParticles for dynamic particle and gradient background effects.)
* **交互动画 (Interactive Animations):** 包含滚动显现、打字机、悬停效果等。 (Includes scroll reveal, typewriter, hover effects, etc.)
* **照片灯箱 (Photo Lightbox):** 照片展览区域支持点击放大图片。 (Supports clicking to enlarge images in the photo gallery.)
* **多语言支持 (Multi-language Support):** 支持简体中文、繁體中文、English 切换。 (Supports switching between Simplified Chinese, Traditional Chinese, and English.)
* **主题切换 (Theme Switching):** 博客相关页面支持浅色/深色模式切换。 (Blog-related pages support light/dark mode switching.)

## 🚀 技术栈 (Tech Stack)

* **HTML5**
* **CSS3:**
    * 自定义 CSS (`index.css`, 博客页面内联样式) (Custom CSS)
    * Tailwind CSS (via CDN) - 用于快速构建 UI (Used for rapid UI development)
* **JavaScript (ES6+):**
    * 原生 JavaScript (`script.js`) - 处理交互、动画、语言切换、图片加载等 (Handles interactions, animations, language switching, image loading, etc.)
    * tsParticles (via CDN) - 用于粒子背景 (For particle background)
* **字体与图标 (Fonts & Icons):**
    * Google Fonts (Inter)
    * Font Awesome (via CDN) - 用于图标 (For icons)

## 本地运行 (Running Locally)

由于浏览器对直接打开本地文件 (`file:///` 协议) 的限制（可能导致图片等资源加载失败），**强烈建议使用本地 Web 服务器**来预览本项目。

(Due to browser restrictions on directly opening local files (using the `file:///` protocol), which can cause issues like images failing to load, **it is highly recommended to use a local web server** to preview this project.)

1.  **克隆仓库 (Clone the repository):**
    ```bash
    git clone [https://github.com/AngelToBeFound/AngelToBeFound.git](https://github.com/AngelToBeFound/AngelToBeFound.git)
    cd AngelToBeFound
    ```

2.  **启动本地服务器 (Start a local server):**

    * **方法一：使用 VS Code 和 Live Server 插件 (Method 1: Using VS Code & Live Server Extension):**
        * 在 VS Code 中打开项目文件夹。 (Open the project folder in VS Code.)
        * 安装 "Live Server" 插件。 (Install the "Live Server" extension.)
        * 在 `index.html` 文件上右键，选择 "Open with Live Server"。 (Right-click on `index.html` and select "Open with Live Server".)
        * 浏览器会自动打开 `http://127.0.0.1:xxxx` 地址。 (Your browser will automatically open at an address like `http://127.0.0.1:xxxx`.)

    * **方法二：使用 Python (Method 2: Using Python):**
        * 确保你安装了 Python。 (Make sure you have Python installed.)
        * 在项目根目录下打开终端或命令行。 (Open a terminal or command prompt in the project's root directory.)
        * 运行以下命令 (Run the following command):
            ```bash
            # Python 3
            python -m http.server
            # Python 2 (如果 Python 3 不可用) (if Python 3 is not available)
            # python -m SimpleHTTPServer
            ```
        * 在浏览器中访问 `http://localhost:8000` (或 Python 2 对应的端口)。 (Open `http://localhost:8000` (or the corresponding port for Python 2) in your browser.)

    * **方法三：使用 Node.js (Method 3: Using Node.js):**
        * 确保你安装了 Node.js 和 npm。 (Make sure you have Node.js and npm installed.)
        * 在项目根目录下打开终端或命令行。 (Open a terminal or command prompt in the project's root directory.)
        * 安装一个简单的服务器包 (Install a simple server package):
            ```bash
            npm install -g serve
            ```
        * 启动服务器 (Start the server):
            ```bash
            serve .
            ```
        * 在浏览器中访问 `http://localhost:3000` (或 `serve` 提示的其他端口)。 (Open `http://localhost:3000` (or the port indicated by `serve`) in your browser.)

3.  **直接打开 (Directly Opening - 不推荐 / Not Recommended):**
    * 你可以尝试直接在浏览器中打开 `index.html` 文件。 (You can try opening `index.html` directly in your browser.)
    * **警告:** 这可能会遇到资源加载问题（如此前遇到的图片加载失败）。 ( **Warning:** This might lead to resource loading issues, like the image loading failures previously encountered.)

## 📂 文件结构 (File Structure)

├── index.html          # 网站主页 (Main homepage)
├── blog.html           # 博客列表页 (Blog list page)
├── post-why-website.html # 示例博客文章页 (Example blog post page)
├── index.css           # 主页的自定义样式 (Custom styles for homepage)
├── script.js           # 主页的 JavaScript 代码 (JavaScript for homepage)
├── images/             # 存放图片资源 (Contains image assets)
│   ├── avatar.jpg      # 头像 (Avatar)
│   ├── photo1.jpg      # 照片展览图片 (Gallery photos)
│   └── ...             # 其他图片 (Other images)
└── README.md           # 项目说明文件 (This file)
## 📄 许可证 (License)

本项目采用 [MIT](LICENSE) 许可证。 (This project is licensed under the MIT License.)

*(如果你还没有 LICENSE 文件，可以考虑添加一个。MIT 是一个常用的宽松许可证。)* *(If you don't have a LICENSE file yet, consider adding one. MIT is a common permissive license.)*
