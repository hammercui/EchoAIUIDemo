import React from 'react';
import { VersionData } from './types';
import './styles.css';

interface TimelineNodeProps {
    data: VersionData;
    position: 'left' | 'right';
    isSelected: boolean;
    onSelect: (id: string) => void;
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({
    data,
    position,
    isSelected,
    onSelect
}) => {
    return (
        <div
            className={`timeline-node ${position} ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(data.id)}
        >
            {/* Dot */}
            <div className="node-dot" tabIndex={0} />

            {/* Connector */}
            <div className="node-connector" />

            {/* Content Wrapper */}
            <div className="content-wrapper">
                {/* Main Card */}
                <div className="version-card">
                    <div className="card-header">
                        <span className="version-title">
                            {data.version}
                            {data.status && (
                                <span className={`status-badge ${data.status.toLowerCase()}`}>
                                    {data.status}
                                </span>
                            )}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--color-primary-200)' }}>
                            {data.date}
                        </span>
                    </div>
                    <div className="card-body">{data.desc}</div>
                    <div className="card-tags">
                        {data.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                </div>

                {/* Sub-versions */}
                {data.subVersions && data.subVersions.length > 0 && (
                    <div className="sub-version-group">
                        {data.subVersions.map(sub => (
                            <div key={sub.id} className="sub-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <strong>{sub.version}</strong>
                                    <span style={{ fontSize: '10px', color: 'var(--color-primary-200)' }}>
                                        {sub.date}
                                    </span>
                                </div>
                                <div>{sub.desc}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
