import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { X } from 'lucide-react';

/**
 * 标签对话框组件
 *
 * 功能：
 * 1. 新增标签对话框（弹窗输入）
 * 2. 删除标签确认对话框
 *
 * 设计风格：HeroUI Modal 风格
 */

// HeroUI 风格的 Modal 组件
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

// HeroUI 风格的 Input 组件
const Input = ({ label, value, onChange, onKeyDown, placeholder, autoFocus, className = '' }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [autoFocus]);

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring hover:border-muted-foreground transition-all duration-150"
      />
    </div>
  );
};

// 新增标签对话框
export const AddTagDialog = ({ isOpen, onClose, onConfirm }) => {
  const [tagName, setTagName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTagName('');
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
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">
          添加标签
        </h3>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-6">
        <Input
          autoFocus
          label="标签名称"
          placeholder="请输入标签名称"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border">
        <Button
          variant="flat"
          color="default"
          size="sm"
          onPress={onClose}
        >
          取消
        </Button>
        <Button
          className="bg-primary-gradient text-white"
          size="sm"
          onPress={handleConfirm}
          isDisabled={!tagName.trim()}
        >
          确认
        </Button>
      </div>
    </Modal>
  );
};

// 删除标签确认对话框
export const DeleteTagDialog = ({ isOpen, onClose, onConfirm, tagName }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">
          删除标签
        </h3>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-6">
        <p className="text-sm text-muted-foreground">
          确定要删除标签 <span className="font-semibold text-foreground">"{tagName}"</span> 吗？
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border">
        <Button
          variant="flat"
          color="default"
          size="sm"
          onPress={onClose}
        >
          取消
        </Button>
        <Button
          color="danger"
          size="sm"
          onPress={handleConfirm}
        >
          删除
        </Button>
      </div>
    </Modal>
  );
};
