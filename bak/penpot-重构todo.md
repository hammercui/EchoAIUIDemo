# Penpot 项目重构待办事项

## 📊 项目状态总览

**完成进度**: 11/17 任务 (64.7%)

### ✅ 已完成工作

#### 1. 页面结构 ✅
- ✅ 创建 `Design System` 页面
- ✅ 将 `version-1` 重命名为 `Main`
- ✅ 创建 Design Tokens 展示板

#### 2. 组件库 ✅ (8个组件已创建)

| 组件名 | 状态 | 位置 | 特性 |
|--------|------|------|------|
| `Icon/Add` | ✅ 完成 | Design System | Flex Layout, 圆形+加号文本 |
| `Button/Primary` | ✅ 完成 | Design System | Flex Layout, 可替换文本, padding 16/8 |
| `Timeline/Node` | ✅ 完成 | Design System | 椭圆形节点组件 |
| `Timeline/Branch` | ✅ 完成 | Design System | 矩形分支线 |
| `Card/Version` | ✅ 完成 | Design System | **Flex Layout 垂直布局, 替代 Group** |
| `Tag/Default` | ✅ 完成 | Design System | Flex Layout, padding 8/4 |
| `SearchBar` | ✅ 完成 | Design System | Flex Layout 水平容器 |
| `PromptCard` | ✅ 完成 | Design System | Flex Layout 垂直容器 |

---

## ⚠️ 待完成任务

### 🔴 高优先级 (核心重构)

#### **任务 12: 创建 Panel 组件**
**目标**: 从 Candidate Panel 提取侧边面板组件

**操作步骤**:
1. 在 Design System 页面创建 `Panel/Candidate` 组件
2. 从 Main 页面提取以下元素:
   - `Candidate Panel` (背景)
   - `Panel Title`
   - `Search Box`, `Search Icon`, `Search Placeholder`
   - `Tags Label`, Tag 相关元素
   - `Prompts Label`, Prompt 卡片
3. 使用 Board + Flex Layout 组织:
   ```
   Panel/Candidate
   ├─ Background (Rectangle)
   └─ Content (Flex: column, padding: 24, gap: 16)
       ├─ Header Section
       ├─ Search Section (使用 SearchBar 组件实例)
       ├─ Tags Section (使用 Tag 组件实例)
       └─ Prompts Section (使用 PromptCard 组件实例)
   ```

**预期结果**: 
- 创建 1 个可复用的侧边面板组件
- 减少 Main 页面中 15+ 个散乱元素

---

#### **任务 13: ⭐ 在 Main 页面重建版本时间轴容器**
**目标**: 用组件实例替换 6 个 Group，建立规范的 Flex Layout 结构

**当前问题**:
```
Main 页面存在 6 个 Group:
- VersionToken-5 (Group)
- VersionToken-4 (Group)
- VersionToken-3 (Group)
- VersionToken-2 (Group)
- VersionToken-1 (Group)
- Group (未命名)
```

**操作步骤**:

1. **删除旧的 Group 结构**
   - 删除所有 `VersionToken-X` Group
   - 删除未命名的 `Group`

2. **创建 TimelineContainer Board**
   ```javascript
   const timelineContainer = penpot.createBoard();
   timelineContainer.name = "TimelineContainer";
   
   const layout = timelineContainer.addFlexLayout();
   layout.dir = 'column';
   layout.rowGap = 24; // lg spacing
   layout.verticalPadding = 32; // xl
   layout.horizontalPadding = 24; // lg
   ```

3. **使用组件实例重建时间轴**
   
   对于每个版本节点，创建结构:
   ```
   TimelineItem (Board with Flex: row, gap: 16)
   ├─ Timeline/Node (组件实例)
   ├─ Timeline/Branch (组件实例)
   └─ Card/Version (组件实例)
       ├─ Title: "v1.5"
       ├─ Description: "xxx"
       └─ Time: "2024-01-15"
   ```

4. **添加主时间轴线**
   ```
   Timeline Trunk (Rectangle)
   - 位置: 贯穿所有节点
   - 颜色: #3b82f6 (main-line)
   - 宽度: 4px
   ```

5. **添加子版本分支** (v1.1, v1.2)
   ```
   SubTimeline (Board with Flex: row)
   ├─ SubMainLine (Rectangle)
   ├─ SubBranch (Timeline/Branch 实例)
   ├─ SubNode (Timeline/Node 实例)
   └─ SubCard (简化版卡片)
   ```

