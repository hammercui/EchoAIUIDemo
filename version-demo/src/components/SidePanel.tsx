import React, { useState } from 'react';
import { SearchBox } from './SearchBox';
import { TagChip } from './TagChip';
import { PromptCard } from './PromptCard';
import { Tag, Prompt } from '@/types';
import { cn } from '@/lib/utils';

interface SidePanelProps {
  tags: Tag[];
  prompts: Prompt[];
  onTagClick?: (tagId: string) => void;
  onPromptClick?: (promptId: string) => void;
  onClose?: () => void;
  className?: string;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  tags,
  prompts,
  onTagClick,
  onPromptClick,
  onClose,
  className,
}) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <aside
      className={cn(
        'w-full rounded-3xl bg-white/95 backdrop-blur-sm border border-slate-200/80 p-6',
        'shadow-2xl shadow-slate-200/60',
        'animate-fadeIn',
        className
      )}
    >
      {/* 面板标题 */}
      <header className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <svg 
            className="w-5 h-5 text-violet-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" 
            />
          </svg>
          Related Prompts
        </h2>
        
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 
                     transition-all duration-200 group"
            aria-label="Close panel"
          >
            <svg 
              className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
      </header>

      {/* 搜索框 */}
      <SearchBox
        value={searchValue}
        onChange={setSearchValue}
        className="mb-6"
      />

      {/* 标签过滤 */}
      <section className="mb-6">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <svg 
            className="w-3.5 h-3.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" 
            />
          </svg>
          Filter by Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagChip
              key={tag.id}
              label={tag.label}
              isActive={tag.isActive}
              onClick={() => onTagClick?.(tag.id)}
            />
          ))}
        </div>
      </section>

      {/* 提示列表 */}
      <section>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <svg 
            className="w-3.5 h-3.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
            />
          </svg>
          Suggested Prompts
        </h3>
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {prompts
            .filter((prompt) =>
              prompt.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              prompt.description.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((prompt, index) => (
              <div
                key={prompt.id}
                className="animate-slideInRight"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animationFillMode: 'backwards'
                }}
              >
                <PromptCard
                  title={prompt.title}
                  description={prompt.description}
                  onClick={() => onPromptClick?.(prompt.id)}
                />
              </div>
            ))}
        </div>
      </section>
    </aside>
  );
};
