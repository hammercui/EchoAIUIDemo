/**
 * 提示词向量数据
 */
export interface PromptVector {
    id: string;                 // 提示词 ID
    text: string;               // 原始文本（description）
    vector: Float32Array;       // 256 维 TF-IDF 向量
    keywords: string[];         // 提取的关键词（用于展示匹配原因）
    updatedAt: number;          // 最后更新时间戳
}

/**
 * 搜索结果
 */
export interface SearchResult {
    id: string;                 // 提示词 ID
    score: number;              // 相似度分数 (0-1)
    matchedKeywords: string[];  // 匹配的关键词
}

/**
 * 搜索配置选项
 */
export interface SearchOptions {
    topK?: number;              // 返回前 K 个结果，默认 10
    threshold?: number;         // 相似度阈值，默认 0.1
}

/**
 * 词汇表条目
 */
export interface VocabularyEntry {
    word: string;               // 词元
    index: number;              // 在向量中的索引位置
    idf: number;                // IDF 值
    docFreq: number;            // 文档频率
}

/**
 * 服务初始化状态
 */
export type ServiceStatus = 'idle' | 'loading' | 'ready' | 'error';
