## React 集成指南 - 版本管理组件 (Version Manager)

本文档详细说明了如何将 `Version Manager` 的 HTML/CSS 设计集成到现代 React (TypeScript) 项目中。我们将把单页 HTML 拆分为可复用的 React 组件，并使用 State 管理交互状态。

## 1\. 目录结构建议

建议将组件拆分为以下结构，以保持代码清晰：

```markdown
src/
  components/
    VersionManager/
      index.tsx           # 主容器组件
      TimelineNode.tsx    # 单个时间轴节点（包含主版本和子版本）
      CandidatePanel.tsx  # 右侧候选面板
      styles.css          # 组件专属样式 (或使用 CSS Modules)
      types.ts            # 类型定义
```

## 2\. 准备工作：CSS 变量集成

首先，将设计令牌（CSS Variables）引入到你的全局样式文件（如 `globals.css` 或 `App.css` ）中，或者直接放在组件的 `styles.css` 的 `:root` 中。

**`src/components/VersionManager/styles.css`**:

```markdown
/* 也就是原 HTML 中的 <style> 内容，去掉了 body/html 的重置 */

:root {
  /* ... 复制 index.html 中的 :root 内容 ... */
  --color-primary-500: rgba(0, 0, 0, 0.96);
  --color-secondary-500: rgb(97, 40, 255);
  /* ... 其他变量 ... */
}

.app-container {
  display: flex;
  height: 100vh; /* 根据需要调整，如果是嵌入页面可能需要 height: 100% */
  width: 100%;
  overflow: hidden;
}

/* ... 复制剩余 CSS ... */

/* 注意：React 中 class 命名不需要改变，但建议检查 CSS 冲突 */
/* 如果使用 CSS Modules，请将类名改为 camelCase 或保持原样并用 styles.className 引用 */
```

## 3\. 数据模型定义 (TypeScript)

在 `types.ts` 中定义版本数据的结构，以便在组件间传递。

**`src/components/VersionManager/types.ts`**:

```markdown
export type VersionStatus = 'dev' | 'live' | 'fix' | 'design';

export interface SubVersion {
  id: string;
  version: string;
  date: string;
  desc: string;
}

export interface VersionData {
  id: string;
  version: string;
  status?: VersionStatus; // 可选状态
  date: string;
  desc: string;
  tags: string[];
  subVersions?: SubVersion[]; // 子版本数组
}

export interface Candidate {
  id: string;
  text: string;
  tags: string[];
  priority?: string;
}
```

## 4\. 组件实现

### 4.1 单个节点组件 (TimelineNode.tsx)

这个组件负责渲染时间轴上的一个节点，自动处理“左/右”布局逻辑，并展示子版本。

```markdown
import React from 'react';
import { VersionData } from './types';
import './styles.css';

interface TimelineNodeProps {
  data: VersionData;
  position: 'left' | 'right';
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({ 
  data, 
  position, 
  isSelected, 
  onSelect 
}) => {
  return (
    <div 
      className={\`timeline-node ${position} ${isSelected ? 'selected' : ''}\`}
      onClick={() => onSelect(data.id)}
    >
      {/* 圆点 */}
      <div className="node-dot" tabIndex={0} />
      
      {/* 连接线 */}
      <div className="node-connector" />
      
      {/* 内容区域 */}
      <div className="content-wrapper">
        {/* 主卡片 */}
        <div className="version-card">
          <div className="card-header">
            <span className="version-title">
              {data.version} 
              {data.status && (
                <span className={\`status-badge ${data.status.toLowerCase()}\`}>
                  {data.status}
                </span>
              )}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--color-primary-200)' }}>
              {data.date}
            </span>
          </div>
          <div className="card-body">{data.desc}</div>
          <div className="card-tags">
            {data.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* 子版本渲染逻辑 */}
        {data.subVersions && data.subVersions.length > 0 && (
          <div className="sub-version-group">
            {data.subVersions.map(sub => (
              <div key={sub.id} className="sub-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong>{sub.version}</strong>
                  <span style={{ fontSize: '10px', color: 'var(--color-primary-200)' }}>
                    {sub.date}
                  </span>
                </div>
                <div>{sub.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
```

### 4.2 候选面板组件 (CandidatePanel.tsx)

