import React from 'react';
import Modal from '@/view/components/common/LegacyModal';
import Button from '@/view/components/common/LegacyButton';
import { X } from 'lucide-react';

/**
 * 删除标签确认对话框
 * 
 * Props:
 * @param {boolean} isOpen - 是否打开
 * @param {Function} onClose - 关闭回调
 * @param {Function} onConfirm - 确认回调
 * @param {string} tagName - 要删除的标签名称
 */
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
          onClick={onClose}
        >
          取消
        </Button>
        <Button
          color="danger"
          size="sm"
          onClick={handleConfirm}
        >
          删除
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteTagDialog;
