import React from 'react';
import { cn } from '@/lib/utils';

interface VersionCardProps {
  title: string;
  description: string;
  timestamp: string;
  position: 'left' | 'right';
  className?: string;
}

export const VersionCard: React.FC<VersionCardProps> = ({
  title,
  description,
  timestamp,
  position,
  className,
}) => {
  return (
    <div
      className={cn(
        'group relative rounded-2xl bg-accent/50 backdrop-blur-sm p-6',
        'border border-border/50',
        'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10',
        'transition-all duration-200',
        className
      )}
    >
      {/* 拖拽手柄 */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex flex-col gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-1">
              {[0, 1].map((j) => (
                <div
                  key={j}
                  className="w-1 h-1 rounded-full bg-muted-foreground/30"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 内容 */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground/70">{timestamp}</p>
      </div>
    </div>
  );
};
