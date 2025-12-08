/**
 * 语义搜索服务测试脚本
 * 用于验证语义搜索功能
 */

import { SemanticSearchService } from './SemanticSearch';
import { getService, initializeDI } from '@/common/config/di';

// 测试数据
const testPrompts = [
    {
        id: '1',
        text: '使用 React 和 TypeScript 开发一个用户管理组件，包含增删改查功能'
    },
    {
        id: '2',
        text: '优化 Vue3 组件的性能，减少不必要的重渲染'
    },
    {
        id: '3',
        text: '编写一个 Node.js 后端 API，实现用户认证和授权'
    },
    {
        id: '4',
        text: '使用 React Hooks 管理复杂的表单状态'
    },
    {
        id: '5',
        text: '创建一个响应式的导航栏组件，支持移动端和桌面端'
    },
    {
        id: '6',
        text: '实现一个 TypeScript 工具函数库，包含常用的数组和对象操作'
    },
    {
        id: '7',
        text: '使用 CSS Grid 和 Flexbox 构建复杂的页面布局'
    },
    {
        id: '8',
        text: '开发一个 React 自定义 Hook 用于处理异步数据加载'
    },
    {
        id: '9',
        text: '优化 webpack 配置以提高构建速度和减小打包体积'
    },
    {
        id: '10',
        text: '使用 Zustand 进行全局状态管理，替代 Redux'
    }
];

/**
 * 运行测试
 */
export async function runSemanticSearchTest() {
    console.log('========================================');
    console.log('语义搜索服务测试');
    console.log('========================================\n');

    initializeDI();
    const service = getService(SemanticSearchService);

    try {
        // 1. 初始化服务
        console.log('1️⃣ 初始化服务...');
        await service.initialize();
        console.log(`   状态: ${service.getStatus()}\n`);

        // 2. 批量索引
        console.log('2️⃣ 批量索引测试数据...');
        await service.indexBatch(testPrompts);
        console.log(`   已索引: ${service.getIndexedCount()} 条`);
        console.log(`   词汇表大小: ${service.getVocabularySize()} 词\n`);

        // 3. 测试搜索
        const queries = [
            'React 组件开发',
            'TypeScript 类型定义',
            '性能优化',
            '状态管理',
            '前端布局'
        ];

        console.log('3️⃣ 测试语义搜索...\n');
        for (const query of queries) {
            console.log(`   查询: "${query}"`);
            const results = await service.search(query, { topK: 3, threshold: 0.1 });

            if (results.length === 0) {
                console.log('   ❌ 无结果\n');
            } else {
                results.forEach((r, i) => {
                    const prompt = testPrompts.find(p => p.id === r.id);
                    console.log(`   ${i + 1}. [分数: ${r.score.toFixed(3)}] ${prompt?.text.substring(0, 50)}...`);
                    if (r.matchedKeywords.length > 0) {
                        console.log(`      匹配词: ${r.matchedKeywords.join(', ')}`);
                    }
                });
                console.log('');
            }
        }

        // 4. 测试增量索引
        console.log('4️⃣ 测试增量索引...');
        await service.indexPrompt('11', '使用 Tailwind CSS 快速构建现代化 UI 界面');
        console.log(`   已索引: ${service.getIndexedCount()} 条\n`);

        // 5. 测试删除
        console.log('5️⃣ 测试删除索引...');
        await service.removePrompt('11');
        console.log(`   已索引: ${service.getIndexedCount()} 条\n`);

        console.log('========================================');
        console.log('✅ 所有测试通过！');
        console.log('========================================');

    } catch (error) {
        console.error('❌ 测试失败:', error);
        throw error;
    }
}

// 如果直接运行此文件，可以在开发环境中手动调用测试
// runSemanticSearchTest();
