# Dependency Injection (DI) Guide

本项目使用 [tsyringe](https://github.com/microsoft/tsyringe) 作为依赖注入容器，用于管理 Service 和 DAO 层的生命周期与依赖关系。

## 1. 核心概念

*   **Container (容器)**: 管理所有注册类的实例。
*   **Injectable (可注入)**: 标记一个类可以被容器管理。
*   **Token**: 用于标识依赖项的唯一键（通常是类本身）。
*   **Singleton (单例)**: 在整个应用生命周期中只存在一个实例。

## 2. 初始化配置

DI 的核心配置位于 `src/common/config/di.ts`。

### 2.1 配置文件 (`src/common/config/di.ts`)

该文件负责：
1.  引入 `reflect-metadata`（必须在第一行）。
2.  导出 `initializeDI` 函数，用于注册所有单例服务。
3.  导出 `getService` 辅助函数，用于在非注入环境（如 React 组件/Hooks）中获取服务实例。

```typescript
import 'reflect-metadata';
import { container } from 'tsyringe';
import { MyService } from '@/model/services/MyService';

export function initializeDI() {
    // 注册单例服务
    container.registerSingleton(MyService);
}

export function getService<T>(serviceClass: new (...args: any[]) => T): T {
    return container.resolve(serviceClass);
}
```

### 2.2 启动时初始化 (`src/main.tsx`)

我们在应用启动的最早阶段（`ReactDOM.render` 之前）调用 `initializeDI()`，确保所有服务都已注册就绪。

```typescript
// src/main.tsx
import { initializeDI } from '@/common/config/di';

// Initialize Dependency Injection
initializeDI();

ReactDOM.createRoot(document.getElementById('root')!).render(...);
```

## 3. 如何定义和使用服务

### 3.1 定义一个服务

使用 `@injectable()` 装饰器标记类。如果该服务依赖其他服务，通过构造函数注入。

```typescript
// src/model/services/MyService.ts
import { injectable, inject } from 'tsyringe';
import { OtherService } from './OtherService';

@injectable()
export class MyService {
    constructor(
        // 构造函数注入依赖
        @inject(OtherService) private otherService: OtherService
    ) {}

    doSomething() {
        this.otherService.help();
    }
}
```

### 3.2 注册服务

在 `src/common/config/di.ts` 中注册新创建的服务。

```typescript
// src/common/config/di.ts
import { MyService } from '@/model/services/MyService';

export function initializeDI() {
    // ... 其他服务
    container.registerSingleton(MyService); // 注册为单例
}
```

### 3.3 在业务逻辑中使用 (Service to Service)

如 3.1 所示，直接在构造函数中声明依赖即可，`tsyringe` 会自动注入。

### 3.4 在 React 组件/Hooks 中使用 (View to Service)

在 React 组件或自定义 Hook 中，我们无法使用构造函数注入。此时应使用 `getService` 辅助函数。

**推荐做法：在 ViewModel (Hook) 中获取服务**

```typescript
// src/view/features/MyFeature/hooks/useMyViewModel.ts
import { getService } from '@/common/config/di';
import { MyService } from '@/model/services/MyService';

export const useMyViewModel = () => {
    // 获取服务实例
    const myService = getService(MyService);

    const handleAction = () => {
        myService.doSomething();
    };

    return {
        handleAction
    };
};
```

## 4. 最佳实践

1.  **保持 Service 无状态**: Service 应该主要包含业务逻辑，状态（State）应交由 Zustand Store 管理。
2.  **单一职责**: 每个 Service 专注处理一类业务。
3.  **避免循环依赖**: 如果出现 A 依赖 B，B 依赖 A，请考虑提取公共部分到 C，或者重构代码结构。
4.  **总是使用 `getService`**: 在 View 层，统一使用 `getService(Class)` 获取实例，不要直接 `new Class()` 或使用 `container.resolve()`（除非特殊情况）。
