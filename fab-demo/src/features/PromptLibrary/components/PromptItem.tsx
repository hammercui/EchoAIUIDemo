import React, { useState } from 'react';
import { Tooltip } from '@heroui/tooltip';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import ActionButtons from '@/components/common/ActionButtons';
import { AddTagDialog, DeleteTagDialog } from '@/features/TagSystem/components/TagDialog';
import { SOURCE_ICONS, getSourceName } from '@/components/common/SourceLogos';

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
  onUpdateTags,
  allAvailableTags = [] as any[] // 系统中所有可用的标签
}) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tagToDelete, setTagToDelete] = useState('');

  // 处理点赞（+1）
  const handleLike = (e) => {
    e.stopPropagation();
    onLike?.(prompt.id, 1); // +1
  };

  // 处理取消赞（-1）
  const handleDislike = (e) => {
    e.stopPropagation();
    onLike?.(prompt.id, -1); // -1
  };

  // 处理新增标签
  const handleAddTag = (e) => {
    e.stopPropagation();
    setShowAddDialog(true);
  };

  const handleConfirmAddTag = (newTags) => {
    // newTags 是一个数组，包含所有要添加的标签
    const updatedTags = [...new Set([...prompt.tags, ...newTags])]; // 去重
    onUpdateTags?.(prompt.id, updatedTags);
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
        className={`relative bg-muted border border-border rounded-xl cursor-pointer transition-all duration-150 shadow-sm group ${isSelected
          ? 'border-ring shadow-[0_0_0_2px_rgba(97,40,255,0.1)] bg-accent/5'
          : 'hover:scale-[1.02] hover:shadow-md'
          }`}
        onClick={handleCardClick}
      >
        {/* 3 行文本结构 - 统一 px-3 py-3 左右边距 */}
        <div className="px-3 py-3 pointer-events-none">
          {/* 第 1 行: 标题（靠近顶部边缘） */}
          <h3 className="text-xs font-semibold text-foreground mb-1.5 leading-tight">
            {prompt.title}
          </h3>

          {/* 第 2 行: 描述 (3行省略) - 左右边距与标题一致 */}
          <Tooltip
            content={prompt.description}
            placement="top"
            classNames={{
              base: "max-w-xs",
              content: "bg-gray-900 text-white px-3 py-2 text-xs rounded-lg shadow-lg"
            }}
          >
            <p className="text-xs text-muted-foreground mb-2.5 leading-tight line-clamp-3 pointer-events-auto">
              {prompt.description}
            </p>
          </Tooltip>

          {/* 第 3 行: 标签 + 点赞 + 时间 - 左右边距与标题一致 */}
          <div className="flex justify-between items-center text-xs pointer-events-auto mt-auto">
            {/* 左侧：标签区 */}
            <div className="flex gap-1.5 items-center flex-wrap">
              {prompt.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`relative px-1.5 py-0.5 rounded-md border border-accent/50 text-accent bg-transparent transition-all duration-150 ${isDeleteMode ? 'pr-4' : ''
                    }`}
                  onContextMenu={(e) => handleTagRightClick(e, tag)}
                  onClick={(e) => isDeleteMode && handleDeleteTag(e, tag)}
                >
                  {tag}
                  {/* 删除模式：显示×按钮 */}
                  {isDeleteMode && (
                    <button
                      onClick={(e) => handleDeleteTag(e, tag)}
                      className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-[10px] hover:bg-destructive/90 transition-colors"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
              {/* + 按钮 */}
              <button
                onClick={handleAddTag}
                className="w-5 h-5 border border-dashed border-accent/50 text-accent rounded-md flex items-center justify-center hover:bg-accent/10 transition-colors duration-150"
                title="添加标签"
              >
                +
              </button>
            </div>

            {/* 右侧：来源 + 点赞 + 时间 */}
            <div className="flex items-center gap-2.5 ml-2 mr-8 flex-shrink-0">
              {/* 来源网站 Logo - 堆叠显示 */}
              {prompt.sources && prompt.sources.length > 0 && (
                <div className="flex items-center h-5">
                  {/* 显示前3个logo */}
                  <div className="flex items-center -space-x-0.5">
                    {prompt.sources.slice(0, 3).map((source, idx) => {
                      const IconComponent = SOURCE_ICONS[source];
                      if (!IconComponent) return null;
                      return (
                        <Tooltip
                          key={idx}
                          content={getSourceName(source)}
                          placement="top"
                          classNames={{
                            content: "bg-gray-900 text-white px-2 py-1 text-xs rounded"
                          }}
                        >
                          <div
                            className="w-5 h-5 rounded-full bg-white border border-border flex items-center justify-center hover:z-10 transition-transform hover:scale-110"
                            style={{ zIndex: 3 - idx }}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                        </Tooltip>
                      );
                    })}
                    {/* 如果超过3个，显示+N */}
                    {prompt.sources.length > 3 && (
                      <Tooltip
                        content={
                          <div className="flex flex-col gap-1">
                            {prompt.sources.slice(3).map((source, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                {SOURCE_ICONS[source] && React.createElement(SOURCE_ICONS[source], { className: "w-3 h-3" })}
                                <span className="text-xs">{getSourceName(source)}</span>
                              </div>
                            ))}
                          </div>
                        }
                        placement="top"
                        classNames={{
                          content: "bg-gray-900 text-white px-2 py-1.5 rounded"
                        }}
                      >
                        <div className="w-5 h-5 rounded-full bg-muted-foreground/20 border border-border flex items-center justify-center text-[10px] font-medium text-muted-foreground hover:bg-muted-foreground/30 hover:z-10 transition-all cursor-pointer">
                          +{prompt.sources.length - 3}
                        </div>
                      </Tooltip>
                    )}
                  </div>
                </div>
              )}

              {/* 点赞按钮组 - 使用 Lucide React 图标 */}
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-muted-foreground/10 rounded-md h-5">
                {/* 点赞按钮 (+1) */}
                <button
                  onClick={handleLike}
                  className="group/like flex items-center gap-0.5 px-1.5 py-0.5 rounded transition-all duration-200 hover:bg-accent/10 active:scale-95"
                  title="点赞 +1"
                >
                  <ThumbsUp
                    className="w-3 h-3 text-muted-foreground transition-all duration-200 group-hover/like:text-accent group-hover/like:scale-110 group-active/like:fill-accent"
                  />
                </button>

                {/* 点赞数量 */}
                <span className="text-xs font-medium leading-none text-foreground min-w-[16px] text-center">
                  {prompt.likes}
                </span>

                {/* 取消赞按钮 (-1) */}
                <button
                  onClick={handleDislike}
                  className="group/dislike flex items-center gap-0.5 px-1.5 py-0.5 rounded transition-all duration-200 hover:bg-red-100 active:scale-95"
                  title="取消赞 -1"
                >
                  <ThumbsDown
                    className="w-3 h-3 text-muted-foreground transition-all duration-200 group-hover/dislike:text-red-600 group-hover/dislike:scale-110 group-active/dislike:fill-red-600"
                  />
                </button>
              </div>

              {/* 时间 */}
              <span className="text-muted-foreground leading-none h-5 flex items-center">{prompt.date}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons - 固定在右侧悬浮，仅 hover 显示，不占用内容空间 */}
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
        currentTags={prompt.tags}
        allAvailableTags={allAvailableTags}
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
