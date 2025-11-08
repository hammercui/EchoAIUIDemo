---
type: "manual"
---

# UI 设计规则 

> **设计系统**：shadcn/ui + HeroUI 皮肤 + Tailwind CSS  
> **动效库**：HeroUI 内置 + Framer Motion（可选）  
> **核心原则**：简洁、现代、高性能

---

## 📚 兼容工具链

| 类别 | 推荐工具 | 状态 |
|:-----|:---------|:-----|
| 动效 | Framer Motion / Motion One | ✅ |
| 图标 | Heroicons / Lucide | ✅ |
| 表单 | React Hook Form / Zod | ✅ |
| 多主题 | Tailwind variants / CSS vars | ✅ |

## 🎨 色彩系统

### 品牌色定义
```javascript
// tailwind.config.js
{
  default: "hsl(222, 47%, 11%)",      // Slate-900 - 主按钮、重要元素
  primary: "hsl(262, 83%, 58%)",      // 紫色 - CTA、强调元素
  secondary: "hsl(262, 90%, 70%)",    // Violet-400 - 图标、hover、链接
  background: "hsl(262, 90%, 97%)",   // Violet-50 - 浅色背景
}
```

### 使用原则
- ✅ 使用语义化颜色：`color="primary"` / `bg-primary`
- ✅ 紫色系仅用于小面积点缀（<20%）
- ✅ 默认按钮：白色背景 + 深色边框
- ❌ 禁止硬编码颜色值
- ❌ 禁止大块紫色背景
- ❌ 禁止纯黑 `#000` / 纯白 `#fff`

### 状态色
- 成功：`bg-green-50 text-green-600`
- 警告：`bg-yellow-50 text-yellow-600`
- 错误：`bg-red-50 text-red-600`
- 信息：`bg-violet-50 text-violet-600`

---

## 📐 布局标准

### 间距系统（使用 Tailwind）
- **超小**：`gap-1` (4px) - 紧密元素
- **小**：`gap-2` (8px) - 相关元素
- **中**：`gap-4` (16px) - 默认间距
- **大**：`gap-6` (24px) - 区块间距
- **超大**：`gap-8` (32px) - 页面区块

### 圆角标准
- **小**：`rounded-sm` (2px) - 输入框、标签
- **中**：`rounded-md` (6px) - 按钮、卡片
- **大**：`rounded-lg` (8px) - Modal、大卡片
- **圆形**：`rounded-full` - 头像、徽章

### 字体大小
- **超小**：`text-xs` (12px) - 辅助文字
- **小**：`text-sm` (14px) - 正文
- **中**：`text-base` (16px) - 默认
- **大**：`text-lg` (18px) - 小标题
- **超大**：`text-xl` (20px) - 标题

---

## � 图标系统

### 图标库：Lucide React

**安装**：
```bash
npm install lucide-react
```

**使用原则**：
- ✅ 统一使用 Lucide React 图标库
- ✅ 图标大小与文字大小保持一致
- ✅ 图标颜色继承父元素文字颜色
- ❌ 禁止混用其他图标库

**常用图标尺寸**：
- **小**：`size={16}` - 配合 `text-sm`
- **中**：`size={20}` - 配合 `text-base`（默认）
- **大**：`size={24}` - 配合 `text-lg`

**使用示例**：
```jsx
import { Check, X, AlertCircle, Loader2 } from 'lucide-react';

// 按钮图标
<Button startContent={<Check size={20} />}>
  确认
</Button>

// 状态图标
<AlertCircle size={16} className="text-red-600" />

// 加载图标（带旋转动画）
<Loader2 size={20} className="animate-spin" />
```

**常用图标推荐**：
- **操作**：`Plus`, `Minus`, `X`, `Check`, `Edit`, `Trash2`, `Save`
- **导航**：`ChevronLeft`, `ChevronRight`, `ChevronDown`, `Menu`, `Home`
- **状态**：`AlertCircle`, `CheckCircle`, `XCircle`, `Info`, `Loader2`
- **功能**：`Search`, `Settings`, `User`, `Mail`, `Bell`, `Heart`

---

## �🎯 组件设计规范

### 按钮（Button）
**变体**：
- `solid` - 实心按钮（默认）
- `bordered` - 边框按钮
- `light` - 浅色背景
- `flat` - 无边框
- `ghost` - 透明背景

**颜色**：
- `default` - Slate-900（主按钮）
- `primary` - 紫色渐变（CTA）
- `secondary` - Violet-400（次要）

**尺寸**：
- `sm` - 小按钮（32px）
- `md` - 中等（40px，默认）
- `lg` - 大按钮（48px）

**状态**：
- `isLoading` - 加载状态
- `isDisabled` - 禁用状态
- `startContent` / `endContent` - 图标

### 卡片（Card）
**变体**：
- `shadow` - 带阴影（默认）
- `bordered` - 边框样式
- `flat` - 无阴影

**悬停效果**：
- 上浮：`translateY: -4px`
- 边框高亮（使用 primary 色）
- 避免添加大阴影

### 输入框（Input）
**变体**：
- `flat` - 扁平样式（默认）
- `bordered` - 边框样式
- `underlined` - 下划线
- `faded` - 淡化背景

**状态**：
- `isInvalid` - 错误状态
- `isDisabled` - 禁用状态
- `errorMessage` - 错误提示

---

## ⚡ 动效规范

