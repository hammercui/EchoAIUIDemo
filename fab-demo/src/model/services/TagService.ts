import { injectable } from 'tsyringe';
import { Tag } from '@/model/entities/Tag';

@injectable()
export class TagService {
    async getTags(): Promise<Tag[]> {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => resolve([
                { id: '1', name: 'React', count: 10 },
                { id: '2', name: 'TypeScript', count: 8 },
                { id: '3', name: 'Vue', count: 5 }
            ]), 500);
        });
    }
}
