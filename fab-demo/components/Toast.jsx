import React, { useEffect } from 'react';

/**
 * Toast 通知组件 - HeroUI 风格
 * 
 * 规范要求:
 * - 圆角: rounded-xl
 * - 阴影: 多层阴影
 * - 图标: 使用SVG图标
 * - 动画: 平滑进出
 */

const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.2"/>
    <path d="M6 10l2.5 2.5L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.2"/>
    <path d="M10 6v4M10 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.2"/>
    <path d="M13 7L7 13M7 7l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeConfig = {
    success: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200',
      icon: <SuccessIcon />
    },
    warning: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      border: 'border-yellow-200',
      icon: <WarningIcon />
    },
    error: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-200',
      icon: <ErrorIcon />
    }
  };

  const config = typeConfig[type];

  return (
    <div 
      className={`fixed top-5 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl border shadow-lg z-[2000] transition-all duration-200 animate-in slide-in-from-top ${config.bg} ${config.text} ${config.border}`}
    >
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0">{config.icon}</span>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
