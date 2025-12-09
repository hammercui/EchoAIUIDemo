import React, { useEffect, useState } from 'react';
import { getService } from '@/common/config/di';
import { SemanticSearchService } from '@/model/services/SemanticSearch';
import type { SearchResult } from '@/model/services/SemanticSearch';

interface CandidatePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

// Mock Data for Demonstration
interface Candidate {
    id: string;
    text: string;
    tags: string[];
    score?: number;
    matchedKeywords?: string[];
}

const mockCandidates: Candidate[] = [
    { id: '1', text: 'Add rate limiting to API endpoints.', tags: ['Security', 'High Priority'] },
    { id: '2', text: 'Optimize image lazy-loading.', tags: ['Frontend', 'Performance'] },
    { id: '3', text: 'Unit tests for payment gateway.', tags: ['Testing', 'Backend'] },
    { id: '4', text: 'Update localization files (ES/FR).', tags: ['i18n', 'Content'] },
    { id: '5', text: 'Refactor authentication middleware.', tags: ['Backend', 'Security'] },
    { id: '6', text: 'Implement dark mode toggle.', tags: ['Frontend', 'UI'] },
    { id: '7', text: 'Fix memory leak in dashboard.', tags: ['Frontend', 'Bug'] },
    { id: '8', text: 'Migrate to TypeScript 5.0.', tags: ['Refactor', 'DX'] },
    { id: '9', text: 'Setup CI/CD pipeline for staging.', tags: ['DevOps', 'Infra'] },
    { id: '10', text: 'Design new landing page hero section.', tags: ['Design', 'UI'] },
];

export const CandidatePanel: React.FC<CandidatePanelProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Initialize Semantic Search Service
    useEffect(() => {
        const initService = async () => {
            if (!isOpen) return;

            try {
                const service = getService(SemanticSearchService);
                
                // Initialize if needed
                await service.initialize();

                // Index mock data if index is empty (for demo purposes)
                // In a real app, this might be done globally or check specific data
                if (service.getIndexedCount() === 0) {
                    console.log('Indexing mock candidates...');
                    await service.indexBatch(
                        mockCandidates.map(c => ({ id: c.id, text: c.text }))
                    );
                }
                setIsReady(true);
            } catch (error) {
                console.error('Failed to initialize Semantic Search:', error);
            }
        };

        initService();
    }, [isOpen]);

    // Handle Search
    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (!value.trim()) {
            setResults([]);
            return;
        }

        if (isReady) {
            setIsLoading(true);
            try {
                const service = getService(SemanticSearchService);
                // Perform semantic search
                const searchResults = await service.search(value, {
                    topK: 10,
                    threshold: 0.05 // Low threshold for demo to show more results
                });
                setResults(searchResults);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Determine items to display
    const displayItems: Candidate[] = query.trim()
        ? results.map(r => {
            const candidate = mockCandidates.find(c => c.id === r.id);
            return candidate ? { ...candidate, score: r.score, matchedKeywords: r.matchedKeywords } : null;
        }).filter((item) => item !== null) as Candidate[]
        : mockCandidates;

    if (!isOpen) return null;

    return (
        <aside className="candidate-panel">
            <div className="panel-header">
                <h2 className="panel-title">Suggestions</h2>
                <button className="btn-close" onClick={onClose}>&times;</button>
            </div>

            <div className="search-box">
                <span className="search-icon">🔍</span>
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder={isReady ? "Search prompts semantically..." : "Initializing search..."}
                    value={query}
                    onChange={handleSearch}
                    disabled={!isReady}
                />
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
                {isLoading ? (
                    <div className="text-center py-4 text-sm text-gray-500">Searching...</div>
                ) : displayItems.length > 0 ? (
                    displayItems.map((item) => (
                        <div key={item.id} className="candidate-item">
                            <p className="candidate-text">
                                {item.text}
                            </p>
                            {item.score !== undefined && (
                                <div className="mb-1 flex flex-wrap gap-1">
                                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 rounded">
                                        Match: {(item.score * 100).toFixed(0)}%
                                    </span>
                                    {item.matchedKeywords && item.matchedKeywords.length > 0 && (
                                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 rounded">
                                            Keywords: {item.matchedKeywords.join(', ')}
                                        </span>
                                    )}
                                </div>
                            )}
                            <div className="candidate-meta">
                                <div className="flex gap-1">
                                    {item.tags.map(tag => (
                                        <span key={tag}>#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-4 text-sm text-gray-500">
                        {query ? "No semantic matches found." : "No suggestions available."}
                    </div>
                )}
            </div>
        </aside>
    );
};
