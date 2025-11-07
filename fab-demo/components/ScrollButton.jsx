import React from 'react';

/**
 * 滚动按钮组件
 * 
 * 在列表较长时显示，支持快速滚动到顶部或底部
 * - 在底部时显示"到顶部"按钮
 * - 否则显示"到底部"按钮
 */
const ScrollButton = ({ isAtBottom, onScrollToTop, onScrollToBottom, show = true }) => {
  if (!show) return null;

  return (
    <button
      onClick={isAtBottom ? onScrollToTop : onScrollToBottom}
      className="sticky bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-[hsl(262,83%,58%)]/70 hover:bg-[hsl(262,83%,58%)]/90 text-white rounded-full shadow-lg transition-all duration-150 flex items-center justify-center cursor-pointer border-0 active:scale-95"
      title={isAtBottom ? "滚动到顶部" : "滚动到底部"}
      aria-label={isAtBottom ? "滚动到顶部" : "滚动到底部"}
    >
      <span className="text-lg">{isAtBottom ? '⬆' : '⬇'}</span>
    </button>
  );
};

export default ScrollButton;
