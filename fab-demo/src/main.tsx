import React from 'react';
import ReactDOM from 'react-dom/client';
import FABDemo from './FABDemo';
import './styles/globals.css';
import './styles/components.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="min-h-screen bg-[#f6f6f6] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 项目介绍 */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">FAB 浮动按钮演示</h1>
          <p className="text-gray-600 mb-4">
            基于 <span className="font-semibold text-purple-600">shadcn/ui</span> 设计规范的 FAB（Floating Action Button）交互演示。
            点击左下角的浮动按钮体验完整功能。
          </p>
        </div>

        {/* 功能特性 */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">✨ 核心功能</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">🎯</span>
              <span><strong>FAB 按钮</strong> - 40x40px 紫色浮动按钮，支持左/右侧位置切换</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">📋</span>
              <span><strong>提示词列表</strong> - 400px 宽度面板，展示 10 个示例提示词卡片</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">⚙️</span>
              <span><strong>编辑管理面板</strong> - 从右侧滑入的 400px 编辑面板，支持标签/答案/版本管理</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🎨</span>
              <span><strong>动画效果</strong> - 150-180ms 快速响应动画，FAB 与面板间距仅 4px</span>
            </li>
          </ul>
        </div>

        {/* 组件说明 */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🧩 组件结构</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-purple-50 rounded border border-purple-200">
              <div className="font-semibold text-purple-900 mb-1">FABButton</div>
              <div className="text-purple-700">浮动按钮组件</div>
            </div>
            <div className="p-3 bg-blue-50 rounded border border-blue-200">
              <div className="font-semibold text-blue-900 mb-1">PromptList</div>
              <div className="text-blue-700">提示词列表面板</div>
            </div>
            <div className="p-3 bg-green-50 rounded border border-green-200">
              <div className="font-semibold text-green-900 mb-1">EditPanel</div>
              <div className="text-green-700">编辑管理面板</div>
            </div>
            <div className="p-3 bg-orange-50 rounded border border-orange-200">
              <div className="font-semibold text-orange-900 mb-1">ActionButtons</div>
              <div className="text-orange-700">操作按钮组（复制/查看/管理）</div>
            </div>
          </div>
        </div>

        {/* 技术栈 */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🛠️ 技术栈</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">React 18</span>
            <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">Vite</span>
            <span className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm font-medium">Tailwind CSS</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">shadcn/ui</span>
          </div>
          {/* 测试 bg-primary-gradient */}
          <div className="mt-4">
            <div className="bg-primary-gradient text-white px-4 py-2 rounded-lg inline-block">
              测试紫色渐变背景
            </div>
          </div>
        </div>
      </div>

      {/* FAB Demo 组件 */}
      <FABDemo />
    </div>
  </React.StrictMode>
);