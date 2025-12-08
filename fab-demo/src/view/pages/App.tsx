import React from 'react';
import FABButton from '@/view/components/common/FABButton';
import PromptPanel from './PromptPanel';
import EditPanel from './EditPanel';
import Toast from '@/view/components/common/Toast';
import { useUIStore } from '@/model/stores/useUIStore';
import { usePromptStore } from '@/model/stores/usePromptStore';

/**
 * FAB Demo 主组件 (Refactored with Zustand)
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
const App = () => {
  // UI State
  const {
    isPanelOpen, setPanelOpen,
    showEditPanel, setShowEditPanel,
    fabPosition, setFabPosition,
    activeTab, setActiveTab,
    toast, hideToast, showToast
  } = useUIStore();

  // Prompt State
  const {
    prompts,
    selectedPrompt, setSelectedPrompt,
    likePrompt, updatePromptTags
  } = usePromptStore();

  // FAB 按钮点击处理
  const handleFABClick = () => {
    if (isPanelOpen && showEditPanel) {
      // 关闭编辑面板
      setShowEditPanel(false);
      setSelectedPrompt(null);
    } else if (isPanelOpen) {
      // 关闭整个面板
      setPanelOpen(false);
      setShowEditPanel(false);
      setSelectedPrompt(null);
    } else {
      // 打开面板
      setPanelOpen(true);
    }
  };

  // 复制提示词
  const handleCopy = (prompt) => {
    console.log('复制提示词:', prompt.title);
    showToast('已复制到剪贴板', 'success');
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

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl overflow-hidden">
      {/* Toast 通知 */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      {/* 背景遮罩层 */}
      <div
        className={`fixed inset-0 transition-opacity duration-180 z-[50] ${isPanelOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        style={{
          background: 'linear-gradient(0deg, #00000080, #00000080), #fff3'
        }}
        onClick={handleFABClick}
      />

      {/* FAB 按钮 */}
      <FABButton
        isOpen={isPanelOpen}
        onClick={handleFABClick}
        position={fabPosition}
        onPositionChange={setFabPosition}
      />

      {/* 面板容器 */}
      <div
        className={`fixed bottom-6 flex transition-all duration-150 z-[100] ${fabPosition === 'left'
          ? 'left-[68px]'
          : 'right-[68px]'
          } ${fabPosition === 'left'
            ? 'origin-left-bottom'
            : 'origin-right-bottom flex-row-reverse'
          } ${isPanelOpen
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
            // 只需要传递 UI 交互的回调，数据从 Store 获取
            onItemSelect={handleItemSelect}
            onCopy={handleCopy}
            onView={handleView}
            onManage={handleManage}
            // like 和 updateTags 直接在 Store 中处理，这里不需要传递，
            // 但为了兼容 PromptPanel 组件签名，我们仍然传递封装函数
            onLike={likePrompt}
            onUpdateTags={updatePromptTags}
            // 数据传递，虽然 PromptPanel 也可以直接连接 Store，但为了组件复用性，
            // 这里仍然通过 props 传递数据，App.tsx 充当容器组件
            prompts={prompts}
            selectedId={selectedPrompt?.id}
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
              onClose={handleCloseEditPanel}
              onCopy={() => showToast('已复制答案到剪贴板', 'success')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
