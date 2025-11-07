// 提示词模拟数据
export const mockPrompts = [
  {
    id: 1,
    title: '代码生成 - React 组件',
    description: '根据需求生成符合最佳实践的 React 函数组件',
    tags: ['前端', '组件'],
    date: '2 天前',
    dateTimestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    likes: 12,
    isLiked: false,
    usageCount: 25,
    answer: '这是一个示例答案内容...'
  },
  {
    id: 2,
    title: '代码重构 - 优化函数',
    description: '优化现有函数以提高性能和可读性',
    tags: ['后端', '重构'],
    date: '1 天前',
    dateTimestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
    likes: 8,
    isLiked: true,
    usageCount: 18,
    answer: '## 代码重构建议\n\n1. 提取重复逻辑\n2. 简化条件语句'
  },
  {
    id: 3,
    title: 'Bug 修复 - 错误排查',
    description: '修复异步请求的错误处理逻辑',
    tags: ['后端', '调试'],
    date: '1 天前',
    dateTimestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
    likes: 15,
    isLiked: false,
    usageCount: 32,
    answer: '## Bug 修复方案\n\n1. 检查错误处理\n2. 添加重试机制'
  },
  {
    id: 4,
    title: '性能优化 - 渲染优化',
    description: '优化大量数据的渲染性能',
    tags: ['性能', '前端'],
    date: '3 天前',
    dateTimestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
    likes: 20,
    isLiked: false,
    usageCount: 45,
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
    answer: '快速排序算法实现...'
  }
];
