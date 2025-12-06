import { PromptVector, VocabularyEntry } from '../service/SemanticSearch/types';
import {
    DB_NAME, DB_VERSION,
    STORE_VECTORS, STORE_VOCABULARY, STORE_META
} from '../service/SemanticSearch/constants';

/**
 * 语义搜索数据访问对象
 * 负责所有 IndexedDB 操作
 */
export class SemanticSearchDAO {
    private db: IDBDatabase | null = null;

    /**
     * 初始化数据库
     */
    async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = () => {
                const db = request.result;

                // 向量存储
                if (!db.objectStoreNames.contains(STORE_VECTORS)) {
                    db.createObjectStore(STORE_VECTORS, { keyPath: 'id' });
                }

                // 词汇表存储
                if (!db.objectStoreNames.contains(STORE_VOCABULARY)) {
                    db.createObjectStore(STORE_VOCABULARY, { keyPath: 'word' });
                }

                // 元数据存储
                if (!db.objectStoreNames.contains(STORE_META)) {
                    db.createObjectStore(STORE_META, { keyPath: 'key' });
                }
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 保存单个向量
     */
    async saveVector(vector: PromptVector): Promise<void> {
        return this.putItem(STORE_VECTORS, {
            ...vector,
            vector: Array.from(vector.vector) // Float32Array -> Array for storage
        });
    }

    /**
     * 批量保存向量
     */
    async saveVectors(vectors: PromptVector[]): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');

        const tx = this.db.transaction(STORE_VECTORS, 'readwrite');
        const store = tx.objectStore(STORE_VECTORS);

        for (const v of vectors) {
            store.put({
                ...v,
                vector: Array.from(v.vector)
            });
        }

        return new Promise((resolve, reject) => {
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    /**
     * 加载所有向量
     */
    async loadVectors(): Promise<PromptVector[]> {
        const items = await this.getAllItems<any>(STORE_VECTORS);
        return items.map(item => ({
            ...item,
            vector: new Float32Array(item.vector)
        }));
    }

    /**
     * 删除向量
     */
    async deleteVector(id: string): Promise<void> {
        return this.deleteItem(STORE_VECTORS, id);
    }

    /**
     * 保存词汇表
     */
    async saveVocabulary(vocab: Map<string, VocabularyEntry>): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');

        const tx = this.db.transaction(STORE_VOCABULARY, 'readwrite');
        const store = tx.objectStore(STORE_VOCABULARY);

        // 清空旧数据
        store.clear();

        // 写入新数据
        vocab.forEach(entry => store.put(entry));

        return new Promise((resolve, reject) => {
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    /**
     * 加载词汇表
     */
    async loadVocabulary(): Promise<Map<string, VocabularyEntry>> {
        const items = await this.getAllItems<VocabularyEntry>(STORE_VOCABULARY);
        return new Map(items.map(e => [e.word, e]));
    }

    /**
     * 保存元数据
     */
    async saveMeta(key: string, value: any): Promise<void> {
        return this.putItem(STORE_META, { key, value });
    }

    /**
     * 加载元数据
     */
    async loadMeta(key: string): Promise<any> {
        const item = await this.getItem<{ key: string; value: any }>(STORE_META, key);
        return item?.value;
    }

    /**
     * 清空所有数据
     */
    async clearAll(): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');

        const tx = this.db.transaction(
            [STORE_VECTORS, STORE_VOCABULARY, STORE_META],
            'readwrite'
        );

        tx.objectStore(STORE_VECTORS).clear();
        tx.objectStore(STORE_VOCABULARY).clear();
        tx.objectStore(STORE_META).clear();

        return new Promise((resolve, reject) => {
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    // ========== 私有辅助方法 ==========

    private putItem(storeName: string, item: any): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');

        return new Promise((resolve, reject) => {
            const tx = this.db!.transaction(storeName, 'readwrite');
            tx.objectStore(storeName).put(item);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    private getItem<T>(storeName: string, key: string): Promise<T | undefined> {
        if (!this.db) throw new Error('Database not initialized');

        return new Promise((resolve, reject) => {
            const tx = this.db!.transaction(storeName, 'readonly');
            const request = tx.objectStore(storeName).get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    private deleteItem(storeName: string, key: string): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');

        return new Promise((resolve, reject) => {
            const tx = this.db!.transaction(storeName, 'readwrite');
            tx.objectStore(storeName).delete(key);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    private getAllItems<T>(storeName: string): Promise<T[]> {
        if (!this.db) throw new Error('Database not initialized');

        return new Promise((resolve, reject) => {
            const tx = this.db!.transaction(storeName, 'readonly');
            const request = tx.objectStore(storeName).getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}
