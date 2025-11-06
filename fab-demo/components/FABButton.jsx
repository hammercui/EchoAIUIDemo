import React from 'react';

/**
 * FAB 浮动按钮组件
 * 
 * 规范要求:
 * - 尺寸: 40x40px
 * - 位置: 左下角/右下角固定(距边缘 24px)
 * - 配色: bg-primary (紫色 #7c3aed)
 * - 状态切换: 180ms rotation 动画
 * - FAB 与面板间距: 4px
 */
const FABButton = ({ isOpen, onClick, position }) => {
  return (
    <button
      className={`fixed bottom-6 w-10 h-10 rounded-full text-white border-0 cursor-pointer flex items-center justify-center z-[9999] transition-all duration-150 hover:scale-110 active:scale-95 ${
        position === 'left' ? 'left-6' : 'right-6'
      }`}
      style={{
        background: 'linear-gradient(135deg, hsl(262, 83%, 58%), hsl(262, 83%, 48%))',
        boxShadow: '0 0 20px hsl(262, 83%, 58%), 0 0 40px hsl(262, 83%, 58%, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)'
      }}
      onClick={onClick}
      aria-label={isOpen ? '关闭面板' : '打开面板'}
    >
      <span 
        className={`text-base transition-transform duration-[180ms] inline-block ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`}
      >
        {isOpen ? '✕' : '✨'}
      </span>
    </button>
  );
};

export default FABButton;
