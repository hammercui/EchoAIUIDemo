import { Version, Tag, Prompt } from '@/types';

export const mockVersions: Version[] = [
  {
    id: 5,
    title: 'Version 5',
    description: 'Deployed to production',
    timestamp: 'Updated 2 hours ago',
    position: 'left',
  },
  {
    id: 4,
    title: 'Version 4',
    description: 'Fixed critical bug in API',
    timestamp: 'Updated 1 day ago',
    position: 'right',
  },
  {
    id: 3,
    title: 'Version 3',
    description: 'Implemented dashboard layout',
    timestamp: 'Updated 3 days ago',
    position: 'left',
  },
  {
    id: 2,
    title: 'Version 2',
    description: 'Added user authentication',
    timestamp: 'Updated 4 days ago',
    position: 'right',
  },
  {
    id: 1,
    title: 'Version 1',
    description: 'Initial commit - Project setup',
    timestamp: 'Updated 5 days ago',
    position: 'left',
    subVersions: [
      {
        id: 'v1.1',
        title: 'v1.1',
        description: 'Bug fixes and improvements',
      },
      {
        id: 'v1.2',
        title: 'v1.2',
        description: 'Performance optimizations',
      },
    ],
  },
];

export const mockTags: Tag[] = [
  { id: 'ui-design', label: 'UI Design', isActive: true },
  { id: 'animation', label: 'Animation', isActive: false },
  { id: 'layout', label: 'Layout', isActive: false },
];

export const mockPrompts: Prompt[] = [
  {
    id: 'p1',
    title: 'Dashboard Layout',
    description: 'Modern dashboard design pattern',
  },
  {
    id: 'p2',
    title: 'Hero Section',
    description: 'Landing page hero component',
  },
  {
    id: 'p3',
    title: 'Navigation Menu',
    description: 'Responsive navigation design',
  },
];
