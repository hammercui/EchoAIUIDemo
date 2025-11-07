import React from 'react';

/**
 * 搜索结果统计条
 * 
 * 显示当前过滤/搜索结果的数量
 */
const SearchResultBar = ({ resultCount, searchMode, hasQuery }) => {
  if (!hasQuery) return null;

  return (
    <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border">
      找到 {resultCount} 个提示词
    </div>
  );
};

export default SearchResultBar;
