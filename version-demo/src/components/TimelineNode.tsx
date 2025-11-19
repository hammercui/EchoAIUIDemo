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
          'absolute h-1 bg-[#67e8f9]',
          position === 'left' ? 'right-1/2 left-[-2rem] w-[calc(2rem+0.5px)]' : 'left-1/2 right-[-2rem] w-[calc(2rem+0.5px)]',
          className
        )}
      />

      {/* 节点 - 圆形节点 */}
      <div className="relative z-10">
        <div
          className={cn(
            'w-3 h-3 rounded-full bg-[#ecfeff] border-2 border-[#06b6d4]',
            'transition-all duration-200',
            isActive && 'shadow-lg shadow-cyan-500/50 scale-125'
          )}
        />

        {/* 激活时的效果 */}
        {isActive && (
          <div className="absolute inset-[-2px] rounded-full bg-cyan-500/30 animate-ripple-1" />
        )}
      </div>
    </div>
  );
};
