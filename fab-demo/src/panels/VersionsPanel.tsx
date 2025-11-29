import React from 'react';

/**
 * 版本管理面板
 */
const VersionsPanel = ({ prompt }) => {
  return (
    <div className="versions-panel">
      <h3 className="text-sm font-semibold text-foreground mb-3">
        版本历史
      </h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 p-3 bg-muted border border-foreground rounded-lg">
          <span className="flex-1 text-sm font-medium text-foreground">
            当前版本
          </span>
          <span className="text-xs text-muted-foreground">2024-01-15</span>
          <button className="h-8 px-4 text-sm font-medium border border-border bg-background rounded-full cursor-pointer transition-all duration-150 hover:bg-muted active:scale-95">
            查看
          </button>
        </div>
        <div className="flex items-center gap-3 p-3 bg-muted border border-border rounded-lg">
          <span className="flex-1 text-sm font-medium text-foreground">
            版本 1
          </span>
          <span className="text-xs text-muted-foreground">2024-01-10</span>
          <button className="h-8 px-4 text-sm font-medium border border-border bg-background rounded-full cursor-pointer transition-all duration-150 hover:bg-muted active:scale-95">
            恢复
          </button>
        </div>
      </div>
    </div>
  );
};

export default VersionsPanel;
