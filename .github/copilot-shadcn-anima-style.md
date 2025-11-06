# Shadcn/UI 动效实现细节

> **本文档定位**：Framer Motion + Tailwind CSS 动效代码实现  
> **设计原则**：见 `UIAgentAnimaRules.md`

---

## ⚡ 时长标准

| 时长 | 场景 | Framer Motion | Tailwind CSS |
|------|------|---------------|--------------|
| 150ms | 按钮反馈、开关切换 | `stiffness: 400, damping: 17` | `duration-150` |
| 200ms | 悬停、边框变化 | `stiffness: 300, damping: 25` | `duration-200` |
| 300ms | 卡片、菜单展开 | `stiffness: 300, damping: 20` | `duration-300` |
| 500ms | 页面过渡、复杂动画 | `stiffness: 100, damping: 20` | `duration-500` |

---

## 🎯 缓动函数

### Tailwind 配置（推荐）

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',      // 弹性
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',          // 平滑
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // 反弹
      }
    }
  }
}
```

### Tailwind 内置缓动类

- `ease-linear` - 匀速
- `ease-in` - 缓慢开始
- `ease-out` - 缓慢结束（推荐用于进入动画）
- `ease-in-out` - 两端缓慢

---

## 🔘 按钮动效

### Framer Motion 实现

```jsx
import { motion } from "framer-motion"

<motion.button
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
  className="h-[40px] px-6 text-[16px] font-semibold rounded-full
           bg-white text-gray-900 border border-gray-300"
>
  确认
</motion.button>
```

### Tailwind CSS 实现

```html
<button class="h-[40px] px-6 text-[16px] font-semibold rounded-full
             bg-white text-gray-900 border border-gray-300
             transition-all duration-200
             hover:scale-[1.02] hover:-translate-y-0.5
             active:scale-[0.98]">
  确认
