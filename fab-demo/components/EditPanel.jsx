import React from 'react';
import TagsPanel from './panels/TagsPanel';
import AnswerPanel from './panels/AnswerPanel';
import VersionsPanel from './panels/VersionsPanel';

/**
 * 编辑管理面板组件 - HeroUI 风格
 * 
 * 规范要求:
 * - 面板宽度: 400px
 * - 高度: 80vh
 * - 圆角Tab设计
 * - 渐变色激活状态
 */

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const EditPanel = ({ prompt, activeTab, onTabChange, onClose, onCopy }) => {
  const tabs = [
    { id: 'tags', label: '标签管理', icon: '🏷️' },
    { id: 'answer', label: '答案', icon: '💡' },
    { id: 'versions', label: '版本管理', icon: '📝' },
  ];

  return (
    <div className="flex flex-col h-[80vh] bg-background rounded-xl overflow-hidden">
      {/* 头部 */}
      <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
        <h2 className="text-base font-semibold text-foreground m-0">
          编辑管理
        </h2>
        <button 
          className="w-8 h-8 border-0 bg-transparent cursor-pointer rounded-full transition-all duration-150 hover:bg-muted text-muted-foreground hover:text-foreground active:scale-95 flex items-center justify-center"
          onClick={onClose} 
          aria-label="关闭编辑面板"
        >
          <CloseIcon />
        </button>
      </div>
      
      {/* Tab 导航 - HeroUI 胶囊式 */}
      <div className="flex gap-2 p-3 border-b border-border bg-background">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex-1 h-9 px-4 text-sm font-medium rounded-full transition-all duration-150 border-0 cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === tab.id 
                ? 'text-white shadow-md' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
            style={activeTab === tab.id ? {
              background: 'linear-gradient(135deg, hsl(262, 83%, 58%), hsl(262, 83%, 48%))'
            } : {}}
            onClick={() => onTabChange(tab.id)}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
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
      <div className="p-4 border-t border-border bg-muted/30 flex gap-3">
        <button 
          className="flex-1 h-10 px-6 text-sm font-semibold rounded-full transition-all duration-150 text-white border-0 cursor-pointer hover:opacity-90 active:scale-95 shadow-sm"
          style={{
            background: 'linear-gradient(135deg, hsl(262, 83%, 58%), hsl(262, 83%, 48%))'
          }}
        >
          保存更改
        </button>
        <button className="flex-1 h-10 px-6 text-sm font-semibold rounded-full transition-all duration-150 bg-background text-foreground border border-border cursor-pointer hover:bg-muted active:scale-95">
          取消
        </button>
      </div>
    </div>
  );
};

export default EditPanel;
