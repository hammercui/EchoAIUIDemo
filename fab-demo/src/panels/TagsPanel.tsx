import React from 'react';

/**
 * 标签管理面板
 */
const TagsPanel = ({ prompt }) => {
  return (
    <div className="tags-panel">
      <h3 className="text-sm font-semibold text-foreground mb-3">
        当前标签
      </h3>
      <div className="flex flex-col gap-2">
        {prompt.tags.map((tag, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-2 p-2 bg-muted border border-border rounded-lg"
          >
            <span className="flex-1 text-sm text-foreground">{tag}</span>
            <button className="h-8 px-4 text-sm font-medium border border-border bg-background rounded-full cursor-pointer transition-all duration-150 hover:bg-muted active:scale-95">
              编辑
            </button>
            <button className="h-8 px-4 text-sm font-medium border border-red-600 bg-background rounded-full cursor-pointer text-red-600 transition-all duration-150 hover:bg-red-50 active:scale-95">
              删除
            </button>
          </div>
        ))}
        <button className="h-10 border border-dashed border-border bg-transparent rounded-lg cursor-pointer text-sm text-muted-foreground transition-all duration-150 hover:bg-muted hover:border-solid hover:text-foreground active:scale-[0.98]">
          + 添加新标签
        </button>
      </div>
    </div>
  );
};

export default TagsPanel;
