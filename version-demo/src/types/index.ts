export interface Version {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  position: 'left' | 'right';
  subVersions?: SubVersion[];
}

export interface SubVersion {
  id: string;
  title: string;
  description: string;
}

export interface Tag {
  id: string;
  label: string;
  isActive?: boolean;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
}
