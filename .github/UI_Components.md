# UI 设计规范 - 组件样式 (Components)

> 基于 StyleGuide.md 第 5 章节及 Tailwind 映射

## 1. 按钮 (Buttons)

### 主要按钮 (Primary)
- **背景**: `bg-gray-900` (rgba(0, 0, 0, 0.96))
- **文字**: `text-white`
- **圆角**: `rounded-full` (9999px)
- **字重**: `font-semibold` (600)
- **交互**: Hover 时 `bg-gray-800`, `transform -translate-y-px`

```html
<button class="flex items-center justify-center w-full h-10 px-4 bg-gray-900 text-white rounded-full font-semibold transition hover:bg-gray-800 hover:-translate-y-px">
  Primary Button
</button>
```

### 次要按钮 (Secondary)
- **背景**: `bg-white`
- **边框**: `border border-gray-300` (rgba(114, 118, 139, 0.4))
- **文字**: `text-gray-900`
- **圆角**: `rounded-full`
- **交互**: Hover 时 `bg-gray-50`

```html
<button class="flex items-center justify-center w-full h-10 px-4 bg-white text-gray-900 border border-gray-300 rounded-full font-semibold transition hover:bg-gray-50">
  Secondary Button
</button>
```

### 尺寸规范
- **Small**: `h-8`, `text-sm`, `px-3.5`
- **Standard**: `h-10`, `text-base`, `px-4`
- **Large**: `h-12`, `text-lg`, `px-6`

## 2. 卡片 (Cards)

### 定价/通用卡片
- **背景**: `bg-white`
- **边框**: `border border-gray-200`
- **圆角**: `rounded-xl` (12px)
- **阴影**: 默认 `shadow-sm` 或 `shadow`
- **交互**: Hover 时 `transform -translate-y-1`, `shadow-lg`

```html
<div class="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-6">
  <!-- Card Content -->
</div>
```

## 3. 导航栏 (Navigation)

### 主导航
- **定位**: `sticky top-0 z-50`
- **背景**: `bg-white`
- **阴影**: `shadow-sm`
- **布局**: `flex items-center gap-6`

```html
<nav class="sticky top-0 z-50 flex items-center gap-6 bg-white shadow-sm p-4">
  <!-- Nav Items -->
</nav>
```

## 4. 通用组件类名映射
- **布局容器**: `flex flex-col`, `grid grid-cols-1`
- **显示状态**: `block`, `hidden`, `inline-block`
- **定位**: `absolute`, `relative`, `fixed`
