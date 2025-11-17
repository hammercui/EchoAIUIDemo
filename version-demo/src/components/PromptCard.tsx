import React from 'react';
import { cn } from '@/lib/utils';

interface PromptCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left p-4 rounded-lg',
        'bg-card border border-border',
        'hover:border-primary/50 hover:shadow-md hover:shadow-primary/5',
        'transition-all duration-200',
        'active:scale-[0.98]'
      )}
    >
      <h4 className="text-sm font-semibold text-card-foreground mb-1">
        {title}
      </h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </button>
  );
};
