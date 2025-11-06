import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import PromptItem from './PromptItem';
import SearchBar from './SearchBar';
import TagSelector from './TagSelector';

/**
 * 提示词列表组件（带搜索功能）
 *
 * 规范要求:
 * - 面板宽度: 400px
 * - 最大高度: 500px
 * - item 间距: 12px (gap-3)
 * - 垂直滚动列表
 *
 * 搜索功能:
 * - 提示词搜索: 模糊匹配 title + description
 * - 标签搜索: 多选标签，OR 关系过滤
 * - 模式切换: 缓存各自的输入内容
 */
const PromptList = ({
  prompts,
  selectedId,
  onItemSelect,
  onCopy,
  onView,
  onManage
}) => {
  // 搜索状态
  const [searchMode, setSearchMode] = useState('prompt'); // 'prompt' | 'tag'
  const [promptQuery, setPromptQuery] = useState('');     // 提示词模式的输入缓存
  const [tagQuery, setTagQuery] = useState('');           // 标签模式的输入缓存
  const [selectedTags, setSelectedTags] = useState([]);   // 已选标签

  // Debounce 状态
  const [debouncedPromptQuery, setDebouncedPromptQuery] = useState('');
  const debounceTimerRef = useRef(null);

  // 搜索框引用（用于快捷键聚焦）
  const searchInputRef = useRef(null);

  // 列表容器引用（用于滚动到底部）
  const listContainerRef = useRef(null);

  // 滚动状态
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Debounce 提示词搜索（300ms）
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedPromptQuery(promptQuery);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [promptQuery]);

  // 快捷键支持：Ctrl/Cmd + F 聚焦搜索框
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+F (Windows/Linux) 或 Cmd+F (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 提取所有唯一标签
  const allTags = useMemo(() => {
    const tags = new Set();
    prompts.forEach(p => p.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [prompts]);

  // 模糊搜索函数
  const fuzzyMatch = (text, query) => {
    return text.toLowerCase().includes(query.toLowerCase());
  };

  // 提示词搜索
  const searchPrompts = (prompts, query) => {
    if (!query.trim()) return prompts;

    return prompts.filter(prompt =>
      fuzzyMatch(prompt.title, query) ||
      fuzzyMatch(prompt.description, query)
    );
  };

  // 根据已选标签过滤（OR 关系）
  const filterByTags = (prompts, selectedTags) => {
    if (selectedTags.length === 0) return prompts;

    return prompts.filter(prompt =>
      prompt.tags.some(tag => selectedTags.includes(tag))
    );
  };

  // 获取标签候选列表
  const candidateTags = useMemo(() => {
    if (searchMode !== 'tag') return [];
    if (!tagQuery.trim()) return allTags.slice(0, 10);

    return allTags
      .filter(tag => fuzzyMatch(tag, tagQuery))
      .slice(0, 10); // 最多 10 个
  }, [allTags, tagQuery, searchMode]);

  // 过滤后的提示词列表（使用 debounced query）
  const filteredPrompts = useMemo(() => {
    if (searchMode === 'prompt') {
      return searchPrompts(prompts, debouncedPromptQuery);
    } else {
      return filterByTags(prompts, selectedTags);
    }
  }, [prompts, searchMode, debouncedPromptQuery, selectedTags]);

  // 监听滚动位置，判断是否在底部
  useEffect(() => {
    const container = listContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // 距离底部小于 10px 认为是在底部
      const atBottom = scrollHeight - scrollTop - clientHeight < 10;
      setIsAtBottom(atBottom);
    };

    container.addEventListener('scroll', handleScroll);
    // 初始检查
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [filteredPrompts]);

  // 处理标签选择
  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 处理标签移除
  const handleTagRemove = (tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  // 清空所有标签
  const handleClearAllTags = () => {
    setSelectedTags([]);
  };

  // 滚动到底部
  const scrollToBottom = () => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo({
        top: listContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // 滚动到顶部
  const scrollToTop = () => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 列表头部 */}
      <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
        <h2 className="text-base font-semibold m-0" style={{ color: 'hsl(262, 83%, 58%)' }}>
          提示词列表
        </h2>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
          {prompts.length} 个
        </span>
      </div>

      {/* 搜索栏 */}
      <SearchBar
        ref={searchInputRef}
        mode={searchMode}
        promptQuery={promptQuery}
        tagQuery={tagQuery}
        onPromptQueryChange={setPromptQuery}
        onTagQueryChange={setTagQuery}
        onModeChange={setSearchMode}
      />

      {/* 标签选择器（仅标签模式显示） */}
      {searchMode === 'tag' && (
        <TagSelector
          candidateTags={candidateTags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
          onTagRemove={handleTagRemove}
          onClearAll={handleClearAllTags}
        />
      )}

      {/* 搜索结果计数 */}
      {(searchMode === 'prompt' && promptQuery) || (searchMode === 'tag' && selectedTags.length > 0) ? (
        <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border">
          找到 {filteredPrompts.length} 个提示词
        </div>
      ) : null}

      {/* 滚动列表容器 */}
      <div ref={listContainerRef} className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 relative">
        {filteredPrompts.length > 0 ? (
          filteredPrompts.map(prompt => (
            <PromptItem
              key={prompt.id}
              prompt={prompt}
              isSelected={selectedId === prompt.id}
              onSelect={() => onItemSelect(prompt)}
              onCopy={onCopy}
              onView={onView}
              onManage={onManage}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-sm text-muted-foreground mb-1">未找到相关提示词</div>
            <div className="text-xs text-muted-foreground">
              {searchMode === 'prompt' ? '尝试使用其他关键词' : '尝试选择其他标签'}
            </div>
          </div>
        )}

        {/* 滚动按钮 - 在底部显示"到顶部"，否则显示"到底部" */}
        {filteredPrompts.length > 3 && (
          <button
            onClick={isAtBottom ? scrollToTop : scrollToBottom}
            className="sticky bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-[hsl(262,83%,58%)]/70 hover:bg-[hsl(262,83%,58%)]/90 text-white rounded-full shadow-lg transition-all duration-150 flex items-center justify-center cursor-pointer border-0 active:scale-95"
            title={isAtBottom ? "滚动到顶部" : "滚动到底部"}
            aria-label={isAtBottom ? "滚动到顶部" : "滚动到底部"}
          >
            <span className="text-lg">{isAtBottom ? '⬆' : '⬇'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PromptList;
