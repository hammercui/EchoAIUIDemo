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
      {/* 连接线 - 蓝色，根据卡片位置调整 */}
      <div
        className={cn(
          'absolute h-1 bg-timeline-main',
          position === 'left' ? 'right-1/2 left-[-2rem] w-[calc(2rem+0.5px)]' : 'left-1/2 right-[-2rem] w-[calc(2rem+0.5px)]',
          className
        )}
      />

      {/* 节点 - 方形蓝色块 */}
      <div className="relative z-10">
        <div
          className={cn(
            'w-3 h-3 rounded-sm bg-timeline-main',
            'transition-all duration-200',
            isActive && 'shadow-lg shadow-blue-500/50 scale-125'
          )}
        />
        
        {/* 激活时的波纹效果 */}
        {isActive && (
          <>
            <div className="absolute inset-0 rounded-sm bg-blue-500/30 animate-ripple-1" />
            <div className="absolute inset-0 rounded-sm bg-blue-500/20 animate-ripple-2" />
            <div className="absolute inset-0 rounded-sm bg-blue-500/10 animate-ripple-3" />
          </>
        )}
      </div>
    </div>
  );
};