### 时长标准
| 时长 | 场景 | 感知 |
|------|------|------|
| 150ms | 按钮反馈、开关 | 瞬间响应 |
| 200ms | 悬停、边框变化 | 快速过渡 |
| 300ms | 卡片展开、菜单 | 平滑展开 |
| 500ms | 页面过渡 | 完整动效 |

### 标准动效模式

**按钮微交互**：
- 悬停：`scale: 1.05`
- 点击：`scale: 0.97`
- 加载：`isLoading` 自动旋转
- 禁用：`opacity: 0.5`

**卡片悬停**：
- 上浮：`translateY: -4px`
- 边框高亮（primary 色）
- 过渡：`duration: 200ms`

**列表渐入**：
- Stagger：`staggerChildren: 0.05`
- 淡入上移：`opacity: 0→1, y: 20→0`
- 骨架屏 → 内容渐入

**Modal 动画**：
- 遮罩淡入：`opacity: 0→1`
- 内容缩放：`scale: 0.95→1`
- 退出动画对称

**表单交互**：
- 聚焦：边框高亮（自动）
- 错误：抖动 `x: [-10,10,-10,10,0]`
- 成功：绿色边框 + 对勾淡入

### 性能优先
**推荐**（GPU 加速）：
- ✅ `transform` (translate, scale, rotate)
- ✅ `opacity`

**避免**（触发 layout）：
- ❌ `width` / `height`
- ❌ `top` / `left` / `margin`
- ❌ `padding` / `border-width`

---

## 🎭 设计原则

### CRAP 四原则
1. **Contrast** - 对比：重要元素突出
2. **Repetition** - 重复：保持一致性
3. **Alignment** - 对齐：视觉整洁
4. **Proximity** - 亲密性：相关元素靠近

### 交互自明性
- 自解释性：无需说明即可理解
- 减少认知负担：简化操作流程
- 即时反馈：操作立即响应
- 视觉层级：重要信息优先

### 简化四原则
1. **删除**：移除不必要的元素
2. **组织**：按逻辑分组
3. **隐藏**：渐进式展示
4. **转移**：复杂功能后置

---

## ✅ 开发检查清单

### 基础规范
- [ ] 使用 HeroUI 组件而非自定义
- [ ] 使用语义化颜色（`color="primary"`）
- [ ] 使用 Tailwind 间距系统（`gap-4`）
- [ ] 使用 Lucide React 图标库
- [ ] 图标大小与文字大小匹配
- [ ] 按钮有 hover 和 active 状态
- [ ] 表单有错误提示和验证

### 动效规范
- [ ] 动画时长 150-300ms
- [ ] 只动画 `transform` 和 `opacity`
- [ ] Modal 有进入和退出动画
- [ ] 列表使用 stagger 渐入
- [ ] 尊重 `prefers-reduced-motion`

### 色彩规范
- [ ] 紫色系占比 <20%
- [ ] 使用 HeroUI 颜色系统
- [ ] 避免大块紫色背景
- [ ] 状态色使用语义化颜色
- [ ] 深色模式适配

### 可访问性
- [ ] 键盘导航支持
- [ ] ARIA 属性完整
- [ ] 颜色对比度 ≥4.5:1
- [ ] 聚焦状态可见
- [ ] 屏幕阅读器友好

---

## 🚫 严格禁止

| 禁止项 | 原因 | 替代方案 |
|--------|------|---------|
| 纯黑/纯白 | 视觉刺眼 | 使用语义化颜色 |
| 硬编码颜色 | 无法适配主题 | 使用 HeroUI 颜色系统 |
| 大块紫色背景 | 视觉过强 | 小面积点缀 |
| 长动画（>300ms） | 拖慢节奏 | 150-200ms |
| 不一致间距 | 视觉混乱 | 使用 Tailwind 间距 |
| 过度阴影 | 过时设计 | 边框高亮 |

---

## 📚 快速参考

### 常用组件
```jsx
import { Check, Plus, Search, Loader2 } from 'lucide-react';

// 按钮（带图标）
<Button
  color="primary"
  size="md"
  startContent={<Plus size={20} />}
  isLoading={loading}
>
  添加
</Button>

// 卡片
<Card className="hover:-translate-y-1 transition-transform">
  <CardBody>内容</CardBody>
</Card>

// 输入框（带图标）
<Input
  label="搜索"
  variant="bordered"
  startContent={<Search size={16} />}
  isInvalid={hasError}
  errorMessage="请输入有效邮箱"
/>

// 加载状态
<Button isLoading color="primary">
  <Loader2 size={20} className="animate-spin" />
  加载中...
</Button>

// Modal
<Modal motionProps={{
  variants: {
    enter: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 }
  }
}}>
  <ModalContent>...</ModalContent>
</Modal>
```

### 常用 Tailwind 类
```css
/* 间距 */
gap-4 p-4 m-4 space-y-4

/* 圆角 */
rounded-md rounded-lg rounded-full

/* 颜色 */
bg-primary text-primary-foreground
bg-violet-50 text-violet-600

/* 动效 */
transition-transform hover:scale-105
active:scale-95 duration-200
```

---

## 🎯 核心原则总结

1. ⚡ **快速响应** - 150-300ms 动画
2. 🎨 **品牌一致** - 紫色系小面积点缀
3. 🌊 **流畅自然** - Spring 弹性动画
4. 🎭 **克制优雅** - 恰到好处，不过度
5. 🚀 **性能优先** - GPU 加速，避免 layout

> **设计哲学**：好的设计是隐形的，用户感受到的是流畅，而非设计本身。

