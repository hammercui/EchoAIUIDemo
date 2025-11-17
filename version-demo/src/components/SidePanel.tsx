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
  className?: string;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  tags,
  prompts,
  onTagClick,
  onPromptClick,
  className,
}) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div
      className={cn(
        'w-full max-w-sm rounded-3xl bg-white border border-slate-200 p-6',
        'shadow-2xl',
        className
      )}
    >
      {/* 面板标题 */}
      <h2 className="text-lg font-bold text-slate-900 mb-6">
        Related Prompts
      </h2>

      {/* 搜索框 */}
      <SearchBox
        value={searchValue}
        onChange={setSearchValue}
        className="mb-6"
      />

      {/* 标签过滤 */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-slate-600 mb-3">
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
      </div>

      {/* 提示列表 */}
      <div>
        <h3 className="text-xs font-semibold text-slate-600 mb-3">
          Suggested Prompts
        </h3>
        <div className="space-y-2">
          {prompts
            .filter((prompt) =>
              prompt.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              prompt.description.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((prompt) => (
              <PromptCard
                key={prompt.id}
                title={prompt.title}
                description={prompt.description}
                onClick={() => onPromptClick?.(prompt.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
