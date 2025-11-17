import React, { useState } from 'react';
import { VersionCard } from './VersionCard';
import { TimelineNode } from './TimelineNode';
import { AddButton } from './AddButton';
import { Version, SubVersion } from '@/types';

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
    <div className="w-full">
      {/* Add Version Button */}
      <div className="flex justify-center mb-10">
        <AddButton onClick={onAddVersion} />
      </div>

      {/* Timeline Container */}
      <div className="relative pl-12 sm:pl-16 md:pl-20">
        {/* Vertical Timeline Line */}
        <div 
          className="absolute left-10 top-0 bottom-0 w-[3px] rounded-full"
          style={{
            background: 'linear-gradient(180deg, #3b82f6 0%, #67e8f9 100%)'
          }}
        />

        {/* Version Items */}
        <div className="space-y-12 md:space-y-16">
          {versions.map((version, index) => (
            <article
              key={version.id}
              className="relative animate-fadeInUp"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'backwards'
              }}
              onMouseEnter={() => setActiveVersion(version.id)}
              onMouseLeave={() => setActiveVersion(versions[0]?.id || null)}
            >
              {/* Timeline Node */}
              <div className="absolute left-[-28px] top-[24px]">
                <TimelineNode
                  isActive={activeVersion === version.id}
                  position={version.position}
                />
              </div>

              {/* Branch Connector */}
              <div 
                className="absolute left-[-28px] top-[30px] w-[35px] h-[3px] bg-blue-400 transition-all duration-300"
                style={{
                  opacity: activeVersion === version.id ? 1 : 0.5
                }}
              />

              {/* Version Card */}
              <div className="ml-4 sm:ml-6 md:ml-8">
                <VersionCard
                  title={version.title}
                  description={version.description}
                  timestamp={version.timestamp}
                  position={version.position}
                />

                {/* Sub-versions */}
                {version.subVersions && version.subVersions.length > 0 && (
                  <div className="mt-6 ml-4 sm:ml-6 relative">
                    {/* Sub-version connector line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyan-300 rounded-full" />
                    
                    <div className="space-y-3 pl-6">
                      {version.subVersions.map((subVersion: SubVersion) => (
                        <div
                          key={subVersion.id}
                          className="relative group"
                        >
                          {/* Sub-version dot */}
                          <div 
                            className="absolute left-[-30px] top-2 w-2 h-2 rounded-full bg-cyan-400 
                                     transition-transform duration-200 group-hover:scale-125"
                          />
                          
                          {/* Sub-version content */}
                          <div className="bg-cyan-50/50 rounded-lg p-3 border border-cyan-200/50 
                                        hover:border-cyan-300 hover:shadow-sm transition-all duration-200">
                            <h4 className="text-sm font-semibold text-cyan-700">
                              {subVersion.title}
                            </h4>
                            <p className="text-xs text-slate-600 mt-1">
                              {subVersion.description}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Add Sub Button */}
                      <button 
                        className="ml-2 px-3 py-1.5 text-xs rounded-md border border-cyan-300 
                                 text-cyan-600 hover:bg-cyan-50 hover:border-cyan-400 
                                 transition-all duration-200 flex items-center gap-1.5"
                      >
                        <span className="text-base font-light">+</span>
                        <span>Add Sub</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
