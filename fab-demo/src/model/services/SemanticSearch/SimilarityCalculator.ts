import { PromptVector, SearchResult, SearchOptions } from './types';
import { DEFAULT_TOP_K, DEFAULT_THRESHOLD } from './constants';

/**
 * 相似度计算器
 */
export class SimilarityCalculator {
    /**
     * 计算余弦相似度
     * 由于向量已归一化，直接计算点积
     */
    static cosineSimilarity(a: Float32Array, b: Float32Array): number {
        let dot = 0;
        const len = Math.min(a.length, b.length);
        for (let i = 0; i < len; i++) {
            dot += a[i] * b[i];
        }
        return dot;
    }

    /**
     * 查找 Top-K 相似结果
     */
    static findTopK(
        queryVector: Float32Array,
        queryKeywords: string[],
        candidates: PromptVector[],
        options: SearchOptions = {}
    ): SearchResult[] {
        const { topK = DEFAULT_TOP_K, threshold = DEFAULT_THRESHOLD } = options;
        const queryKeywordSet = new Set(queryKeywords);

        const results: SearchResult[] = [];

        for (const candidate of candidates) {
            const score = this.cosineSimilarity(queryVector, candidate.vector);

            if (score >= threshold) {
                // 找出匹配的关键词
                const matchedKeywords = candidate.keywords.filter(k =>
                    queryKeywordSet.has(k)
                );

                results.push({
                    id: candidate.id,
                    score,
                    matchedKeywords
                });
            }
        }

        // 按分数降序排序，取前 K 个
        return results
            .sort((a, b) => b.score - a.score)
            .slice(0, topK);
    }

    /**
     * 批量计算相似度（不过滤，返回所有）
     */
    static computeAllSimilarities(
        queryVector: Float32Array,
        candidates: PromptVector[]
    ): Array<{ id: string; score: number }> {
        return candidates.map(candidate => ({
            id: candidate.id,
            score: this.cosineSimilarity(queryVector, candidate.vector)
        }));
    }
}