</button>
```

---

### 带图标按钮

```jsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="flex items-center gap-2"
>
  <motion.svg
    whileHover={{ rotate: 15 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="w-4 h-4"
  >
    {/* 图标路径 */}
  </motion.svg>
  <span>立即开始</span>
</motion.button>
```

---

### 加载状态按钮

```jsx
<motion.button
  disabled={isLoading}
  className="relative"
>
  <motion.span animate={{ opacity: isLoading ? 0 : 1 }}>
    提交
  </motion.span>
  
  <motion.div
    animate={{ 
      opacity: isLoading ? 1 : 0,
      rotate: isLoading ? 360 : 0 
    }}
    transition={{ 
      rotate: { duration: 0.8, repeat: Infinity, ease: "linear" } 
    }}
    className="absolute inset-0 flex items-center justify-center"
  >
    <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
  </motion.div>
</motion.button>
```

---

## 🃏 卡片动效

### 滚动触发入场

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ type: "spring", stiffness: 100, damping: 20 }}
  className="bg-card border border-border rounded-card p-6"
>
  卡片内容
</motion.div>
```

---

### 悬停上浮效果

**Framer Motion**：
```jsx
<motion.div
  whileHover={{ 
    y: -8, 
    borderColor: "hsl(var(--accent))",
    boxShadow: "0 10px 30px -10px hsl(var(--accent) / 0.3)"
  }}
  transition={{ type: "spring", stiffness: 300, damping: 25 }}
  className="bg-card border border-border rounded-card p-6 cursor-pointer"
>
  卡片内容
</motion.div>
```

**Tailwind CSS**：
```html
<div class="bg-card border border-border rounded-card p-6 
          transition-all duration-300
          hover:-translate-y-2 hover:border-accent 
          hover:shadow-[0_10px_30px_-10px_hsl(var(--accent)/0.3)]">
  卡片内容
</div>
```

---

### 卡片堆叠效果

```jsx
<div className="relative">
  <motion.div
    whileHover={{ rotate: -5, x: -10 }}
    className="absolute top-0 left-0 w-full bg-card rounded-card p-6"
    style={{ zIndex: 3 }}
  />
  <motion.div
    whileHover={{ rotate: -2, x: -5 }}
    className="absolute top-2 left-2 w-full bg-card rounded-card p-6"
    style={{ zIndex: 2 }}
  />
  <div className="bg-card rounded-card p-6" style={{ zIndex: 1 }}>
    主卡片内容
  </div>
</div>
```

---

## 🎚️ 开关动效

### Toggle Switch

**Framer Motion**：
```jsx
<motion.div
  className="relative w-11 h-6 rounded-full cursor-pointer"
  animate={{ 
    backgroundColor: isOn 
      ? "hsl(var(--accent))" 
      : "hsl(var(--input))" 
  }}
  onClick={() => setIsOn(!isOn)}
>
  <motion.div
    className="absolute w-5 h-5 bg-white rounded-full shadow-md"
    animate={{ x: isOn ? 20 : 2, y: 2 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
  />
</motion.div>
```

**Tailwind CSS**：
```html
<div class="relative w-11 h-6 rounded-full cursor-pointer transition-colors duration-200"
     :class="isOn ? 'bg-accent' : 'bg-input'">
  <div class="absolute w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200"
       :class="isOn ? 'translate-x-5 translate-y-0.5' : 'translate-x-0.5 translate-y-0.5'">
  </div>
</div>
```

---

### Checkbox 勾选动画

```jsx
<motion.svg
  viewBox="0 0 24 24"
  className="w-5 h-5"
  initial={false}
  animate={isChecked ? "checked" : "unchecked"}
>
  <motion.path
    d="M5 13l4 4L19 7"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    variants={{
      unchecked: { pathLength: 0 },
      checked: { pathLength: 1 }
    }}
    transition={{ duration: 0.3 }}
  />
</motion.svg>
```

---

## 📝 输入框动效

### 聚焦动画

**Framer Motion**：
```jsx
<motion.input
  whileFocus={{ 
    scale: 1.01,
    borderColor: "hsl(var(--accent))",
    boxShadow: "0 0 0 3px hsl(var(--accent) / 0.1)"
  }}
  transition={{ duration: 0.2 }}
  className="w-full border border-input rounded-lg px-4 py-2 
           bg-background text-foreground focus:outline-none"
/>
```

**Tailwind CSS**：
```html
<input class="w-full border border-input rounded-lg px-4 py-2 
            bg-background text-foreground
            transition-all duration-200
            focus:scale-[1.01] focus:border-accent 
            focus:ring-4 focus:ring-accent/10
            focus:outline-none">
```

---

### 浮动标签

```jsx
<div className="relative">
  <motion.input
    onFocus={() => setIsFocused(true)}
    onBlur={(e) => setIsFocused(e.target.value !== "")}
    className="peer w-full border rounded-lg px-4 pt-6 pb-2"
  />
  <motion.label
    animate={{
      y: isFocused ? 0 : 8,
      scale: isFocused ? 0.75 : 1,
      color: isFocused ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))"
    }}
    className="absolute left-4 top-2 origin-left"
  >
    邮箱地址
  </motion.label>
</div>
```

---

## 🎯 图标动效

### 收藏/点赞

```jsx
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  animate={isLiked ? {
    scale: [1, 1.3, 1],
    rotate: [0, 10, -10, 0]
  } : {}}
  transition={{ duration: 0.3 }}
  onClick={() => setIsLiked(!isLiked)}
>
  <motion.svg
    animate={{ 
      fill: isLiked ? "currentColor" : "none",
      stroke: "currentColor"
    }}
    className={isLiked ? "text-red-500" : "text-gray-400"}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </motion.svg>
</motion.button>
```

### 汉堡菜单（三线变 X）

```jsx
<svg viewBox="0 0 24 24" className="w-6 h-6">
  <motion.line
    x1="3" y1="6" x2="21" y2="6"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
  />
  <motion.line
    x1="3" y1="12" x2="21" y2="12"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    animate={{ opacity: isOpen ? 0 : 1 }}
    transition={{ duration: 0.1 }}
  />
  <motion.line
    x1="3" y1="18" x2="21" y2="18"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
  />
</svg>
```

### 旋转加载器

```jsx
<motion.div
  className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full"
  animate={{ rotate: 360 }}
  transition={{ 
    duration: 0.8, 
    repeat: Infinity, 
    ease: "linear" 
  }}
/>
```

---

## 📋 列表动效

### Stagger Children 渐入

```jsx
<motion.ul
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }}
  initial="hidden"
  animate="show"
  className="space-y-2"
>
  {items.map(item => (
    <motion.li
      key={item.id}
      variants={{
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
      }}
      className="bg-card p-4 rounded-lg"
    >
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

### 列表项 Hover 效果

```html
<div class="flex items-center justify-between p-3 rounded-lg 
          hover:bg-gray-50 cursor-pointer 
          transition-colors duration-200 group">
  <div class="flex items-center gap-3">
    <!-- 图标容器 -->
    <div class="w-8 h-8 rounded-lg bg-violet-100 
              flex items-center justify-center 
              group-hover:bg-violet-200 
              transition-colors duration-200">
      <svg class="w-4 h-4 text-violet-600">...</svg>
    </div>
    
    <!-- 文字 -->
    <div>
      <div class="text-sm font-medium text-gray-900">项目文档</div>
      <div class="text-xs text-gray-500">更新于 2 小时前</div>
    </div>
  </div>
  
  <!-- 箭头 -->
  <svg class="w-5 h-5 text-gray-400 
            group-hover:text-violet-600 
            group-hover:translate-x-1
            transition-all duration-200">→</svg>
</div>
```

---

## 🪟 Modal 动效

### Modal 打开/关闭

```jsx
<AnimatePresence>
  {isOpen && (
    <>
      {/* 遮罩层 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal 内容 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                 bg-card border border-border rounded-card p-8 
                 w-full max-w-md z-50"
      >
        <h3 className="text-lg font-bold mb-4">Modal 标题</h3>
        <p className="text-muted-foreground mb-6">Modal 内容</p>
        <button onClick={() => setIsOpen(false)}>关闭</button>
      </motion.div>
    </>
  )}
</AnimatePresence>
```

### 从底部滑入 Modal

```jsx
<motion.div
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "100%" }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
  className="fixed bottom-0 left-0 right-0 
           bg-card rounded-t-3xl p-6 z-50"
>
  Modal 内容
</motion.div>
```

---

## 🔔 Toast 通知动效

### 从顶部滑入

```jsx
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed top-4 right-4 
               bg-card border border-border rounded-lg p-4 shadow-lg
               z-50"
    >
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 text-green-500">✓</div>
        <div>
          <div className="font-semibold text-sm">成功</div>
          <div className="text-xs text-muted-foreground">操作已完成</div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
```

### 进度条自动关闭

```jsx
<motion.div className="relative">
  <div className="bg-card p-4 rounded-lg">
    Toast 内容
  </div>
  
  {/* 底部进度条 */}
  <motion.div
    initial={{ scaleX: 1 }}
    animate={{ scaleX: 0 }}
    transition={{ duration: 3, ease: "linear" }}
    onAnimationComplete={() => setIsVisible(false)}
    className="absolute bottom-0 left-0 h-1 bg-accent rounded-b-lg"
    style={{ transformOrigin: "left" }}
  />
</motion.div>
```

---

## 📁 下拉菜单动效

### 下拉展开

```jsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="absolute top-full mt-2 
               bg-card border border-border rounded-lg shadow-lg 
               py-2 min-w-[200px]"
    >
      {menuItems.map(item => (
        <motion.button
          key={item.id}
          whileHover={{ backgroundColor: "hsl(var(--accent) / 0.1)" }}
          className="w-full px-4 py-2 text-left text-sm"
        >
          {item.label}
        </motion.button>
      ))}
    </motion.div>
  )}
</AnimatePresence>
```

### 菜单项 Stagger

```jsx
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  }}
  initial="hidden"
  animate="show"
