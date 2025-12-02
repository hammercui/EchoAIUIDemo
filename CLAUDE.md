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
    - React - 前端框架
    - Tailwind CSS - 样式框架
    - shadcn/ui - UI组件库 
    - Vite - 构建工具
    - Framer Motion - 动效库
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
快速命令（按子工程）
- FAB 演示（TS, Vite）
  - 位置: [fab-demo](fab-demo/)
  - 安装依赖: cd fab-demo && npm install
  - 启动开发: npm run dev
  - 构建生产: npm run build
  - 预览构建: npm run preview
  - 查看脚本: [fab-demo/package.json:5-9](fab-demo/package.json#L5-L9)

- Version Timeline 演示（TS, Vite + tsc）
  - 位置: [version-demo](version-demo/)
  - 安装依赖: cd version-demo && npm install
  - 启动开发: npm run dev
  - 构建生产（包含 TypeScript 编译）: npm run build
  - 预览构建: npm run preview
  - 使用文档: [version-demo/USAGE.md](version-demo/USAGE.md)
  - 查看脚本: [version-demo/package.json:6-9](version-demo/package.json#L6-L9)

注意：仓库根目录没有统一的 package.json 来管理多个子包。请在执行 npm 脚本前切换到对应子工程目录。

高层次代码架构（大局观）
- 这是一个包含多个独立前端示例的仓库，主要两个子工程：
  1. fab-demo/ —— React + TypeScript + Vite + Tailwind CSS 的演示（以组件化实现 FAB 与面板交互）。关键文件和目录：
     - src/components/：UI 组件（FABButton、ActionButtons 等）
     - src/panels/：主要功能面板（PromptPanel, EditPanel, VersionsPanel 等）
     - src/main.tsx, src/FABDemo.tsx：入口与根组件
     - tailwind.config.js, postcss.config.js, vite.config.ts：构建与样式配置
     - mock 数据：src/data/mockData.ts
     - 包脚本定义见 [fab-demo/package.json:5-9](fab-demo/package.json#L5-L9)
     - 设计与行为约定（在 [fab-demo/README.md](fab-demo/README.md) 中）：动画时长 150-180ms、面板宽度与间距、shadcn/ui 变量系统等。

  2. version-demo/ —— React + TypeScript + Vite 的演示（版本时间线）。关键文件和目录：
     - src/components/：TypeScript 组件（VersionCard、TimelineNode 等）
     - src/main.tsx, src/App.tsx：入口与根组件
     - types/ 与 lib/：类型定义与工具函数
     - 包脚本定义见 [version-demo/package.json:6-9](version-demo/package.json#L6-L9)
     - 使用说明见 [version-demo/USAGE.md](version-demo/USAGE.md)

- 共同约定/设计系统
  - 两个子工程都使用 Vite 与 Tailwind CSS，为快速运行优先使用各自的 dev 脚本。
  - UI 设计遵循仓库文档中提到的 shadcn/ui 变量系统、统一动画时长/间距等约定（详见各自 README）。
