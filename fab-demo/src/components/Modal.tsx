import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Modal 组件 - HeroUI 风格 + Framer Motion 动画
 * 
 * 通用的模态框组件，用于弹窗显示
 * 
 * Props:
 * @param {boolean} isOpen - 是否打开
 * @param {Function} onClose - 关闭回调
 * @param {ReactNode} children - 子内容
 * @param {'sm' | 'md' | 'lg' | 'xl'} size - 尺寸
 */
const Modal = ({ isOpen, onClose, children, size = 'md' }) => {
  const backdropRef = useRef<any>(null);

  // 禁用背景滚动
  useEffect(() => {
    if (isOpen) {
      // 保存当前的 overflow 状态
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      // 获取滚动条宽度
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // 禁用滚动并补偿滚动条宽度，防止页面抖动
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      // 清理函数：恢复原始状态
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  // 模态框动画变体
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
        duration: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.15
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div
          ref={backdropRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[150] flex items-center"
          style={{
            justifyContent: 'center',
            paddingLeft: '68px',
            paddingRight: '68px'
          }}
        >
          <motion.div
            className={`${sizeClasses[size]} w-full bg-background rounded-xl border border-border`}
            style={{
              maxWidth: '30vw',
              boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.4), 0 20px 40px -10px rgba(0, 0, 0, 0.3), 0 10px 20px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08)'
            }}
            variants={modalVariants as any}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
