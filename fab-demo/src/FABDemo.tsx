import React, { useState } from 'react';
import FABButton from './components/FABButton';
import PromptPanel from './panels/PromptPanel';
import EditPanel from './panels/EditPanel';
import Toast from './components/Toast';
import { mockPrompts } from './data/mockData';

/**
 * FAB Demo 主组件
 * 
 * 核心功能:
 * 1. FAB 按钮 - 左下角/右下角固定 (bg-primary 紫色)
 * 2. 提示词列表面板 - 400px 宽, 500px 高
 * 3. 编辑管理面板 - 从右侧滑入 (slide-in 动画)
 * 4. 双面板展开效果 - 总宽度 800px
 * 
 * 设计规范 (shadcn/ui):
 * - FAB 与面板间距: 4px (紧密连接)
 * - 动画时长: 150-180ms
 * - 配色: bg-primary (紫色), bg-muted, text-foreground
 */
const FABDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('tags');
  const [fabPosition, setFabPosition] = useState('left'); // 'left' or 'right'
  const [toast, setToast] = useState<any>(null); // Toast 通知状态
  const [prompts, setPrompts] = useState(mockPrompts); // 管理提示词数据

  // FAB 按钮点击处理
  const handleFABClick = () => {
    if (isOpen && showEditPanel) {
      // 关闭编辑面板
      setShowEditPanel(false);
      setSelectedPrompt(null);
    } else if (isOpen) {
      // 关闭整个面板
      setIsOpen(false);
      setShowEditPanel(false);
      setSelectedPrompt(null);
    } else {
      // 打开面板
      setIsOpen(true);
    }
  };

  // 复制提示词
  const handleCopy = (prompt) => {
    console.log('复制提示词:', prompt.title);
    // 使用成功状态样式的 Toast
    setToast({ message: '已复制到剪贴板', type: 'success' });
  };

  // 查看答案
  const handleView = (prompt) => {
    console.log('查看答案:', prompt.title);
    setSelectedPrompt(prompt);
    setActiveTab('answer');
    setShowEditPanel(true);
  };

  // 管理提示词
  const handleManage = (prompt) => {
    console.log('管理提示词:', prompt.title);
    setSelectedPrompt(prompt);
    setActiveTab('tags');
    setShowEditPanel(true);
  };

  // 选择提示词 item
  const handleItemSelect = (prompt) => {
    setSelectedPrompt(prompt);
  };

  // 关闭编辑面板
  const handleCloseEditPanel = () => {
    setShowEditPanel(false);
    setSelectedPrompt(null);
  };

  // 切换 FAB 位置
  const togglePosition = () => {
    setFabPosition(prev => prev === 'left' ? 'right' : 'left');
  };

  // 处理点赞/取消赞
  const handleLike = (promptId, delta) => {
    setPrompts(prevPrompts =>
      prevPrompts.map(p => {
        if (p.id === promptId) {
          return {
            ...p,
            likes: Math.max(0, p.likes + delta) // 确保点赞数不会小于0
          };
        }
        return p;
      })
    );
  };

  // 处理标签更新（新增、删除、使用统计）
  const handleUpdateTags = (promptId, newTags, incrementUsage = false) => {
    setPrompts(prevPrompts =>
      prevPrompts.map(p => {
        if (p.id === promptId) {
          return {
            ...p,
            tags: newTags,
            usageCount: incrementUsage ? p.usageCount + 1 : p.usageCount
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl overflow-hidden">
      {/* Toast 通知 */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* 位置切换按钮 */}
      <button
        className="absolute top-5 left-1/2 -translate-x-1/2 h-10 px-6 bg-background border border-border rounded-full cursor-pointer text-base font-semibold text-foreground transition-all duration-150 z-[200] hover:bg-muted hover:scale-105 active:scale-95 shadow-sm"
        onClick={togglePosition}
      >
        切换到 {fabPosition === 'left' ? '右侧' : '左侧'}
      </button>

      {/* 背景遮罩层 */}
      <div
        className={`fixed inset-0 transition-opacity duration-180 z-[50] ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        style={{
          background: 'linear-gradient(0deg, #00000080, #00000080), #fff3'
        }}
        onClick={handleFABClick}
      />

      {/* FAB 按钮 */}
      <FABButton
        isOpen={isOpen}
        onClick={handleFABClick}
        position={fabPosition}
      />

      {/* 面板容器 */}
      <div
        className={`fixed bottom-6 flex transition-all duration-150 z-[100] ${fabPosition === 'left'
          ? 'left-[68px]'
          : 'right-[68px]'
          } ${fabPosition === 'left'
            ? 'origin-left-bottom'
            : 'origin-right-bottom flex-row-reverse'
          } ${isOpen
            ? 'opacity-100 visible scale-100'
            : 'opacity-0 invisible scale-95'
          } ${showEditPanel && selectedPrompt ? 'w-[80vw] gap-4' : 'w-[30.4vw] gap-0'}`}
        style={{
          transformOrigin: fabPosition === 'left' ? 'left bottom' : 'right bottom'
        }}
      >
        {/* 第一段: 提示词列表 (38%) */}
        <div className={`bg-background border border-border rounded-xl shadow-lg overflow-hidden h-[80vh] flex flex-col transition-all duration-150 w-[30.4vw] shrink-0`}>
          <PromptPanel
            prompts={prompts}
            selectedId={selectedPrompt?.id}
            onItemSelect={handleItemSelect}
            onCopy={handleCopy}
            onView={handleView}
            onManage={handleManage}
            onLike={handleLike}
            onUpdateTags={handleUpdateTags}
          />
        </div>

        {/* 第二段: 编辑管理面板 (62%) */}
        <div
          className={`bg-background border border-border rounded-xl shadow-lg overflow-hidden transition-all duration-150 ${showEditPanel && selectedPrompt
              ? 'w-[49.6vw] opacity-100 visible'
              : 'w-0 opacity-0 invisible border-none'
            }`}
        >
          {selectedPrompt && (
            <EditPanel
              prompt={selectedPrompt}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onClose={handleCloseEditPanel}
              onCopy={() => setToast({ message: '已复制答案到剪贴板', type: 'success' })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FABDemo;