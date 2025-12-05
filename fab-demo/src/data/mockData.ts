// 统一的答案文本（所有平台共用）
const commonAnswer = `# React 函数组件最佳实践

## 组件示例代码

\`\`\`tsx
import React, { useState, useEffect } from 'react';

interface UserCardProps {
  name: string;
  age: number;
  email: string;
  onUpdate?: (data: UserData) => void;
}

const UserCard: React.FC<UserCardProps> = ({ name, age, email, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name, age, email });

  useEffect(() => {
    console.log('User data updated:', formData);
  }, [formData]);

  const handleSave = () => {
    onUpdate?.(formData);
    setIsEditing(false);
  };

  return (
    <div className="user-card">
      {isEditing ? (
        <EditMode data={formData} onChange={setFormData} onSave={handleSave} />
      ) : (
        <ViewMode data={formData} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
};

export default UserCard;
\`\`\`

## Props 类型定义对比

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| name | string | ✅ | - | 用户姓名 |
| age | number | ✅ | - | 用户年龄 |
| email | string | ✅ | - | 电子邮件 |
| onUpdate | function | ❌ | undefined | 更新回调 |

## 最佳实践要点

1. **使用 TypeScript** - 提供类型安全和自动补全
2. **Props 解构** - 提高代码可读性
3. **使用 Hooks** - useState、useEffect 等现代化状态管理
4. **条件渲染** - 使用三元运算符或逻辑运算符
5. **事件处理** - 使用箭头函数避免 this 绑定问题

## 性能优化建议

- ✅ **React.memo** - 避免不必要的重渲染
- ✅ **useCallback** - 缓存回调函数
- ✅ **useMemo** - 缓存计算结果
- ✅ **代码分割** - 使用 React.lazy 和 Suspense
`;

// =============================================================================
// 1. 数据库表结构模拟 (Relational Data Model)
// =============================================================================

// VersionTree表
const db_version_trees = [
  { tree_id: 't1', tree_title: '代码生成 - React 组件' }
];

// VersionTreeNode表
const db_version_tree_nodes = [
  { prompt_id: 1, tree_id: 't1', version_num: '5.0', status: 'live' },
  { prompt_id: 11, tree_id: 't1', version_num: '4.0' },
  { prompt_id: 12, tree_id: 't1', version_num: '3.0' },
  { prompt_id: 13, tree_id: 't1', version_num: '2.0' },
  { prompt_id: 14, tree_id: 't1', version_num: '1.0' },
  { prompt_id: 15, tree_id: 't1', version_num: '1.2' }, // Sub of 1.0
  { prompt_id: 16, tree_id: 't1', version_num: '1.1' }  // Sub of 1.0
];

// Prompt表
const db_prompts = [
  {
    prompt_id: 1, tree_id: 't1',
    description: 'Latest release with major refactoring.', tags: ['前端', '组件', 'Stable'],
    date: '今天', dateTimestamp: Date.now(),
    likes: 12, isLiked: false, usageCount: 25,
    sources: ['deepseek', 'kimi'], answer: commonAnswer
  },
  {
    prompt_id: 11, tree_id: 't1',
    description: 'UI update and performance improvements.', tags: ['前端', 'UI', 'Perf'],
    date: '昨天', dateTimestamp: Date.now() - 86400000,
    likes: 8, isLiked: true, usageCount: 20,
    sources: ['chatgpt'], answer: commonAnswer
  },
  {
    prompt_id: 12, tree_id: 't1',
    description: 'Bug fixes for dashboard.', tags: ['Fix'],
    date: '2天前', dateTimestamp: Date.now() - 86400000 * 2,
    likes: 5, isLiked: false, usageCount: 15,
    sources: ['deepseek'], answer: commonAnswer
  },
  {
    prompt_id: 13, tree_id: 't1',
    description: 'Feature expansion.', tags: ['Feature'],
    date: '3天前', dateTimestamp: Date.now() - 86400000 * 3,
    likes: 3, isLiked: false, usageCount: 10,
    sources: ['kimi'], answer: commonAnswer
  },
  {
    prompt_id: 14, tree_id: 't1',
    description: 'Initial release.', tags: ['Init'],
    date: '1周前', dateTimestamp: Date.now() - 86400000 * 7,
    likes: 10, isLiked: false, usageCount: 50,
    sources: ['deepseek'], answer: commonAnswer
  },
  {
    prompt_id: 15, tree_id: 't1',
    description: 'Security patch.', tags: ['Patch', 'Security'],
    date: '5天前', dateTimestamp: Date.now() - 86400000 * 5,
    likes: 2, isLiked: false, usageCount: 5,
    sources: ['claude'], answer: commonAnswer
  },
  {
    prompt_id: 16, tree_id: 't1',
    description: 'Minor fixes.', tags: ['Fix'],
    date: '6天前', dateTimestamp: Date.now() - 86400000 * 6,
    likes: 1, isLiked: false, usageCount: 2,
    sources: ['chatgpt'], answer: commonAnswer
  }
];

