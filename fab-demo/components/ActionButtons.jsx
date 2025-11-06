import React from 'react';

/**
 * Action Buttons 组件
 * 
 * 规范要求:
 * - 竖向排列 (flex-col)
 * - Ghost 风格 (纯图标,hover 显示背景)
 * - 按钮尺寸: 32x32px
 * - 淡入动画: 150ms
 * - 位置: item 右侧
 */
const ActionButtons = ({ onCopy, onView, onManage }) => {
  return (
    <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none">
      <button 
        className="w-8 h-8 border-0 rounded-lg bg-transparent cursor-pointer text-sm flex items-center justify-center transition-all duration-150 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95"
        onClick={(e) => {
          e.stopPropagation();
          onCopy();
        }}
        title="复制"
      >
        📋
      </button>
      <button 
        className="w-8 h-8 border-0 rounded-lg bg-transparent cursor-pointer text-sm flex items-center justify-center transition-all duration-150 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95"
        onClick={(e) => {
          e.stopPropagation();
          onView();
        }}
        title="查看答案"
      >
        👁️
      </button>
      <button 
        className="w-8 h-8 border-0 rounded-lg bg-transparent cursor-pointer text-sm flex items-center justify-center transition-all duration-150 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95"
        onClick={(e) => {
          e.stopPropagation();
          onManage();
        }}
        title="管理"
      >
        ⚙️
      </button>
    </div>
  );
};

export default ActionButtons;
