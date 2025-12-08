export const VECTOR_DIM = 256;              // 向量维度
export const DEFAULT_TOP_K = 10;            // 默认返回数量
export const DEFAULT_THRESHOLD = 0.1;       // 默认相似度阈值
export const MAX_KEYWORDS = 10;             // 最多保存的关键词数

// IndexedDB 配置
export const DB_NAME = 'semantic-search-db';
export const DB_VERSION = 1;
export const STORE_VECTORS = 'vectors';
export const STORE_VOCABULARY = 'vocabulary';
export const STORE_META = 'meta';

// 停用词（中英文）
export const STOP_WORDS = new Set([
    // 中文停用词
    '的', '是', '在', '和', '了', '有', '我', '你', '他', '她', '它',
    '这', '那', '什么', '怎么', '如何', '为什么', '可以', '能够',
    '一个', '一些', '所有', '每个', '任何', '某个', '就是', '而且',
    '但是', '因为', '所以', '如果', '虽然', '然后', '或者', '并且',
    // 英文停用词
    'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'can', 'to', 'of', 'in',
    'for', 'on', 'with', 'at', 'by', 'from', 'as', 'or', 'and',
    'but', 'if', 'then', 'else', 'when', 'where', 'why', 'how',
    'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other',
    'some', 'such', 'no', 'not', 'only', 'same', 'so', 'than', 'too',
    'very', 'just', 'also', 'now', 'here', 'there', 'this', 'that'
]);
