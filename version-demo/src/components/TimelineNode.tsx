import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineNodeProps {
  isActive?: boolean;
  position: 'left' | 'right';
  className?: string;
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({
  isActive = false,
  position,
  className,
}) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* 连接线 */}
      <div
        className={cn(
          'absolute h-0.5 bg-border',
          position === 'left' ? 'left-8 right-0' : 'left-0 right-8',
          className
        )}
      />

      {/* 节点 */}
      <div className="relative z-10">
        <div
          className={cn(
            'w-4 h-4 rounded-full border-2 bg-background',
            'transition-all duration-200',
            isActive
              ? 'border-primary shadow-lg shadow-primary/30'
              : 'border-border hover:border-primary/50'
          )}
        />
        
        {/* 激活时的波纹效果 */}
        {isActive && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ripple-1" />
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ripple-2" />
            <div className="absolute inset-0 rounded-full border-2 border-primary/10 animate-ripple-3" />
          </>
        )}
      </div>
    </div>
  );
};
