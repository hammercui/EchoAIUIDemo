import { injectable } from 'tsyringe';
import init, { cut } from 'jieba-wasm';
import { STOP_WORDS } from './constants';

/**
 * 文本分词器
 * 使用 jieba-wasm 进行中英文混合分词
 */
@injectable()
export class TextTokenizer {
    private initialized = false;

    constructor() { }

    /**
     * 初始化 jieba-wasm
     */
    async init(): Promise<void> {
        if (this.initialized) return;

        try {
            await init();
            this.initialized = true;
            console.log('jieba-wasm initialized successfully');
        } catch (error) {
            console.error('Failed to initialize jieba-wasm:', error);
            throw error;
        }
    }

    /**
     * 分词：支持中英文混合
     * @param text 输入文本
     * @returns 词元列表（已去停用词、转小写）
     */
    tokenize(text: string): string[] {
        if (!this.initialized) {
            throw new Error('TextTokenizer not initialized. Call init() first.');
        }

        if (!text || typeof text !== 'string') {
            return [];
        }

        // 1. jieba 分词 (false = 精确模式)
        const tokens = cut(text, false);

        // 2. 清洗：去停用词、转小写、过滤空白
        return tokens
            .map(token => token.toLowerCase().trim())
            .filter(token =>
                token.length > 0 &&
                !STOP_WORDS.has(token) &&
                !/^\s*$/.test(token) &&
                !/^[0-9]+$/.test(token)  // 过滤纯数字
            );
    }

    /**
     * 提取关键词（取词频最高的 N 个）
     */
    extractKeywords(text: string, topN: number = 10): string[] {
        const tokens = this.tokenize(text);
        const freq = new Map<string, number>();

        tokens.forEach(t => freq.set(t, (freq.get(t) || 0) + 1));

        return [...freq.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, topN)
            .map(([word]) => word);
    }

    /**
     * 检查是否已初始化
     */
    isInitialized(): boolean {
        return this.initialized;
    }
}
