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
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Version Management Timeline
        </h1>
        <p className="text-sm text-muted-foreground">
          Drag cards to reorder • Click + to add versions • Sub-versions on left
          side
        </p>
      </div>

      {/* 添加版本按钮 */}
      <div className="flex justify-center mb-12">
        <AddButton onClick={onAddVersion} />
      </div>

      {/* 时间线主轴 */}
      <div className="relative">
        {/* 中心垂直线 */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

        {/* 版本列表 */}
        <div className="space-y-16">
          {versions.map((version, index) => (
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
                  <div className="relative pl-8 border-l-2 border-border space-y-4">
                    {version.subVersions.map((subVersion) => (
                      <div
                        key={subVersion.id}
                        className="relative pl-4 before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:rounded-full before:bg-border"
                      >
                        <h4 className="text-sm font-semibold text-foreground">
                          {subVersion.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {subVersion.description}
                        </p>
                      </div>
                    ))}
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
