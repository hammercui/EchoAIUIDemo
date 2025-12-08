import { create } from 'zustand';
import { mockPrompts } from '@/common/data/mockData';
import { Prompt } from '@/model/entities/Prompt';

interface PromptState {
  // 数据源
  prompts: Prompt[];

  // 选中状态
  selectedPrompt: Prompt | null;
  setSelectedPrompt: (prompt: Prompt | null) => void;

  // Actions
  likePrompt: (promptId: number, delta: number) => void;
  updatePromptTags: (promptId: number, newTags: string[], incrementUsage?: boolean) => void;
  updateTreeTitle: (treeId: string, newTitle: string) => void;
}

export const usePromptStore = create<PromptState>((set) => ({
  prompts: mockPrompts as Prompt[],
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

  updateTreeTitle: (treeId, newTitle) => set((state) => {
    const updatedPrompts = state.prompts.map((p) => {
      if (p.tree_id === treeId) {
        return { ...p, tree_title: newTitle };
      }
      return p;
    });

    return {
      prompts: updatedPrompts,
      selectedPrompt: state.selectedPrompt?.tree_id === treeId
        ? { ...state.selectedPrompt, tree_title: newTitle }
        : state.selectedPrompt
    };
  }),
}));
