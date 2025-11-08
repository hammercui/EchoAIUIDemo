# 微交互动效设计规范 - HeroUI 风格

> **本文档定位**：基于 HeroUI 的动效设计原则和标准
> **基础规范**：见 `UIAgentRules.md`
> **动效库**：HeroUI 内置动效 + Framer Motion（可选）

---

## 🎯 核心设计目标

- ⚡ **即时反馈** - 150-300ms 内完成响应
- 🌊 **流畅自然** - 使用 spring 弹性动画
- 🎯 **目的明确** - 动效服务于用户理解
- 📱 **尊重偏好** - 检测 `prefers-reduced-motion`
- 🚀 **性能优先** - 只动画 `transform` 和 `opacity`

---

## ⚡ 时长标准

| 时长 | 适用场景 | 用户感知 |
|------|----------|----------|
| **150ms** | 按钮反馈、开关切换 | 瞬间响应，无等待感 |
| **200ms** | 悬停效果、边框变化 | 快速过渡，流畅自然 |
| **300ms** | 卡片展开、菜单显示 | 平滑展开，舒适观感 |
| **500ms** | 页面过渡、复杂动画 | 完整动效，戏剧性强 |

**缓动曲线**：
- ✅ **Spring** - 物理弹性，自然流畅（推荐）
- ✅ **Ease Out** - 元素进入视口
- ✅ **Ease In** - 元素离开视口
- ❌ 避免 ease-in-out（感觉迟钝）

---

## 🎯 HeroUI 动效特色

### 品牌动效调性

- 🌊 **流畅** - Spring 弹性，无突兀感
- ✨ **精致** - 细节丰富，多属性组合
- 🎨 **现代** - 边框高亮优于阴影
- ⚡ **快速** - 150-300ms，不拖沓
- 🎭 **克制** - 恰到好处，不过度

### 标准动效模式

**1. 按钮微交互**
- 悬停：轻微放大（`scale: 1.05`）
- 点击：缩小反馈（`scale: 0.97`）
- 加载：HeroUI `isLoading` 自动处理旋转动画
- 禁用：`opacity: 0.5`，无交互反馈

**2. 卡片悬停**
- 上浮效果（`translateY: -4px`）
- 边框高亮（使用 HeroUI 颜色系统）
- 平滑过渡（`duration: 200ms`）
- 避免添加大阴影（过时设计）

**3. 列表渐入**
- Stagger children 效果（`staggerChildren: 0.05-0.1`）
- 淡入 + 上移（`opacity: 0 → 1, y: 20 → 0`）
- 骨架屏 → 内容渐入
- 避免所有项同时出现

**4. Modal/Drawer 动画**
- 遮罩淡入（`opacity: 0 → 1, duration: 200ms`）
- 内容缩放淡入（`scale: 0.95 → 1, opacity: 0 → 1`）
- 退出动画对称
- HeroUI 支持 `motionProps` 自定义

**5. 表单交互**
- 聚焦：边框高亮（HeroUI 自动处理）
- 错误：抖动动画（`x: [-10, 10, -10, 10, 0]`）
- 成功：绿色边框 + 对勾图标淡入
- 浮动标签：HeroUI 自动上移动画

**6. 主题切换**
- 图标旋转（`rotate: 0 → 180, duration: 300ms`）
- 颜色变量平滑过渡（`transition: 200ms`）
- 太阳/月亮图标切换

---

## 🎬 交互场景规范

### 按钮交互
- ✅ 加载：`isLoading` 属性，自动旋转动画
- ✅ 禁用：`isDisabled` 属性，`opacity: 0.5`
- ✅ 图标：`startContent` / `endContent`
- ❌ 禁忌：过度放大（>1.1）、过度位移（>5px）、过慢动画（>300ms）

### 表单交互
- ✅ 聚焦：HeroUI 自动边框高亮
- ✅ 错误：`isInvalid` + 抖动动画
- ✅ 浮动标签：HeroUI 自动上移
- ❌ 禁忌：聚焦时过度放大、错误提示突然出现

### 列表交互
- ✅ 加载：骨架屏 → stagger 渐入（`staggerChildren: 0.05`）
- ✅ 悬停：背景色变化 + 箭头位移
- ✅ 删除：滑出动画 + 其他项位移填补
- ❌ 禁忌：所有项同时出现、删除瞬间消失

### Modal/Drawer
- ✅ 打开：遮罩淡入 + 内容缩放淡入
- ✅ 关闭：退出动画与进入对称
- ✅ 内容：stagger children 渐入
- ❌ 禁忌：从屏幕外滑入、关闭无动画

---

## ✅ 动效设计检查清单

### 基础规范
- [ ] 动画时长 150-300ms（常规交互）
- [ ] 优先使用 spring 弹性动画
- [ ] 使用 HeroUI 组件的内置动画
- [ ] Modal 有进入和退出动画
- [ ] 列表使用 stagger children 渐入

### HeroUI 特定
- [ ] 使用 HeroUI 颜色系统（语义化颜色）
- [ ] 利用 HeroUI 的 variant 系统
- [ ] 使用 HeroUI 的 motion props
- [ ] 遵循 HeroUI 的 layout tokens
- [ ] 充分利用 React Aria 的可访问性

### 性能与无障碍
- [ ] 只动画 transform 和 opacity
- [ ] 使用 AnimatePresence 处理退出
- [ ] 尊重 prefers-reduced-motion
- [ ] 避免动画 width/height
- [ ] 低性能设备降级动效

### 现代化风格
- [ ] 按钮悬停轻微放大（scale: 1.05）
- [ ] 卡片悬停上浮（translateY: -4px）
- [ ] 边框高亮而非添加阴影
- [ ] 使用 HeroUI 的渐变色系统
- [ ] Toast/通知使用 HeroUI 组件

---

## 📚 参考资源

**HeroUI 文档**：
- [HeroUI 官方文档](https://www.heroui.com/docs/guide/introduction)
- [HeroUI 组件库](https://www.heroui.com/docs/components/button)
- [HeroUI 动画指南](https://www.heroui.com/docs/customization/theme)

**技术文档**：
- [Framer Motion 官方文档](https://www.framer.com/motion/)
- [React Aria 文档](https://react-spectrum.adobe.com/react-aria/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

**设计理论**：
- 《Designing Interface Animation》 - Val Head
- 《Motion Design for iOS》 - Mike Rundle

---

## 🎯 核心原则总结

1. ⚡ **快速响应** - 150-300ms
2. 🌊 **流畅自然** - Spring 弹性
3. 🎯 **目的明确** - 服务用户理解
4. 🎭 **克制使用** - 恰到好处
5. 🚀 **性能优先** - GPU 加速

> 好的动效是隐形的，用户感受到的是流畅，而非动画本身。
