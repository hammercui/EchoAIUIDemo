import React from 'react';
import { VersionManager } from '../components/VersionManager';

/**
 * 版本管理面板
 */
const VersionsPanel = ({ prompt }) => {
  return (
    <div className="w-full h-full">
      <VersionManager />
    </div>
  );
};

export default VersionsPanel;