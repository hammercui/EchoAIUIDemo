import React, { useEffect } from 'react';

/**
 * Toast 通知组件
 * 
 * 规范要求:
 * - 成功状态: bg-green-50 text-green-600
 * - 警告状态: bg-yellow-50 text-yellow-600
 * - 错误状态: bg-red-50 text-red-600
 */
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    success: 'bg-green-50 text-green-600 border-green-200',
    warning: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    error: 'bg-red-50 text-red-600 border-red-200',
  };

  return (
    <div 
      className={`fixed top-5 left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg border shadow-lg z-[2000] transition-all duration-200 animate-in slide-in-from-top ${typeStyles[type]}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-base font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
