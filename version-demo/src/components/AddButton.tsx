import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const AddButton: React.FC<AddButtonProps> = ({
  onClick,
  children = 'Add New Version',
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 px-6 py-3 rounded-full',
        'bg-primary text-white',
        'hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30',
        'transition-all duration-150',
        'active:scale-95',
        'font-medium text-sm',
        className
      )}
    >
      <Plus className="w-5 h-5" />
      <span>{children}</span>
    </button>
  );
};
