# Design Guide

# 1. Product Overview

## Project purpose
设计一个现代化的提示词版本管理单页Demo，采用竖向时间线布局，提供直观的版本控制和交互体验。

## Key value proposition
提供类似树枝结构的视觉化版本管理系统，支持拖拽交互、版本层级管理，以及智能候选提示功能。
页面有2个区域，时间线区域和候选面板区域，默认显示时间线，不显示候选面板，只有新增版本时才显示面板。

## Primary flows
### 1. 时间线显示
- 默认居中显示timeline模板，展示大版本列表
- 竖向时间线设计，从底部开始显示版本1
- 版本节点左右交错排列，每个版本用小球表示
- 当前选中版本显示水波扩散效果

### 2. 版本交互
- 支持版本内容拖拽交换（版本号保持不变，内容交换）
- 点击版本卡片进行选择和操作
- 支持版本节点的添加和删除操作

### 3. 版本层级管理
- 主版本：1, 2, 3, 4, 5（从底部到顶部）
- 子版本：在大版本下添加子版本（如1.1, 1.2）
- 顶部添加新主版本（6, 7, 8）
- 子版本在主版本卡片下方顺序排列

### 4. 候选面板功能
- 添加节点时，时间线左移，右侧出现候选面板
- 显示与当前版本相关的候选提示词列表
- 支持模糊搜索功能
- 支持标签搜索功能

### 3. 搜索和过滤
- 按版本号搜索
- 按标签过滤
- 按时间范围筛选

# 3. Information Architecture

## Pages / screens hierarchy

### 主界面默认
- **居中的时间线**: 版本节点、连接线

### 点击新增版本后
- **左移的时间线**: 版本节点、连接线
- **候选面板**: 搜索和筛选功能

# 4. Layout & Interaction (with ASCII diagrams)

For each major screen:

### Screen 1: 版本管理时间线主界面

- Description: 主要用户界面，居中显示竖向时间线，支持拖拽交互
- ASCII wireframe:
```
┌─────────────────────────────────────────────────────────┐
│                   Version Manager                       │
│                                                         │
│                        ┌───────────────┐                │
│                        │[+] Add Version│                │
│                        └───────────────┘                │
│                                │                        │
│                                │     ┌─────────────┐    │
│                                ○─────┤  版本 5     │    │
│                                │     │  [卡片内容] │    │
│                                │     └─────────────┘    │
│                                │                        │
│              ┌─────────────┐   │                        │
│              │  版本 4     ├───○                        │
│              │  [卡片内容] │   │                        │
│              └─────────────┘   │                        │
│                                │                        │
│                                │     ┌─────────────┐    │
│                                ○─────┤  版本 3     │    │
│                                │     │  [卡片内容] │    │
│                                │     └─────────────┘    │
│                                │                        │
│              ┌─────────────┐   │                        │
│              │  版本 2     ├───○                        │
│              │  [卡片内容] │   │                        │
│              └─────────────┘   │                        │
│                                │                        │
│                                │     ┌─────────────┐    │
│                                ●─────┤  版本 1     │    │
│                                │     │  [选中内容] │    │
│                                │     │  [1.1][1.2] │    │
│                                │     │  子版本     │    │
│                                │     └─────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```


### Screen 2: 版本管理时间线主界面点击新增节点后

- Description: 竖向时间线左移，并现实控制面板
- ASCII wireframe:
```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                  Version Manager                                            │
│                                                                                             │
│             ┌───────────────┐                                                               │
│             │[+] Add Version│                                                               │
│             └───────────────┘                                                               │
│                     │                                                                      │
│                     │     ┌─────────────┐      ┌─────────────────────────────┐            │
│                     ○─────┤  版本 5     │      │      候选面板               │            │
│                     │     │  [卡片内容] │      │  ┌─────────────────────────┐│            │
│                     │     └─────────────┘      │  │ 搜索框                  ││            │
│                     │                          │  └─────────────────────────┘│            │
│┌─────────────┐      │                          │  [标签筛选] [模糊搜索]      │            │
││  版本 4     ├──────○                          │                             │            │
││  [卡片内容] │      │                          │  • 候选提示词 1             │            │
│└─────────────┘      │                          │  • 候选提示词 2             │            │
│                     │                          │  • 候选提示词 3             │            │
│                     │     ┌─────────────┐      │  • 候选提示词 4             │            │
│                     ○─────┤  版本 3     │      │                             │            │
│                     │     │  [卡片内容] │      │                             │            │
│                     │     └─────────────┘      │                             │            │
│                     │                          │                             │            │
│┌─────────────┐      │                          └─────────────────────────────┘            │
││  版本 2     ├──────○                                                                      │
││  [卡片内容] │      │                                                                      │
│└─────────────┘      │                                                                      │
│                     │                                                                      │
│                     │     ┌─────────────┐                                                  │
│                     ●─────┤  版本 1     │                                                  │
│                     │     │  [选中内容] │                                                  │
│                     │     │  [1.1][1.2] │                                                  │
│                     │     │  子版本     │                                                  │
│                     │     └─────────────┘                                                  │
│                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```
- Interaction notes: 点击版本节点进行选择，拖拽版本卡片交换内容，点击添加版本按钮显示候选面板，选择候选提示词直接创建新版本，候选面板支持搜索和筛选
- Responsive behavior: 移动端时间线左移，候选面板从隐藏变为出现


