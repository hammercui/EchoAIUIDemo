import { injectable, inject } from 'tsyringe';
import { TextTokenizer } from './TextTokenizer';
import { VectorBuilder } from './VectorBuilder';
import { SimilarityCalculator } from './SimilarityCalculator';
import { SemanticSearchDAO } from '@/infra/dao/SemanticSearchDAO';
import {
    PromptVector, SearchResult, SearchOptions, ServiceStatus
} from './types';

/**
 * 语义搜索服务（单例）
 * 负责业务逻辑和服务编排
 */
@injectable()
export class SemanticSearchService {
    private vectors: PromptVector[] = [];
    private status: ServiceStatus = 'idle';

    constructor(
        @inject(SemanticSearchDAO) private dao: SemanticSearchDAO,
        @inject(TextTokenizer) private tokenizer: TextTokenizer,
        @inject(VectorBuilder) private vectorBuilder: VectorBuilder
    ) { }

    /**
     * 初始化服务
     */
    async initialize(): Promise<void> {
        if (this.status === 'ready' || this.status === 'loading') {
            console.log('SemanticSearchService already initialized or loading');
            return;
        }

        try {
            this.status = 'loading';
            console.log('Initializing SemanticSearchService...');

            // 1. 初始化分词器
            await this.tokenizer.init();
            console.log('✓ Tokenizer initialized');

            // 2. 初始化数据库
            await this.dao.init();
            console.log('✓ Database initialized');

            // 3. 加载词汇表
            const vocabulary = await this.dao.loadVocabulary();
            if (vocabulary.size > 0) {
                this.vectorBuilder.setVocabulary(vocabulary);
                const totalDocs = await this.dao.loadMeta('totalDocs');
                if (totalDocs) this.vectorBuilder.setTotalDocs(totalDocs);
                console.log(`✓ Vocabulary loaded: ${vocabulary.size} words`);
            } else {
                console.log('No vocabulary found in database');
            }

            // 4. 加载已索引的向量
            this.vectors = await this.dao.loadVectors();
            console.log(`✓ Loaded ${this.vectors.length} indexed vectors`);

            this.status = 'ready';
            console.log('SemanticSearchService ready!');
        } catch (error) {
            this.status = 'error';
            console.error('Failed to initialize SemanticSearchService:', error);
            throw error;
        }
    }

    /**
     * 获取服务状态
     */
    getStatus(): ServiceStatus {
        return this.status;
    }

    /**
     * 语义搜索
     * @param query 查询文本
     * @param options 搜索选项
     */
    async search(query: string, options?: SearchOptions): Promise<SearchResult[]> {
        this.ensureReady();

        if (!query || !query.trim()) {
            return [];
        }

        try {
            // 1. 构建查询向量
            const queryVector = this.vectorBuilder.textToVector(query);
            const queryKeywords = this.tokenizer.extractKeywords(query);

            // 2. 计算相似度并返回 Top-K
            const results = SimilarityCalculator.findTopK(
                queryVector,
                queryKeywords,
                this.vectors,
                options
            );

            console.log(`Search for "${query}" returned ${results.length} results`);
            return results;
        } catch (error) {
            console.error('Search failed:', error);
            throw error;
        }
    }

    /**
     * 索引单个提示词
     */
    async indexPrompt(id: string, text: string): Promise<void> {
        this.ensureReady();

        try {
            const vector = this.vectorBuilder.buildPromptVector(id, text);

            // 更新内存
            const existingIndex = this.vectors.findIndex(v => v.id === id);
            if (existingIndex >= 0) {
                this.vectors[existingIndex] = vector;
                console.log(`Updated vector for prompt ${id}`);
            } else {
                this.vectors.push(vector);
                console.log(`Added new vector for prompt ${id}`);
            }

            // 持久化
            await this.dao.saveVector(vector);
        } catch (error) {
            console.error(`Failed to index prompt ${id}:`, error);
            throw error;
        }
    }

    /**
     * 批量索引提示词（用于初始化）
     */
    async indexBatch(prompts: Array<{ id: string; text: string }>): Promise<void> {
        this.ensureReady();

        if (prompts.length === 0) {
            console.warn('Empty prompts array provided to indexBatch');
            return;
        }

        try {
            console.log(`Starting batch indexing for ${prompts.length} prompts...`);

            // 1. 重建词汇表
            const corpus = prompts.map(p => p.text);
            this.vectorBuilder.buildVocabulary(corpus);

            // 2. 向量化所有提示词
            this.vectors = prompts.map(p =>
                this.vectorBuilder.buildPromptVector(p.id, p.text)
            );

            // 3. 持久化
            await this.dao.saveVocabulary(this.vectorBuilder.getVocabulary());
            await this.dao.saveMeta('totalDocs', this.vectorBuilder.getTotalDocs());
            await this.dao.saveVectors(this.vectors);

            console.log(`✓ Batch indexing completed: ${this.vectors.length} vectors`);
        } catch (error) {
            console.error('Batch indexing failed:', error);
            throw error;
        }
    }

    /**
     * 删除提示词索引
     */
    async removePrompt(id: string): Promise<void> {
        this.ensureReady();

        try {
            this.vectors = this.vectors.filter(v => v.id !== id);
            await this.dao.deleteVector(id);
            console.log(`Removed vector for prompt ${id}`);
        } catch (error) {
            console.error(`Failed to remove prompt ${id}:`, error);
            throw error;
        }
    }

    /**
     * 获取已索引的提示词数量
     */
    getIndexedCount(): number {
        return this.vectors.length;
    }

    /**
     * 获取词汇表大小
     */
    getVocabularySize(): number {
        return this.vectorBuilder.getVocabularySize();
    }

    /**
     * 清空所有索引
     */
    async clearAll(): Promise<void> {
        this.ensureReady();

        try {
            this.vectors = [];
            await this.dao.clearAll();
            console.log('All indexes cleared');
        } catch (error) {
            console.error('Failed to clear indexes:', error);
            throw error;
        }
    }

    /**
     * 检查是否有索引数据
     */
    hasIndexedData(): boolean {
        return this.vectors.length > 0;
    }

    private ensureReady(): void {
        if (this.status !== 'ready') {
            throw new Error(
                `SemanticSearchService not ready (status: ${this.status}). Call initialize() first.`
            );
        }
    }
}
