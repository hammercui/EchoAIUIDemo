import React from 'react';
import Button from '@/view/components/common/LegacyButton';

/**
 * 标签选择器组件 - HeroUI 风格
 *
 * 功能:
 * - 显示候选标签（根据输入匹配）
 * - 显示已选标签（可删除）
 * - 支持多选标签
 *
 * 规范:
 * - 圆角: rounded-full
 * - 渐变色选中状态
 * - 动画: 150ms
 */

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M10.5 3.5l-7 7M3.5 3.5l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const TagSelector = ({ 
  candidateTags,    // 候选标签数组
  selectedTags,     // 已选标签数组
  onTagSelect,      // 选择标签回调
  onTagRemove,      // 移除标签回调
  onClearAll        // 清空所有标签回调
}) => {
  // 过滤掉已选的标签
  const availableTags = candidateTags.filter(tag => !selectedTags.includes(tag));

  return (
    <div className="px-3 pb-3 border-b border-border bg-background">
      {/* 候选标签区域 */}
      {availableTags.length > 0 && (
        <div className="mb-3">
          <div className="text-xs text-muted-foreground mb-2">候选标签:</div>
          <div className="max-h-[200px] overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag, index) => (
                <Button
                  key={index}
                  size="sm"
                  radius="full"
                  variant="bordered"
                  onClick={() => onTagSelect(tag)}
                  className="bg-muted/50 hover:bg-muted hover:border-accent hover:text-accent"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 已选标签区域 */}
      {selectedTags.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-muted-foreground">
              已选 {selectedTags.length} 个标签
            </div>
            <Button
              size="sm"
              variant="light"
              onClick={onClearAll}
              className="h-auto px-0 text-xs underline min-w-0"
            >
              清空全部
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag, index) => (
              <div
                key={index}
                className="h-7 px-3 flex items-center gap-2 text-xs font-medium rounded-full transition-all duration-150 text-white shadow-sm bg-primary-500"
              >
                <span>{tag}</span>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onClick={() => onTagRemove(tag)}
                  className="w-3.5 h-3.5 min-w-3.5 text-white hover:opacity-70"
                  aria-label={`移除 ${tag}`}
                  disableRipple
                >
                  <CloseIcon />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 无候选标签提示 */}
      {availableTags.length === 0 && selectedTags.length === 0 && (
        <div className="text-xs text-muted-foreground text-center py-4">
          输入关键词搜索标签
        </div>
      )}
    </div>
  );
};

export default TagSelector;

