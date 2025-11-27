# UI 设计规范 - 颜色系统 (Colors)

> 基于 StyleGuide.md 第 2 章节及 Tailwind 映射

## 1. 核心色调系统

### CSS 变量定义
```css
:root {
  --color-text-primary-1: rgba(0, 0, 0, 0.96);
  --color-text-primary-2: rgba(0, 0, 0, 0.8);
  --color-text-primary-3: rgba(10, 13, 51, 0.6);
  --color-text-primary-4: rgba(10, 13, 51, 0.45);
  --color-brand-primary-normal: rgb(97, 40, 255);
  --color-brand-primary-bg: rgb(214, 218, 255);
  --color-grey-layer1-semitrans: rgba(30, 31, 43, 0.1);
  --color-grey-fill2-normal: rgba(0, 0, 0, 0.08);
  --color-grey-fill2-hover: rgba(0, 0, 0, 0.12);
  --color-advanced-fill-normal: rgba(0, 0, 0, 0.96);
}
```

### 角色定义
| 角色 | 色值 | 用途 |
|:-----|:-----|:-----|
| **主色 (Primary)** | `rgba(0, 0, 0, 0.96)` | 主要文本、主要按钮背景 |
| **次色 (Secondary)** | `rgba(0, 0, 0, 0.8)` | 标题文字 |
| **第三色 (Tertiary)** | `rgba(10, 13, 51, 0.6)` | 辅助文本、说明文字 |
| **第四色 (Quaternary)** | `rgba(10, 13, 51, 0.45)` | 弱化文本、占位符 |
| **品牌色 (Brand)** | `rgb(97, 40, 255)` | 强调元素、链接、激活状态 |
| **背景色 (Background)** | `rgb(255, 255, 255)` | 卡片背景、主内容区 |
| **表面色 (Surface)** | `rgb(229, 231, 235)` | 页面背景、分割线 |

## 2. 功能性配色

| 类型 | 色值 (RGB) | Tailwind 类名示例 |
|:-----|:-----------|:------------------|
| **成功 (Success)** | `34, 197, 94` / `16, 185, 129` | `text-green-500`, `bg-green-500` |
| **警告 (Warning)** | `251, 146, 60` / `245, 158, 11` | `text-orange-400`, `bg-amber-500` |
| **错误 (Error)** | `239, 68, 68` / `220, 38, 38` | `text-red-500`, `bg-red-600` |
| **信息 (Info)** | `59, 130, 246` / `37, 99, 235` | `text-blue-500`, `bg-blue-600` |

## 3. Tailwind CSS 映射规范

在开发中请优先使用以下 Tailwind 类名：

### 文本颜色
- **主要**: `text-gray-900` (对应主色)
- **次要**: `text-gray-700` (对应次色)
- **辅助**: `text-gray-500` (对应第三色)
- **弱化**: `text-gray-300` (对应第四色)
- **品牌**: `text-purple-600` (对应品牌色)

### 背景颜色
- **白色**: `bg-white`
- **浅灰**: `bg-gray-100`, `bg-gray-200`
- **深色**: `bg-gray-800`, `bg-gray-900`
- **品牌淡色**: `bg-purple-100`

### 可访问性要求 (Accessibility)
- **WCAG AA**: 正常文本对比度至少 4.5:1
- **WCAG AAA**: 正常文本对比度至少 7:1
