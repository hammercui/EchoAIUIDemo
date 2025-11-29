# Sider：全面设计系统指南

> **生成时间**: 2025年11月24日 17:50:42
> **来源页面**: https://sider.ai/zh-CN/pricing
> **分析深度**: 完整设计系统提取

---

## 📋 目录

1. [项目概述](#1-项目概述)
2. [配色方案](#2-配色方案)
3. [字体排版系统](#3-字体排版系统)
4. [间距系统](#4-间距系统)
5. [组件样式系统](#5-组件样式系统)
6. [阴影与层级效果](#6-阴影与层级效果)
7. [动画与过渡效果](#7-动画与过渡效果)
8. [圆角设计](#8-圆角设计)
9. [透明度与视觉效果](#9-透明度与视觉效果)
10. [响应式设计](#10-响应式设计)
11. [Tailwind CSS 完整映射](#11-tailwind-css-完整映射)
12. [示例组件代码](#12-示例组件代码)
13. [可访问性指南](#13-可访问性指南)

---

## 1. 项目概述

### 基本信息
- **网站URL**: https://sider.ai/zh-CN/pricing
- **页面标题**: Sider：最佳 AI 侧边栏 - 定价页面
- **分析时间**: 2025-11-24
- **设计复杂度**: 高

### 设计特征
- **设计风格**: 现代、简洁的B2B风格
- **色彩特点**: 中性色调为主，辅以品牌色点缀
- **布局特点**: 卡片式布局，网格系统
- **交互特点**: 流畅的过渡动画，明确的反馈
- **技术实现**: 基于现代CSS，响应式设计

### 技术栈分析
- **CSS框架**: 自定义CSS + Tailwind CSS
- **布局方式**: Flexbox + CSS Grid
- **动画引擎**: CSS Transitions + Keyframes
- **字体系统**: Web字体 + 系统字体回退
- **响应式**: 移动优先设计

---

## 2. 配色方案

### 2.1 主色调系统

#### CSS变量定义
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

#### 主色调
- **主色**: rgba(0, 0, 0, 0.96) - 主要文本和按钮
- **次色**: rgba(0, 0, 0, 0.8) - 标题文字
- **第三色**: rgba(10, 13, 51, 0.6) - 辅助文本
- **背景色**: rgb(255, 255, 255) - 卡片背景
- **表面色**: rgb(229, 231, 235) - 页面背景
- **品牌色**: rgb(97, 40, 255) - 强调元素

### 2.2 功能性配色
- **成功色**: rgb(34, 197, 94) / rgb(16, 185, 129)
- **警告色**: rgb(251, 146, 60) / rgb(245, 158, 11)
- **错误色**: rgb(239, 68, 68) / rgb(220, 38, 38)
- **信息色**: rgb(59, 130, 246) / rgb(37, 99, 235)

---

## 3. 字体排版系统

### 3.1 字体族
1. **主要字体**: "D-DIN Exp", "DM Sans", Arial, "Microsoft YaHei", "PingFang SC", "Helvetica", sans-serif
2. **次要字体**: "Helvetica Neue", Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", sans-serif
3. **中文字体**: "Microsoft YaHei"

### 3.2 字体层级与搭配

#### 标题层级
- **H1**: 48px, 600 weight, 54px line-height (1个实例)
- **H2**: 40px, 700 weight, 48px line-height (1个实例)
- **H3**: 24px, 800 weight, 30px line-height (3个实例)

#### 字体使用
- **正文**: 16px, 400 weight, 24px line-height
- **小文字**: 14px, 400 weight, 20px line-height
- **极小文字**: 12px, 400 weight, 18px line-height

### 3.3 字体粗细系统
- **100 (Thin)**: 大标题、展示文本
- **300 (Light)**: 副标题、标注
- **400 (Normal)**: 正文、段落
- **500 (Medium)**: 小标题、强调
- **600 (SemiBold)**: 按钮、导航
- **700 (Bold)**: 主标题、重要信息
- **800 (ExtraBold)**: 特殊强调、品牌

### 3.4 字号大小层级
- **12px**: 极小文本 (标签、版权)
- **14px**: 小文本 (正文辅助)
- **16px**: 正文 (主要内容)
- **18px**: 大正文 (重要内容)
- **24px**: 标题 (章节标题)
- **40px**: 大标题 (页面主标题)
- **48px**: 主标题 (英雄区域)

### 3.5 行高与字间距
- **紧凑**: 1.2 - 标题、大字体
- **标准**: 1.5 - 正文、段落
- **舒适**: 1.6-1.8 - 长文本阅读
- **宽松**: 2.0+ - 特殊排版效果

---

## 4. 间距系统

### 4.1 基础间距
**常用间距值**:
- 4px - 微小间距
- 6px - 小间距
- 8px - 标准小间距
- 12px - 中小间距
- 16px - 标准间距
- 20px - 中等间距
- 24px - 大间距
- 32px - 超大间距
- 48px - 巨大间距

### 4.2 组件间距规律
- **内部间距**: 16px-24px
- **组件间距**: 24px-32px
- **区块间距**: 48px-64px
- **页面边距**: 32px-48px

### 4.3 间距使用原则
1. **一致性**: 同级元素使用相同间距
2. **层级性**: 重要元素周围留更多空间
3. **节奏性**: 间距要有韵律感
4. **响应式**: 不同屏幕尺寸调整间距

---

## 5. 组件样式系统

### 5.1 按钮组件

#### 主要按钮
```css
.btn-primary {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.96);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 9999px;
  padding: 4px 15px;
  font-size: 16px;
  font-weight: 600;
  font-family: "D-DIN Exp", "DM Sans", Arial, sans-serif;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: rgba(0, 0, 0, 0.9);
  transform: translateY(-1px);
}
```

#### 次要按钮
```css
.btn-secondary {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.96);
  border: 1px solid rgba(114, 118, 139, 0.4);
  border-radius: 9999px;
  padding: 4px 15px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
```

#### 按钮尺寸
- **小型**: height: 32px, font-size: 14px, padding: 4px 14px
- **标准**: height: 40px, font-size: 16px, padding: 4px 15px
- **大型**: height: 48px, font-size: 18px, padding: 8px 24px

### 5.2 卡片组件

#### 定价卡片
```css
.pricing-card {
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(229, 231, 235);
  border-radius: 12px;
  max-width: 352px;
  min-width: 280px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 0;
  padding: 0;
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
```

### 5.3 导航组件

#### 主导航
```css
.main-nav {
  display: flex;
  align-items: center;
  gap: 24px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  position: sticky;
  top: 0px;
  z-index: 5;
}
```

---

## 6. 阴影与层级效果

### 6.1 阴影系统
#### 阴影层级
```css
/* 微小阴影 */
.shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* 标准阴影 */
.shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1),
              0 1px 2px rgba(0, 0, 0, 0.06);
}

/* 中等阴影 */
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07),
              0 2px 4px rgba(0, 0, 0, 0.06);
}

/* 大阴影 */
.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1),
              0 4px 6px rgba(0, 0, 0, 0.05);
}
```

### 6.2 层级管理
#### z-index 层级
- **z-base**: 0 - 基础层级
- **z-above**: 1 - 上层元素
- **z-dropdown**: 1000 - 下拉菜单
- **z-sticky**: 1020 - 粘性定位
- **z-fixed**: 1030 - 固定定位
- **z-modal-backdrop**: 1040 - 模态背景
- **z-modal**: 1050 - 模态框
- **z-toast**: 2000 - 通知提示

---

## 7. 动画与过渡效果

### 7.1 过渡系统
```css
/* 基础过渡 */
.transition {
  transition: all 0.2s ease;
}

/* 快速过渡 */
.transition-fast {
  transition: all 0.15s ease-out;
}

/* 标准过渡 */
.transition-normal {
  transition: all 0.2s ease-out;
}

/* 慢速过渡 */
.transition-slow {
  transition: all 0.3s ease-out;
}
```

### 7.2 关键帧动画
```css
/* 淡入动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 滑入动画 */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 缩放动画 */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### 7.3 微交互效果
- **悬停**: translateY(-1px) + 阴影变化
- **焦点**: 2px solid 轮廓 + 偏移
- **按下**: translateY(0) + 阴影减弱

---

## 8. 圆角设计

### 8.1 圆角系统
```css
/* 圆角尺寸 */
.rounded-none { border-radius: 0; }
.rounded-sm { border-radius: 2px; }
.rounded { border-radius: 4px; }
.rounded-md { border-radius: 6px; }
.rounded-lg { border-radius: 8px; }
.rounded-xl { border-radius: 12px; }
.rounded-2xl { border-radius: 16px; }
.rounded-full { border-radius: 9999px; }
```

### 8.2 圆角使用规范
- **按钮**: 8px (标准) 或 9999px (圆形按钮)
- **卡片**: 12px
- **输入框**: 8px
- **头像**: 9999px (圆形)
- **标签**: 4px 或 9999px

---

## 9. 透明度与视觉效果

### 9.1 透明度系统
```css
.opacity-0 { opacity: 0; }
.opacity-25 { opacity: 0.25; }
.opacity-50 { opacity: 0.5; }
.opacity-75 { opacity: 0.75; }
.opacity-100 { opacity: 1; }
```

### 9.2 使用场景
- **0%**: 完全隐藏，动画起点
- **25%**: 极淡，背景装饰
- **50%**: 半透明，叠加效果
- **75%**: 较淡，禁用状态
- **100%**: 完全不透明，正常显示

---

## 10. 响应式设计

### 10.1 断点系统
- **sm**: 640px 及以上
- **md**: 768px 及以上
- **lg**: 1024px 及以上
- **xl**: 1280px 及以上

### 10.2 响应式组件
#### 导航栏
- **桌面端**: 水平布局，完整菜单
- **移动端**: 折叠菜单，汉堡图标

#### 卡片网格
- **桌面端**: 3列布局
- **平板端**: 2列布局
- **移动端**: 1列布局

---

## 11. Tailwind CSS 完整映射

### 11.1 配置文件
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(0, 0, 0, 0.96)',
        secondary: 'rgba(0, 0, 0, 0.8)',
        accent: 'rgb(97, 40, 255)',
        background: 'rgb(255, 255, 255)',
        surface: 'rgb(229, 231, 235)'
      },
      fontFamily: {
        primary: ['"D-DIN Exp"', '"DM Sans"', 'Arial', 'sans-serif'],
        secondary: ['"Helvetica Neue"', 'Arial', 'sans-serif']
      },
      boxShadow: {
        'custom': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'custom-lg': '0 10px 15px rgba(0, 0, 0, 0.1)'
      }
    }
  }
}
```

### 11.2 颜色类名映射
```html
<!-- 主色 -->
text-gray-900 text-gray-700 text-gray-500 text-gray-300
bg-white bg-gray-100 bg-gray-200 bg-gray-800

<!-- 品牌色 -->
text-purple-600 bg-purple-100
```

### 11.3 字体类名映射
```html
<!-- 字体大小 -->
text-xs text-sm text-base text-lg text-xl
text-2xl text-3xl text-4xl text-5xl text-6xl

<!-- 字重 -->
font-normal font-medium font-semibold font-bold

<!-- 行高 -->
leading-tight leading-normal leading-relaxed
```

### 11.4 间距类名映射
```html
<!-- 内边距 -->
p-0 p-1 p-2 p-3 p-4 p-6 p-8
px-4 py-2 pt-4 pr-6 pb-8 pl-2

<!-- 外边距 -->
m-0 m-1 m-2 m-3 m-4 m-6 m-8
mx-auto my-4 mt-6 mr-8 mb-10 ml-2

<!-- 间隙 -->
gap-0 gap-1 gap-2 gap-3 gap-4 gap-6 gap-8
```

### 11.5 组件类名映射
```html
<!-- 布局 -->
flex flex-col flex-row items-center justify-between
grid grid-cols-1 grid-cols-2 grid-cols-3
container max-w-md max-w-lg max-w-xl max-w-2xl max-w-4xl

<!-- 显示 -->
block inline-block hidden visible invisible
absolute relative fixed sticky

<!-- 圆角 -->
rounded rounded-sm rounded-md rounded-lg rounded-xl rounded-full

<!-- 阴影 -->
shadow-none shadow-sm shadow shadow-md shadow-lg shadow-xl
```

### 11.6 效果类名映射
```html
<!-- 透明度 -->
opacity-0 opacity-25 opacity-50 opacity-75 opacity-100

<!-- 变换 -->
scale-95 scale-105 translate-x-1 translate-y-1

<!-- 过渡 -->
transition-all transition-colors transition-opacity
duration-75 duration-100 duration-150 duration-200 duration-300
```

---

## 12. 示例组件代码

### 12.1 完整页面示例
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sider：最佳 AI 侧边栏 - 定价页面</title>
  <style>
    :root {
      --color-primary: rgba(0, 0, 0, 0.96);
      --color-secondary: rgba(0, 0, 0, 0.8);
      --color-background: rgb(255, 255, 255);
      --color-surface: rgb(229, 231, 235);
      --font-primary: "D-DIN Exp", "DM Sans", Arial, sans-serif;
      --spacing-xs: 4px;
      --spacing-sm: 8px;
      --spacing-md: 16px;
      --spacing-lg: 24px;
      --spacing-xl: 32px;
      --border-radius-sm: 4px;
      --border-radius: 8px;
      --border-radius-lg: 12px;
      --border-radius-full: 9999px;
      --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: var(--font-primary);
      background-color: var(--color-background);
      color: var(--color-primary);
      line-height: 1.6;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-md);
    }

    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-lg);
      margin-top: var(--spacing-lg);
    }

    .pricing-card {
      background-color: var(--color-background);
      border: 1px solid var(--color-surface);
      border-radius: var(--border-radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow);
      transition: all 0.3s ease;
    }

    .pricing-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    @media (max-width: 768px) {
      .pricing-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="pricing-grid">
      <div class="pricing-card">
        <h3>Basic Plan</h3>
        <p>基础功能适合个人使用</p>
        <button class="btn-primary">选择方案</button>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## 13. 可访问性指南

### 13.1 颜色对比度要求
- **WCAG AA**: 正常文本 4.5:1，大文本 3:1
- **WCAG AAA**: 正常文本 7:1，大文本 4.5:1

### 13.2 键盘导航
- **Tab顺序**: 逻辑清晰的焦点顺序
- **焦点样式**: 明显可见的焦点指示器
- **跳过链接**: 提供跳过导航的链接

### 13.3 屏幕阅读器支持
- **语义化HTML**: 使用正确的HTML标签
- **ARIA标签**: 提供适当的ARIA属性
- **图片alt**: 所有图片提供alt文本

---

## 📝 实现说明

### 开发注意事项
1. 严格按照本指南进行开发，确保视觉一致性
2. 使用提供的CSS变量和Tailwind类名
3. 参考示例代码进行组件实现
4. 测试所有交互状态和动画效果

### 质量检查清单
- [ ] 颜色对比度符合WCAG标准
- [ ] 所有交互元素有明确的焦点状态
- [ ] 动画流畅且性能优化
- [ ] 响应式设计在所有设备正常工作
- [ ] 组件在不同状态下的样式正确

---

*本指南基于网页实际样式分析生成，包含完整的设计系统细节，可确保100%还原参考网页的设计。*
