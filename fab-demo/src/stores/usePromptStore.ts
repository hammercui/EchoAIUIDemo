import { create } from 'zustand';
import { mockPrompts } from '../data/mockData';

// 定义 Prompt 类型 (根据 mockData 推断，后续可提取到 types.ts)
export interface Prompt {
  id: number;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  isLiked: boolean; // 新增字段
  usageCount: number;
  date: string;
  dateTimestamp: number;
  sources?: string[];
  answer?: string;
  versions?: any[];
}

interface PromptState {
  // 数据源
  prompts: Prompt[];
  
  // 选中状态
  selectedPrompt: Prompt | null;
  setSelectedPrompt: (prompt: Prompt | null) => void;

  // Actions
  likePrompt: (promptId: number, delta: number) => void;
  updatePromptTags: (promptId: number, newTags: string[], incrementUsage?: boolean) => void;
}

export const usePromptStore = create<PromptState>((set) => ({
  prompts: mockPrompts,
  selectedPrompt: null,

  setSelectedPrompt: (prompt) => set({ selectedPrompt: prompt }),

  likePrompt: (promptId, delta) => set((state) => ({
    prompts: state.prompts.map((p) => 
      p.id === promptId 
        ? { ...p, likes: Math.max(0, p.likes + delta) }
        : p
    ),
    // 如果当前选中的是被点赞的 prompt，也需要更新 selectedPrompt
    selectedPrompt: state.selectedPrompt?.id === promptId
      ? { ...state.selectedPrompt, likes: Math.max(0, state.selectedPrompt.likes + delta) }
      : state.selectedPrompt
  })),

  updatePromptTags: (promptId, newTags, incrementUsage = false) => set((state) => ({
    prompts: state.prompts.map((p) => {
      if (p.id === promptId) {
        return {
          ...p,
          tags: newTags,
          usageCount: incrementUsage ? p.usageCount + 1 : p.usageCount
        };
      }
      return p;
    }),
    // 同步更新选中状态
    selectedPrompt: state.selectedPrompt?.id === promptId
      ? { 
          ...state.selectedPrompt, 
          tags: newTags,
          usageCount: incrementUsage ? state.selectedPrompt.usageCount + 1 : state.selectedPrompt.usageCount
        }
      : state.selectedPrompt
  })),
}));
