---
type: "manual"
---

# UI 设计规则 

> **设计系统**：shadcn/ui + Tailwind CSS  
> **动效库**：Framer Motion（可选）  
> **核心原则**：简洁、现代、高性能
---

## 📚 兼容工具链

| 类别 | 推荐工具 | 状态 |
|:-----|:---------|:-----|
| 动效 | Framer Motion / Motion One | ✅ |
| 图标 | Heroicons / Lucide | ✅ |
| 表单 | React Hook Form / Zod | ✅ |
| 多主题 | Tailwind variants / CSS vars | ✅ |

##  图标系统

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

**常用图标推荐**：
- **操作**：`Plus`, `Minus`, `X`, `Check`, `Edit`, `Trash2`, `Save`
- **导航**：`ChevronLeft`, `ChevronRight`, `ChevronDown`, `Menu`, `Home`
- **状态**：`AlertCircle`, `CheckCircle`, `XCircle`, `Info`, `Loader2`
- **功能**：`Search`, `Settings`, `User`, `Mail`, `Bell`, `Heart`

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

## 🎯 核心原则总结

1. ⚡ **快速响应** - 150-300ms 动画
2. 🎨 **品牌一致** - 紫色系小面积点缀
3. 🌊 **流畅自然** - Spring 弹性动画
4. 🎭 **克制优雅** - 恰到好处，不过度
5. 🚀 **性能优先** - GPU 加速，避免 layout

> **设计哲学**：好的设计是隐形的，用户感受到的是流畅，而非设计本身。