```markdown
import React from 'react';
import './styles.css';

interface CandidatePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CandidatePanel: React.FC<CandidatePanelProps> = ({ isOpen, onClose }) => {
  // 如果面板未打开，不渲染 (或者根据需求渲染但隐藏)
  if (!isOpen) return null;

  return (
    <aside className="candidate-panel">
      <div className="panel-header">
        <h2 className="panel-title">Suggestions</h2>
        <button className="btn-close" onClick={onClose}>&times;</button>
      </div>

      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input type="text" className="search-input" placeholder="Search prompts..." />
      </div>

      <div className="filter-section">
        <span className="filter-label">FILTER BY TAG</span>
        <div className="filter-tags">
          <span className="filter-chip active">All</span>
          <span className="filter-chip">Frontend</span>
          <span class="filter-chip">Backend</span>
        </div>
      </div>

      <div className="candidate-list">
        {/* 这里可以使用 map 渲染候选列表数据 */}
        <div className="candidate-item">
          <p className="candidate-text">Add rate limiting to API endpoints.</p>
          <div className="candidate-meta">
            <span>#Security</span>
            <span>High Priority</span>
          </div>
        </div>
        {/* ... 更多静态或动态 Item ... */}
      </div>
    </aside>
  );
};
```

### 4.3 主容器组件 (index.tsx)

负责整合布局、状态管理（选中态、面板开关）。

```markdown
import React, { useState } from 'react';
import { TimelineNode } from './TimelineNode';
import { CandidatePanel } from './CandidatePanel';
import { VersionData } from './types';
import './styles.css';

// 模拟数据
const MOCK_DATA: VersionData[] = [
  {
    id: '5', version: 'V5.0', status: 'dev', date: '10:30 AM',
    desc: 'Refactored authentication middleware.', tags: ['Backend']
  },
  {
    id: '4', version: 'V4.2', date: 'Yesterday',
    desc: 'Updated UI components with new tokens.', tags: ['Design']
  },
  {
    id: '3', version: 'V3.5', status: 'fix', date: 'Nov 22',
    desc: 'Fixed latency in dashboard queries.', tags: ['Fix']
  },
  {
    id: '1', version: 'V1.0', status: 'live', date: 'Nov 15',
    desc: 'Base system architecture setup.', tags: ['Core', 'API'],
    subVersions: [
      { id: '1-2', version: 'V1.2', date: 'Nov 16', desc: 'Hotfix for login timeout.' },
      { id: '1-1', version: 'V1.1', date: 'Nov 15', desc: 'Initial deployment.' }
    ]
  }
];

export const VersionManager: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('1'); // 默认选中 V1.0
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  return (
    <div className="app-container">
      {/* 左侧时间轴区域 */}
      <main className="timeline-area">
        <button className="btn-add-version" onClick={togglePanel}>
          <span>+</span> Add Version
        </button>

        <div className="timeline-track">
          {MOCK_DATA.map((item, index) => (
            <TimelineNode
              key={item.id}
              data={item}
              // 逻辑：偶数索引在右(right)，奇数索引在左(left)，或者根据需求自定义
              position={index % 2 === 0 ? 'right' : 'left'}
              isSelected={selectedId === item.id}
              onSelect={setSelectedId}
            />
          ))}
        </div>
      </main>

      {/* 右侧候选面板 */}
      <CandidatePanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />
    </div>
  );
};
```

## 5\. 关键集成点说明

1. **Flex 布局自适应**:
	- 在 HTML 中，我们利用了 `display: flex` 和 `flex: 1` 在 `.timeline-area` 上。
	- 在 React 中，当 `<CandidatePanel />` 的 `isOpen` 为 `true` 并渲染出 DOM 元素时，CSS 规则会自动挤压左侧的时间轴区域，无需编写额外的 JS 动画逻辑来计算宽度。
2. **树状交错布局 (Zigzag)**:
	- 在 `TimelineNode` 中，我们通过 props 传入 `position` ('left' 或 'right')。
	- 在主组件中，使用 `index % 2 === 0` 这种简单的取模运算即可实现左右交错排列。
3. **水波纹动画**:
	- HTML 中通过 `.selected` 类触发 CSS 动画。
	- React 中通过 `selectedId === item.id` 动态添加 `className="selected"` ，完美复用了 CSS 中的 `@keyframes water-wave` 。
4. **移动端适配**:
	- `styles.css` 中已经包含了 `@media (max-width: 768px)` 。
	- React 集成时，只要类名保持一致，移动端的响应式堆叠（Stacking）行为会自动生效。

## 6\. 下一步优化建议

- **Framer Motion**: 如果希望右侧面板进入时更加平滑（不仅仅是 CSS slide-in），可以在 `CandidatePanel` 中使用 `<motion.aside>` 并配置 `AnimatePresence` 。
- **拖拽排序 (Drag & Drop)**: 使用 `dnd-kit` 或 `react-beautiful-dnd` 包裹 `TimelineNode` ，实现设计文档中提到的“版本拖拽交换”功能。
- **虚拟滚动**: 如果版本历史非常长，考虑使用 `react-window` 来渲染 `.timeline-track` 内部的节点列表。