**预期结果**:
- ✅ 删除所有 6 个 Group
- ✅ 创建 1 个 TimelineContainer Board
- ✅ 使用 5 个 Card/Version 实例
- ✅ 使用 5 个 Timeline/Node 实例
- ✅ 使用 Flex Layout 管理布局
- ✅ 保持原有视觉效果

---

### 🟡 中优先级 (清理优化)

#### **任务 14: 清理和组织拖拽手柄元素**
**目标**: 整理 36 个 DragHandle 椭圆元素

**当前散乱元素**:
```
DragHandle-1-0-0, DragHandle-1-0-1
DragHandle-1-1-0, DragHandle-1-1-1
DragHandle-1-2-0, DragHandle-1-2-1
... (共 36 个)
```

**操作方案**:

**方案 A: 创建 DragHandle 组件**
```
Component: Interaction/DragHandle
- 2 个椭圆 (水平/垂直)
- 可作为卡片的子元素
```

**方案 B: 整合到 Card 组件**
- 在 `Card/Version` 组件中添加拖拽手柄层
- 作为组件的可选装饰元素

**方案 C: 隐藏/删除** (如果不需要在静态设计中显示)
- 这些可能是交互原型专用元素
- 实际代码中通过 CSS 实现

**建议**: 方案 C - 在静态设计稿中删除，在实际代码实现中添加

---

#### **任务 15: 清理和组织动效元素**
**目标**: 整理 Ripple-1/2/3 动效圆形

**当前元素**:
```
Ripple-1 (ellipse)
Ripple-2 (ellipse)
Ripple-3 (ellipse)
```

**操作方案**:

**方案 A: 创建 Ripple 组件**
```
Component: Effect/Ripple
- 3 层同心圆
- 不同透明度
- 作为按钮 hover/pressed 状态的装饰
```

**方案 B: 整合到 Button 组件的 Variant**
```
Button/Primary
├─ default (无 ripple)
├─ hover (显示 ripple-1)
└─ pressed (显示 ripple-1,2,3)
```

**方案 C: 删除** (在代码中用 CSS animation 实现)

**建议**: 方案 C - 动效在静态设计稿中意义不大，用代码实现更灵活

---

### 🟢 低优先级 (完善验证)

#### **任务 16: 验证最终结构**
**目标**: 确保 100% 符合 PenpotRules.md 规范

**检查清单**:

- [ ] **页面结构**
  - [ ] 只有 2 个页面: Design System, Main
  - [ ] Design System 包含所有组件
  - [ ] Main 只包含组件实例

- [ ] **组件规范**
  - [ ] 所有组件使用 Board (非 Group)
  - [ ] 所有组件使用 Flex Layout
  - [ ] 所有组件命名符合 `大类/子类` 规范
  - [ ] 文本可替换 (作为 props)

- [ ] **布局规范**
  - [ ] Main 页面中无 Group
  - [ ] 所有容器使用 Flex Layout
  - [ ] 无绝对定位元素
  - [ ] 无手动对齐元素

- [ ] **命名规范**
  - [ ] 无未命名图层 (如 `Rectangle 23`)
  - [ ] 无重复命名
  - [ ] 所有元素有语义化名称