// 其他无关数据 (ID 2-10, 保留用于展示)
const other_prompts = [
  {
    id: 2,
    description: '优化现有函数以提高性能和可读性\n通过提取重复逻辑、简化条件语句和优化算法复杂度',
    tags: ['后端', '重构'],
    date: '1 天前',
    dateTimestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
    likes: 8,
    isLiked: true,
    usageCount: 18,
    sources: ['chatgpt', 'claude', 'kimi'],
    answer: commonAnswer
  },
  // ... 可以根据需要添加更多静态数据
];


// =============================================================================
// 2. 业务逻辑：构建 Mock 数据 (Business Logic / Transformation)
// =============================================================================

const getPromptData = (id) => db_prompts.find(p => p.prompt_id === id);

const buildVersionLineage = (treeId) => {
  // 1. 获取该树下的所有节点
  const nodes = db_version_tree_nodes.filter(n => n.tree_id === treeId);
  
  const mainNodes: any[] = [];
  const subNodesMap = {}; // parentVersion -> [nodes]

  // 2. 遍历节点，构建 UI 所需的 VersionData 对象
  nodes.forEach(node => {
      const p = getPromptData(node.prompt_id);
      if (!p) return;

      const uiNode = {
          id: node.prompt_id.toString(),
          version: `V${node.version_num}`,
          status: node.status, // 'live' etc.
          date: p.date,
          desc: p.description,
          tags: p.tags,
          subVersions: []
      };

      // 简单逻辑判断主/子版本：以 .0 结尾为主版本
      if (node.version_num.endsWith('.0')) {
          mainNodes.push(uiNode);
      } else {
          // 找到父版本 (例如 1.1 -> 1.0)
          const major = node.version_num.split('.')[0] + '.0';
          if (!subNodesMap[major]) subNodesMap[major] = [];
          subNodesMap[major].push(uiNode);
      }
  });

  // 3. 排序主版本 (倒序)
  mainNodes.sort((a, b) => b.version.localeCompare(a.version));

  // 4. 挂载子版本
  mainNodes.forEach(main => {
      const majorKey = main.version.replace('V', '');
      if (subNodesMap[majorKey]) {
          // 子版本倒序
          main.subVersions = subNodesMap[majorKey].sort((a, b) => b.version.localeCompare(a.version));
      }
  });

  return mainNodes;
};

// 生成最终的 mockPrompts
const generateMockPrompts = () => {
  const result: any[] = [];

  // 1. 处理 DB 中的 Prompt (它们属于 VersionTree)
  db_prompts.forEach(p => {
      const tree = db_version_trees.find(t => t.tree_id === p.tree_id);
      const node = db_version_tree_nodes.find(n => n.prompt_id === p.prompt_id);
      
      // 构建完整的版本树
      const versions = buildVersionLineage(p.tree_id);

      result.push({
          id: p.prompt_id,
          title: tree && node ? `[V${node.version_num}] ${tree.tree_title}` : (tree?.tree_title || 'Unknown'),
          description: p.description,
          tags: p.tags,
          date: p.date,
          dateTimestamp: p.dateTimestamp,
          likes: p.likes,
          isLiked: p.isLiked,
          usageCount: p.usageCount,
          sources: p.sources,
          answer: p.answer,
          // 关联：当前 Item 的 ID 就是当前版本 ID
          currentVersionId: p.prompt_id.toString(),
          versions: versions,
          tree_id: p.tree_id,
          version_num: node?.version_num,
          tree_title: tree?.tree_title
      });
  });

  // 2. 合并其他静态数据
  return [...result, ...other_prompts];
};

export const mockPrompts = generateMockPrompts();
