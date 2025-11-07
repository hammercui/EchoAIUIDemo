import React, { useState, useMemo, useEffect, useRef } from 'react';
import PromptListHeader from '../components/PromptListHeader';
import SearchBar from '../components/SearchBar';
import TagSelector from '../components/TagSelector';
import SortAndPaginationBar from '../components/SortAndPaginationBar';
import SearchResultBar from '../components/SearchResultBar';
import PromptList from '../components/PromptList';

/**
 * 提示词面板 - 第一段提示词列表主页面
 * 
 * 作为 Panel 级别的组件，整合：
 * - Header（Tab页签）
 * - 搜索功能（提示词/标签）
 * - 排序和分页
 * - 提示词列表展示
 * 
 * 规范要求:
 * - 面板宽度: 400px
 * - 最大高度: 80vh
 * - 垂直滚动
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
  // Tab 状态
  const [activeTab, setActiveTab] = useState('list');

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

  // 判断是否有搜索条件
  const hasQuery = (searchMode === 'prompt' && promptQuery) || (searchMode === 'tag' && selectedTags.length > 0);

  return (
    <div className="flex flex-col h-full max-h-[80vh] min-h-[300px]">
      {/* Header - Tab页签 */}
      <PromptListHeader activeTab={activeTab} onTabChange={setActiveTab} />

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
      <SearchResultBar
        resultCount={sortedPrompts.length}
        searchMode={searchMode}
        hasQuery={hasQuery}
      />

      {/* 提示词列表 */}
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
      />
    </div>
  );
};

export default PromptPanel;
