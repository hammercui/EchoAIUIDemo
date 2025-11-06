# UI Agent Rules - shadcn/ui 设计规范

> AI 编程助手 UI 设计核心规范 - **强制执行**

使用 shadcn/ui + tailwindcss 作为设计系统，实现统一的 UI 规范。

## 📚 文档导航

- **UIAgentRules.md**（当前）- 核心设计原则与指南
- **copilot-shadcn-base-style.md** - 完整样式实现细节（色彩系统、字体、字号、间距、Tailwind样式）,使用时按功能模块查询
- **UIAgentAnimaRules.md** - 微交互动效原则和指南
- **copilot-shadcn-anima-style.md** - 完整的微交互的动效实现细节，使用时按照功能模块查询

## 🎯 核心设计原则
### 基本原则
1. 《写给大家看的设计书》 - CRAP四原则
   * Contrast (对比)
   * Repetition (重复)
   * Alignment (对齐)
   * Proximity (亲密性)
2. 《Don't Make Me Think》 - 交互自明性
自解释性、减少认知负担、即时反馈、视觉层级
3. 《Designing Interface Animation》 - 动效设计
有目的的动效、速度与缓动、连贯性、性能优先
4. 《Laws of UX》 - UX定律
Hick's Law、Fitts's Law、Miller's Law、Jakob's Law、Peak-End Rule
5. 《Refactoring UI》 - 前端实战
从功能出发、建立设计系统、少用边框、留白高级感、层次化灰色
6. 《简约至上》 - 简化四原则
删除、组织、隐藏、转移

### shadcn/ui 设计哲学

**现代 · 优雅 · 实用 · 灵活**

1. **实用主义**：功能第一，装饰第二
2. **组合式设计**：用 Tailwind 实用类构建，而非固定组件
3. **深色优先**：天然支持深浅色模式切换
4. **语义化**：使用 CSS 变量，而非硬编码颜色

### 微交互原则

- ⚡ **即时反馈**：每个操作 150-300ms 内完成响应
- 🎯 **目的明确**：动效服务于用户理解，而非炫技
- 🌊 **流畅自然**：使用 spring easing，避免生硬的线性动画
- 📱 **尊重偏好**：检测用户的 `prefers-reduced-motion` 设置

## 🎨 设计灵感来源

| 来源 | 用途 | 链接 |
|------|------|------|
| 🎬 motion.dev | 动效参考 | [motion.dev/examples](https://motion.dev/examples) |
| ✨ magicui.design | 高级特效 | [magicui.design](https://magicui.design/)，可是使用mcp server 21st-dev/magic查询组件 |
| 🎠 embla-carousel | 轮播交互 | 官方文档 |
| 🎨 heroui.com | 组件设计 | [heroui.com](https://www.heroui.com/) |
| 🏢 Sider.ai | 按钮风格 | [sider.ai](https://sider.ai/) |

---

## ✅ 必须遵守的规则

### 0. 色彩使用规范

**基础色彩系统**：
- `--background`: 页面背景色（浅色模式：白色，深色模式：深灰）
- `--foreground`: 主要文字色（浅色模式：深灰，深色模式：浅灰）
- `--muted`: 次要背景色（用于卡片、输入框背景）
- `--muted-foreground`: 次要文字色（用于辅助说明文字）
- `--border`: 边框色（统一的边框颜色）
- `--primary`: 主色调 `hsl(222, 47%, 11%)` - Slate-900
- `--primary-foreground`: 主色调上的文字色

**使用场景**：
- 页面背景：`bg-background`
- 主要文字：`text-foreground`
- 卡片背景：`bg-muted`
- 辅助文字：`text-muted-foreground`
- 边框：`border-border`
- 主按钮：`bg-primary text-primary-foreground`
- 次要按钮：`bg-muted text-foreground`

**强调色使用**：
- 紫色渐变：`linear-gradient(135deg, hsl(262, 83%, 58%), hsl(262, 83%, 48%))` - 强调色
- 紫色浅色：`hsl(262, 90%, 70%)` - Violet-400
- 紫色背景：`linear-gradient(135deg, hsl(262, 90%, 97%), hsl(262, 90%, 95%))` - Violet-50
- 成功状态：`bg-green-50 text-green-600`
- 警告状态：`bg-yellow-50 text-yellow-600`
- 错误状态：`bg-red-50 text-red-600`

### 1. 使用 CSS 变量，禁止硬编码

### 2. 深色模式支持

所有 UI 通过 CSS 变量自动适配深浅色模式。

### 3. Tailwind 实用类优先

优先使用 Tailwind 实用类，避免自定义 CSS。

### 4. 微交互必备
所有交互元素必须包含 hover、active、transition 效果。

```html
<button class="transition-all duration-150 hover:opacity-90 active:scale-[0.98]">
  点击我
</button>
```

## ❌ 严格禁止

| 禁止项 | 原因 | 替代方案 |
|--------|------|---------|
| 纯黑 `#000` / 纯白 `#fff` | 视觉刺眼，缺乏层次 | `var(--foreground)` / `var(--background)` |
| 硬编码颜色值 | 无法适配深色模式 | 使用 CSS 变量 |
| 长动画（>300ms） | 拖慢交互节奏 | 150-200ms |
| 玻璃拟态 | 性能差，可访问性低 | 微妙阴影 + 边框 |
| 不一致的间距 | 视觉混乱 | 统一使用 Tailwind 间距类 |
| 大块紫色背景 | 视觉过于强烈 | 仅用于小面积点缀 |

## 配色原则

1. **主色调**
   - 深灰色 (gray-900/slate-900) 用于主按钮和重要元素
   - 白色背景 + 黑色边框为默认按钮样式
   - 避免使用大块紫色背景

2. **强调色**
   - 紫色 (violet-500/600) 仅用于小面积点缀
   - 适用场景：图标背景、hover 状态、链接文字
   - 浅色背景使用 violet-50/100

### 按钮设计规范

**尺寸标准**（严格遵守）：
- 高度：40px 固定
- 内边距：24px 左右
- 字体：16px 半粗体
- 圆角：完全圆角

**按钮层级**：
1. **Primary 按钮** - 白色背景 + 黑色边框
2. **Secondary 按钮** - 深色背景
3. **Ghost 按钮** - 纯文字

### 组件设计规范

**圆角标准**：
- 按钮：完全圆角
- 卡片：12px
- 小组件：8px
- 图标容器：8px

**图标容器尺寸**：
- 标准：40x40px
- 小型：32x32px
- 图标：20x20px 或 16x16px

**卡片层级**：
- 基础卡片：浅色背景 + 微妙阴影
- 信息卡片：紫色浅背景 + 紫色边框
- 强调卡片：深色背景 + 强阴影

### 其他组件规范

**标签和徽章**：
- 状态徽章：方形圆角，12px 字体
- Pill 徽章：完全圆角，带图标

**Tab 选择器**：
- Sider.ai 胶囊式设计
- 激活状态深色背景

**列表组件**：
- 支持 Group hover 联动
- 图标容器响应悬停

**进度条**：
- 基础款：单色
- 高级款：渐变色
## 💡 实现指南

**查看完整实现细节**：
- 色彩系统、字体、间距 → 参考 `copilot-shadcn-base-style.md`
- 动效实现、时长配置 → 参考 `copilot-shadcn-anima-style.md`
