import React from 'react';
import { VersionManager } from '@/features/VersionManager';
import { usePromptStore } from '@/stores/usePromptStore';

/**
 * 版本管理面板
 */
const VersionsPanel = ({ prompt }) => {
  const updateTreeTitle = usePromptStore(state => state.updateTreeTitle);

  return (
    <div className="w-full h-full">
      <VersionManager 
        versions={prompt?.versions} 
        currentVersionId={prompt?.currentVersionId}
        treeTitle={prompt?.tree_title}
        treeId={prompt?.tree_id}
        onUpdateTitle={(newTitle) => prompt?.tree_id && updateTreeTitle(prompt.tree_id, newTitle)}
      />
    </div>
  );
};

export default VersionsPanel;