import React, { useState } from 'react';
import type { VersionData } from './types';
import { AddTagDialog, DeleteTagDialog } from '@/features/TagSystem/components/TagDialog';
import AddTagButton from '@/components/common/AddTagButton';

interface TimelineNodeProps {
    data: VersionData;
    position: 'left' | 'right';
    isSelected: boolean;
    onSelect: (id: string) => void;
    onUpdateTags?: (versionId: string, newTags: string[]) => void;
    allAvailableTags?: string[];
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({
    data,
    position,
    isSelected,
    onSelect,
    onUpdateTags,
    allAvailableTags = []
}) => {
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [tagToDelete, setTagToDelete] = useState('');
    const [editingVersionId, setEditingVersionId] = useState<string | null>(null);

    const getCurrentTags = () => {
        if (editingVersionId === data.id) return data.tags || [];
        const sub = data.subVersions?.find(s => s.id === editingVersionId);
        return sub?.tags || [];
    };

    const handleAddTag = (e: React.MouseEvent, vId: string) => {
        e.stopPropagation();
        setEditingVersionId(vId);
        setShowAddDialog(true);
    };

    const handleConfirmAddTag = (newTags: string[]) => {
        if (!editingVersionId) return;
        const currentTags = getCurrentTags();
        const updatedTags = [...new Set([...currentTags, ...newTags])];
        onUpdateTags?.(editingVersionId, updatedTags);
        setShowAddDialog(false);
    };

    const handleTagRightClick = (e: React.MouseEvent, tag: string) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDeleteMode(true);
    };

    const handleDeleteTag = (e: React.MouseEvent, tag: string, vId: string) => {
        e.stopPropagation();
        if (isDeleteMode) {
            setTagToDelete(tag);
            setEditingVersionId(vId);
            setShowDeleteDialog(true);
        }
    };

    const handleConfirmDeleteTag = () => {
        if (!editingVersionId) return;
        const currentTags = getCurrentTags();
        onUpdateTags?.(editingVersionId, currentTags.filter(t => t !== tagToDelete));
        setShowDeleteDialog(false);
        setIsDeleteMode(false);
    };

    const handleBackgroundClick = () => {
        if (isDeleteMode) {
            setIsDeleteMode(false);
        } else {
            onSelect(data.id);
        }
    };

    const renderTags = (tags: string[] = [], vId: string) => (
        <div className="flex gap-1.5 items-center flex-wrap">
            {tags.map((tag, idx) => (
                <span
                    key={idx}
                    className={`relative px-1.5 py-0.5 rounded-md border border-background-100 text-accent bg-white transition-all duration-150 text-[11px] ${isDeleteMode ? 'pr-4' : ''}`}
                    onContextMenu={(e) => handleTagRightClick(e, tag)}
                    onClick={(e) => isDeleteMode && handleDeleteTag(e, tag, vId)}
                >
                    #{tag}
                    {isDeleteMode && (
                        <button
                            onClick={(e) => handleDeleteTag(e, tag, vId)}
                            className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-[10px] hover:bg-destructive/90 transition-colors"
                        >
                            ×
                        </button>
                    )}
                </span>
            ))}
            <AddTagButton onClick={(e) => handleAddTag(e, vId)} />
        </div>
    );

    return (
        <div
            className={`timeline-node ${position} ${isSelected ? 'selected' : ''}`}
            onClick={handleBackgroundClick}
        >
            <div className="node-dot" tabIndex={0} />
            <div className="node-connector" />
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
                        <span className="text-xs text-muted-foreground">
                            {data.date}
                        </span>
                    </div>
                    <div className="card-body">{data.desc}</div>
                    <div className="card-tags">
                        {renderTags(data.tags, data.id)}
                    </div>
                </div>

                {/* Sub-versions */}
                {data.subVersions && data.subVersions.length > 0 && (
                    <div className="sub-version-group">
                        {data.subVersions.map(sub => (
                            <div key={sub.id} className="sub-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <strong>{sub.version}</strong>
                                    <span className="text-[10px] text-muted-foreground">
                                        {sub.date}
                                    </span>
                                </div>
                                <div>{sub.desc}</div>
                                <div className="mt-2">
                                    {renderTags(sub.tags, sub.id)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AddTagDialog
                isOpen={showAddDialog}
                onClose={() => setShowAddDialog(false)}
                onConfirm={handleConfirmAddTag}
                currentTags={getCurrentTags()}
                allAvailableTags={allAvailableTags}
            />
            <DeleteTagDialog
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleConfirmDeleteTag}
                tagName={tagToDelete}
            />
        </div>
    );
};
