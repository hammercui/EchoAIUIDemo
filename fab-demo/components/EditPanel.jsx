import React from 'react';
import TagsPanel from './panels/TagsPanel';
import AnswerPanel from './panels/AnswerPanel';
import VersionsPanel from './panels/VersionsPanel';

/**
 * 编辑管理面板组件
 * 
 * 规范要求:
 * - 面板宽度: 400px
 * - 高度: 500px
 * - 滑入动画: 150ms slide-in
 * - 关闭按钮: X 图标
 */
const EditPanel = ({ prompt, activeTab, onTabChange, onClose, onCopy }) => {
  const tabs = [
    { id: 'tags', label: '标签管理' },
    { id: 'answer', label: '答案' },
    { id: 'versions', label: '版本管理' },
  ];

  return (
    <div className="flex flex-col h-[80vh] bg-background">
      {/* 头部 */}
      <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
        <h2 className="text-base font-semibold text-foreground m-0">
          编辑管理
        </h2>
        <button 
          className="w-6 h-6 border-0 bg-transparent cursor-pointer text-base text-muted-foreground rounded-lg transition-all duration-150 hover:bg-muted hover:text-foreground active:scale-95 flex items-center justify-center"
          onClick={onClose} 
          aria-label="关闭编辑面板"
        >
          ✕
        </button>
      </div>
      
      {/* Tab 导航 */}
      <div className="flex border-b border-border bg-background p-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-2.5 text-sm font-medium transition-all duration-150 border-0 bg-transparent cursor-pointer ${
              activeTab === tab.id 
                ? 'text-foreground border-b-2 border-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'tags' && <TagsPanel prompt={prompt} />}
        {activeTab === 'answer' && <AnswerPanel prompt={prompt} onCopy={onCopy} />}
        {activeTab === 'versions' && <VersionsPanel prompt={prompt} />}
      </div>

      {/* 底部操作按钮 */}
      <div className="p-4 border-t border-border bg-muted/30 flex gap-2">
        <button className="h-10 px-6 text-base font-semibold rounded-full transition-all duration-150 bg-foreground text-background border-0 cursor-pointer hover:opacity-90 active:scale-95">
          保存更改
        </button>
        <button className="h-10 px-6 text-base font-semibold rounded-full transition-all duration-150 bg-background text-foreground border border-border cursor-pointer hover:bg-muted active:scale-95">
          取消
        </button>
      </div>
    </div>
  );
};

export default EditPanel;
