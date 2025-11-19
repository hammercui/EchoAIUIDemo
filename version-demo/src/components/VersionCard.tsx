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
  className,
}) => {
  return (
    <article
      className={cn(
        'group relative rounded-2xl bg-violet-50 p-6', // version-1 uses #f5f3ff which is bg-violet-50
        'border border-violet-200', // version-1 uses #e9d5ff which is border-violet-200
        'shadow-md shadow-violet-100/50', // Similar to version-1's filter effect
        'hover:border-violet-300 hover:shadow-xl hover:shadow-violet-200/60',
        'hover:-translate-y-0.5',
        'transition-all duration-300 ease-out',
        className
      )}
    >
      {/* 拖拽手柄 */}
      <div 
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-60 
                   transition-all duration-300 cursor-grab active:cursor-grabbing"
      >
        <div className="flex flex-col gap-0.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-0.5">
              {[0, 1].map((j) => (
                <div
                  key={j}
                  className="w-1.5 h-1.5 rounded-full bg-violet-400 
                           group-hover:bg-violet-500 transition-colors duration-200"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 装饰性渐变条 */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl 
                   bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* 内容 */}
      <div className="space-y-3 relative">
        <h3
          className="text-lg font-bold text-slate-900"
        >
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center gap-2 pt-2 border-t border-violet-200/50">
          <svg
            className="w-3.5 h-3.5 text-violet-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <time className="text-xs font-medium text-violet-500">
            {timestamp}
          </time>
        </div>
      </div>

      {/* 背景装饰光晕 */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                   transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.1), transparent 70%)'
        }}
      />
    </article>
  );
};
