import React, { useEffect, useRef } from 'react';

/**
 * Modal 组件 - HeroUI 风格
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
  const backdropRef = useRef(null);

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

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[150] flex items-center animate-in fade-in-0 duration-150"
      style={{
        // 与提示词列表面板居中对齐
        // 面板宽度: 30vw, 位置: left-[68px] 或 right-[68px]
        justifyContent: 'center',
        paddingLeft: '68px',
        paddingRight: '68px'
      }}
    >
      <div
        className={`${sizeClasses[size]} w-full bg-background rounded-xl border border-border animate-in fade-in-0 zoom-in-95 duration-150`}
        style={{
          maxWidth: '30vw', // 与提示词列表面板宽度一致
          boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.4), 0 20px 40px -10px rgba(0, 0, 0, 0.3), 0 10px 20px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08)'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