>
  {menuItems.map(item => (
    <motion.button
      key={item.id}
      variants={{
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 }
      }}
    >
      {item.label}
    </motion.button>
  ))}
</motion.div>
```

---

## 🔄 加载状态

### 骨架屏

**Framer Motion**：
```jsx
<motion.div
  className="bg-muted rounded-lg h-4 w-full"
  animate={{ opacity: [0.5, 1, 0.5] }}
  transition={{ 
    duration: 1.5, 
    repeat: Infinity,
    ease: "easeInOut"
  }}
/>
```

**Tailwind CSS**：
```html
<div class="bg-muted rounded-lg h-4 w-full animate-pulse"></div>
```

---

### 旋转加载器

```jsx
<motion.div
  className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full"
  animate={{ rotate: 360 }}
  transition={{ 
    duration: 0.8, 
    repeat: Infinity, 
    ease: "linear" 
  }}
/>
```

---

### 点状加载器

```jsx
<div className="flex gap-2">
  {[0, 1, 2].map((index) => (
    <motion.div
      key={index}
      className="w-2 h-2 bg-accent rounded-full"
      animate={{ 
        scale: [1, 1.5, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        delay: index * 0.2
      }}
    />
  ))}
</div>
```

---

## 📊 进度条动效

### 数值增长动画

```jsx
import { useSpring, animated } from '@react-spring/web'

function ProgressBar({ value }) {
  const props = useSpring({ 
    width: `${value}%`,
    from: { width: '0%' },
    config: { tension: 280, friction: 60 }
  })
  
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <animated.div 
        style={props}
        className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
      />
    </div>
  )
}
```

### 环形进度条

```jsx
<svg className="w-24 h-24 transform -rotate-90">
  <circle
    cx="48"
    cy="48"
    r="44"
    stroke="hsl(var(--muted))"
    strokeWidth="8"
    fill="none"
  />
  <motion.circle
    cx="48"
    cy="48"
    r="44"
    stroke="hsl(var(--accent))"
    strokeWidth="8"
    fill="none"
    strokeDasharray={276} // 2 * π * r
    initial={{ strokeDashoffset: 276 }}
    animate={{ strokeDashoffset: 276 * (1 - progress / 100) }}
    transition={{ duration: 1, ease: "easeOut" }}
  />
