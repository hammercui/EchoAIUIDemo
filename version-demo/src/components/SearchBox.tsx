import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBoxProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search prompts...',
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-300" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full pl-10 pr-4 py-2.5 rounded-xl',
          'bg-violet-50 border border-violet-100',
          'text-sm text-slate-900 placeholder:text-violet-300',
          'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
          'transition-all duration-150'
        )}
      />
    </div>
  );
};
