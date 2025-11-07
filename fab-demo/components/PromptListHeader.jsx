import React from 'react';

/**
 * 提示词列表 Panel Header - Tab 页签式设计
 * 
 * 规范：
 * - HeroUI 风格的 Tab 设计
 * - 渐变色激活状态
 * - 支持多 Tab 切换（可扩展）
 */
const PromptListHeader = ({ activeTab = 'list', onTabChange }) => {
  const tabs = [
    { id: 'list', label: '提示词列表', icon: '📝' },
    // 可扩展更多 tab
  ];

  return (
    <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
      {/* 左侧：Tab标签 */}
      <div className="flex items-center gap-2">
        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={`px-3 py-1.5 text-sm font-semibold rounded-lg shadow-sm cursor-pointer transition-all duration-150 ${
              activeTab === tab.id
                ? 'bg-[hsl(262,83%,58%)] text-white'
                : 'bg-background text-foreground hover:bg-muted'
            }`}
          >
            {tab.icon} {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptListHeader;
