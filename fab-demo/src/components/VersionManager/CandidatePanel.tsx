import React from 'react';
import './styles.css';

interface CandidatePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CandidatePanel: React.FC<CandidatePanelProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <aside className="candidate-panel">
            <div className="panel-header">
                <h2 className="panel-title">Suggestions</h2>
                <button className="btn-close" onClick={onClose}>&times;</button>
            </div>

            <div className="search-box">
                <span className="search-icon">🔍</span>
                <input type="text" className="search-input" placeholder="Search prompts..." />
            </div>

            <div className="filter-section">
                <span className="filter-label">FILTER BY TAG</span>
                <div className="filter-tags">
                    <span className="filter-chip active">All</span>
                    <span className="filter-chip">Frontend</span>
                    <span className="filter-chip">Backend</span>
                    <span className="filter-chip">Security</span>
                </div>
            </div>

            <div className="candidate-list">
                <div className="candidate-item">
                    <p className="candidate-text">Add rate limiting to API endpoints.</p>
                    <div className="candidate-meta">
                        <span>#Security</span>
                        <span>High Priority</span>
                    </div>
                </div>

                <div className="candidate-item">
                    <p className="candidate-text">Optimize image lazy-loading.</p>
                    <div className="candidate-meta">
                        <span>#Frontend</span>
                        <span>Performance</span>
                    </div>
                </div>

                <div className="candidate-item">
                    <p className="candidate-text">Unit tests for payment gateway.</p>
                    <div className="candidate-meta">
                        <span>#Testing</span>
                        <span>Backend</span>
                    </div>
                </div>

                <div className="candidate-item">
                    <p className="candidate-text">Update localization files (ES/FR).</p>
                    <div className="candidate-meta">
                        <span>#i18n</span>
                        <span>Content</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};
