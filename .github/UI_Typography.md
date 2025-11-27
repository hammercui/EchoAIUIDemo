# UI 设计规范 - 字体排版 (Typography)

> 基于 StyleGuide.md 第 3 章节及 Tailwind 映射

## 1. 字体族 (Font Family)

### 优先顺序
1. **主要字体 (Primary)**: `"D-DIN Exp"`, `"DM Sans"`, `Arial`, `"Microsoft YaHei"`, `sans-serif`
2. **次要字体 (Secondary)**: `"Helvetica Neue"`, `Arial`, `sans-serif`
3. **中文字体**: `"Microsoft YaHei"`, `"PingFang SC"`

### Tailwind 配置
```js
fontFamily: {
  primary: ['"D-DIN Exp"', '"DM Sans"', 'Arial', 'sans-serif'],
  secondary: ['"Helvetica Neue"', 'Arial', 'sans-serif']
}
```

## 2. 字号层级 (Type Scale)

| 级别 | 像素大小 | 行高 | 用途 | Tailwind 类名 |
|:-----|:---------|:-----|:-----|:--------------|
| **H1** | 48px | 54px (1.125) | 英雄区域主标题 | `text-5xl` / `text-6xl` |
| **H2** | 40px | 48px (1.2) | 页面主标题 | `text-4xl` / `text-5xl` |
| **H3** | 24px | 30px (1.25) | 章节标题 | `text-2xl` / `text-3xl` |
| **Large Body** | 18px | 28px (1.55) | 重要正文 | `text-lg` |
| **Body** | 16px | 24px (1.5) | 标准正文 | `text-base` |
| **Small** | 14px | 20px (1.4) | 辅助说明 | `text-sm` |
| **Tiny** | 12px | 18px (1.5) | 标签、版权 | `text-xs` |

## 3. 字重系统 (Font Weight)

| 权重 | 数值 | 用途 | Tailwind 类名 |
|:-----|:-----|:-----|:--------------|
| **Thin** | 100 | 大标题、展示文本 | `font-thin` |
| **Light** | 300 | 副标题 | `font-light` |
| **Normal** | 400 | 正文、段落 | `font-normal` |
| **Medium** | 500 | 小标题、强调 | `font-medium` |
| **SemiBold** | 600 | 按钮、导航 | `font-semibold` |
| **Bold** | 700 | 主标题、重要信息 | `font-bold` |
| **ExtraBold** | 800 | 特殊强调、品牌 | `font-extrabold` |

## 4. 行高与字间距 (Line Height & Letter Spacing)

- **紧凑 (Tight)**: `1.2` - 用于标题、大字体 (`leading-tight`)
- **标准 (Normal)**: `1.5` - 用于正文、段落 (`leading-normal`)
- **舒适 (Relaxed)**: `1.6-1.8` - 用于长文本阅读 (`leading-relaxed`)
- **宽松 (Loose)**: `2.0+` - 特殊排版效果 (`leading-loose`)

## 5. 使用规范

- **标题**: 使用 `font-primary`，字重通常 >= 600。
- **正文**: 使用 `font-primary` 或 `font-secondary`，字重 400。
- **按钮**: 字重 600，字号通常为 14px 或 16px。
