
>  UI设计规范 - **强制执行**

使用 **shadcn/ui + Tailwind CSS** 作为设计系统，实现统一的 UI 规范。

## 🎯 设计系统组合

**核心优势**：
- ✅ 现代美学
- ✅ 无限扩展（shadcn/ui）
- ✅ 工程友好（Tailwind CSS）
- ✅ 高可维护、品牌统一、长期演进

## 📚 兼容工具链

| 类别 | 推荐工具 | 状态 |
|:-----|:---------|:-----|
| 动效 | Framer Motion / Motion One | ✅ |
| 图标 | **Lucide React**（强制） | ✅ |
| 表单 | React Hook Form / Zod | ✅ |
| 多主题 | Tailwind variants / CSS vars | ✅ |

## 🎯 核心设计原则

### 基本原则
1. **CRAP 四原则**（《写给大家看的设计书》）
   - Contrast (对比)
   - Repetition (重复)
   - Alignment (对齐)
   - Proximity (亲密性)

2. **交互自明性**（《Don't Make Me Think》）
   - 自解释性、减少认知负担、即时反馈、视觉层级

3. **动效设计**（《Designing Interface Animation》）
   - 有目的的动效、速度与缓动、连贯性、性能优先

4. **UX 定律**（《Laws of UX》）
   - Hick's Law、Fitts's Law、Miller's Law、Jakob's Law、Peak-End Rule

5. **前端实战**（《Refactoring UI》）
   - 从功能出发、建立设计系统、少用边框、留白高级感、层次化灰色

6. **简化四原则**（《简约至上》）
   - 删除、组织、隐藏、转移


### 微交互原则
- ⚡ **即时反馈**：每个操作 150-300ms 内完成响应
- 🎯 **目的明确**：动效服务于用户理解，而非炫技
- 🌊 **流畅自然**：使用 spring easing，避免生硬的线性动画
- 📱 **尊重偏好**：检测用户的 `prefers-reduced-motion` 设置

## 🎨 设计灵感来源

| 来源 | 用途 | 链接 |
|------|------|------|
| 🎨 HeroUI | 组件设计与规范 | [heroui.com](https://www.heroui.com/) |
| 🎬 motion.dev | 动效参考 | [motion.dev/examples](https://motion.dev/examples) |
| 🎠 embla-carousel | 轮播交互 | 官方文档 |

---

## 参考文档

- [Tailwind CSS 文档](https://tailwindcss.com/docs)
