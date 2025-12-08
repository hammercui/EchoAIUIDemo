import { useEffect, useMemo, useState, useRef } from 'react';
import { getService } from '@/common/config/di';
import { PromptService } from '@/model/services/PromptService';
import { usePromptStore } from '@/model/stores/usePromptStore';
import { usePromptListStore } from '@/model/stores/usePromptListStore';

export const usePromptLibraryViewModel = () => {
    const promptService = getService(PromptService);
    const { prompts, selectedPrompt, setSelectedPrompt, likePrompt, updatePromptTags } = usePromptStore();
    const {
        searchMode, setSearchMode,
        promptQuery, setPromptQuery,
        tagQuery, setTagQuery,
        selectedTags, addSelectedTag, removeSelectedTag, clearSelectedTags,
        sortBy, setSortBy,
        currentPage, setCurrentPage, itemsPerPage
    } = usePromptListStore();

    // Debounce state
    const [debouncedPromptQuery, setDebouncedPromptQuery] = useState('');
    const debounceTimerRef = useRef<any>(null);

    // Load data on mount
    useEffect(() => {
        promptService.getPrompts().then((data) => {
            // Logic to update store with fetched data would go here
        });
    }, []);

    // Debounce effect
    useEffect(() => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
            setDebouncedPromptQuery(promptQuery);
        }, 300);
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [promptQuery]);

    // Extract all tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        prompts.forEach(p => p.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }, [prompts]);

    // Fuzzy match helper
    const fuzzyMatch = (text: string, query: string) => {
        return text.toLowerCase().includes(query.toLowerCase());
    };

    // Filter by tags helper
    const filterByTags = (promptsList: any[], tags: string[]) => {
        if (tags.length === 0) return promptsList;
        return promptsList.filter(prompt =>
            prompt.tags.some((tag: string) => tags.includes(tag))
        );
    };

    // Candidate tags
    const candidateTags = useMemo(() => {
        if (searchMode !== 'tag') return [];
        if (!tagQuery.trim()) return allTags.slice(0, 10);
        return allTags
            .filter(tag => fuzzyMatch(tag, tagQuery))
            .slice(0, 10);
    }, [allTags, tagQuery, searchMode]);

    // Filtered prompts
    const filteredPrompts = useMemo(() => {
        let result;
        if (searchMode === 'prompt') {
            if (!debouncedPromptQuery.trim()) result = prompts;
            else {
                result = prompts.filter(prompt =>
                    fuzzyMatch(prompt.title, debouncedPromptQuery) ||
                    fuzzyMatch(prompt.description, debouncedPromptQuery)
                );
            }
        } else {
            result = filterByTags(prompts, selectedTags);
        }
        return result;
    }, [prompts, searchMode, debouncedPromptQuery, selectedTags]);

    // Sorted prompts
    const sortedPrompts = useMemo(() => {
        const sorted = [...filteredPrompts];
        switch (sortBy) {
            case 'newest':
                sorted.sort((a, b) => b.dateTimestamp - a.dateTimestamp);
                break;
            case 'oldest':
                sorted.sort((a, b) => a.dateTimestamp - b.dateTimestamp);
                break;
            case 'mostLiked':
                sorted.sort((a, b) => b.likes - a.likes);
                break;
            case 'mostUsed':
                sorted.sort((a, b) => b.usageCount - a.usageCount);
                break;
            default:
                break;
        }
        return sorted;
    }, [filteredPrompts, sortBy]);

    // Paginated prompts
    const paginatedPrompts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedPrompts.slice(startIndex, endIndex);
    }, [sortedPrompts, currentPage, itemsPerPage]);

    // Total pages
    const totalPages = Math.ceil(sortedPrompts.length / itemsPerPage);

    // Has query
    const hasQuery = (searchMode === 'prompt' && promptQuery) || (searchMode === 'tag' && selectedTags.length > 0);

    const handleLike = async (id: number) => {
        await promptService.likePrompt(id);
        likePrompt(id, 1);
    };

    const handleSelect = (id: number) => {
        const prompt = prompts.find(p => p.id === id);
        setSelectedPrompt(prompt || null);
    };

    return {
        // Data
        prompts,
        paginatedPrompts,
        sortedPrompts,
        allTags,
        candidateTags,
        totalPages,
        hasQuery,

        // State
        selectedPrompt,
        searchMode,
        promptQuery,
        tagQuery,
        selectedTags,
        sortBy,
        currentPage,
        itemsPerPage,

        // Actions
        setSearchMode,
        setPromptQuery,
        setTagQuery,
        addSelectedTag,
        removeSelectedTag,
        clearSelectedTags,
        setSortBy,
        setCurrentPage,
        handleLike,
        handleSelect,
        updatePromptTags
    };
};
