# FAB 面板展开效果 React Demo

一个基于 React + Tailwind CSS 的浮动操作按钮（FAB）交互演示项目，展示了现代化的多层级面板展开效果和流畅的动画交互体验。

## 📖 项目简介

本项目是一个完整的 FAB（Floating Action Button）交互系统实现，灵感来源于现代移动应用的快捷操作设计模式。通过点击屏幕底部的浮动按钮，用户可以快速访问提示词列表，并对每个提示词进行深度管理。

### 核心亮点

- 🎯 **渐进式交互设计**：FAB → 列表面板 → 编辑面板，三层递进式展开
- ⚡ **高性能动画**：所有动画控制在 150-180ms，确保流畅体验
- 🎨 **shadcn/ui 设计系统**：完全遵循现代化设计规范和配色体系
- 📱 **响应式布局**：支持桌面端和移动端，FAB 位置可左右切换
- 🧩 **组件化架构**：10+ 个独立组件，代码结构清晰易维护
- 🎭 **丰富的交互反馈**：悬停效果、选中状态、加载动画等细节打磨

### 适用场景

- AI 对话应用的提示词快捷访问
- 移动端应用的快捷操作入口
- 多层级内容管理界面
- 需要优雅展开/收起动画的场景

## 🎬 在线演示

```bash
# 克隆项目
git clone <repository-url>
cd fab-demo

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:5173` 查看效果

### 演示截图

| 状态 | 说明 |
|------|------|
| 初始状态 | 仅显示 FAB 按钮（右下角） |
| 展开列表 | 点击 FAB 显示 10 个提示词 |
| 悬停卡片 | 显示操作按钮（复制、查看、管理） |
| 编辑面板 | 点击管理按钮展开编辑面板 |
| 位置切换 | FAB 可在左右两侧切换 |

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

## 📂 项目结构

```
fab-demo/
├── src/
│   ├── components/           # 组件目录
│   │   ├── FABButton.jsx    # FAB 浮动按钮组件
│   │   ├── PromptPanel.jsx  # 提示词列表面板
│   │   ├── PromptItem.jsx   # 单个提示词卡片
│   │   ├── ActionButtons.jsx # 操作按钮组（复制、查看、管理）
│   │   ├── EditPanel.jsx    # 编辑管理面板
│   │   ├── TabButton.jsx    # Tab 切换按钮
│   │   ├── TagsTab.jsx      # 标签管理 Tab
│   │   ├── AnswersTab.jsx   # 答案 Tab
│   │   ├── VersionsTab.jsx  # 版本管理 Tab
│   │   └── PositionToggle.jsx # 位置切换按钮
│   ├── data/
│   │   └── mockData.js      # 模拟数据（10 个示例提示词）
│   ├── App.jsx              # 应用主组件
│   ├── main.jsx             # React 入口文件
│   └── index.css            # 全局样式（Tailwind + shadcn/ui）
├── public/                   # 静态资源
├── index.html               # HTML 入口
├── tailwind.config.js       # Tailwind CSS 配置
├── postcss.config.js        # PostCSS 配置
├── vite.config.js           # Vite 构建配置
├── package.json             # 项目依赖和脚本
└── README.md                # 项目文档
```

### 组件说明

| 组件 | 职责 | 特性 |
|------|------|------|
| `FABButton` | FAB 浮动按钮 | 图标旋转动画、位置切换 |
| `PromptPanel` | 提示词列表容器 | 弹出动画、滚动区域 |
| `PromptItem` | 提示词卡片 | 悬停效果、选中状态 |
| `ActionButtons` | 操作按钮组 | 复制、查看答案、管理 |
| `EditPanel` | 编辑面板 | 滑入动画、Tab 切换 |
| `TagsTab` | 标签管理 | 标签增删改 |
| `AnswersTab` | 答案展示 | 答案列表显示 |
| `VersionsTab` | 版本管理 | 版本历史记录 |
| `PositionToggle` | 位置切换 | FAB 左右切换 |

## 🎨 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **React** | 18.x | 前端 UI 框架，组件化开发 |
| **Vite** | 5.x | 现代化构建工具，快速热更新 |
| **Tailwind CSS** | 3.x | 原子化 CSS 框架，快速样式开发 |
| **shadcn/ui** | - | 设计系统规范（CSS 变量 + 配色） |
| **Lucide React** | - | 图标库（Sparkles、X、Copy 等） |
| **PostCSS** | - | CSS 预处理器 |

