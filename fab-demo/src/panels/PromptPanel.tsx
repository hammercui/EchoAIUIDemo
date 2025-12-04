import React, { useMemo, useEffect, useRef } from 'react';
import PromptListHeader from '@/features/PromptLibrary/components/PromptListHeader';
import SearchBar from '@/features/PromptLibrary/components/SearchBar';
import TagSelector from '@/features/TagSystem/components/TagSelector';
import SortAndPaginationBar from '@/features/PromptLibrary/components/SortAndPaginationBar';
import SearchResultBar from '@/features/PromptLibrary/components/SearchResultBar';
import PromptList from '@/features/PromptLibrary/components/PromptList';
import { usePromptListStore } from '@/stores/usePromptListStore';

/**
 * 提示词面板 - 第一段提示词列表主页面
 * 
 * Refactored with Zustand:
 * - 搜索、筛选、排序、分页状态已移至 usePromptListStore
 * - 组件专注于数据计算（过滤/排序逻辑）和渲染
 * 
 * 注意：虽然数据计算（Filtering/Sorting）也可以放入 Store，
 * 但为了 keeping Store lean 和利用 React Memoization，这里保留在组件内计算。
 */
const PromptPanel = ({
  prompts,
  selectedId,
  onItemSelect,
  onCopy,
  onView,
  onManage,
  onLike,
  onUpdateTags
}) => {
  // 从 Store 获取状态和 Actions
  const {
    searchMode, setSearchMode,
    promptQuery, setPromptQuery,
    tagQuery, setTagQuery,
    selectedTags, addSelectedTag, removeSelectedTag, clearSelectedTags,
    sortBy, setSortBy,
    currentPage, setCurrentPage, itemsPerPage
  } = usePromptListStore();

  // Debounce 状态（仍然保留在组件内，因为它是 UI 交互细节）
  const [debouncedPromptQuery, setDebouncedPromptQuery] = React.useState('');
  const debounceTimerRef = useRef<any>(null);

  // 搜索框引用
  const searchInputRef = useRef<any>(null);

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

  // 快捷键支持
  useEffect(() => {
    const handleKeyDown = (e) => {
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

  // 根据已选标签过滤
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
      .slice(0, 10);
  }, [allTags, tagQuery, searchMode]);

  // 过滤后的提示词列表
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

  // 判断是否有搜索条件
  const hasQuery = (searchMode === 'prompt' && promptQuery) || (searchMode === 'tag' && selectedTags.length > 0);

  return (
    <div className="flex flex-col h-full max-h-[80vh] min-h-[300px] bg-background-50 rounded-gemini-lg shadow-gemini-lg border border-background-100 overflow-hidden font-gemini text-primary-500">
      {/* Header */}
      <PromptListHeader />

      {/* 搜索栏 */}
      <div className="px-6 py-4 border-b border-background-100 bg-background-50">
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
        <div className="px-6">
          <TagSelector
            candidateTags={candidateTags}
            selectedTags={selectedTags}
            onTagSelect={addSelectedTag}
            onTagRemove={removeSelectedTag}
            onClearAll={clearSelectedTags}
          />
        </div>
      )}

      {/* 排序和分页工具栏 */}
      <SortAndPaginationBar
        sortBy={sortBy}
        onSortChange={setSortBy}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={sortedPrompts.length}
        onPageChange={setCurrentPage}
      />

      {/* 搜索结果计数 */}
      {hasQuery && (
        <div className="px-6">
          <SearchResultBar
            resultCount={sortedPrompts.length}
            searchMode={searchMode}
            hasQuery={hasQuery}
          />
        </div>
      )}

      {/* 提示词列表 */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <PromptList
          prompts={paginatedPrompts}
          selectedId={selectedId}
          onItemSelect={onItemSelect}
          onCopy={onCopy}
          onView={onView}
          onManage={onManage}
          onLike={onLike}
          onUpdateTags={onUpdateTags}
          searchMode={searchMode}
          allAvailableTags={allTags}
        />
      </div>
    </div>
  );
};

export default PromptPanel;