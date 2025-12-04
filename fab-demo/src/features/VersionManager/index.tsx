import React, { useState, useMemo } from 'react';
import { TimelineNode } from './TimelineNode';
import { CandidatePanel } from './CandidatePanel';
import type { VersionData } from './types';


// Mock Data
const INITIAL_DATA: VersionData[] = [
    {
        id: '5', version: 'V5.0', status: 'dev', date: '10:30 AM',
        desc: 'Refactored authentication middleware.', tags: ['Backend']
    },
    {
        id: '4', version: 'V4.2', date: 'Yesterday',
        desc: 'Updated UI components with new tokens.', tags: ['Design']
    },
    {
        id: '3', version: 'V3.5', status: 'fix', date: 'Nov 22',
        desc: 'Fixed latency in dashboard queries.', tags: ['Fix']
    },
    {
        id: '1', version: 'V1.0', status: 'live', date: 'Nov 15',
        desc: 'Base system architecture setup.', tags: ['Core', 'API'],
        subVersions: [
            { id: '1-2', version: 'V1.2', date: 'Nov 16', desc: 'Hotfix for login timeout.', tags: ['Fix', 'Auth'] },
            { id: '1-1', version: 'V1.1', date: 'Nov 15', desc: 'Initial deployment.', tags: ['Release'] }
        ]
    }
];

export const VersionManager: React.FC = () => {
    const [versions, setVersions] = useState<VersionData[]>(INITIAL_DATA);
    const [selectedId, setSelectedId] = useState<string>('1'); // Default selected V1.0
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

    const togglePanel = () => setIsPanelOpen(!isPanelOpen);

    // Collect all available tags for autocomplete
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
            // Check if main version
            if (v.id === versionId) {
                return { ...v, tags: newTags };
            }
            // Check sub-versions
            if (v.subVersions) {
                const updatedSubs = v.subVersions.map(s => 
                    s.id === versionId ? { ...s, tags: newTags } : s
                );
                // Only update if something changed
                if (updatedSubs.some((s, i) => s !== v.subVersions![i])) {
                     return { ...v, subVersions: updatedSubs };
                }
            }
            return v;
        }));
    };

    return (
        <div className="app-container">
            {/* Left Timeline Area */}
            <main className="timeline-area">
                <button className="btn-add-version" onClick={togglePanel}>
                    <span>+</span> Add Version
                </button>

                <div className="timeline-track">
                    {versions.map((item, index) => (
                        <TimelineNode
                            key={item.id}
                            data={item}
                            // Logic: Even index right, Odd index left
                            position={index % 2 === 0 ? 'right' : 'left'}
                            isSelected={selectedId === item.id}
                            onSelect={setSelectedId}
                            onUpdateTags={handleUpdateTags}
                            allAvailableTags={allAvailableTags}
                        />
                    ))}
                </div>
            </main>

            {/* Right Candidate Panel */}
            <CandidatePanel
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
            />
        </div>
    );
};