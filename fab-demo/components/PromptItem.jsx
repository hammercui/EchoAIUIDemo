import React, { useState } from 'react';
import ActionButtons from './ActionButtons';

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
 */
const PromptItem = ({ 
  prompt, 
  isSelected, 
  onSelect, 
  onCopy, 
  onView, 
  onManage 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`relative bg-muted border border-border rounded-xl p-3 cursor-pointer transition-all duration-150 shadow-sm group ${
        isSelected 
          ? 'border-[hsl(262,83%,58%)] shadow-[0_0_0_2px_hsl(262,83%,58%,0.1)]' 
          : 'hover:scale-[1.02] hover:shadow-md'
      }`}
      style={isSelected ? {
        background: 'linear-gradient(135deg, hsl(262, 90%, 97%), hsl(262, 90%, 95%))'
      } : {}}
      onClick={onSelect}
    >
      {/* 3 行文本结构 */}
      <div className="pointer-events-none pr-12">
        {/* 第 1 行: 标题 */}
        <h3 className="text-sm font-semibold text-foreground mb-1 leading-tight">
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
        {/* 第 3 行: 标签 + 时间 */}
        <div className="flex justify-between items-center text-[10px]">
          <div className="flex gap-1.5">
            {prompt.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="px-1.5 py-0.5 rounded-md border"
                style={{ 
                  color: 'hsl(262, 90%, 70%)',
                  borderColor: 'hsl(262, 90%, 70%)',
                  backgroundColor: 'transparent'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-muted-foreground">{prompt.date}</span>
        </div>
      </div>

      {/* Action Buttons (竖向排列) */}
      <ActionButtons
        onCopy={() => onCopy(prompt)}
        onView={() => onView(prompt)}
        onManage={() => onManage(prompt)}
      />
    </div>
  );
};

export default PromptItem;