# 5. Design Tokens

## 5.1 Color Tokens
--color-primary-500: rgba(0, 0, 0, 0.96) (hsl(0, 0%, 96%))
--color-primary-400: rgba(0, 0, 0, 0.8) (hsl(0, 0%, 80%))
--color-primary-300: rgba(10, 13, 51, 0.6) (hsl(230, 68%, 15%))
--color-primary-200: rgba(10, 13, 51, 0.45) (hsl(230, 68%, 11%))
--color-secondary-500: rgb(97, 40, 255) (hsl(259, 100%, 59%))
--color-secondary-bg: rgb(214, 218, 255) (hsl(239, 94%, 94%))
--color-accent-500: #10B981 (hsl(160, 84%, 39%))
--color-background-50: #FFFFFF (hsl(0, 0%, 100%))
--color-background-100: rgb(229, 231, 235) (hsl(220, 9%, 91%))
--color-text-900: rgba(0, 0, 0, 0.96) (hsl(0, 0%, 96%))
--color-text-700: rgba(0, 0, 0, 0.8) (hsl(0, 0%, 80%))
--color-text-500: rgba(10, 13, 51, 0.6) (hsl(230, 68%, 15%))
--color-text-300: rgba(10, 13, 51, 0.45) (hsl(230, 68%, 11%))
--color-success-500: #22C55E (hsl(142, 76%, 36%))
--color-warning-500: #F59E0B (hsl(38, 92%, 50%))
--color-error-500: #EF4444 (hsl(0, 84%, 60%))
--color-info-500: #3B82F6 (hsl(217, 91%, 60%))

## 5.2 Spacing Tokens
--space-1: 4px
--space-2: 6px
--space-3: 8px
--space-4: 12px
--space-5: 16px
--space-6: 20px
--space-7: 24px
--space-8: 32px
--space-9: 48px

## 5.3 Typography Tokens
--font-display: "D-DIN Exp", "DM Sans", Arial, "Microsoft YaHei", sans-serif, 800, 48px, 1.125
--font-heading: "D-DIN Exp", "DM Sans", Arial, "Microsoft YaHei", sans-serif, 700, 40px, 1.2
--font-subheading: "D-DIN Exp", "DM Sans", Arial, "Microsoft YaHei", sans-serif, 600, 24px, 1.25
--font-body: "D-DIN Exp", "DM Sans", Arial, "Microsoft YaHei", sans-serif, 400, 16px, 1.5
--font-caption: "D-DIN Exp", "DM Sans", Arial, "Microsoft YaHei", sans-serif, 400, 14px, 1.43
--font-small: "D-DIN Exp", "DM Sans", Arial, "Microsoft YaHei", sans-serif, 400, 12px, 1.5

## 5.4 Shadow Tokens
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)

# 6. Component Library (5 reusable UI components)

### VersionCard

- Description: 版本卡片组件，显示版本信息、状态和操作按钮
- Props: version: Version, isSelected: boolean, position: 'left' | 'right', isExpanded: boolean, showSubVersions: boolean
- Events: onSelect, onEdit, onDelete, onDragStart, onDragEnd
- Accessibility notes: 键盘导航，屏幕阅读器支持，拖拽操作的替代方案
- ASCII structural diagram:
```
┌─────────────────────────┐
│ ● V3.0 [开发中] [×]    │
│ ─────────────────────── │
│ 版本标题和描述内容        │
│ [标签1] [标签2] [+添加] │
│                         │
│ ↓ 子版本 (展开时显示)    │
│ ○ V3.1                 │
│ ○ V3.2                 │
└─────────────────────────┘
```

### TimelineNode

- Description: 时间线节点组件，表示版本在时间线上的位置
- Props: version: Version, position: {x, y}, isSelected: boolean, animationState: 'idle' | 'selected' | 'water-wave'
- Events: onClick, onHover, onConnect
- Accessibility notes: 焦点管理，动画可访问性，高对比度模式支持
- ASCII structural diagram:
```
    ● 选中节点 (水波动画)
    │
    └── 连接线
    │
    ○ 普通节点
```


### CandidatePanel

