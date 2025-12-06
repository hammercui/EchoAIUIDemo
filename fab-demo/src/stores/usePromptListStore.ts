import { create } from 'zustand';
import { SearchResult } from '../service/SemanticSearch';

interface PromptListState {
  // 搜索状态
  searchMode: 'prompt' | 'tag';
  promptQuery: string;
  tagQuery: string;
  selectedTags: string[];

  // 语义搜索状态
  searchType: 'keyword' | 'semantic';  // 搜索类型：关键词 or 语义
  semanticResults: SearchResult[];     // 语义搜索结果
  isSemanticSearching: boolean;        // 语义搜索加载状态

  // 排序状态
  sortBy: 'newest' | 'oldest' | 'mostLiked' | 'mostUsed';

  // 分页状态
  currentPage: number;
  itemsPerPage: number;

  // Actions
  setSearchMode: (mode: 'prompt' | 'tag') => void;
  setPromptQuery: (query: string) => void;
  setTagQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
  addSelectedTag: (tag: string) => void;
  removeSelectedTag: (tag: string) => void;
  clearSelectedTags: () => void;
  setSortBy: (sortBy: 'newest' | 'oldest' | 'mostLiked' | 'mostUsed') => void;
  setCurrentPage: (page: number) => void;

  // 语义搜索 Actions
  setSearchType: (type: 'keyword' | 'semantic') => void;
  setSemanticResults: (results: SearchResult[]) => void;
  setIsSemanticSearching: (loading: boolean) => void;
  clearSemanticResults: () => void;
}

export const usePromptListStore = create<PromptListState>((set) => ({
  searchMode: 'prompt',
  promptQuery: '',
  tagQuery: '',
  selectedTags: [],

  // 语义搜索初始状态
  searchType: 'keyword',
  semanticResults: [],
  isSemanticSearching: false,

  sortBy: 'newest',

  currentPage: 1,
  itemsPerPage: 10,

  setSearchMode: (mode) => set({ searchMode: mode, currentPage: 1 }),
  setPromptQuery: (query) => set({ promptQuery: query, currentPage: 1 }),
  setTagQuery: (query) => set({ tagQuery: query, currentPage: 1 }),

  setSelectedTags: (tags) => set({ selectedTags: tags, currentPage: 1 }),
  addSelectedTag: (tag) => set((state) => ({
    selectedTags: state.selectedTags.includes(tag)
      ? state.selectedTags
      : [...state.selectedTags, tag],
    currentPage: 1
  })),
  removeSelectedTag: (tag) => set((state) => ({
    selectedTags: state.selectedTags.filter((t) => t !== tag),
    currentPage: 1
  })),
  clearSelectedTags: () => set({ selectedTags: [], currentPage: 1 }),

  setSortBy: (sortBy) => set({ sortBy, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),

  // 语义搜索 Actions
  setSearchType: (type) => set({
    searchType: type,
    currentPage: 1
  }),
  setSemanticResults: (results) => set({ semanticResults: results }),
  setIsSemanticSearching: (loading) => set({ isSemanticSearching: loading }),
  clearSemanticResults: () => set({ semanticResults: [] }),
}));