- [ ] **Token 使用**
  - [ ] 颜色使用 Token (#6C5CE7, #3b82f6 等)
  - [ ] 间距使用 Token (4/8/16/24/32)
  - [ ] 圆角使用 Token (4/8/16)

**执行方式**:
```javascript
// 在 Penpot MCP 中执行验证脚本
const validation = {
  mainGroups: penpotUtils.findShapes(s => s.type === 'group', mainPage.root),
  unnamedShapes: penpotUtils.findShapes(s => s.name.includes('Rectangle') || s.name.includes('Ellipse')),
  components: penpot.library.local.components
};

// 应该返回:
// mainGroups: []
// unnamedShapes: []
// components: 9+ 个
```

---

#### **任务 17: 导出设计验证**
**目标**: 确认重构后视觉效果与原设计一致

**操作步骤**:

1. **导出关键界面截图**
   ```javascript
   // 使用 penpot MCP 导出
   await penpot.export_shape("TimelineContainer", {
     format: "png",
     filePath: "fab-demo/specs/验证截图/timeline-after.png"
   });
   ```

2. **对比验证**
   - 时间轴整体布局
   - 版本卡片样式
   - 节点和分支线
   - 颜色和间距

3. **生成设计文档**
   ```javascript
   // 导出组件样式
   const css = penpot.generateStyle(components, { type: 'css' });
   // 保存到 fab-demo/specs/penpot-styles.css
   ```

---

## 📋 执行建议

### 推荐执行顺序:

1. **先完成任务 13** (核心重构) ⭐
   - 这是最关键的任务
   - 消除所有 Group
   - 建立标准化结构

2. **再完成任务 14-15** (清理)
   - 可选任务
   - 建议直接删除，在代码中实现

3. **最后完成任务 12, 16-17** (完善)
   - Panel 组件可以后续添加
   - 验证和导出作为收尾工作

### 预估工作量:

| 任务 | 优先级 | 预估时间 | 复杂度 |
|------|--------|----------|--------|
| 任务 12 | 高 | 30分钟 | 中 |
| 任务 13 | 🔥 最高 | 1小时 | 高 |
| 任务 14 | 中 | 15分钟 | 低 |
| 任务 15 | 中 | 10分钟 | 低 |
| 任务 16 | 低 | 20分钟 | 低 |
| 任务 17 | 低 | 15分钟 | 低 |

**总计**: 约 2.5 小时

---

## 🚀 快速执行脚本

### 一键完成任务 13 (重建时间轴)

```javascript
// 在 Penpot MCP 中执行
const mainPage = penpotUtils.getPageByName("Main");
penpot.openPage(mainPage.id);

// 1. 删除所有 Group
const groups = penpotUtils.findShapes(s => s.type === 'group', mainPage.root);
groups.forEach(g => g.remove());

// 2. 创建 TimelineContainer
const container = penpot.createBoard();
container.name = "TimelineContainer";
container.x = 100;
container.y = 100;
const layout = container.addFlexLayout();
layout.dir = 'column';
layout.rowGap = 24;

// 3. 获取组件
const nodeComp = penpot.library.local.components.find(c => c.name === 'Node');
const cardComp = penpot.library.local.components.find(c => c.name === 'Version');

// 4. 创建 5 个时间轴项
const versions = [
  { title: 'v1.5', desc: '最新版本', time: '2024-01-15' },
  { title: 'v1.4', desc: '稳定版本', time: '2024-01-10' },
  { title: 'v1.3', desc: '功能更新', time: '2024-01-05' },
  { title: 'v1.2', desc: '性能优化', time: '2023-12-28' },
  { title: 'v1.0', desc: '初始版本', time: '2023-12-20' }
];

versions.forEach((v, i) => {
  const item = penpot.createBoard();
  item.name = `TimelineItem-${i+1}`;
  const itemLayout = item.addFlexLayout();
  itemLayout.dir = 'row';
  itemLayout.columnGap = 16;
  
  // 添加组件实例
  const node = nodeComp.createInstance();
  const card = cardComp.createInstance();
  
  item.appendChild(node);
  item.appendChild(card);
  container.appendChild(item);
});

console.log('✅ 时间轴重建完成');
```

---

## 📝 注意事项

1. **备份原设计**
   - 在执行大规模删除前，先导出整个设计
   - 或在 Penpot 中复制一份 Main 页面

2. **分步执行**
   - 不要一次性删除所有 Group
   - 先删除一个，用组件重建，验证效果
   - 确认无误后再批量操作

3. **保持视觉一致**
   - 记录原始位置坐标
   - 记录原始尺寸
   - 确保颜色、间距、圆角完全一致

4. **测试导出**
   - 完成后使用 `penpot.generateMarkup()` 导出 HTML
   - 使用 `penpot.generateStyle()` 导出 CSS
   - 验证代码质量

---

## ✅ 完成标准

重构完成后，应该达到以下状态:

```
✅ Design System 页面
   ├─ Tokens Board
   └─ 9+ 个组件 (全部使用 Board + Flex Layout)

✅ Main 页面
   └─ TimelineContainer (Board)
       ├─ 5 个 TimelineItem (Board instances)
       │   ├─ Timeline/Node (Component instance)
       │   └─ Card/Version (Component instance)
       ├─ Timeline Trunk (Rectangle)
       └─ FloatingActionButton (Component instance)

❌ 0 个 Group
❌ 0 个未命名图层
❌ 0 个散乱元素
```

---

**最后更新**: 2025年11月16日  
**当前状态**: 11/17 任务完成 (64.7%)  
**下一步**: 执行任务 13 - 重建时间轴容器
