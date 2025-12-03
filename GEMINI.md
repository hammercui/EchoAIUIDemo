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
该项目采用了 Feature-based 架构模式，结合了 Zustand 状态管理。

1.  **Features (src/features/)**:
    核心业务逻辑按功能模块划分：
    - `AnswerViewer`: 负责答案的展示、单视图/双视图切换。
    - `PromptLibrary`: 提示词列表、搜索、排序、分页。
    - `TagSystem`: 标签的增删改查与选择。
    - `VersionManager`: 版本时间轴、差异对比逻辑。

2.  **Stores (src/stores/)**:
    使用 Zustand 进行全局状态管理：
    - `useUIStore`: 控制全局 UI 状态（如当前激活的面板、主题模式、Toast）。
    - `usePromptStore`: 管理当前编辑的 Prompt 数据。
    - `usePromptListStore`: 管理 Prompt 列表数据与筛选状态。

3.  **Panels (src/panels/)**:
    UI 的主要容器，通常对应屏幕上的大块区域：
    - `PromptPanel`: 提示词输入与设置。
    - `EditPanel`: 编辑区域。
    - `VersionsPanel`: 版本历史侧边栏。
    - `AnswerPanel`: 结果展示区域。

4.  **UI Components (src/components/)**:
    - `ui/`: shadcn/ui 风格的基础原子组件 (Button, Input, Card 等)。
    - `common/`: 项目特定的通用业务组件 (FABButton, Toast 等)。

#### 验证与最佳实践
当前架构遵循现代 React 开发的最佳实践：
- **关注点分离**: 业务逻辑 (Features) 与 UI 展示 (Components/Panels) 分离。
- **状态管理**: 使用轻量级的 Zustand 替代复杂的 Context 或 Redux，适合中型应用。
- **类型安全**: 全面使用 TypeScript。
- **样式方案**: 结合 Tailwind CSS 的原子类与 shadcn/ui 的组件化设计，兼顾开发效率与可定制性。