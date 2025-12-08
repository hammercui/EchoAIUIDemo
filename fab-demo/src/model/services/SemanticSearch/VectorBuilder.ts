import { injectable, inject } from 'tsyringe';
import { TextTokenizer } from './TextTokenizer';
import { VocabularyEntry, PromptVector } from './types';
import { VECTOR_DIM, MAX_KEYWORDS } from './constants';

/**
 * TF-IDF 向量构建器
 */
@injectable()
export class VectorBuilder {
    private vocabulary: Map<string, VocabularyEntry> = new Map();
    private totalDocs = 0;

    constructor(
        @inject(TextTokenizer) private tokenizer: TextTokenizer
    ) { }

    /**
     * 从语料库构建词汇表
     * @param corpus 文本列表
     */
    buildVocabulary(corpus: string[]): void {
        const wordDocFreq = new Map<string, number>();
        this.totalDocs = corpus.length;

        if (this.totalDocs === 0) {
            console.warn('Empty corpus provided to buildVocabulary');
            return;
        }

        // 1. 统计每个词出现在多少文档中
        corpus.forEach(text => {
            const uniqueWords = new Set(this.tokenizer.tokenize(text));
            uniqueWords.forEach(word => {
                wordDocFreq.set(word, (wordDocFreq.get(word) || 0) + 1);
            });
        });

        // 2. 按文档频率排序，取前 VECTOR_DIM 个词
        const sortedWords = [...wordDocFreq.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, VECTOR_DIM);

        // 3. 构建词汇表
        this.vocabulary.clear();
        sortedWords.forEach(([word, docFreq], index) => {
            const idf = Math.log((this.totalDocs + 1) / (docFreq + 1)) + 1;
            this.vocabulary.set(word, { word, index, idf, docFreq });
        });

        console.log(`Vocabulary built: ${this.vocabulary.size} words from ${this.totalDocs} documents`);
    }

    /**
     * 将文本转换为 TF-IDF 向量
     */
    textToVector(text: string): Float32Array {
        const tokens = this.tokenizer.tokenize(text);
        const vector = new Float32Array(VECTOR_DIM);

        if (tokens.length === 0) return vector;

        // 计算词频
        const termFreq = new Map<string, number>();
        tokens.forEach(t => termFreq.set(t, (termFreq.get(t) || 0) + 1));

        // 计算 TF-IDF
        termFreq.forEach((count, word) => {
            const entry = this.vocabulary.get(word);
            if (entry) {
                const tf = count / tokens.length;
                vector[entry.index] = tf * entry.idf;
            }
        });

        // L2 归一化
        return this.normalize(vector);
    }

    /**
     * 构建提示词向量
     */
    buildPromptVector(id: string, text: string): PromptVector {
        return {
            id,
            text,
            vector: this.textToVector(text),
            keywords: this.tokenizer.extractKeywords(text, MAX_KEYWORDS),
            updatedAt: Date.now()
        };
    }

    /**
     * L2 归一化
     */
    private normalize(vec: Float32Array): Float32Array {
        let sum = 0;
        for (let i = 0; i < vec.length; i++) {
            sum += vec[i] * vec[i];
        }
        const norm = Math.sqrt(sum);
        if (norm > 0) {
            for (let i = 0; i < vec.length; i++) {
                vec[i] /= norm;
            }
        }
        return vec;
    }

    // ========== Getters & Setters ==========

    getVocabulary(): Map<string, VocabularyEntry> {
        return this.vocabulary;
    }

    setVocabulary(vocab: Map<string, VocabularyEntry>): void {
        this.vocabulary = vocab;
    }

    getTotalDocs(): number {
        return this.totalDocs;
    }

    setTotalDocs(count: number): void {
        this.totalDocs = count;
    }

    getVocabularySize(): number {
        return this.vocabulary.size;
    }
}
