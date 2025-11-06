# Shadcn/UI 样式实现细节

> 基于 Sider.ai + Tailwind CSS 的样式实现指南  
> 本文档提供关键组件的 Tailwind 类实现，供开发和 AI 助手直接使用

**文档定位**：
- 所有组件使用 Tailwind CSS 类实现
- 提供完整可复制的 HTML 代码
- 详细的 Tailwind 配置参数
- 设计原则请参考 `UIAgentRules.md`

---

## 🎨 色彩系统

### Shadcn/ui CSS 变量（必需）

shadcn/ui 使用 HSL 格式的 CSS 变量，这些变量会自动适配深色模式：

```css
/* globals.css - 仅定义变量，实际使用 Tailwind 类 */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --primary: 262 83% 58%;              /* violet-500 */
  --primary-foreground: 0 0% 100%;
  --accent: 262 83% 58%;               /* violet-500 */
  --accent-foreground: 0 0% 100%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --radius: 0.5rem;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
}
```

### Sider.ai 扩展变量

```css
/* Sider.ai 专用颜色 - 用于特殊场景 */
:root {
  /* 渐变文字（暖黄 → 淡蓝 → 浅紫 → 深紫）*/
  --sider-gradient: linear-gradient(103deg, 
    rgb(255, 227, 170) 5.37%, 
    rgb(237, 240, 255) 40.89%, 
    rgb(174, 190, 255) 68.56%, 
    rgb(187, 163, 255) 91.14%
  );
}
```

**Tailwind 使用方式**：
```html
<!-- ✅ 使用 Tailwind 类 -->
<div class="bg-background text-foreground border-border">内容</div>
<div class="bg-card text-card-foreground">卡片</div>
<button class="bg-primary text-primary-foreground">按钮</button>

<!-- ❌ 不要直接使用 CSS -->
<div style="background: var(--background)">内容</div>
```

---

## 📐 Tailwind 配置

### tailwind.config.js 配置

```js
module.exports = {
  theme: {
    extend: {
      // 字体
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      
      // 圆角
      borderRadius: {
        'card': '12px',  // Sider.ai 卡片圆角
      },
      
      // 字号（可选，使用内置即可）
      fontSize: {
        'sider-xs': '0.75rem',    // 12px
        'sider-sm': '0.875rem',   // 14px
        'sider-base': '1rem',     // 16px
      },
    }
  }
}
```

### 常用 Tailwind 间距

| 场景 | Tailwind 类 | 实际尺寸 |
|------|-------------|----------|
| 按钮内边距 | `px-6` | 24px 左右 |
| 卡片内边距 | `p-6` | 24px 全方向 |
| 卡片内边距（大） | `p-8` | 32px 全方向 |
| 元素间距 | `gap-3` | 12px |
| 列表项间距 | `space-y-2` | 8px 垂直 |
| 区块间距 | `mb-6` | 24px 底部 |

### 常用 Tailwind 字号

| Tailwind 类 | 尺寸 | 使用场景 |
|-------------|------|----------|
| `text-xs` | 12px | 辅助文字、徽章 |
| `text-sm` | 14px | 正文、说明 |
| `text-base` / `text-[16px]` | 16px | 按钮、标题3 |
| `text-lg` | 18px | 标题2 |
| `text-xl` | 20px | 标题1 |
| `text-2xl` | 24px | 大标题 |

### 常用 Tailwind 圆角

| 元素 | Tailwind 类 | 实际圆角 |
|------|-------------|----------|
| 按钮 | `rounded-full` | 完全圆角 |
| 卡片 | `rounded-card` / `rounded-xl` | 12px |
| 小组件 | `rounded-lg` | 8px |
| 徽章 | `rounded-md` | 6px |

---
## 🎯 按钮实现（Sider.ai 风格）

### 按钮标准规范

**固定参数**（严格遵守）：
- 高度：`h-[40px]`（40px）
- 内边距：`px-6`（24px 左右）
- 字号：`text-[16px]`（16px）
- 字重：`font-semibold`（600）
- 圆角：`rounded-full`（完全圆角）
- 过渡：`transition-all duration-200`

### 1. Primary 按钮（白底黑边）

```html
<button class="h-[40px] px-6 text-[16px] font-semibold rounded-full
             bg-white text-gray-900 border border-gray-300
             hover:bg-gray-50 active:scale-[0.98]
             transition-all duration-200">
  立即订阅
</button>
```

### 2. Secondary 按钮（深色）

```html
<button class="h-[40px] px-6 text-[16px] font-semibold rounded-full
             bg-gray-900 text-white border border-gray-900
             hover:bg-gray-800 active:scale-[0.98]
             transition-colors duration-200">
  立即升级
</button>
```

### 3. Ghost 按钮（纯文字）

```html
<button class="h-[40px] px-6 text-[16px] font-semibold rounded-full
             text-gray-700 hover:bg-gray-100 active:scale-[0.98]
             transition-colors duration-200">
  跳过
</button>
```

