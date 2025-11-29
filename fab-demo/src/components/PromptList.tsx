import React, { useEffect, useRef, useState } from 'react';
import PromptItem from './PromptItem';
import EmptyState from './EmptyState';
import ScrollButton from './ScrollButton';

/**
 * PromptList - 纯列表渲染组件
 * 由 Panel 层（PromptPanel）负责处理搜索、过滤、排序、分页等逻辑，
 * 该组件只负责渲染传入的提示词数组并提供滚动相关交互。
 */
const PromptList = ({
  prompts = [] as any[],
  selectedId,
  onItemSelect,
  onCopy,
  onView,
  onManage,
  onLike,
  onUpdateTags,
  searchMode = 'prompt',
  allAvailableTags = [] as any[]
}) => {
  const listContainerRef = useRef<any>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const container = listContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setIsAtBottom(scrollHeight - scrollTop - clientHeight < 10);
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [prompts]);

  const scrollToBottom = () => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo({ top: listContainerRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div ref={listContainerRef} className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3 relative">
      {Array.isArray(prompts) && prompts.length > 0 ? (
        prompts.map(prompt => (
          <PromptItem
            key={prompt.id}
            prompt={prompt}
            isSelected={selectedId === prompt.id}
            onSelect={() => onItemSelect?.(prompt)}
            onCopy={onCopy}
            onView={onView}
            onManage={onManage}
            onLike={onLike}
            onUpdateTags={onUpdateTags}
            allAvailableTags={allAvailableTags}
          />
        ))
      ) : (
        <EmptyState searchMode={searchMode} />
      )}

      <ScrollButton
        isAtBottom={isAtBottom}
        onScrollToTop={scrollToTop}
        onScrollToBottom={scrollToBottom}
        show={Array.isArray(prompts) && prompts.length > 3}
      />
    </div>
  );
};

export default PromptList;
