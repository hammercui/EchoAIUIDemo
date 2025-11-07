import React, { forwardRef } from 'react';

/**
 * 搜索栏组件 - HeroUI 风格
 *
 * 功能:
 * - 搜索输入框（带清空按钮）
 * - 模式切换器（提示词 | 标签）
 * - 支持缓存机制（切换模式时保留各自的输入）
 * - 支持快捷键聚焦（Ctrl/Cmd + F）
 *
 * 规范:
 * - 圆角完全圆形按钮
 * - 渐变色激活状态
 * - 动画: 150ms
 */

const SearchIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

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
    <div className="w-full">
      {/* 搜索输入框 - HeroUI 风格 */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none w-4 h-4">
          <SearchIcon />
        </div>
        <input
          ref={ref}
          type="text"
          value={currentQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full h-10 pl-10 pr-10 bg-muted/50 border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground transition-all duration-150 focus:outline-none focus:bg-background focus:border-[hsl(262,83%,58%)] hover:bg-muted"
        />
        {/* 清空按钮 */}
        {currentQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150 cursor-pointer bg-transparent border-0 p-0"
            aria-label="清空"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* 模式切换器 - HeroUI 胶囊式设计 */}
      <div className="flex gap-1 p-1 bg-muted/50 rounded-full mt-2 w-fit">
        <button
          onClick={() => handleModeSwitch('prompt')}
          className={`flex-1 h-8 px-4 text-sm font-medium rounded-full transition-all duration-150 cursor-pointer ${
            mode === 'prompt'
              ? 'text-white shadow-md'
              : 'bg-transparent text-muted-foreground hover:text-foreground'
          }`}
          style={mode === 'prompt' ? {
            background: 'linear-gradient(135deg, hsl(262, 83%, 58%), hsl(262, 83%, 48%))'
          } : {}}
        >
          提示词
        </button>
        <button
          onClick={() => handleModeSwitch('tag')}
          className={`flex-1 h-8 px-4 text-sm font-medium rounded-full transition-all duration-150 cursor-pointer ${
            mode === 'tag'
              ? 'text-white shadow-md'
              : 'bg-transparent text-muted-foreground hover:text-foreground'
          }`}
          style={mode === 'tag' ? {
            background: 'linear-gradient(135deg, hsl(262, 83%, 58%), hsl(262, 83%, 48%))'
          } : {}}
        >
          标签
        </button>
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;

