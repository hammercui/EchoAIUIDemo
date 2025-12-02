import { create } from 'zustand';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface UIState {
  // 全局面板状态
  isPanelOpen: boolean;
  setPanelOpen: (isOpen: boolean) => void;
  togglePanel: () => void;

  // 编辑面板状态
  showEditPanel: boolean;
  setShowEditPanel: (show: boolean) => void;

  // FAB 位置
  fabPosition: 'left' | 'right';
  setFabPosition: (position: 'left' | 'right') => void;
  toggleFabPosition: () => void;

  // Tab 页签状态
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Toast 通知
  toast: ToastState | null;
  showToast: (message: string, type?: ToastState['type']) => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isPanelOpen: false,
  setPanelOpen: (isOpen) => set({ isPanelOpen: isOpen }),
  togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen })),

  showEditPanel: false,
  setShowEditPanel: (show) => set({ showEditPanel: show }),

  fabPosition: 'left',
  setFabPosition: (position) => set({ fabPosition: position }),
  toggleFabPosition: () => set((state) => ({ 
    fabPosition: state.fabPosition === 'left' ? 'right' : 'left' 
  })),

  activeTab: 'tags',
  setActiveTab: (tab) => set({ activeTab: tab }),

  toast: null,
  showToast: (message, type = 'success') => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
}));
