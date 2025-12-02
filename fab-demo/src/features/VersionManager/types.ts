export type VersionStatus = 'dev' | 'live' | 'fix' | 'design';

export interface SubVersion {
    id: string;
    version: string;
    date: string;
    desc: string;
}

export interface VersionData {
    id: string;
    version: string;
    status?: VersionStatus; // Optional status
    date: string;
    desc: string;
    tags: string[];
    subVersions?: SubVersion[]; // Sub-versions array
}

export interface Candidate {
    id: string;
    text: string;
    tags: string[];
    priority?: string;
}
