export interface Version {
    id: string;
    promptId: string;
    content: string;
    timestamp: number;
    author: string;
    changes?: string;
}
