# FAB 浮动按钮优化设计方案（遵循 shadcn/ui 规范）

## 📋 需求概述

基于 shadcn/ui  + tailwindcss 设计规范，优化 FAB 浮动按钮和悬浮面板的交互体验。

---

## 🎯 核心需求

### 1. FAB 视觉优化与固定位置（遵循 shadcn/ui 规范）
- ✅ **固定位置**：左下角固定（距离左边缘 24px，距离底部 24px）
- ✅ **尺寸规范**：40x40px（遵循图标容器标准尺寸）
- ✅ **配色方案**：
  - 背景：强调色 - 紫色渐变：`linear-gradient(135deg, hsl(262, 83%, 58%), hsl(262, 83%, 48%))`
  - 图标：`text-white`（白色）
  - hover 状态：`hover:bg-violet-700`
- ✅ **视觉效果**：
  - 圆角：`rounded-full`（完全圆角）
  - 阴影：`shadow-lg`（微妙阴影）
  - hover 状态：`hover:opacity-90`
  - active 状态：`active:scale-[0.98]`
- ✅ **状态切换**：
  - 关闭状态：显示主图标（如 ✨ 或列表图标）
  - 打开状态：切换为 ✕ 关闭图标
  - 切换动画：180ms rotation + fade

### 2. 弹出面板智能定位（紧凑型布局）
- ✅ **从 FAB 弹出**：面板从 FAB 位置向右上方展开
- ✅ **定位逻辑**：
  - 水平：FAB 右侧仅 **4px** 处（紧密连接）
  - 垂直：面板底部与 FAB 底部对齐
- ✅ **弹出动画**：
  - 从 FAB 中心缩放 + 淡入（scale 0.95 → 1.0）
  - 时长：150-200ms（快速响应）
  - 缓动：`ease-out`

### 3. 第一段：提示词列表（10 个 Item）
- ✅ **卡片设计**（遵循 shadcn/ui 规范）：
  - 背景：`bg-muted`（次要背景色）
  - 边框：`border border-border`（统一边框色）
  - 圆角：`rounded-xl`（12px，遵循卡片标准）
  - 阴影：`shadow-sm`（微妙阴影）
  - 内边距：`p-4`（16px）
- ✅ **文本层级**（3 行结构）：
  - 第 1 行：标题 - `text-base font-semibold text-foreground`
  - 第 2 行：描述 - `text-sm text-muted-foreground`
  - 第 3 行：标签/时间 - `text-xs text-muted-foreground`
- ✅ **悬停效果**（必备微交互）：
  - 缩放：`hover:scale-[1.02]`
  - 阴影增强：`hover:shadow-md`
  - 过渡：`transition-all duration-150`
- ✅ **Action Buttons**：
  - 位置：item 右侧竖向排列
  - 3 个按钮：复制、查看答案、管理
  - 样式：Ghost 按钮（纯图标，无背景）
  - 动画：`opacity-0 → opacity-100`（150ms fade-in）

### 4. 第二段：编辑管理页
- ✅ **触发方式**：点击"管理"按钮
- ✅ **动画效果**：从右侧滑入（150ms）
- ✅ **关闭按钮**：明确的关闭按钮（X 图标）
- ✅ **编辑页面字段**：
  - 提示词标题
  - 提示词内容
  - 标签/分类
  - 创建时间/修改时间
  - 保存/删除按钮

---

## 🎨 设计细节

### 面板定位逻辑
**确定方案**（遵循 shadcn/ui 紧凑型布局）：
- FAB 固定在左下角（24px, 24px）
- 面板始终从 FAB 右侧弹出
- 水平位置：FAB 右边缘 + **4px**（紧密连接）
- 垂直位置：面板底部与 FAB 底部对齐

**参数**：
1. FAB 到面板距离：**4px**（紧凑型）
2. 面板宽度：400px
3. 面板最大高度：500px（约 5-6 个 item）
4. FAB 状态切换：面板打开时显示 ✕ 图标

