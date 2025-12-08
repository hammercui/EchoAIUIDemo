import { injectable } from 'tsyringe';
import { mockPrompts } from '@/common/data/mockData';
import { Prompt } from '@/model/entities/Prompt';

@injectable()
export class PromptService {
    async getPrompts(): Promise<Prompt[]> {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockPrompts as Prompt[]), 500);
        });
    }

    async likePrompt(id: number): Promise<void> {
        // Simulate API call
        console.log(`Liked prompt ${id}`);
    }
}
