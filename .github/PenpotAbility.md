# Penpot API 能力

本文档概述了通过 `penpot-mcp` 与 Penpot 设计项目进行交互的核心能力。

## 通用工作流程

1.  **连接**: 用户必须使用 Penpot MCP 插件将 Penpot 设计项目连接到 MCP 服务器。
2.  **交互**: 使用 `execute_code` 工具运行 JavaScript 代码来操作 Penpot 设计。

## 关键对象

### `penpot`

`penpot` 全局对象是与 Penpot 交互的主要入口点。

**重要属性和方法:**

*   `penpot.selection`: 获取用户在 Penpot UI 中选择的形状列表。
*   `penpot.root`: 获取当前活动页面的根形状。
*   `penpot.currentFile`: 获取当前文件对象。
*   `penpot.currentPage`: 获取当前页面对象。
*   `penpot.viewport`: 获取视口信息。
*   `penpot.createRectangle()`: 创建一个矩形。
*   `penpot.createBoard()`: 创建一个画板。
*   `penpot.createEllipse()`: 创建一个椭圆。
*   `penpot.createText(text: string)`: 创建一个文本元素。
*   `penpot.group(shapes: Shape[])`: 将一组形状组合。
*   `penpot.ungroup(group: Group)`: 取消组合。
*   `penpot.generateStyle(shapes: Shape[], options)`: 为形状生成 CSS 样式。
*   `penpot.generateMarkup(shapes: Shape[], options)`: 为形状生成 HTML/SVG 标记。
*   `penpot.uploadMediaUrl(name: string, url: string)`: 从 URL 上传媒体。
*   `penpot.uploadMediaData(name: string, data: Uint8Array, mimeType: string)`: 从数据上传媒体。

### `penpotUtils`

`penpotUtils` 对象提供了一系列实用的辅助函数，强烈建议使用这些函数来简化操作。

**核心功能:**

*   `getPages(): { id: string; name: string }[]`: 获取所有页面的列表。
*   `getPageById(id: string): Page | null`: 按 ID 获取页面。
*   `getPageByName(name: string): Page | null`: 按名称获取页面。
*   `shapeStructure(shape: Shape, maxDepth?: number)`: 生成形状的层级结构概览。
*   `findShapeById(id: string): Shape | null`: 按 ID 查找形状。
*   `findShape(predicate: (shape: Shape) => boolean, root?: Shape): Shape | null`: 根据断言查找单个形状。
*   `findShapes(predicate: (shape: Shape) => boolean, root?: Shape): Shape[]`: 根据断言查找多个形状。

## 常见任务

*   **查找所有图片**:
    ```javascript
    const images = penpotUtils.findShapes(
      shape => shape.type === 'image' || shape.fills?.some(fill => fill.fillImage),
      penpot.root
    );
    ```
*   **查找文本元素**:
    ```javascript
    const texts = penpotUtils.findShapes(shape => shape.type === 'text', penpot.root);
    ```
*   **按名称查找形状**:
    ```javascript
    const shape = penpotUtils.findShape(shape => shape.name === 'MyShape');
    ```
*   **获取当前所选内容的结构**:
    ```javascript
    const structure = penpotUtils.shapeStructure(penpot.selection[0]);
    ```

## Penpot API 类型

以下是 Penpot API 中可用的所有类型/接口的完整列表，可用于进一步的 API 查询：

`Penpot`, `ActiveUser`, `Blur`, `Board`, `Boolean`, `CloseOverlay`, `Color`, `ColorShapeInfo`, `ColorShapeInfoEntry`, `Comment`, `CommentThread`, `CommonLayout`, `Context`, `ContextGeometryUtils`, `ContextTypesUtils`, `ContextUtils`, `Dissolve`, `Ellipse`, `EventsMap`, `Export`, `File`, `FileVersion`, `Fill`, `FlexLayout`, `Flow`, `Font`, `FontVariant`, `FontsContext`, `GridLayout`, `Group`, `GuideColumn`, `GuideColumnParams`, `GuideRow`, `GuideSquare`, `GuideSquareParams`, `HistoryContext`, `Image`, `Interaction`, `LayoutCellProperties`, `LayoutChildProperties`, `Library`, `LibraryColor`, `LibraryComponent`, `LibraryElement`, `LibrarySummary`, `LibraryTypography`, `LocalStorage`, `NavigateTo`, `OpenOverlay`, `OpenUrl`, `OverlayAction`, `Page`, `Path`, `PathCommand`, `PluginData`, `PreviousScreen`, `Push`, `Rectangle`, `RulerGuide`, `Shadow`, `ShapeBase`, `Slide`, `Stroke`, `SvgRaw`, `Text`, `TextRange`, `ToggleOverlay`, `Track`, `User`, `Viewport`, `Action`, `Animation`, `BooleanType`, `Bounds`, `Gradient`, `Guide`, `ImageData`, `LibraryContext`, `Point`, `RulerGuideOrientation`, `Shape`, `StrokeCap`, `Theme`, `TrackType`, `Trigger`
