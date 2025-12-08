import { injectable } from 'tsyringe';
import { Version } from '@/model/entities/Version';

@injectable()
export class VersionService {
    async getVersions(promptId: string): Promise<Version[]> {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => resolve([]), 500);
        });
    }
}
