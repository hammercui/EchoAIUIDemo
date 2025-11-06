import React from 'react';
import PromptItem from './PromptItem';

/**
 * 提示词列表组件
 * 
 * 规范要求:
 * - 面板宽度: 400px
 * - 最大高度: 500px
 * - item 间距: 12px (gap-3)
 * - 垂直滚动列表
 */
const PromptList = ({ 
  prompts, 
  selectedId, 
  onItemSelect, 
  onCopy, 
  onView, 
  onManage 
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* 列表头部 */}
      <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
        <h2 className="text-base font-semibold m-0" style={{ color: 'hsl(262, 83%, 58%)' }}>
          提示词列表
        </h2>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
          {prompts.length} 个
        </span>
      </div>

      {/* 滚动列表容器 */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
        {prompts.map(prompt => (
          <PromptItem
            key={prompt.id}
            prompt={prompt}
            isSelected={selectedId === prompt.id}
            onSelect={() => onItemSelect(prompt)}
            onCopy={onCopy}
            onView={onView}
            onManage={onManage}
          />
        ))}
      </div>
    </div>
  );
};

export default PromptList;