### 提示词列表布局
- 垂直滚动列表
- 每个 item 固定高度（3 行限制）
- 10 个 item 可能需要滚动
- 列表高度限制：500px
- 自定义滚动条样式（shadcn/ui 风格）
- item 间距：12px（`gap-3`）

### Action Buttons 显示方式
**确定方案**：
- 右侧竖向排列
- Ghost 风格（纯图标，hover 显示背景）
- 按钮尺寸：32x32px
- 淡入动画：150ms

### 卡片设计风格（遵循 shadcn/ui 规范）
**确定方案**：
1. 卡片类型：简洁卡片，无"尾巴"（符合现代设计）
2. 3 行文本结构：
   - 第 1 行：标题（`text-base font-semibold text-foreground`）
   - 第 2 行：描述（`text-sm text-muted-foreground`）
   - 第 3 行：标签 + 时间（`text-xs text-muted-foreground`）
3. 配色方案：
   - 基础卡片：`bg-muted border-border`
   - 强调卡片（可选）：`bg-violet-50 border-violet-200`（仅小面积点缀）
4. 禁止使用：
   - ❌ 纯黑/纯白硬编码
   - ❌ 大块紫色背景
   - ❌ 玻璃拟态效果

### 提示词示例数据
**10 个提示词示例**：
1. 代码生成 - React 组件
2. 代码重构 - 优化函数
3. Bug 修复 - 错误排查
4. 性能优化 - 渲染优化
5. 测试用例 - 单元测试
6. 文档生成 - API 文档
7. API 设计 - REST接口
8. 数据库查询 - SQL优化
9. UI 组件 - 表单设计
10. 算法实现 - 排序算法

**每个 item 示例**：
```
标题：代码生成 - React 组件
描述：根据需求生成符合最佳实践的 React 函数组件
标签：前端 · 组件  |  2 天前
```

---

## 🎬 交互流程

### 流程 1：打开面板
1. 点击 FAB 按钮（位于左下角）
2. FAB 图标旋转切换为 ✕（180ms rotation）
3. 面板从 FAB 右侧弹出（缩放 + 淡入动画，180ms）
4. 面板底部与 FAB 底部对齐，距离 FAB 仅 **4px**
5. 显示提示词列表（第一段）

### 流程 2：关闭面板
1. 点击 FAB（此时显示 ✕ 图标）
2. FAB 图标旋转切换回主图标（180ms rotation）
3. 面板缩放 + 淡出（150ms）
4. 返回初始状态

### 流程 3：查看提示词
1. 鼠标悬停在 item 上
2. item 放大（`scale-[1.02]`）+ 阴影增强（`shadow-md`）
3. Action buttons 从右侧淡入（`opacity-0 → opacity-100`，150ms）
4. 鼠标移出，buttons 淡出

### 流程 4：操作按钮
- **复制**：复制提示词内容，显示 Toast "已复制"（使用 shadcn/ui Toast 组件）
- **查看/管理**：切换到编辑页面（第二段），查看和管理都显示编辑页面

### 流程 5：编辑管理
1. 点击"查看答案"或"管理"按钮
2. 第一段保持显示（不滑出）
3. 被点击的提示词 item 显示选中状态（高亮边框或背景色变化）
4. 第二段从右侧滑入（150ms slide-in 动画）
5. 面板总宽度扩展为：400px（第一段）+ 400px（第二段）= 800px
6. 第二段显示对应内容：
   - 点击"查看答案"：显示答案内容（只读模式）
   - 点击"管理"：显示编辑表单（使用 shadcn/ui Form 组件）
7. 第二段包含关闭按钮（X 图标）
8. 点击关闭按钮：
   - 第二段向右滑出（150ms slide-out 动画）
   - 第一段的选中状态取消
   - 面板宽度恢复为 400px

---

