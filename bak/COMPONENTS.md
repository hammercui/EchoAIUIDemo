# FAB Demo - 组件结构说明

## 📁 项目结构

```
fab-demo/
├── components/              # 组件目录
│   ├── FABButton.jsx       # FAB 浮动按钮
│   ├── ActionButtons.jsx   # 操作按钮 (复制/查看/管理)
│   ├── PromptItem.jsx      # 提示词卡片
│   ├── PromptList.jsx      # 提示词列表
│   ├── EditPanel.jsx       # 编辑管理面板
│   └── panels/             # 子面板目录
│       ├── TagsPanel.jsx   # 标签管理面板
│       ├── AnswerPanel.jsx # 答案查看面板
│       └── VersionsPanel.jsx # 版本管理面板
├── data/
│   └── mockData.js         # 模拟数据
├── FABDemo.jsx             # 主组件
├── main.jsx                # 入口文件
├── styles.css              # 全局样式 (shadcn/ui CSS 变量)
└── package.json
```

## 🎨 设计规范 (严格遵守 shadcn/ui)

### 1. FAB 按钮
- ✅ **尺寸**: 40x40px
- ✅ **位置**: 左下角/右下角 (距边缘 24px)
- ✅ **配色**: `bg-primary` (紫色 #7c3aed)
- ✅ **状态切换**: 180ms rotation 动画
- ✅ **图标**: 关闭时 ✨, 打开时 ✕

### 2. 面板定位
- ✅ **FAB 与面板间距**: 4px (紧密连接)
- ✅ **弹出动画**: scale 0.95 → 1.0 (180ms)
- ✅ **transform-origin**: left bottom / right bottom

### 3. 提示词列表
- ✅ **面板尺寸**: 400px × 500px
- ✅ **卡片背景**: `bg-muted`
- ✅ **卡片边框**: `border-border`
- ✅ **卡片圆角**: `rounded-xl` (12px)
- ✅ **悬停效果**: `scale-[1.02]` + `shadow-md` (150ms)
- ✅ **选中状态**: 紫色边框 + 浅紫背景

### 4. Action Buttons
- ✅ **排列方式**: 竖向排列 (`flex-col`)
- ✅ **按钮尺寸**: 32×32px
- ✅ **样式**: Ghost 风格 (hover 显示背景)
- ✅ **显示动画**: 150ms fade-in

### 5. 编辑面板
- ✅ **面板尺寸**: 400px × 500px
- ✅ **滑入动画**: 150ms slide-in (从右侧)
- ✅ **双面板总宽度**: 800px (400px + 4px + 400px)

## 🎬 交互流程

### 流程 1: 打开面板
1. 点击 FAB 按钮
2. FAB 图标旋转变为 ✕ (180ms)
3. 提示词列表从 FAB 右侧弹出 (scale + fade-in, 180ms)
4. FAB 与列表间距 4px

### 流程 2: 悬停 Item
1. 鼠标悬停在提示词卡片上
2. 卡片放大 (`scale-[1.02]`)
3. Action buttons 从右侧淡入 (竖向排列)

### 流程 3: 打开编辑面板
1. 点击"查看答案"或"管理"按钮
2. 提示词 item 显示选中状态 (紫色边框)
3. 编辑面板从右侧滑入 (150ms)
4. 面板总宽度扩展为 800px

### 流程 4: 关闭编辑面板
1. 点击编辑面板的 ✕ 按钮
2. 编辑面板向右滑出 (150ms)
3. 选中状态取消
4. 面板宽度恢复为 400px

### 流程 5: 关闭整个面板
1. 点击 FAB 按钮 (此时显示 ✕ 图标)
2. FAB 图标旋转变回 ✨ (180ms)
3. 面板缩放 + 淡出 (scale + fade-out, 180ms)

## 🚀 运行项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📝 组件说明

### FABButton.jsx
- FAB 浮动按钮组件
- 支持左侧/右侧位置切换
- 180ms 图标旋转动画

### ActionButtons.jsx
- 操作按钮组件 (竖向排列)
- 复制、查看答案、管理 3 个按钮
- Ghost 风格 + 150ms 淡入动画

### PromptItem.jsx
- 提示词卡片组件
- 3 行文本结构 (标题/描述/标签+时间)
- 悬停效果 + 选中状态

### PromptList.jsx
- 提示词列表容器
- 垂直滚动
- 自定义滚动条样式

### EditPanel.jsx
- 编辑管理面板
- Tab 导航 (标签/答案/版本)
- 关闭按钮

### TagsPanel.jsx / AnswerPanel.jsx / VersionsPanel.jsx
- 编辑面板的 3 个子页面
- 标签管理、答案查看、版本管理

## ⚠️ 严格禁止

- ❌ 纯黑 `#000` / 纯白 `#fff`
- ❌ 硬编码颜色值
- ❌ 大块紫色背景
- ❌ 玻璃拟态效果
- ❌ 动画超过 300ms
- ❌ 不一致的间距

## 🎨 配色方案 (shadcn/ui)

```css
/* 主色系 */
--primary: 262.1 83.3% 57.8%;           /* 紫色 */
--primary-foreground: 210 20% 98%;     /* 白色 */

/* 背景色系 */
--background: 0 0% 100%;                /* 白色 */
--foreground: 222.2 84% 4.9%;          /* 深灰 */

/* 次要色系 */
--muted: 210 40% 96.1%;                 /* 浅灰背景 */
--muted-foreground: 215.4 16.3% 46.9%; /* 次要文字 */

/* 边框 */
--border: 214.3 31.8% 91.4%;           /* 边框灰 */

/* 强调色 */
--accent: 210 40% 96.1%;                /* 强调背景 */
--accent-foreground: 222.2 47.4% 11.2%; /* 强调文字 */
```

## 📖 参考文档

- [shadcn/ui 官方文档](https://ui.shadcn.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- `fab-优化设计方案-v2.md` - 完整设计规范
- `fab-面板展开效果示意.md` - 交互流程示意图
