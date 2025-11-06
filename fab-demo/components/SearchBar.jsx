import React, { forwardRef } from 'react';

/**
 * 搜索栏组件
 *
 * 功能:
 * - 搜索输入框（带清空按钮）
 * - 模式切换器（提示词 | 标签）
 * - 支持缓存机制（切换模式时保留各自的输入）
 * - 支持快捷键聚焦（Ctrl/Cmd + F）
 *
 * 规范:
 * - 高度: 40px
 * - 圆角: 8px
 * - 动画: 150ms
 * - 紫色渐变选中效果
 */
const SearchBar = forwardRef(({
  mode,              // 'prompt' | 'tag'
  promptQuery,       // 提示词模式的输入
  tagQuery,          // 标签模式的输入
  onPromptQueryChange,
  onTagQueryChange,
  onModeChange,
  onClear
}, ref) => {
  // 当前显示的输入值
  const currentQuery = mode === 'prompt' ? promptQuery : tagQuery;
  
  // 输入框占位符
  const placeholder = mode === 'prompt' 
    ? '搜索提示词...' 
    : '输入标签关键词...';

  // 处理输入变化
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (mode === 'prompt') {
      onPromptQueryChange(value);
    } else {
      onTagQueryChange(value);
    }
  };

  // 清空当前模式的输入
  const handleClear = () => {
    if (mode === 'prompt') {
      onPromptQueryChange('');
    } else {
      onTagQueryChange('');
    }
    if (onClear) onClear();
  };

  // 切换模式
  const handleModeSwitch = (newMode) => {
    if (newMode !== mode) {
      onModeChange(newMode);
    }
  };

  return (
    <div className="p-3 border-b border-border bg-background">
      {/* 搜索输入框 */}
      <div className="relative mb-3">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-base">
          🔍
        </div>
        <input
          ref={ref}
          type="text"
          value={currentQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full h-10 pl-9 pr-9 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground transition-all duration-150 focus:outline-none focus:border-[hsl(262,83%,58%)] focus:ring-2 focus:ring-[hsl(262,83%,58%)]/10"
        />
        {/* 清空按钮 */}
        {currentQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150 cursor-pointer bg-transparent border-0 p-0 text-base"
            aria-label="清空"
          >
            ✕
          </button>
        )}
      </div>

      {/* 模式切换器 - 分段控制器（空心紫色边框效果） */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg">
        <button
          onClick={() => handleModeSwitch('prompt')}
          className={`flex-1 h-8 px-3 text-sm font-medium rounded-md transition-all duration-150 cursor-pointer ${
            mode === 'prompt'
              ? 'bg-background border-2 border-[hsl(262,83%,58%)] text-[hsl(262,83%,58%)] shadow-sm'
              : 'bg-transparent text-muted-foreground hover:text-foreground border-2 border-transparent'
          }`}
        >
          提示词
        </button>
        <button
          onClick={() => handleModeSwitch('tag')}
          className={`flex-1 h-8 px-3 text-sm font-medium rounded-md transition-all duration-150 cursor-pointer ${
            mode === 'tag'
              ? 'bg-background border-2 border-[hsl(262,83%,58%)] text-[hsl(262,83%,58%)] shadow-sm'
              : 'bg-transparent text-muted-foreground hover:text-foreground border-2 border-transparent'
          }`}
        >
          标签
        </button>
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;