### 技术选型理由

- **React 18**：成熟的组件化方案，丰富的生态系统
- **Vite**：极速的开发体验，HMR 热更新秒级响应
- **Tailwind CSS**：原子化 CSS，避免样式冲突，开发效率高
- **shadcn/ui**：现代化设计规范，统一的配色和间距系统

## � 技术亮点

### 1. 性能优化

- **CSS Transform 动画**：使用 `transform` 和 `opacity` 实现动画，触发 GPU 加速
- **避免重排重绘**：不使用 `width`、`height`、`left`、`right` 等触发 layout 的属性
- **React.memo 优化**：对不频繁更新的组件使用 memo 避免无效渲染
- **事件委托**：列表项使用事件委托减少事件监听器数量

### 2. 用户体验

- **快速响应**：所有动画 150-180ms，符合人眼感知的流畅阈值
- **视觉反馈**：悬停、点击、选中等状态都有明确的视觉反馈
- **渐进式展开**：FAB → 列表 → 编辑，层层递进不突兀
- **紧密连接**：4px 间距让 FAB 和面板形成视觉整体

### 3. 代码质量

- **组件化设计**：10+ 个独立组件，职责单一易维护
- **CSS 变量系统**：使用 shadcn/ui 变量，支持主题切换
- **类型安全**：可扩展为 TypeScript 项目
- **代码复用**：通用组件（TabButton、ActionButtons）可复用

### 4. 可扩展性

- **数据驱动**：提示词数据独立在 `mockData.js`，易于接入真实 API
- **主题系统**：基于 CSS 变量，可快速切换深色/浅色模式
- **响应式布局**：支持移动端和桌面端，无需额外适配
- **位置灵活**：FAB 可左右切换，适应不同布局需求

## �📝 开发注意事项

### 性能优化

- ✅ 所有动画时长严格控制在 150-200ms（快速响应）
- ✅ 使用 CSS Transform 而非 position 实现动画（GPU 加速）
- ✅ 避免不必要的重渲染，合理使用 React.memo
- ✅ 图标使用 SVG 格式，体积小加载快

### 设计规范

- ✅ FAB 与面板间距固定为 4px（紧密连接感）
- ✅ 严格遵循 shadcn/ui 配色系统（CSS 变量）
- ✅ 圆角统一：12px（面板）、50%（FAB）
- ✅ 阴影层级：sm（卡片）、md（面板）、lg（FAB）

### 兼容性

- ✅ 支持现代浏览器（Chrome 90+、Firefox 88+、Safari 14+）
- ✅ 完全响应式设计，适配移动端和桌面端
- ✅ 支持左/右侧位置动态切换
- ✅ 支持深色模式（通过 shadcn/ui CSS 变量）

## 🔧 常见问题

<details>
<summary><b>如何修改 FAB 的默认位置？</b></summary>

在 `App.jsx` 中修改 `position` 状态的初始值：
```jsx
const [position, setPosition] = useState('right'); // 改为 'left'
```
</details>

<details>
<summary><b>如何自定义提示词数据？</b></summary>

编辑 `src/data/mockData.js` 文件，修改 `prompts` 数组：
```jsx
export const prompts = [
  { id: 1, title: '你的提示词标题', tags: ['标签1', '标签2'] },
  // ...
];
```
</details>

<details>
<summary><b>如何调整动画速度？</b></summary>

在 `tailwind.config.js` 中修改动画时长：
```js
theme: {
  extend: {
    transitionDuration: {
      '150': '150ms', // 修改为你想要的时长
    }
  }
}
```
</details>

## 🚀 部署指南

### Vercel 部署（推荐）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### Netlify 部署

```bash
# 构建
npm run build

# 上传 dist 目录到 Netlify
```

### GitHub Pages 部署

```bash
# 修改 vite.config.js 添加 base
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})

# 构建并部署
npm run build
git subtree push --prefix dist origin gh-pages
```

## 📄 许可证

MIT License - 自由使用和修改

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

**基于文档**: `fab-面板展开效果示意.md`
**设计规范**: shadcn/ui Design System + Tailwind CSS
**实现时间**: 2025年11月3日
**维护状态**: ✅ 活跃维护中