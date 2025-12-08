import React, { useRef, useEffect } from 'react';
import PromptListHeader from '@/view/features/PromptLibrary/components/PromptListHeader';
import SearchBar from '@/view/features/PromptLibrary/components/SearchBar';
import TagSelector from '@/view/features/TagSystem/components/TagSelector';
import SortAndPaginationBar from '@/view/features/PromptLibrary/components/SortAndPaginationBar';
import SearchResultBar from '@/view/features/PromptLibrary/components/SearchResultBar';
import PromptList from '@/view/features/PromptLibrary/components/PromptList';
import { usePromptLibraryViewModel } from '@/view/features/PromptLibrary/hooks/usePromptLibraryViewModel';

/**
 * 提示词面板 - 第一段提示词列表主页面
 * 
 * Refactored with MVVM:
 * - 逻辑移至 usePromptLibraryViewModel
 * - 组件专注于渲染
 */
const PromptPanel = ({
  onItemSelect,
  onCopy,
  onView,
  onManage,
}: any) => {
  const {
    paginatedPrompts,
    selectedPrompt,
    searchMode, setSearchMode,
    promptQuery, setPromptQuery,
    tagQuery, setTagQuery,
    selectedTags, addSelectedTag, removeSelectedTag, clearSelectedTags,
    sortBy, setSortBy,
    currentPage, setCurrentPage,
    candidateTags,
    sortedPrompts,
    totalPages,
    hasQuery,
    handleLike,
    handleSelect,
    updatePromptTags,
    allTags
  } = usePromptLibraryViewModel();

  const searchInputRef = useRef<any>(null);

  // 快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
          selectedId={selectedPrompt?.id}
          onItemSelect={(prompt: any) => {
            handleSelect(prompt.id);
            onItemSelect?.(prompt);
          }}
          onCopy={onCopy}
          onView={onView}
          onManage={onManage}
          onLike={handleLike}
          onUpdateTags={updatePromptTags}
          searchMode={searchMode}
          allAvailableTags={allTags}
        />
      </div>
    </div>
  );
};

export default PromptPanel;