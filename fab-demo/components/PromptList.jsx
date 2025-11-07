import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import PromptItem from './PromptItem';
import SearchBar from './SearchBar';
import TagSelector from './TagSelector';
import SortDropdown from './SortDropdown';
import Pagination from './Pagination';

/**
 * 提示词列表组件（带搜索、排序、分页功能）
 *
 * 规范要求:
 * - 面板宽度: 400px
 * - 最大高度: 80vh
 * - item 间距: 12px (gap-3)
 * - 垂直滚动列表
 *
 * 新增功能:
 * - Tab页签式Header
 * - 排序功能（最新/最早/点赞/使用频率）
 * - 分页功能（每页10条）
 */
const PromptList = ({
  prompts,
  selectedId,
  onItemSelect,
  onCopy,
  onView,
  onManage,
  onLike,
  onUpdateTags
}) => {
  // 搜索状态
  const [searchMode, setSearchMode] = useState('prompt'); // 'prompt' | 'tag'
  const [promptQuery, setPromptQuery] = useState('');     // 提示词模式的输入缓存
  const [tagQuery, setTagQuery] = useState('');           // 标签模式的输入缓存
  const [selectedTags, setSelectedTags] = useState([]);   // 已选标签

  // 排序状态
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'mostLiked' | 'mostUsed'

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    let result;
    if (searchMode === 'prompt') {
      result = searchPrompts(prompts, debouncedPromptQuery);
    } else {
      result = filterByTags(prompts, selectedTags);
    }
    return result;
  }, [prompts, searchMode, debouncedPromptQuery, selectedTags]);

  // 排序后的列表
  const sortedPrompts = useMemo(() => {
    const sorted = [...filteredPrompts];
    
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => b.dateTimestamp - a.dateTimestamp);
        break;
      case 'oldest':
        sorted.sort((a, b) => a.dateTimestamp - b.dateTimestamp);
        break;
      case 'mostLiked':
        sorted.sort((a, b) => b.likes - a.likes);
        break;
      case 'mostUsed':
        sorted.sort((a, b) => b.usageCount - a.usageCount);
        break;
      default:
        break;
    }
    
    return sorted;
  }, [filteredPrompts, sortBy]);

  // 分页后的列表
  const paginatedPrompts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedPrompts.slice(startIndex, endIndex);
  }, [sortedPrompts, currentPage, itemsPerPage]);

  // 总页数
  const totalPages = Math.ceil(sortedPrompts.length / itemsPerPage);

  // 当过滤条件变化时，重置到第一页
  useEffect(() => {
    setCurrentPage(1);
  }, [searchMode, debouncedPromptQuery, selectedTags, sortBy]);

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
  }, [paginatedPrompts]);

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
    <div className="flex flex-col h-full max-h-[80vh] min-h-[300px]">
      {/* Tab页签式Header */}
      <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
        {/* 左侧：Tab标签 */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-[hsl(262,83%,58%)] text-white text-sm font-semibold rounded-lg shadow-sm">
            📝 提示词列表
          </div>
        </div>
      </div>

      {/* 搜索栏 */}
      <div className="px-4 py-3 border-b border-border bg-background">
        <SearchBar
          ref={searchInputRef}
          mode={searchMode}
          promptQuery={promptQuery}
          tagQuery={tagQuery}
          onPromptQueryChange={setPromptQuery}
          onTagQueryChange={setTagQuery}
          onModeChange={setSearchMode}
        />
      </div>

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

      {/* 排序和分页 - 同一行 */}
      <div className="px-4 py-3 border-b border-border bg-background flex items-center justify-between gap-4">
        <div className="flex-shrink-0">
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
        <div className="flex-1 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={sortedPrompts.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      {/* 搜索结果计数 */}
      {(searchMode === 'prompt' && promptQuery) || (searchMode === 'tag' && selectedTags.length > 0) ? (
        <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border">
          找到 {sortedPrompts.length} 个提示词
        </div>
      ) : null}

      {/* 滚动列表容器 */}
      <div ref={listContainerRef} className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 relative">
        {paginatedPrompts.length > 0 ? (
          paginatedPrompts.map(prompt => (
            <PromptItem
              key={prompt.id}
              prompt={prompt}
              isSelected={selectedId === prompt.id}
              onSelect={() => onItemSelect(prompt)}
              onCopy={onCopy}
              onView={onView}
              onManage={onManage}
              onLike={onLike}
              onUpdateTags={onUpdateTags}
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
        {paginatedPrompts.length > 3 && (
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
