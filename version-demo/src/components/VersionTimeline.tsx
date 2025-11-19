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
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[3px] rounded-full"
          style={{
            background: 'linear-gradient(180deg, #06b6d4 0%, #67e8f9 100%)'
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
              <div className="absolute left-1/2 transform -translate-x-1/2 top-[24px] z-10">
                <TimelineNode
                  isActive={activeVersion === version.id}
                  position={version.position}
                />
              </div>

              {/* Version Card */}
              <div className={`max-w-[450px] mx-auto ${
                version.position === 'left'
                  ? 'ml-4 sm:ml-8 md:ml-12 mr-[calc(50%+20px)]'
                  : 'mr-4 sm:mr-8 md:mr-12 ml-[calc(50%+20px)]'
              }`}>
                {/* Branch Connector */}
                <div
                  className={`absolute top-[30px] w-[35px] h-[3px] bg-[#67e8f9] transition-all duration-300 ${
                    version.position === 'left'
                      ? '-right-[35px]'
                      : '-left-[35px]'
                  }`}
                  style={{
                    opacity: activeVersion === version.id ? 1 : 0.5
                  }}
                />
                <VersionCard
                  title={version.title}
                  description={version.description}
                  timestamp={version.timestamp}
                  position={version.position}
                />
              </div>

              {/* Sub-versions */}
              {version.subVersions && version.subVersions.length > 0 && (
                <div className={`mt-6 max-w-[450px] ${
                  version.position === 'left'
                    ? 'ml-4 sm:ml-12'
                    : 'mr-4 sm:mr-12'
                }`}>
                  <div className={`pl-6 ${
                    version.position === 'left' ? 'mr-[20px]' : 'ml-[20px]'
                  }`}>
                    {/* Sub-version connector line */}
                    <div className={`absolute ${version.position === 'left' ? '-right-[16px]' : '-left-[16px]'} top-0 bottom-0 w-[2px] bg-[#67e8f9] rounded-full`} />

                    <div className="space-y-3 pl-6">
                      {version.subVersions.map((subVersion: SubVersion) => (
                        <div
                          key={subVersion.id}
                          className="relative group"
                        >
                          {/* Sub-version dot */}
                          <div
                            className="absolute left-[-30px] top-2 w-2 h-2 rounded-full
                                     bg-[#ecfeff] border-2 border-[#06b6d4]
                                     transition-transform duration-200 group-hover:scale-125"
                          />

                          {/* Sub-version content */}
                          <div className="bg-[#ecfeff]/50 rounded-lg p-3 border border-[#06b6d4]/30
                                        hover:border-[#06b6d4]/50 hover:shadow-sm transition-all duration-200">
                            <h4 className="text-sm font-semibold text-[#187182]">
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
                        className="ml-2 px-3 py-1.5 text-xs rounded-md border border-[#06b6d4]
                                 text-[#06b6d4] hover:bg-[#ecfeff] hover:border-[#0891b2]
                                 transition-all duration-200 flex items-center gap-1.5"
                      >
                        <span className="text-base font-light">+</span>
                        <span>Add Sub</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};