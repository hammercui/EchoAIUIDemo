import React, { useState, useMemo, useEffect } from 'react';
import { TimelineNode } from './TimelineNode';
import { CandidatePanel } from './CandidatePanel';
import type { VersionData } from './types';
import { Pencil, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface VersionManagerProps {
    versions?: VersionData[];
    currentVersionId?: string;
    treeTitle?: string;
    treeId?: string;
    onUpdateTitle?: (newTitle: string) => void;
}

export const VersionManager: React.FC<VersionManagerProps> = ({ 
    versions: initialVersions = [], 
    currentVersionId = '',
    treeTitle = '',
    treeId,
    onUpdateTitle
}) => {
    const [versions, setVersions] = useState<VersionData[]>(initialVersions);
    
    useEffect(() => {
        if (initialVersions) {
            setVersions(initialVersions);
        }
    }, [initialVersions]);

    // Title Editing State
    const [isEditing, setIsEditing] = useState(false);
    const [titleValue, setTitleValue] = useState(treeTitle);

    useEffect(() => {
        setTitleValue(treeTitle || '');
    }, [treeTitle]);

    const handleSaveTitle = () => {
        if (onUpdateTitle && titleValue !== treeTitle) {
            onUpdateTitle(titleValue);
        }
        setIsEditing(false);
    };

    const handleCancelTitle = () => {
        setTitleValue(treeTitle || '');
        setIsEditing(false);
    };

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
                {/* Tree Title Header with Edit Mode */}
                <div className="mb-4 px-1">
                    {isEditing ? (
                        <div className="flex items-center gap-2 w-full max-w-md">
                            <Input 
                                value={titleValue} 
                                onChange={(e) => setTitleValue(e.target.value)}
                                className="h-8 font-semibold"
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveTitle();
                                    if (e.key === 'Escape') handleCancelTitle();
                                }}
                            />
                            <Button size="icon" variant="ghost" onClick={handleSaveTitle} className="h-8 w-8 hover:bg-green-100 hover:text-green-600">
                                <Check className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={handleCancelTitle} className="h-8 w-8 hover:bg-red-100 hover:text-red-600">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 group">
                            <h2 className="text-lg font-bold text-foreground">
                                {treeTitle || 'Untitled Tree'}
                            </h2>
                            {onUpdateTitle && (
                                <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                                </Button>
                            )}
                        </div>
                    )}
                </div>

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
