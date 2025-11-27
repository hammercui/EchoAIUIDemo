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


快速命令（按子工程）
- FAB 演示（JS, Vite）
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
  1. fab-demo/ —— React + Vite + Tailwind CSS 的 JS 演示（以组件化实现 FAB 与面板交互）。关键文件和目录：
     - src/components/：UI 组件（FABButton、PromptPanel、EditPanel 等）
     - src/main.jsx, src/App.jsx：入口与根组件
     - tailwind.config.js, postcss.config.js, vite.config.js：构建与样式配置
     - mock 数据：src/data/mockData.js
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

对 Claude Code 的具体建议（工作流程）
- 初始动作：先读取目标子工程的 README（例如 [fab-demo/README.md](fab-demo/README.md) 或 [version-demo/USAGE.md](version-demo/USAGE.md)），再打开对应的 package.json 以确认可用脚本。
- 启动任务：对于本地调试，cd 到子工程后运行 npm install && npm run dev（避免在仓库根目录直接运行）。
- 变更和提交：优先在子工程内编辑现有文件，不要创建新顶层包结构，遵循 README 中的设计/样式约定（动画时长、Tailwind 优先）。
- 如果需要运行搜索或查找代码位置，优先使用代码库搜索工具（例如 Grep/Glob），不要盲目在多个目录随机修改。

已检查的策略文件
- 没有发现 .cursor/ 或专门的 Copilot 指令文件（如 .github/copilot-instructions.md）在仓库根目录下。仓库文档会引用 .github/UIAgentRules.md（见 [version-demo/USAGE.md](version-demo/USAGE.md) 的引用），如需遵循项目的 UI 规则，请参照那个文件（若存在于 .github/ 中）。

其它要点（来自 README 提取的重要信息）
- 部署：常见部署方式在 README 中列出（Vercel/Netlify/GitHub Pages），构建产物由 vite 输出（dist）。
- 许可：MIT

文件位置速查
- [README.md](README.md)
- [fab-demo/README.md](fab-demo/README.md)
- [fab-demo/package.json:5-9](fab-demo/package.json#L5-L9)
- [version-demo/USAGE.md](version-demo/USAGE.md)
- [version-demo/package.json:6-9](version-demo/package.json#L6-L9)

最后说明
- 如果需要我现在将 CLAUDE.md 提交为 commit（生成 commit 和 PR），请明确授权。我已经将该文件写入仓库根目录： CLAUDE.md。
- UIAgentRules.md 这是所有ui设计要遵守的原则，请记录到CLAUDE.md中