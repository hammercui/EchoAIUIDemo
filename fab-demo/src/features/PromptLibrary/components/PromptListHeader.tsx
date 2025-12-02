import React from 'react';

/**
 * 提示词列表 Header - 简化版
 */
const PromptListHeader = () => {
  return (
    <div className="h-[42px] px-6 border-b border-border bg-muted/30 flex items-center">
      <h2 className="text-base font-semibold text-foreground">
        提示词列表
      </h2>
    </div>
  );
};

export default PromptListHeader;
