import { Version } from './Version';

export interface Prompt {
    id: number;
    title: string;
    description: string;
    tags: string[];
    likes: number;
    isLiked: boolean;
    usageCount: number;
    date: string;
    dateTimestamp: number;
    version?: string;
    sources?: string[];
    answer?: string;
    currentVersionId?: string;
    versions?: Version[];
    tree_id?: string;
    version_num?: string;
    tree_title?: string;
}

export class PromptEntity implements Prompt {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public tags: string[] = [],
        public likes: number = 0,
        public isLiked: boolean = false,
        public usageCount: number = 0,
        public date: string = new Date().toISOString(),
        public dateTimestamp: number = Date.now()
    ) { }

    // 业务方法
    toggleLike(): PromptEntity {
        return new PromptEntity(
            this.id,
            this.title,
            this.description,
            this.tags,
            this.isLiked ? this.likes - 1 : this.likes + 1,
            !this.isLiked,
            this.usageCount,
            this.date,
            this.dateTimestamp
        );
    }

    addTag(tag: string): PromptEntity {
        if (this.tags.includes(tag)) return this;
        return new PromptEntity(
            this.id,
            this.title,
            this.description,
            [...this.tags, tag],
            this.likes,
            this.isLiked,
            this.usageCount,
            this.date,
            this.dateTimestamp
        );
    }
}
