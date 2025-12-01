import React from 'react';

/**
 * FAB 浮动按钮组件 - HeroUI 风格
 * 
 * 规范要求:
 * - 尺寸: 48x48px (更大更易点击)
 * - 位置: 左下角/右下角固定(距边缘 24px)
 * - 配色: 渐变紫色
 * - 状态切换: 180ms rotation 动画
 * - 阴影: 多层阴影效果
 */
const FABButton = ({ isOpen, onClick, position }) => {
  return (
    <button
      className={`fixed bottom-6 w-12 h-12 rounded-full text-white border-0 cursor-pointer flex items-center justify-center z-[9999] transition-all duration-150 hover:scale-110 active:scale-95 shadow-xl bg-primary-gradient ${position === 'left' ? 'left-6' : 'right-6'
        }`}
      style={{
        boxShadow: '0 0 24px rgba(97, 40, 255, 0.5), 0 8px 16px rgba(0, 0, 0, 0.15)'
      }}
      onClick={onClick}
      aria-label={isOpen ? '关闭面板' : '打开面板'}
    >
      <span
        className={`text-xl transition-transform duration-180 inline-block ${isOpen ? 'rotate-180' : 'rotate-0'
          }`}
      >
        {isOpen ? '✕' : '✨'}
      </span>
    </button>
  );
};

export default FABButton;