</svg>
```

---

## 🎨 高级特效

### 视差滚动

```jsx
import { useScroll, useTransform } from "framer-motion"

function ParallaxSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -150])
  
  return (
    <motion.div style={{ y }}>
      背景层内容
    </motion.div>
  )
}
```

### 拖拽释放

```jsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
  dragElastic={0.2}
  whileDrag={{ 
    scale: 1.1, 
    cursor: "grabbing",
    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)"
  }}
  className="w-20 h-20 bg-accent rounded-lg cursor-grab"
/>
```

### 页面过渡

```jsx
// pages/_app.js with Framer Motion
<AnimatePresence mode="wait">
  <motion.div
    key={router.pathname}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
  >
    <Component {...pageProps} />
  </motion.div>
</AnimatePresence>
```

---

## ♿ 性能与可访问性

### 尊重用户偏好

```jsx
import { useReducedMotion } from "framer-motion"

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
    >
      内容
    </motion.div>
  )
}
```

---

### GPU 加速原则

**✅ 推荐动画属性**：
- `transform` (translate, scale, rotate)
- `opacity`

**❌ 避免动画属性**（触发 layout 重排）：
- `width` / `height`
- `top` / `left` / `margin`
- `padding` / `border-width`

```jsx
// ✅ 推荐
<motion.div animate={{ x: 100, scale: 1.2 }} />

// ❌ 避免
<motion.div animate={{ left: 100, width: 200 }} />
```

---

## ✅ 动效实现检查清单

- [ ] 时长合理（150-300ms）
- [ ] 使用 spring 而非线性
- [ ] 按钮有 hover 和 active 状态
- [ ] 卡片有 hover 提升效果
- [ ] Modal 有进入/退出动画
- [ ] 列表使用 stagger 渐入
- [ ] 加载状态有明确反馈
- [ ] 使用 transform 和 opacity
- [ ] 避免动画 width/height
- [ ] 尊重 prefers-reduced-motion
- [ ] 使用 AnimatePresence 处理退出
- [ ] 过渡流畅无卡顿

---
