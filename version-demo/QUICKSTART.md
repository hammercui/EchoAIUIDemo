# 🚀 快速启动脚本

## Windows (PowerShell / CMD)

```bash
# 安装依赖
cd fab-demo/version-demo
npm install

# 启动开发服务器
npm run dev
```

## macOS / Linux

```bash
# 安装依赖
cd fab-demo/version-demo
npm install

# 启动开发服务器
npm run dev
```

## 一键启动（推荐）

### Windows (start.bat)
```batch
@echo off
cd version-demo
call npm install
call npm run dev
pause
```

### macOS/Linux (start.sh)
```bash
#!/bin/bash
cd version-demo
npm install
npm run dev
```

## 访问应用

启动成功后，在浏览器访问：**http://localhost:5173**

## 常见问题

### 端口被占用
```bash
# Vite 会自动尝试下一个可用端口（5174, 5175...）
```

### 依赖安装失败
```bash
# 清除缓存重试
rm -rf node_modules package-lock.json
npm install
```

### TypeScript 错误
```bash
# 确保安装了所有类型定义
npm install --save-dev @types/react @types/react-dom
```
