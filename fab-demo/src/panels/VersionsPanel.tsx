import React from 'react';
import { VersionManager } from '@/features/VersionManager';

/**
 * 版本管理面板
 */
const VersionsPanel = ({ prompt }) => {
  return (
    <div className="w-full h-full">
      <VersionManager 
        versions={prompt?.versions} 
        currentVersionId={prompt?.currentVersionId}
      />
    </div>
  );
};

export default VersionsPanel;