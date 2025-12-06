import React, { useState, useEffect } from 'react';
import Modal from '@/components/common/LegacyModal';
import Button from '@/components/common/LegacyButton';
import { X, Check } from 'lucide-react';

/**
 * 标签管理对话框 - 支持标签的增删改查
 * 
 * Props:
 * @param {boolean} isOpen - 是否打开
 * @param {Function} onClose - 关闭回调
 * @param {Function} onConfirm - 确认回调，接收最终的标签数组
 * @param {Array} currentTags - 当前提示词已有的标签
 * @param {Array} allAvailableTags - 系统中所有可用的标签
 */
export const AddTagDialog = ({ isOpen, onClose, onConfirm, currentTags = [] as any[], allAvailableTags = [] as any[] }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  // 初始化：打开时将 currentTags 设为选中状态
  useEffect(() => {
    if (isOpen) {
      setInputValue('');
      setSelectedTags([...currentTags]);
      setErrorMsg('');
    }
  }, [isOpen, currentTags]);

  // 获取候选标签（系统已有但尚未选中的标签）
  const candidateTags = allAvailableTags.filter(tag => !selectedTags.includes(tag));

  // 检查输入的标签是否可以添加
  const canAddInput = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return false;
    return true;
  };

  // 添加新标签到选中列表
  const handleAddNewTag = (e?: any) => {
    // 阻止事件冒泡，防止触发其他行为
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const trimmed = inputValue.trim();
    if (!trimmed) return;

    // 检查是否已存在
    if (selectedTags.includes(trimmed)) {
      setErrorMsg('该标签已存在');
      // 3秒后清除错误提示
      setTimeout(() => setErrorMsg(''), 3000);
      return;
    }

    const newSelectedTags = [...selectedTags, trimmed];
    setSelectedTags(newSelectedTags);
    setInputValue('');
    setErrorMsg('');
  };

  // 切换候选标签选中状态
  const toggleCandidateTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 移除已选中的标签
  const removeSelectedTag = (tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  // 确认提交所有标签（覆盖更新）
  const handleConfirm = () => {
    onConfirm(selectedTags);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddNewTag();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">
          管理标签
        </h3>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-6 space-y-4 max-h-[60vh] overflow-y-auto">
        {/* 输入框 - 新增标签 */}
        <div>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              onKeyDown={handleKeyDown}
              placeholder="输入新标签名称后按回车"
              className={`w-[63%] px-3 py-2 text-sm border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition-all duration-150 ${
                errorMsg ? 'border-red-500' : 'border-input hover:border-muted-foreground'
              }`}
            />
            <Button
              size="sm"
              onClick={handleAddNewTag}
              isDisabled={!canAddInput()}
              className="flex-1 bg-primary-500 text-white hover:bg-primary-400"
            >
              添加
            </Button>
          </div>
          {/* 错误提示 */}
          {errorMsg && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errorMsg}</p>
          )}
        </div>

        {/* 候选标签 - 系统已有但未选中 */}
        {candidateTags.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              选择已有标签
            </label>
            <div className="flex flex-wrap gap-2">
              {candidateTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleCandidateTag(tag)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 flex items-center gap-1 bg-transparent border border-border text-foreground hover:border-primary-500/60 hover:text-primary-500"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 已选中的标签预览 */}
        {selectedTags.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              已选标签 ({selectedTags.length})
            </label>
            <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-lg border border-border">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-primary-500 text-white border border-primary-600 shadow-sm"
                >
                  {tag}
                  <button
                    onClick={() => removeSelectedTag(tag)}
                    className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 空状态提示 */}
        {selectedTags.length === 0 && candidateTags.length === 0 && !inputValue && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            暂无标签，请输入新标签名称或从已有标签中选择
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          {selectedTags.length > 0 ? (
            <>
              最终将保存 <span className="font-semibold text-primary-500">{selectedTags.length}</span> 个标签
            </>
          ) : (
            '当前未选择任何标签'
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="flat"
            color="default"
            size="sm"
            onClick={onClose}
          >
            取消
          </Button>
          <Button
            className="bg-primary-500 text-white"
            size="sm"
            onClick={handleConfirm}
          >
            确认
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddTagDialog;
