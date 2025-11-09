import React from 'react';
import { Tabs, Tab } from '@heroui/react';
import { Tags, Lightbulb, GitBranch, X } from 'lucide-react';
import TagsPanel from '../panels/TagsPanel';
import AnswerPanel from '../panels/AnswerPanel';
import VersionsPanel from '../panels/VersionsPanel';

/**
 * 编辑管理面板组件 - HeroUI 风格
 * 
 * 规范要求:
 * - 面板宽度: 400px
 * - 高度: 80vh
 * - 使用HeroUI Tabs组件
 * - Lucide React图标
 */

const EditPanel = ({ prompt, activeTab, onTabChange, onClose, onCopy }) => {
  return (
    <div className="flex flex-col h-[80vh] bg-content1 rounded-xl overflow-hidden shadow-lg">
      {/* 头部 - Tab导航与关闭按钮同行 */}
      <div className="p-3 border-b border-border flex justify-between items-center bg-muted/30 gap-3">
        {/* Tab 导航 - HeroUI Tabs */}
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={onTabChange}
          size="sm"
          radius="full"
          color="primary"
          variant="solid"
          classNames={{
            tabList: "gap-2 p-0 bg-transparent",
            cursor: "shadow-sm",
            tab: "h-7 px-3 data-[selected=true]:text-white",
            tabContent: "text-xs font-medium group-data-[selected=true]:text-white"
          }}
          style={{
            '--heroui-cursor-background': 'linear-gradient(135deg, hsl(262, 83%, 58%), hsl(262, 83%, 48%))'
          }}
        >
          <Tab
            key="answer"
            title={
              <div className="flex items-center gap-1.5">
                <Lightbulb size={14} />
                <span>答案</span>
              </div>
            }
          />
          <Tab
            key="versions"
            title={
              <div className="flex items-center gap-1.5">
                <GitBranch size={14} />
                <span>提示词版本</span>
              </div>
            }
          />
          <Tab
            key="tags"
            title={
              <div className="flex items-center gap-1.5">
                <Tags size={14} />
                <span>提示词标签</span>
              </div>
            }
          />
        </Tabs>

        {/* 关闭按钮 */}
        <button 
          className="w-7 h-7 border-0 bg-transparent cursor-pointer rounded-full transition-all duration-150 hover:bg-muted text-muted-foreground hover:text-foreground active:scale-95 flex items-center justify-center flex-shrink-0"
          onClick={onClose} 
          aria-label="关闭编辑面板"
        >
          <X size={16} />
        </button>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto p-4 bg-background/50">
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
