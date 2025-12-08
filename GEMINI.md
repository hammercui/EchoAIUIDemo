# GEMINI.md

This file provides guidance to Gemini when working with code in this repository.

目的
- 帮助后续的 Gemini 实例快速在此仓库中定位常用命令、理解工程结构与关键约定，以便更快地执行修改、调试和本地运行任务。

## Project Rules
rules:
  - 你是一个从事编程10多年的资深程序员，精通前端的开发，采用敏捷开发策略，简洁优雅的方式解决问题，从不过度设计
  - 项目运行在Windows平台的Git Bash环境中，优先使用bash命令而不是cmd或powershell命令
  - 在执行命令或脚本前，首先确认当前的操作系统和终端环境
  - 按照如无必要勿增实体原则，不要随便增加内容
  - 按照单一职能原则，代码应该短小整洁
  - 按照mvp最小可实现原则，只实现功能，不要过度设计，不要过早优化

## Frontend Development Guidelines
frontend:
  tech_stack:
    - React 18 - 前端框架
    - TypeScript - 开发语言
    - Tailwind CSS - 样式框架
    - shadcn/ui (Radix UI) - 基础UI组件库
    - HeroUI - 补充UI组件库
    - Vite - 构建工具
    - Framer Motion - 动效库
    - Zustand - 状态管理
    - Lucide React - 图标库
  design_principles:
    - 使用现代、专业的前端设计，避免AI生成的典型特征
    - 禁止使用紫色渐变背景
    - 采用简洁、高级的设计风格
    - 使用柔和的配色方案，如灰白色系、蓝灰色系或中性色调
    - 注重留白和视觉层次
    - 使用微妙的阴影和边框，而非夸张的渐变效果
  ui_components:
    - 优先使用扁平化或新拟态设计风格
    - 按钮和交互元素应简洁明了
    - 图标使用线性或填充风格，保持一致性
    - 字体选择专业、易读的无衬线字体
  animations:
    - 使用Framer Motion实现流畅、高级的动效
    - 动画应微妙而精致，避免过度夸张
    - 优先使用淡入淡出、平滑过渡和弹性动画
    - 页面切换使用优雅的过渡效果
    - 交互反馈使用细腻的hover和点击动效
    - 列表项使用错落有致的进入动画
    - 动画时长控制在0.2-0.6秒之间，保持专业感

## Project Structure

### 核心工程：FAB Demo
位置: `fab-demo/`
这是一个基于 React + TypeScript + Vite 的现代前端应用。

#### 快速命令
注意：所有命令需在 `fab-demo/` 目录下执行。
- 安装依赖: `cd fab-demo && npm install`
- 启动开发: `npm run dev`
- 构建生产: `npm run build`
- 预览构建: `npm run preview`

#### 高层次代码架构（大局观）
该项目采用了 **MVVM + Clean Architecture** 的分层架构模式，结合 Feature-based 模块化组织，并引入了 **Dependency Injection (DI)** 容器管理服务生命周期。

1.  **View Layer (src/view/)**:
    负责 UI 展示与用户交互，不包含复杂业务逻辑。
    -   `pages/`: 页面级容器组件 (App, Panels)。
    -   `features/`: 按业务功能划分的模块 (PromptLibrary, TagSystem 等)，包含其专用的 ViewModel (hooks) 和 Components。
    -   `components/`: 通用组件 (ui/ 基础组件, common/ 业务通用组件)。

2.  **Model Layer (src/model/)**:
    负责业务逻辑、状态管理与实体定义。
    -   `services/`: 核心业务逻辑 (PromptService, SemanticSearchService)，通过 DI 容器管理单例。
    -   `stores/`: 全局状态管理 (Zustand)，处理响应式状态。
    -   `entities/`: 统一的 TypeScript 实体接口定义 (Prompt, Tag, Version)。

3.  **Infra Layer (src/infra/)**:
    负责基础设施与外部数据交互。
    -   `dao/`: 数据访问对象，如 IndexedDB 操作 (SemanticSearchDAO)。
    -   `api/`: (可选) API 客户端封装。

4.  **Common Layer (src/common/)**:
    跨层级的公共模块。
    -   `config/`: 全局配置，如 DI 容器初始化 (di.ts)。
    -   `lib/`: 工具函数与第三方库封装。
    -   `data/`: 模拟数据源。

#### 验证与最佳实践
-   **关注点分离**: 严格遵守 View -> Model -> Infra 的依赖方向。
-   **依赖注入**: 使用 `tsyringe` 管理 Service 和 DAO 的依赖关系，实现解耦。
-   **状态管理**: Zustand 用于 View 层的响应式状态，Service 用于处理复杂的无状态逻辑或持久化操作。
-   **类型安全**: 全面使用 TypeScript，并在 Model 层定义统一的 Entities。

#### 验证与最佳实践
当前架构遵循现代 React 开发的最佳实践：
- **关注点分离**: 业务逻辑 (Features) 与 UI 展示 (Components/Panels) 分离。
- **状态管理**: 使用轻量级的 Zustand 替代复杂的 Context 或 Redux，适合中型应用。
- **类型安全**: 全面使用 TypeScript。
- **样式方案**: 结合 Tailwind CSS 的原子类与 shadcn/ui 的组件化设计，兼顾开发效率与可定制性。