import React from 'react';
import { motion } from 'framer-motion';
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
  // Tab 配置
  const tabs = [
    { key: 'answer', label: '答案', icon: Lightbulb },
    { key: 'versions', label: '提示词版本', icon: GitBranch },
    { key: 'tags', label: '提示词标签', icon: Tags }
  ];

  return (
    <div className="flex flex-col h-[80vh] bg-background rounded-xl overflow-hidden shadow-lg">
      {/* 头部 - Tab导航与关闭按钮同行 */}
      <div className="h-[42px] px-6 border-b border-border flex justify-between items-center bg-muted/30 gap-3">
        {/* Tab 导航 - 源码实现 HeroUI 风格 + Framer Motion 动效 */}
        <div
          className="relative flex gap-1 p-1 bg-muted rounded-full"
          role="tablist"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isSelected}
                onClick={() => onTabChange(tab.key)}
                className={`
                  relative h-7 px-3 rounded-full text-xs font-medium
                  flex items-center gap-1.5
                  border-0 cursor-pointer
                  transition-colors duration-200
                  z-10
                  ${isSelected
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-900'
                  }
                `}
              >
                {/* 选中状态的背景动画 */}
                {isSelected && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full shadow-sm"
                    style={{
                      background: 'var(--color-primary-500)'
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}

                {/* 图标和文字 */}
                <motion.div
                  className="relative z-10 flex items-center gap-1.5"
                  initial={false}
                  animate={{
                    scale: isSelected ? 1 : 0.95,
                  }}
                  transition={{
                    duration: 0.2
                  }}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </motion.div>
              </button>
            );
          })}
        </div>

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
      {/* <div className="p-4 border-t border-border bg-muted/30 flex gap-3">
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
      </div> */}
    </div>
  );
};

export default EditPanel;
