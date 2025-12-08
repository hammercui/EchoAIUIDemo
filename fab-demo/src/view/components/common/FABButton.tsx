import React from 'react';
import { motion } from 'framer-motion';

/**
 * FAB 浮动按钮组件 - HeroUI 风格
 * 
 * 规范要求:
 * - 尺寸: 48x48px (更大更易点击)
 * - 位置: 左下角/右下角固定(距边缘 24px)
 * - 配色: 渐变紫色
 * - 状态切换: 180ms rotation 动画
 * - 阴影: 多层阴影效果
 * - 交互: 可拖拽，自动吸附左右边缘
 */
interface FABButtonProps {
  isOpen: boolean;
  onClick: () => void;
  position: 'left' | 'right';
  onPositionChange: (position: 'left' | 'right') => void;
}

const FABButton: React.FC<FABButtonProps> = ({ isOpen, onClick, position, onPositionChange }) => {
  return (
    <motion.button
      key={position} // 关键：位置改变时重置组件状态，清除拖拽偏移
      drag
      dragMomentum={false}
      dragElastic={0.1}
      dragSnapToOrigin={true} // 如果未切换位置，自动回弹
      onDragEnd={(_, info) => {
        // 判断拖拽结束位置在屏幕左侧还是右侧
        const isRight = info.point.x > window.innerWidth / 2;
        const newPos = isRight ? 'right' : 'left';
        
        if (newPos !== position) {
          onPositionChange(newPos);
        }
      }}
      whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
      className={`fixed bottom-6 w-12 h-12 rounded-full text-white border-0 cursor-pointer flex items-center justify-center z-[9999] transition-colors duration-150 shadow-xl bg-primary-gradient ${
        position === 'left' ? 'left-6' : 'right-6'
      }`}
      style={{
        boxShadow: '0 0 24px rgba(97, 40, 255, 0.5), 0 8px 16px rgba(0, 0, 0, 0.15)'
      }}
      onClick={onClick}
      aria-label={isOpen ? '关闭面板' : '打开面板'}
    >
      <span
        className={`text-xl transition-transform duration-180 inline-block ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`}
      >
        {isOpen ? '✕' : '✨'}
      </span>
    </motion.button>
  );
};

export default FABButton;
