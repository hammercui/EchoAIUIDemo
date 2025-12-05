import React, { useState, useMemo, useEffect } from 'react';
import { TimelineNode } from './TimelineNode';
import { CandidatePanel } from './CandidatePanel';
import type { VersionData } from './types';

interface VersionManagerProps {
    versions?: VersionData[];
    currentVersionId?: string;
}

export const VersionManager: React.FC<VersionManagerProps> = ({ 
    versions: initialVersions = [], 
    currentVersionId = '' 
}) => {
    const [versions, setVersions] = useState<VersionData[]>(initialVersions);
    
    useEffect(() => {
        if (initialVersions) {
            setVersions(initialVersions);
        }
    }, [initialVersions]);

    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

    const togglePanel = () => setIsPanelOpen(!isPanelOpen);

    const allAvailableTags = useMemo(() => {
        const tags = new Set<string>();
        versions.forEach(v => {
            v.tags.forEach(t => tags.add(t));
            v.subVersions?.forEach(s => s.tags?.forEach(t => tags.add(t)));
        });
        return Array.from(tags);
    }, [versions]);

    const handleUpdateTags = (versionId: string, newTags: string[]) => {
        setVersions(prev => prev.map(v => {
            if (v.id === versionId) {
                return { ...v, tags: newTags };
            }
            if (v.subVersions) {
                const updatedSubs = v.subVersions.map(s => 
                    s.id === versionId ? { ...s, tags: newTags } : s
                );
                if (updatedSubs.some((s, i) => s !== v.subVersions![i])) {
                     return { ...v, subVersions: updatedSubs };
                }
            }
            return v;
        }));
    };

    const handleSelect = (id: string) => {
        console.log('Clicked version:', id);
    };

    return (
        <div className="app-container">
            <main className="timeline-area">
                <button className="btn-add-version" onClick={togglePanel}>
                    <span>+</span> Add Version
                </button>

                <div className="timeline-track">
                    {versions.length > 0 ? (
                        versions.map((item, index) => (
                            <TimelineNode
                                key={item.id}
                                data={item}
                                position={index % 2 === 0 ? 'right' : 'left'}
                                selectedId={currentVersionId}
                                onSelect={handleSelect}
                                onUpdateTags={handleUpdateTags}
                                allAvailableTags={allAvailableTags}
                            />
                        ))
                    ) : (
                         <div className="text-center py-10 text-gray-400">No version history available.</div>
                    )}
                </div>
            </main>

            <CandidatePanel
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
            />
        </div>
    );
};
