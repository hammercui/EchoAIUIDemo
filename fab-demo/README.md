# FAB Demo

这是一个基于 React 18 + TypeScript + Vite 的现代前端应用，用于展示浮动操作按钮（FAB）交互和多层级面板展开效果。

## 📖 项目简介

本项目实现了一个现代化的浮动操作按钮（FAB）交互系统，旨在提供高效、流畅的用户体验。用户可以通过 FAB 快速访问和管理提示词（Prompt）列表，并对每个提示词进行详细的编辑和版本管理。

### 核心亮点

-   **现代前端技术栈**：采用 React 18、TypeScript 和 Vite 构建，确保高性能和良好的开发体验。
-   **Feature-based 架构**：代码按功能模块划分，如 `AnswerViewer`, `PromptLibrary`, `TagSystem`, `VersionManager`，提高可维护性和可扩展性。
-   **Zustand 状态管理**：使用轻量级状态管理库 Zustand 维护全局应用状态，简洁高效。
-   **shadcn/ui & HeroUI**：结合 shadcn/ui 和 HeroUI 提供高质量的基础 UI 组件和补充组件。
-   **Tailwind CSS**：原子化 CSS 框架，实现快速、灵活的样式开发。
-   **Framer Motion 动画**：通过 Framer Motion 实现流畅、精致的页面过渡和交互动效。
-   **类型安全**：全面使用 TypeScript，提升代码质量和开发效率。

## 🚀 快速开始

请确保您已进入 `fab-demo/` 目录执行以下命令。

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览构建版本

```bash
npm run preview
```

## 📂 项目结构

本项目采用了 Feature-based 架构模式，结合了 Zustand 状态管理。

```
fab-demo/
├── public/                 # 静态资源
├── src/
│   ├── main.tsx            # React 入口文件
│   ├── common/             # 公共模块
│   │   ├── config/         # 配置文件 (DI 容器初始化)
│   │   ├── data/           # 模拟数据
│   │   └── lib/            # 通用工具函数
│   ├── infra/              # 基础设施层
│   │   └── dao/            # 数据访问对象 (IndexedDB 等)
│   ├── model/              # 模型层 (业务逻辑与状态)
│   │   ├── entities/       # 实体类型定义
│   │   ├── services/       # 业务服务 (SemanticSearch, PromptService 等)
│   │   └── stores/         # Zustand 全局状态 Store
│   └── view/               # 视图层 (UI 展示)
│       ├── assets/         # 静态资源 (Styles, Images)
│       ├── components/     # 通用组件
│       │   ├── common/     # 项目特定的通用业务组件
│       │   ├── providers/  # React Context Providers
│       │   └── ui/         # shadcn/ui 风格的基础原子组件
│       ├── features/       # 核心业务功能模块
│       │   ├── AnswerViewer/   # 答案展示与对比
│       │   ├── PromptLibrary/  # 提示词列表管理
│       │   ├── TagSystem/      # 标签系统
│       │   └── VersionManager/ # 版本管理
│       └── pages/          # 主要页面/面板容器 (App, Panels)
├── index.html              # HTML 入口
├── package.json            # 项目依赖和脚本
├── tailwind.config.js      # Tailwind CSS 配置
├── postcss.config.js       # PostCSS 配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 构建配置
└── README.md
```

## 🎨 技术栈

| 技术            | 用途                       |
| :-------------- | :------------------------- |
| **React 18**    | 前端框架                   |
| **TypeScript**  | 开发语言，提供类型安全     |
| **Tailwind CSS**| 样式框架                   |
| **shadcn/ui**   | 基础 UI 组件库 (基于 Radix UI) |
| **HeroUI**      | 补充 UI 组件库             |
| **Vite**        | 构建工具                   |
| **Framer Motion**| 动效库                     |
| **Zustand**     | 状态管理                   |
| **Lucide React**| 图标库                     |

## ✨ 设计原则与 UI/UX

本项目遵循现代、简洁、高级的设计风格，注重用户体验。

### 设计原则

-   **现代设计**：采用简洁、高级的设计风格，避免AI生成的典型特征。
-   **配色方案**：使用柔和的配色方案，如灰白色系、蓝灰色系或中性色调。
-   **视觉层次**：注重留白和视觉层次，通过微妙的阴影和边框而非夸张的渐变效果来区分元素。

### UI 组件

-   **风格统一**：优先使用扁平化或新拟态设计风格。
-   **交互元素**：按钮和交互元素简洁明了。
-   **图标**：使用线性或填充风格的 Lucide React 图标，保持一致性。
-   **字体**：选择专业、易读的无衬线字体。

### 动画效果 (Framer Motion)

-   **流畅与精致**：使用 Framer Motion 实现流畅、高级的动效，动画应微妙而精致，避免过度夸张。
-   **常用动效**：优先使用淡入淡出、平滑过渡和弹性动画。
-   **页面切换**：优雅的页面切换过渡效果。
-   **交互反馈**：细腻的 hover 和点击动效。
-   **列表项动画**：列表项使用错落有致的进入动画。
-   **动画时长**：动画时长控制在 0.2-0.6 秒之间，保持专业感。

## 📄 许可证

MIT License - 自由使用和修改

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request
