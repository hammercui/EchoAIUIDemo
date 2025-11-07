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
 * 
 * 新增：使用统计
 * - 点击任意按钮触发 onUsage 回调
 */
const ActionButtons = ({ onCopy, onView, onManage, onUsage }) => {
  const handleClick = (action) => (e) => {
    e.stopPropagation();
    onUsage?.(); // 触发使用统计
    action();
  };

  return (
    <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none">
      <button 
        className="w-8 h-8 border-0 rounded-lg bg-transparent cursor-pointer text-sm flex items-center justify-center transition-all duration-150 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95"
        onClick={handleClick(onCopy)}
        title="复制"
      >
        📋
      </button>
      <button 
        className="w-8 h-8 border-0 rounded-lg bg-transparent cursor-pointer text-sm flex items-center justify-center transition-all duration-150 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95"
        onClick={handleClick(onView)}
        title="查看答案"
      >
        👁️
      </button>
      <button 
        className="w-8 h-8 border-0 rounded-lg bg-transparent cursor-pointer text-sm flex items-center justify-center transition-all duration-150 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95"
        onClick={handleClick(onManage)}
        title="管理"
      >
        ⚙️
      </button>
    </div>
  );
};

export default ActionButtons;
