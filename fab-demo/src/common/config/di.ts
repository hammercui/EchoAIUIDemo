import 'reflect-metadata';
import { container } from 'tsyringe';

// Infra
import { SemanticSearchDAO } from '@/infra/dao/SemanticSearchDAO';

// Services
import { SemanticSearchService } from '@/model/services/SemanticSearch/SemanticSearchService';
import { PromptService } from '@/model/services/PromptService';
import { TagService } from '@/model/services/TagService';
import { VersionService } from '@/model/services/VersionService';

/**
 * 初始化 DI 容器
 */
export function initializeDI() {
    // 注册 Infra 层单例
    container.registerSingleton(SemanticSearchDAO);

    // 注册 Service 层单例
    container.registerSingleton(SemanticSearchService);
    container.registerSingleton(PromptService);
    container.registerSingleton(TagService);
    container.registerSingleton(VersionService);
}

/**
 * 获取 Service 实例
 */
export function getService<T>(serviceClass: new (...args: any[]) => T): T {
    return container.resolve(serviceClass);
}