### 4. 渐变文字按钮（Sider.ai 特色）

```html
<button class="h-[40px] px-6 text-[16px] font-semibold rounded-full
             bg-white border border-gray-300 hover:bg-gray-50 
             transition-all duration-200">
  <span class="bg-clip-text" 
        style="background-image: linear-gradient(103deg, 
               rgb(255, 227, 170) 5.37%, 
               rgb(237, 240, 255) 40.89%, 
               rgb(174, 190, 255) 68.56%, 
               rgb(187, 163, 255) 91.14%); 
               -webkit-text-fill-color: transparent;">
    立即订阅
  </span>
</button>
```

### 5. 带图标按钮

```html
<button class="h-[40px] px-6 text-[16px] font-semibold rounded-full
             bg-white text-gray-900 border border-gray-300
             hover:bg-gray-50 transition-colors duration-200
             flex items-center justify-center gap-2">
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M5 13l4 4L19 7"/>
  </svg>
  立即开始
</button>
```

**图标尺寸**：标准 `w-4 h-4` (16px)，大按钮 `w-5 h-5` (20px)

---

## 🎨 图标容器

### 标准尺寸

| 容器尺寸 | Tailwind 类 | 图标尺寸 | 使用场景 |
|----------|-------------|----------|----------|
| 40x40px | `w-10 h-10` | `w-5 h-5` (20px) | 卡片、特色展示 |
| 32x32px | `w-8 h-8` | `w-4 h-4` (16px) | 列表项、小组件 |

### 实现代码

```html
<!-- 紫色背景（40x40） -->
<div class="w-10 h-10 rounded-lg bg-violet-100 
          flex items-center justify-center text-violet-600">
  <svg class="w-5 h-5">...</svg>
</div>

<!-- 渐变背景（40x40） -->
<div class="w-10 h-10 rounded-lg 
          bg-gradient-to-br from-violet-500 to-purple-600 
          flex items-center justify-center text-white">
  <svg class="w-5 h-5">...</svg>
</div>

<!-- 小型图标容器（32x32） -->
<div class="w-8 h-8 rounded-lg bg-violet-100 
          flex items-center justify-center text-violet-600">
  <svg class="w-4 h-4">...</svg>
</div>
```

---

## 🃏 卡片

### 基础卡片

```html
<div class="bg-card border border-border rounded-card p-6 
          shadow-sm hover:shadow-md transition-shadow duration-200">
  <div class="w-10 h-10 rounded-lg bg-violet-100 
            flex items-center justify-center text-violet-600 mb-4">
    <svg class="w-5 h-5">...</svg>
  </div>
  <h3 class="text-base font-bold text-foreground mb-2">基础卡片</h3>
  <p class="text-sm text-muted-foreground mb-4">简洁的卡片设计</p>
  <a href="#" class="text-sm font-semibold text-accent hover:text-accent/80 
                   inline-flex items-center gap-1">
    了解更多 →
  </a>
</div>
```

### 信息卡片（浅色背景）

```html
<div class="bg-violet-50 border border-violet-200 rounded-card p-6">
  <div class="flex items-start gap-3">
    <div class="w-10 h-10 rounded-lg bg-violet-500 
              flex items-center justify-center text-white flex-shrink-0">
      <svg class="w-5 h-5">ℹ</svg>
    </div>
    <div>
      <h3 class="text-base font-bold text-gray-900 mb-1">信息卡片</h3>
      <p class="text-sm text-gray-700">浅色背景，紫色图标</p>
    </div>
  </div>
</div>
```

### 强调卡片（深色 + 渐变文字）

```html
<div class="bg-slate-900 rounded-card p-6 shadow-lg">
  <div class="w-10 h-10 rounded-lg 
            bg-gradient-to-br from-violet-500 to-purple-600 
            flex items-center justify-center text-white mb-4">
    <svg class="w-5 h-5">✨</svg>
  </div>
  <h3 class="text-2xl font-bold mb-2 bg-clip-text" 
      style="background-image: linear-gradient(103deg, 
             rgb(255, 227, 170) 5.37%, rgb(237, 240, 255) 40.89%, 
             rgb(174, 190, 255) 68.56%, rgb(187, 163, 255) 91.14%); 
             -webkit-text-fill-color: transparent;">
    解锁全部高级功能
  </h3>
  <p class="text-sm text-white/70">Sider.ai 原版渐变效果</p>
</div>
```

---

## 🏷️ 徽章 & 标签

```html
<!-- 状态徽章 -->
<span class="px-2.5 py-1 text-xs font-medium rounded-md 
           bg-violet-50 text-violet-600 border border-violet-200">
  进行中
</span>

<!-- 胶囊徽章 -->
<span class="inline-flex items-center gap-1.5 px-3 py-1 
           text-xs font-medium rounded-full bg-violet-600 text-white">
  <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
  在线
</span>

<!-- 带图标胶囊 -->
<span class="inline-flex items-center gap-1.5 px-3 py-1 
           text-xs font-medium rounded-full 
           border border-violet-300 text-violet-700">
  ✨ 新功能
</span>
```

