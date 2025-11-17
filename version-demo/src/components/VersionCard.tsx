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
        'group relative rounded-2xl bg-violet-50 p-6',
        'border border-violet-200',
        'hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10',
        'transition-all duration-200',
        className
      )}
    >
      {/* 拖拽手柄 */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex flex-col gap-0.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-0.5">
              {[0, 1].map((j) => (
                <div
                  key={j}
                  className="w-1 h-1 rounded-full bg-violet-300"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 内容 */}
      <div className="space-y-2">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
        <p className="text-xs text-violet-400">{timestamp}</p>
      </div>
    </div>
  );
};
