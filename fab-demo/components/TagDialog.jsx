import React, { useState, useEffect, useRef } from 'react';

/**
 * 标签对话框组件
 * 
 * 功能：
 * 1. 新增标签对话框（弹窗输入）
 * 2. 删除标签确认对话框
 */

// 通用对话框容器
const Dialog = ({ isOpen, onClose, title, children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in-0 duration-150">
      <div
        ref={dialogRef}
        className="bg-background border border-border rounded-xl shadow-2xl max-w-md w-full mx-4 animate-in fade-in-0 zoom-in-95 duration-150"
      >
        {/* 标题栏 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 内容区 */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// 新增标签对话框
export const AddTagDialog = ({ isOpen, onClose, onConfirm }) => {
  const [tagName, setTagName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTagName('');
      // 延迟聚焦，等待动画完成
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    const trimmed = tagName.trim();
    if (trimmed) {
      onConfirm(trimmed);
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="添加标签">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            标签名称
          </label>
          <input
            ref={inputRef}
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="请输入标签名称"
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(262,83%,58%)] focus:border-transparent transition-all duration-150"
          />
        </div>

        {/* 按钮组 */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/70 rounded-lg transition-colors duration-150"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            disabled={!tagName.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-[hsl(262,83%,58%)] hover:bg-[hsl(262,83%,50%)] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-150"
          >
            确认
          </button>
        </div>
      </div>
    </Dialog>
  );
};

// 删除标签确认对话框
export const DeleteTagDialog = ({ isOpen, onClose, onConfirm, tagName }) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="删除标签">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          确定要删除标签 <span className="font-semibold text-foreground">"{tagName}"</span> 吗？
        </p>

        {/* 按钮组 */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/70 rounded-lg transition-colors duration-150"
          >
            取消
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-150"
          >
            删除
          </button>
        </div>
      </div>
    </Dialog>
  );
};