---

## 📑 Tab 选择器

```html
<div class="inline-flex gap-1 p-1 bg-gray-100 rounded-lg">
  <!-- 激活状态 -->
  <button class="px-4 py-1.5 text-sm font-medium 
               text-white bg-gray-900 rounded-md shadow-sm">
    全部
  </button>
  
  <!-- 未激活状态 -->
  <button class="px-4 py-1.5 text-sm font-medium 
               text-gray-700 hover:bg-white rounded-md">
    进行中
  </button>
</div>
```

---

## 📊 进度条

```html
<!-- 基础进度条 -->
<div class="space-y-2">
  <div class="flex justify-between text-sm">
    <span class="font-medium text-foreground">进度</span>
    <span class="text-muted-foreground">75%</span>
  </div>
  <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <div class="h-full bg-violet-600 rounded-full transition-all duration-500" 
         style="width: 75%"></div>
  </div>
</div>

<!-- 渐变进度条 -->
<div class="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
  <div class="h-full bg-gradient-to-r from-violet-500 to-purple-600 
            rounded-full transition-all duration-500" 
       style="width: 60%"></div>
</div>
```

---

## 📋 列表

```html
<div class="flex items-center justify-between p-3 rounded-lg 
          hover:bg-gray-50 cursor-pointer transition-colors group">
  <div class="flex items-center gap-3">
    <div class="w-8 h-8 rounded-lg bg-violet-100 
              flex items-center justify-center 
              group-hover:bg-violet-200 transition-colors">
      <svg class="w-4 h-4 text-violet-600">📄</svg>
    </div>
    <div>
      <div class="text-sm font-medium text-gray-900">项目文档</div>
      <div class="text-xs text-gray-500">更新于 2 小时前</div>
    </div>
  </div>
  <svg class="w-5 h-5 text-gray-400 
            group-hover:text-violet-600 transition-colors">→</svg>
</div>
```

---

## 🎨 渐变效果

```html
<!-- Sider.ai 原版渐变文字 -->
<span class="bg-clip-text" 
      style="background-image: linear-gradient(103deg, 
             rgb(255, 227, 170) 5.37%, 
             rgb(237, 240, 255) 40.89%, 
             rgb(174, 190, 255) 68.56%, 
             rgb(187, 163, 255) 91.14%); 
             -webkit-text-fill-color: transparent;">
  渐变文字
</span>

<!-- 紫色渐变按钮 -->
<button class="bg-gradient-to-r from-violet-600 to-purple-600 
             hover:from-violet-500 hover:to-purple-500 
             text-white rounded-full px-6 py-3">
  渐变按钮
</button>

<!-- 渐变卡片背景 -->
<div class="bg-gradient-to-br from-violet-500 to-purple-600 
          rounded-lg p-6 text-white">
  渐变卡片
</div>
```

---

## 🌓 深色模式

```html
<!-- 使用 CSS 变量自动适配深色模式 -->
<div class="bg-background text-foreground">
  <div class="bg-card text-card-foreground border border-border">
    <h3 class="text-foreground">标题</h3>
    <p class="text-muted-foreground">描述文字</p>
  </div>
</div>
```

---

## 📱 响应式设计

| 断点 | 尺寸 | 场景 |
|------|------|------|
| `sm` | 640px | 手机横屏 |
| `md` | 768px | 平板 |
| `lg` | 1024px | 桌面 |
| `xl` | 1280px | 大屏 |

```html
<!-- 移动端单列,桌面端三列 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="bg-card p-6 rounded-card">卡片 1</div>
  <div class="bg-card p-6 rounded-card">卡片 2</div>
  <div class="bg-card p-6 rounded-card">卡片 3</div>
</div>

<!-- 移动端堆叠,桌面端并排 -->
<div class="flex flex-col md:flex-row gap-4">
  <button class="h-[40px] px-6 rounded-full bg-gray-900 text-white">主按钮</button>
  <button class="h-[40px] px-6 rounded-full border border-gray-300">次要</button>
</div>
```

---

## ✅ 样式实现检查清单

- [ ] 使用 CSS 变量（`bg-background`，而非 `bg-white`）
- [ ] 按钮高度固定 40px
- [ ] 按钮使用 `rounded-full`
- [ ] 卡片使用 `rounded-card` (12px)
- [ ] 字号：按钮 16px，正文 14px，辅助 12px
- [ ] 字重：按钮 semibold，标题 bold
- [ ] 间距：按钮 `px-6`，卡片 `p-6`
- [ ] 过渡动画：`transition-colors duration-200`
- [ ] 悬停状态：所有交互元素有 hover
- [ ] 激活状态：按钮有 `active:scale-[0.98]`
- [ ] 深色模式：自动适配
- [ ] 渐变效果：仅用于特殊强调
---