- 双面板展开动画实现
- Toast 通知集成
- 完整项目结构示例
- 性能优化与可访问性建议

## 📐 视觉布局示意

```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│                                         │
│                   ┌─────────────────────┤
│                   │ 提示词面板          │
│                   │ ┌─────────────────┐ │
│                   │ │ Item 1  📋👁️⚙️ │ │
│                   │ └─────────────────┘ │
│                   │ ┌─────────────────┐ │
│                   │ │ Item 2  📋👁️⚙️ │ │
│                   │ └─────────────────┘ │
│  ┌──┐4px          │      ...            │
│  │✕│←────────────┤ ┌─────────────────┐ │
│  └──┘ FAB(40x40) │ │ Item 10 📋👁️⚙️ │ │
│  24px            │ └─────────────────┘ │
└──┴─────────────┴─────────────────────┘
   24px           ↑ 底部对齐

配色说明（遵循 shadcn/ui）：
- FAB：bg-primary (slate-900) + text-primary-foreground (white)
- 面板：bg-background + border-border
- 卡片：bg-muted + border-border + shadow-sm
- 文字：text-foreground (主) / text-muted-foreground (次)
```

### FAB 状态切换示意

```
关闭状态：         打开状态：
┌────────┐        ┌────────┐
│   ✨   │   →    │   ✕    │
│ (主图标) │        │ (关闭)  │
└────────┘        └────────┘

动画：180ms rotation + opacity fade
```

---

## 🎯 设计规范总结（严格遵守）

### FAB 设计
- ✅ **固定位置**：左下角（24px x 24px）
- ✅ **尺寸**：40x40px（图标容器标准尺寸）
- ✅ **配色**：`bg-primary text-primary-foreground`
- ✅ **圆角**：`rounded-full`
- ✅ **阴影**：`shadow-lg`
- ✅ **状态切换**：180ms rotation + opacity fade
- ✅ **微交互**：`hover:opacity-90` + `active:scale-[0.98]`

### 面板定位与动画
- ✅ **弹出位置**：FAB 右侧 **+4px**（紧密连接）
- ✅ **垂直对齐**：底部对齐
- ✅ **弹出动画**：scale 0.95 → 1.0，180ms
- ✅ **transform-origin**：`left bottom`
- ✅ **宽度**：400px
- ✅ **最大高度**：500px

### 提示词卡片
- ✅ **背景**：`bg-muted`
- ✅ **边框**：`border border-border`
- ✅ **圆角**：`rounded-xl`（12px）
- ✅ **悬停**：`hover:scale-[1.02]` + `hover:shadow-md`
- ✅ **动画时长**：150ms
- ✅ **Action buttons**：Ghost 风格，32x32px

### 严格禁止
- ❌ 纯黑 `#000` / 纯白 `#fff`
- ❌ 硬编码颜色值
- ❌ 大块紫色背景
- ❌ 玻璃拟态效果
- ❌ 动画超过 300ms
- ❌ 不一致的间距

---

## 🚀 下一步

已确定所有核心设计参数（遵循 shadcn/ui 规范），可直接开始实现：

1. ✅ FAB 固定在左下角（24px, 24px），尺寸 40x40px
2. ✅ 面板从 FAB 右侧弹出（**+4px**，紧密连接）
3. ✅ FAB 状态切换：打开时显示 ✕ 图标（180ms rotation）
4. ✅ 弹出动画：scale 0.95 → 1.0 + 淡入（180ms）
5. ✅ 面板尺寸：400px 宽 x 500px 最大高度
6. ✅ 卡片样式：bg-muted + border-border + rounded-xl
7. ✅ Action buttons：Ghost 风格，右侧竖向排列
8. ✅ 所有动画 ≤ 200ms，包含 hover/active 微交互
9. ✅ 使用 shadcn/ui 组件：Toast、Dialog、Form
10. ✅ 严格遵守 UIAgentRules.md 设计规范
