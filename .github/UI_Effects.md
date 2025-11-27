# UI 设计规范 - 视觉效果 (Effects)

> 基于 StyleGuide.md 第 6、7、8、9 章节及 Tailwind 映射

## 1. 阴影系统 (Shadows)

| 级别 | 描述 | Tailwind 类名 | CSS 值示例 |
|:-----|:-----|:--------------|:-----------|
| **Small** | 微小阴影 | `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` |
| **Base** | 标准阴影 | `shadow` | `0 1px 3px rgba(0,0,0,0.1)` |
| **Medium** | 中等阴影 | `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` |
| **Large** | 大阴影 | `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` |
| **None** | 无阴影 | `shadow-none` | `none` |

## 2. 圆角系统 (Border Radius)

| 级别 | 像素值 | 用途 | Tailwind 类名 |
|:-----|:-------|:-----|:--------------|
| **None** | 0px | 直角 | `rounded-none` |
| **Small** | 2px | 微圆角 | `rounded-sm` |
| **Base** | 4px | 标签、小容器 | `rounded` |
| **Medium** | 6px | 标准容器 | `rounded-md` |
| **Large** | 8px | 输入框、按钮 | `rounded-lg` |
| **X-Large** | 12px | 卡片 | `rounded-xl` |
| **2X-Large** | 16px | 大卡片、模态框 | `rounded-2xl` |
| **Full** | 9999px | 圆形按钮、头像 | `rounded-full` |

## 3. 动画与过渡 (Animation & Transitions)

### 过渡 (Transitions)
- **基础**: `transition-all duration-200 ease-in-out`
- **快速**: `duration-150 ease-out`
- **慢速**: `duration-300 ease-out`

### 常用微交互
- **悬停 (Hover)**: `hover:-translate-y-px` (轻微上浮)
- **点击 (Active)**: `active:scale-95` (轻微缩放)

### 关键帧动画 (Keyframes)
- **Fade In**: `opacity-0` -> `opacity-100`
- **Slide Up**: `translate-y-4 opacity-0` -> `translate-y-0 opacity-100`

## 4. 透明度 (Opacity)

| 级别 | 数值 | 用途 | Tailwind 类名 |
|:-----|:-----|:-----|:--------------|
| **0** | 0 | 完全隐藏 | `opacity-0` |
| **25** | 0.25 | 极淡背景 | `opacity-25` |
| **50** | 0.5 | 半透明叠加 | `opacity-50` |
| **75** | 0.75 | 禁用状态 | `opacity-75` |
| **100** | 1 | 正常显示 | `opacity-100` |

## 5. 层级管理 (Z-Index)

- **Base**: `z-0`
- **Dropdown**: `z-50` (Tailwind 默认最高层级之一，可自定义 `z-dropdown`)
- **Sticky**: `z-40`
- **Modal**: `z-50`
- **Toast**: `z-50` (需确保在 Modal 之上)
