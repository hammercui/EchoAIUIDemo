# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

目的
- 帮助后续的 Claude Code 实例快速在此仓库中定位常用命令、理解工程结构与关键约定，以便更快地执行修改、调试和本地运行任务。

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
    - React Markdown - Markdown渲染
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
目前项目主要包含一个核心前端工程：`fab-demo`。这是一个基于 React + TypeScript + Vite 的现代前端应用，采用 Feature-based 架构，重点展示 FAB (Floating Action Button) 与复杂面板的交互逻辑。

#### 快速命令
- **位置**: `cd fab-demo` (所有 npm 命令需在此目录下执行)
- **安装依赖**: `npm install`
- **启动开发**: `npm run dev`
- **构建生产**: `npm run build` (包含 TypeScript 编译)
- **预览构建**: `npm run preview`

#### 代码架构与关键路径
- **入口文件**:
  - `src/main.tsx`: 应用入口，包含 DI 容器初始化
- **目录结构**:
  - `src/view/`: **[视图层]** UI 展示与交互
    - `pages/`: 页面级容器 (App.tsx, PromptPanel.tsx 等)
    - `features/`: 按业务功能划分的模块 (PromptLibrary, TagSystem 等)，包含 Components 和 ViewModel (hooks)
    - `components/`: 通用组件 (ui/ 基础组件, common/ 业务通用组件)
  - `src/model/`: **[模型层]** 业务逻辑与状态
    - `services/`: 业务服务类 (SemanticSearchService, PromptService)，通过 DI 管理
    - `stores/`: Zustand 全局状态 Store
    - `entities/`: 实体类型定义
  - `src/infra/`: **[基础设施层]** 数据访问与外部接口
    - `dao/`: 数据访问对象 (SemanticSearchDAO)
  - `src/common/`: **[公共层]**
    - `config/`: 全局配置 (di.ts)
    - `lib/`: 工具函数

#### 约定与规范
- **架构模式**: MVVM + Clean Architecture。View 层通过 ViewModel (Hooks) 与 Model 层交互。
- **依赖注入**: 使用 `tsyringe` 管理 Service 和 DAO 的生命周期。
- **状态管理**: 优先使用 Zustand 处理跨组件状态。
- **文件命名**: 组件文件 PascalCase，Hook/Service/工具文件 camelCase。
