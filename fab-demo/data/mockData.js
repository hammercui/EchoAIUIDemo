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

// 提示词模拟数据
export const mockPrompts = [
  {
    id: 1,
    title: '代码生成 - React 组件',
    description: '根据需求生成符合最佳实践的 React 函数组件\n支持 Hooks、TypeScript 类型定义和完整的 Props 验证\n自动生成组件文档和使用示例，提升开发效率',
    tags: ['前端', '组件'],
    date: '2 天前',
    dateTimestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    likes: 12,
    isLiked: false,
    usageCount: 25,
    sources: ['deepseek', 'kimi'],
    answer: commonAnswer
  },
  {
    id: 2,
    title: '代码重构 - 优化函数',
    description: '优化现有函数以提高性能和可读性\n通过提取重复逻辑、简化条件语句和优化算法复杂度\n使代码更易维护，减少潜在 bug，提升团队协作效率',
    tags: ['后端', '重构'],
    date: '1 天前',
    dateTimestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
    likes: 8,
    isLiked: true,
    usageCount: 18,
    sources: ['chatgpt', 'claude', 'kimi'],
    answer: commonAnswer
  },
  {
    id: 3,
    title: 'Bug 修复 - 错误排查',
    description: '修复异步请求的错误处理逻辑\n添加完善的异常捕获机制和重试策略\n确保系统稳定性，提供友好的错误提示和日志记录',
    tags: ['后端', '调试'],
    date: '1 天前',
    dateTimestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
    likes: 15,
    isLiked: false,
    usageCount: 32,
    sources: ['deepseek'],
    answer: '## Bug 修复方案\n\n1. 检查错误处理\n2. 添加重试机制'
  },
  {
    id: 4,
    title: '性能优化 - 渲染优化',
    description: '优化大量数据的渲染性能\n采用虚拟滚动、懒加载和分页策略减少 DOM 操作\n提升用户体验，降低内存占用，支持万级数据流畅展示',
    tags: ['性能', '前端'],
    date: '3 天前',
    dateTimestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
    likes: 20,
    isLiked: false,
    usageCount: 45,
    sources: ['chatgpt', 'deepseek', 'kimi', 'claude'],
    answer: '使用虚拟滚动技术...'
  },
  {
    id: 5,
    title: '测试用例 - 单元测试',
    description: '为关键业务逻辑编写单元测试',
    tags: ['测试', '质量'],
    date: '4 天前',
    dateTimestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
    likes: 5,
    isLiked: false,
    usageCount: 12,
    sources: ['claude', 'chatgpt'],
    answer: '## 测试用例\n\n1. 边界条件测试\n2. 异常处理测试'
  },
  {
    id: 6,
    title: '文档生成 - API 文档',
    description: '自动生成 RESTful API 文档',
    tags: ['文档', 'API'],
    date: '5 天前',
    dateTimestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
    likes: 3,
    isLiked: false,
    usageCount: 8,
    sources: ['chatgpt', 'deepseek', 'kimi', 'claude', 'deepseek', 'chatgpt'], // 测试超过5个的情况
    answer: '使用 Swagger 生成文档...'
  },
  {
    id: 7,
    title: 'API 设计 - REST接口',
    description: '设计完整的用户认证和权限系统',
    tags: ['后端', 'API'],
    date: '5 天前',
    dateTimestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
    likes: 18,
    isLiked: true,
    usageCount: 40,
    sources: ['kimi', 'deepseek'],
    answer: '数据库表设计方案...'
  },
  {
    id: 8,
    title: '数据库查询 - SQL优化',
    description: '优化复杂查询语句提高执行效率',
    tags: ['数据库', '优化'],
    date: '1 周前',
    dateTimestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
    likes: 10,
    isLiked: false,
    usageCount: 22,
    sources: ['chatgpt'],
    answer: '使用索引和查询优化...'
  },
  {
    id: 9,
    title: 'UI 组件 - 表单设计',
    description: '实现移动端和桌面端自适应布局',
    tags: ['前端', 'UI'],
    date: '1 周前',
    dateTimestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
    likes: 14,
    isLiked: false,
    usageCount: 28,
    sources: ['claude', 'kimi', 'deepseek'],
    answer: '响应式布局最佳实践...'
  },
  {
    id: 10,
    title: '算法实现 - 排序算法',
    description: '实现高效的排序算法解决业务问题',
    tags: ['算法', '数据结构'],
    date: '2 周前',
    dateTimestamp: Date.now() - 14 * 24 * 60 * 60 * 1000,
    likes: 7,
    isLiked: false,
    usageCount: 15,
    sources: ['deepseek', 'chatgpt', 'claude'],
    answer: '快速排序算法实现...'
  }
];
