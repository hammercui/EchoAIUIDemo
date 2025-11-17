import React, { useState } from 'react';
import { VersionCard } from './VersionCard';
import { TimelineNode } from './TimelineNode';
import { AddButton } from './AddButton';
import { Version } from '@/types';
import { cn } from '@/lib/utils';

interface VersionTimelineProps {
  versions: Version[];
  onAddVersion?: () => void;
}

export const VersionTimeline: React.FC<VersionTimelineProps> = ({
  versions,
  onAddVersion,
}) => {
  const [activeVersion, setActiveVersion] = useState<number | null>(
    versions[0]?.id || null
  );

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Version Management Timeline
        </h1>
        <p className="text-sm text-slate-500">
          Drag cards to reorder • Click + to add versions • Sub-versions on left side
        </p>
      </div>

      {/* 添加版本按钮 */}
      <div className="flex justify-center mb-12">
        <AddButton onClick={onAddVersion} />
      </div>

      {/* 时间线主轴 */}
      <div className="relative">
        {/* 中心垂直线 - 蓝色 */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-timeline-main -translate-x-1/2 rounded-full" />

        {/* 版本列表 */}
        <div className="space-y-16">
          {versions.map((version) => (
            <div
              key={version.id}
              className="relative"
              onMouseEnter={() => setActiveVersion(version.id)}
              onMouseLeave={() =>
                setActiveVersion(versions[0]?.id || null)
              }
            >
              <div
                className={cn(
                  'grid grid-cols-2 gap-8 items-center',
                  version.position === 'right' && 'direction-rtl'
                )}
              >
                {/* 左侧/右侧卡片 */}
                {version.position === 'left' ? (
                  <>
                    <div className="pr-8">
                      <VersionCard
                        title={version.title}
                        description={version.description}
                        timestamp={version.timestamp}
                        position={version.position}
                      />
                    </div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div className="pl-8">
                      <VersionCard
                        title={version.title}
                        description={version.description}
                        timestamp={version.timestamp}
                        position={version.position}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* 时间线节点 */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <TimelineNode
                  isActive={activeVersion === version.id}
                  position={version.position}
                />
              </div>

              {/* 子版本 */}
              {version.subVersions && version.subVersions.length > 0 && (
                <div className="mt-6 ml-8">
                  <div className="relative pl-8 border-l-2 space-y-4" style={{ borderColor: '#67e8f9' }}>
                    {version.subVersions.map((subVersion) => (
                      <div
                        key={subVersion.id}
                        className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full"
                        style={{ '--before-bg': '#67e8f9' } as React.CSSProperties}
                      >
                        <div className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#67e8f9' }} />
                        <h4 className="text-sm font-bold" style={{ color: '#67e8f9' }}>
                          {subVersion.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5">
                          • {subVersion.description}
                        </p>
                      </div>
                    ))}
                    {/* Add Sub 按钮 */}
                    <button 
                      className="ml-4 px-3 py-1.5 text-xs rounded-md hover:bg-cyan-50 transition-colors flex items-center gap-1"
                      style={{ color: '#67e8f9', borderColor: '#67e8f9', borderWidth: '1px' }}
                    >
                      <span className="text-sm">+</span>
                      <span>Add Sub</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
