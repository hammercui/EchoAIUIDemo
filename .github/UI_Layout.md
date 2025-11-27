# UI 设计规范 - 布局与间距 (Layout & Spacing)

> 基于 StyleGuide.md 第 4、10 章节及 Tailwind 映射

## 1. 间距系统 (Spacing System)

### 基础间距表
| 像素值 | 描述 | Tailwind 类名后缀 |
|:-------|:-----|:------------------|
| **0px** | 无间距 | `0` |
| **4px** | 微小间距 | `1` |
| **8px** | 标准小间距 | `2` |
| **12px** | 中小间距 | `3` |
| **16px** | 标准间距 | `4` |
| **24px** | 大间距 | `6` |
| **32px** | 超大间距 | `8` |
| **48px** | 巨大间距 | `12` |
| **64px** | 区块间距 | `16` |

### 使用原则
- **组件内部 (Padding)**: `p-4` (16px), `p-6` (24px)
- **组件之间 (Gap/Margin)**: `gap-6` (24px), `gap-8` (32px)
- **页面区块 (Section Margin)**: `my-12` (48px), `my-16` (64px)
- **页面边距 (Container Padding)**: `px-8` (32px) ~ `px-12` (48px)

## 2. 响应式断点 (Breakpoints)

| 断点 | 最小宽度 | 设备类型 |
|:-----|:---------|:---------|
| **sm** | 640px | 移动设备横屏 / 小平板 |
| **md** | 768px | 平板竖屏 |
| **lg** | 1024px | 平板横屏 / 小笔记本 |
| **xl** | 1280px | 桌面显示器 |
| **2xl** | 1536px | 大屏显示器 |

### 响应式策略 (Mobile First)
- 默认编写移动端样式。
- 使用 `md:`, `lg:` 等前缀覆盖大屏样式。

**示例**:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- 移动端1列，平板2列，桌面3列 -->
</div>
```

## 3. 布局模式

### 容器 (Container)
- 使用 `.container` 类并配合 `mx-auto` 居中。
- 最大宽度限制：`max-w-7xl` (通常用于主内容区)。

### 网格与弹性布局
- **Flexbox**: 用于一维布局（导航栏、按钮组）。
  - `flex`, `flex-col`, `items-center`, `justify-between`
- **Grid**: 用于二维布局（卡片列表、页面结构）。
  - `grid`, `grid-cols-12`, `gap-4`

## 4. 常用 Tailwind 布局类
- **内边距**: `p-4`, `px-6`, `py-2`
- **外边距**: `m-4`, `mx-auto`, `mt-8`
- **间隙**: `gap-4`, `gap-x-6`
