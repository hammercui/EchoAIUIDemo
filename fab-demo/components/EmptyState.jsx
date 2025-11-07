import React from 'react';

/**
 * 空状态组件
 * 
 * 当列表为空时显示的提示信息
 */
const EmptyState = ({ searchMode }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-sm text-muted-foreground mb-1">未找到相关提示词</div>
      <div className="text-xs text-muted-foreground">
        {searchMode === 'prompt' ? '尝试使用其他关键词' : '尝试选择其他标签'}
      </div>
    </div>
  );
};

export default EmptyState;
