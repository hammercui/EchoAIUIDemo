import React from 'react';
import { cn } from '@/lib/utils';

interface TagChipProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const TagChip: React.FC<TagChipProps> = ({
  label,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-1.5 rounded-full text-xs font-medium',
        'border transition-all duration-150',
        'hover:scale-105 active:scale-95',
        isActive
          ? 'bg-primary text-white border-primary shadow-sm'
          : 'bg-white text-violet-600 border-violet-200 hover:border-primary/50 hover:bg-violet-50'
      )}
    >
      {label}
    </button>
  );
};
