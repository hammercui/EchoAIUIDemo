# FAB 面板展开效果 React Demo

基于 `fab-面板展开效果示意.md` 文档实现的 React 演示项目。

## ✨ 功能特性

1. **FAB 按钮**
   - 40x40px 圆形按钮
   - 支持左/右侧切换
   - 图标旋转动画（✨ ↔ ✕）
   - 固定在屏幕底部（距底部 24px）

2. **提示词列表面板**
   - 400px 宽度
   - 显示 10 个示例提示词
   - 悬停显示操作按钮（复制、查看答案、管理）
   - 支持选中高亮

3. **编辑管理面板**
   - 400px 宽度
   - 从右侧滑入动画
   - 3 个 Tab：标签管理、答案、版本管理
   - 独立关闭按钮

4. **动画效果**
   - FAB 图标旋转：180ms
   - 面板弹出：180ms scale + opacity
   - 编辑面板滑入：150ms slide-in
   - 按钮悬停：150ms transform + shadow

5. **响应式布局**
   - 支持移动端和桌面端
   - FAB 位置自适应（左/右侧切换）
   - 面板宽度自适应

## 🚀 快速开始

### 1. 安装依赖

```bash
cd fab-demo
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

浏览器会自动打开 `http://localhost:3000`

### 3. 构建生产版本

```bash
npm run build
```

## 📐 设计规范

- **FAB 尺寸**：40x40px
- **FAB 与面板间距**：4px（紧密连接）
- **面板宽度**：400px（列表）+ 400px（编辑）
- **动画时长**：150-180ms
- **圆角**：12px（面板）、50%（FAB）
- **配色**：严格遵循 shadcn/ui CSS 变量系统

## 🎯 交互说明

1. **点击 FAB** → 显示/隐藏提示词列表
2. **悬停提示词卡片** → 显示操作按钮（复制、查看答案、管理）
3. **点击"管理"按钮** → 展开编辑面板
4. **点击编辑面板的 X** → 关闭编辑面板
5. **点击"切换位置"按钮** → 切换 FAB 左/右侧位置

## 📂 文件结构

```
fab-demo/
├── index.html          # 入口 HTML
├── main.jsx           # React 入口
├── FABDemo.jsx        # 主组件
├── styles.css         # 全局样式（Tailwind CSS + shadcn/ui 变量）
├── tailwind.config.js # Tailwind CSS 配置
├── postcss.config.js  # PostCSS 配置
├── package.json       # 项目配置
├── vite.config.js     # Vite 配置
└── README.md          # 说明文档
```

## 🎨 技术栈

- **React 18** - UI 框架
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **shadcn/ui** - 设计系统（使用 CSS 变量）

## 📝 注意事项

- 所有动画时长严格控制在 150-200ms（快速响应）
- FAB 与面板间距固定为 4px（紧密连接感）
- 严格遵循 shadcn/ui 配色系统
- 支持左/右侧位置动态切换
- 完全响应式设计

---

**基于文档**: `fab-面板展开效果示意.md`  
**设计规范**: shadcn/ui Design System + Tailwind CSS  
**实现时间**: 2025年11月3日