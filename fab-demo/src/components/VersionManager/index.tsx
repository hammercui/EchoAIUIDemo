import React, { useState } from 'react';
import { TimelineNode } from './TimelineNode';
import { CandidatePanel } from './CandidatePanel';
import type { VersionData } from './types';


// Mock Data
const MOCK_DATA: VersionData[] = [
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
            { id: '1-2', version: 'V1.2', date: 'Nov 16', desc: 'Hotfix for login timeout.' },
            { id: '1-1', version: 'V1.1', date: 'Nov 15', desc: 'Initial deployment.' }
        ]
    }
];

export const VersionManager: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string>('1'); // Default selected V1.0
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

    const togglePanel = () => setIsPanelOpen(!isPanelOpen);

    return (
        <div className="app-container">
            {/* Left Timeline Area */}
            <main className="timeline-area">
                <button className="btn-add-version" onClick={togglePanel}>
                    <span>+</span> Add Version
                </button>

                <div className="timeline-track">
                    {MOCK_DATA.map((item, index) => (
                        <TimelineNode
                            key={item.id}
                            data={item}
                            // Logic: Even index right, Odd index left
                            position={index % 2 === 0 ? 'right' : 'left'}
                            isSelected={selectedId === item.id}
                            onSelect={setSelectedId}
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
