import React, { useState } from 'react';
import ActionButtons from './ActionButtons';
import { AddTagDialog, DeleteTagDialog } from './TagDialog';

/**
 * 提示词卡片组件
 * 
 * 规范要求:
 * - 背景: bg-muted
 * - 边框: border border-border
 * - 圆角: rounded-xl (12px)
 * - 悬停: scale-[1.02] + shadow-md
 * - 动画时长: 150ms
 * - 3 行文本结构
 * 
 * 新增功能:
 * - 点赞按钮
 * - 标签编辑（新增+删除）
 */
const PromptItem = ({ 
  prompt, 
  isSelected, 
  onSelect, 
  onCopy, 
  onView, 
  onManage,
  onLike,
  onUpdateTags
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tagToDelete, setTagToDelete] = useState('');

  // 处理点赞
  const handleLike = (e) => {
    e.stopPropagation();
    onLike?.(prompt.id);
  };

  // 处理新增标签
  const handleAddTag = (e) => {
    e.stopPropagation();
    setShowAddDialog(true);
  };

  const handleConfirmAddTag = (tagName) => {
    if (!prompt.tags.includes(tagName)) {
      onUpdateTags?.(prompt.id, [...prompt.tags, tagName]);
    }
  };

  // 处理删除标签（右键触发删除模式）
  const handleTagRightClick = (e, tag) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteMode(true);
  };

  const handleDeleteTag = (e, tag) => {
    e.stopPropagation();
    if (isDeleteMode) {
      setTagToDelete(tag);
      setShowDeleteDialog(true);
    }
  };

  const handleConfirmDeleteTag = () => {
    onUpdateTags?.(prompt.id, prompt.tags.filter(t => t !== tagToDelete));
    setIsDeleteMode(false);
  };

  // 点击空白处退出删除模式
  const handleCardClick = () => {
    if (isDeleteMode) {
      setIsDeleteMode(false);
    } else {
      onSelect();
    }
  };

  return (
    <>
      <div
        className={`relative bg-muted border border-border rounded-xl p-3 cursor-pointer transition-all duration-150 shadow-sm group ${
          isSelected
            ? 'border-ring shadow-[0_0_0_2px_hsl(262,83%,58%,0.1)] bg-[hsl(262,90%,97%)]'
            : 'hover:scale-[1.02] hover:shadow-md'
        }`}
        onClick={handleCardClick}
      >
        {/* 3 行文本结构 */}
        <div className="pointer-events-none pr-12">
          {/* 第 1 行: 标题（缩小字号） */}
          <h3 className="text-xs font-semibold text-foreground mb-1 leading-tight">
            {prompt.title}
          </h3>
          {/* 第 2 行: 描述 (3行省略) */}
          <div 
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <p className="text-xs text-muted-foreground mb-1.5 leading-tight line-clamp-3 pointer-events-auto">
              {prompt.description}
            </p>
            {/* Tooltip - 显示在上方 */}
            {showTooltip && (
              <div className="absolute left-0 bottom-full mb-2 z-50 max-w-xs p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl pointer-events-none animate-in fade-in-0 slide-in-from-bottom-2 duration-150">
                {prompt.description}
                {/* 小三角箭头 */}
                <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>
          {/* 第 3 行: 标签 + 点赞 + 时间 */}
          <div className="flex justify-between items-center text-[10px] pointer-events-auto">
            {/* 左侧：标签区 */}
            <div className="flex gap-1.5 items-center flex-wrap">
              {prompt.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`relative px-1.5 py-0.5 rounded-md border border-[hsl(var(--accent-violet))] text-[hsl(var(--accent-violet))] bg-transparent transition-all duration-150 ${
                    isDeleteMode ? 'pr-4' : ''
                  }`}
                  onContextMenu={(e) => handleTagRightClick(e, tag)}
                  onClick={(e) => isDeleteMode && handleDeleteTag(e, tag)}
                >
                  {tag}
                  {/* 删除模式：显示×按钮 */}
                  {isDeleteMode && (
                    <button
                      onClick={(e) => handleDeleteTag(e, tag)}
                      className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white rounded-full flex items-center justify-center text-[8px] hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
              {/* + 按钮 */}
              <button
                onClick={handleAddTag}
                className="w-5 h-5 border border-dashed border-[hsl(262,90%,70%)] text-[hsl(262,90%,70%)] rounded-md flex items-center justify-center hover:bg-[hsl(262,90%,70%)]/10 transition-colors duration-150"
                title="添加标签"
              >
                +
              </button>
            </div>

            {/* 右侧：点赞 + 时间 */}
            <div className="flex items-center gap-2">
              {/* 点赞按钮 */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-0.5 transition-all duration-150 ${
                  prompt.isLiked
                    ? 'text-ring'
                    : 'text-muted-foreground hover:text-ring'
                }`}
                title={prompt.isLiked ? '取消点赞' : '点赞'}
              >
                <span className="text-sm">
                  {prompt.isLiked ? '👍' : '👍🏻'}
                </span>
                <span className="font-medium">{prompt.likes}</span>
              </button>

              {/* 时间 */}
              <span className="text-muted-foreground">{prompt.date}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons (竖向排列) */}
        <ActionButtons
          onCopy={() => onCopy(prompt)}
          onView={() => onView(prompt)}
          onManage={() => onManage(prompt)}
          onUsage={() => onUpdateTags?.(prompt.id, prompt.tags, true)}
        />
      </div>

      {/* 对话框 */}
      <AddTagDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onConfirm={handleConfirmAddTag}
      />
      <DeleteTagDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDeleteTag}
        tagName={tagToDelete}
      />
    </>
  );
};

export default PromptItem;
