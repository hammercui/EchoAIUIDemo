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
        'inline-flex items-center gap-2 px-6 py-2.5 rounded-full',
        'bg-foreground text-background',
        'hover:bg-foreground/90 hover:shadow-lg',
        'transition-all duration-150',
        'active:scale-95',
        className
      )}
    >
      <Plus className="w-5 h-5" />
      <span className="font-medium">{children}</span>
    </button>
  );
};