- Description: 候选提示面板，显示版本创建建议
- Props: isOpen: boolean, searchQuery: string, selectedTags: string[], candidates: Candidate[]
- Events: onSearch, onTagSelect, onCandidateSelect
- Accessibility notes: 搜索功能可访问性，筛选器控制，结果导航
- ASCII structural diagram:
```
┌─────────────────────────────────┐
│ 📋 候选提示面板       [×关闭]    │
├─────────────────────────────────┤                   │
│ ┌─────────────────────────────┐ │
│ │ 模糊搜索版本提示词...        │ │
│ └─────────────────────────────┘ │
│                                 │
│ 🏷️ 标签筛选                     │
│ [前端] [后端] [数据库] [API]    │
│                                 │
│ 📝 候选列表                     │
│ • 添加用户认证功能              │
│ • 优化数据库查询性能            │
│ • 重构组件架构                  │
│ • 添加单元测试                  │
└─────────────────────────────────┘
```

### ActionButton

- Description: 动作按钮组件，支持多种交互状态
- Props: variant: 'primary' | 'secondary' | 'ghost' | 'danger', size: 'sm' | 'md' | 'lg', icon?: string, loading: boolean
- Events: onClick, onFocus, onBlur
- Accessibility notes: 按钮状态通知，加载状态反馈，键盘操作支持
- ASCII structural diagram:
```
主按钮:            次按钮:             危险按钮:
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ [+] 添加版本     │ │ 编辑            │ │ [🗑] 删除        │
└─────────────────┘ └─────────────────┘ └─────────────────┘

加载状态:
┌─────────────────┐
│ [⏳] 保存中...   │
└─────────────────┘
```



# 7. Constraints from StyleGuide.md

## Mandatory guidelines inherited
### 设计风格要求
- **Light模式主题**: 使用明亮、清爽的配色方案
- **避免紫色渐变**: 不使用紫色渐变背景，采用更高级的设计风格
- **现代化设计**: 简洁、专业、高级的视觉体验

### 颜色系统约束
- **主色调**: 使用黑色系 (rgba(0, 0, 0, 0.96)) 作为主要颜色
- **品牌色**: 可使用淡紫色作为点缀 (rgb(97, 40, 255))
- **背景色**: 纯白色背景 (rgb(255, 255, 255))
- **文字层次**: 多层次的文字透明度处理

### 字体系统约束
- **主要字体**: "D-DIN Exp", "DM Sans", Arial, "Microsoft YaHei", sans-serif
- **字重体系**: 400 (Normal), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)
- **字号层级**: 12px, 14px, 16px, 24px, 40px, 48px
- **行高规范**: 1.2-1.5的范围

### 动效系统约束
- **Framer Motion**: 使用Framer Motion实现动效
- **过渡时长**: 0.2s - 0.3s的标准过渡时间
- **缓动函数**: ease-out为主
- **水波扩散效果**: 选中版本的视觉反馈

## Overrides applied to DesignGuide.md
### 令牌系统定制
- 颜色令牌优先使用黑色系和灰色系，避免紫色主导
- 间距令牌基于4px基准系统，符合最佳UI规范
- 字体令牌使用指定的字体族和字重体系
- 阴影令牌提供层次分明的视觉深度

### 组件规范定制
- 版本卡片采用卡片式设计，支持状态标识
- 时间线节点实现拖拽交互和水波动画效果
- 候选面板支持搜索和标签筛选功能


# 8. Summary for Downstream Automation

## What `ui-produce` should generate from this guide

### 版本管理界面生成
- 生成竖向时间线主界面，支持版本节点的左右交错布局
- 实现版本卡片组件，包含状态标识和操作按钮
- 创建候选面板组件，支持搜索和标签筛选功能

### 组件生成规范
- **VersionCard**: 实现版本卡片的所有状态和交互，包括拖拽功能
- **TimelineNode**: 生成时间线节点，支持水波扩散动画效果
- **CandidatePanel**: 实现候选提示面板的搜索和筛选逻辑
- **ActionButton**: 生成多种样式的动作按钮，支持加载状态

### 布局实现要求
- 将ASCII线框图转换为响应式CSS Grid和Flexbox布局
- 实现竖向时间线的树枝状布局算法
- 支持版本节点的动态位置计算和重新排序
- 候选面板的滑入滑出动画效果

### 样式系统实现
- 从设计令牌生成完整的CSS变量定义
- 实现从StyleDesign.md获得的主题系统，避免紫色渐变
- 创建版本状态的视觉样式（开发中、测试中、已发布等）
- 实现水波扩散动画的CSS关键帧

### 交互功能实现
- 拖拽交换功能：版本内容的拖拽重排
- 版本选择交互：点击节点的水波动画反馈
- 候选面板交互：搜索、筛选、选择功能
- 表单编辑交互：版本信息的实时编辑和验证

### Framer Motion动效集成
- 版本卡片的悬停和选择动画
- 时间线节点的水波扩散效果
- 候选面板的滑入滑出过渡

### 响应式设计适配
- 桌面端：完整的时间线和候选面板并排布局
- 平板端：时间线左移，候选面板变为半屏覆盖
- 移动端：时间线垂直布局，候选面板全屏覆盖
- 触摸设备的拖拽交互优化