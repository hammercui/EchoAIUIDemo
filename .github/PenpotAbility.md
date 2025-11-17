# Penpot API 能力

本文档概述了通过 `penpot-mcp` 与 Penpot 设计项目进行交互的核心能力。本次内容基于刚刚使用 `penpot-mcp` 的 `penpot_api_info(Penpot)` 查询得到的最新能力列表整理。

## 通用工作流程

1.  **连接**: 用户必须使用 Penpot MCP 插件将 Penpot 设计项目连接到 MCP 服务器。
2.  **交互**: 使用 `execute_code` 工具运行 JavaScript 代码来操作 Penpot 设计。

## 关键对象

### `penpot`

`penpot` 全局对象是与 Penpot 交互的主要入口点，可分为以下能力域：

#### 插件 UI 与生命周期

* `penpot.ui.open(name, url, { width, height })` / `penpot.ui.resize(...)`：打开或调整插件窗体。
* `penpot.ui.sendMessage` / `penpot.ui.onMessage`：与自定义前端通信。
* `penpot.closePlugin()`：结束插件会话。
* `penpot.on(event, cb)` / `penpot.off(listenerId)`：监听并取消监听 MCP 事件。

#### 文件、页面与视图上下文

* `penpot.currentFile`, `penpot.currentPage`, `penpot.root`: 快速获取当前文件、页面及其根节点。
* `penpot.viewport`: 控制或读取视口信息。
* `penpot.history`, `penpot.library`, `penpot.fonts`, `penpot.theme`, `penpot.localStorage`: 访问历史栈、设计库、字体、主题以及本地存储。
* `penpot.activeUsers`, `penpot.currentUser`: 获取协作者信息。

#### 选择、颜色与形状

* `penpot.selection`: 当前选中形状列表。
* `penpot.shapesColors(shapes)` / `penpot.replaceColor(...)`: 批量读取或替换颜色。
* `penpot.group(shapes)` / `penpot.ungroup(group, ...)`: 组合管理。
* `penpot.flatten(shapes)`：将布尔/组合结果转换为路径。

#### 创建与编辑

* `penpot.createRectangle()`, `penpot.createBoard()`, `penpot.createEllipse()`, `penpot.createPath()`, `penpot.createBoolean(type, shapes)`, `penpot.createText(text)`：创建主流图形元素。
* `penpot.createShapeFromSvg(svgString)` / `createShapeFromSvgWithImages(svgString)`：从 SVG（含图片）生成形状。
* `penpot.uploadMediaUrl(name, url)` / `penpot.uploadMediaData(name, data, mimeType)`：上传远程或内存中的媒体资产。

#### 布局与对齐

* `penpot.alignHorizontal(shapes, direction)` / `penpot.alignVertical(...)`: 水平/垂直对齐。
* `penpot.distributeHorizontal(shapes)` / `penpot.distributeVertical(shapes)`: 均匀分布。

#### 页面跳转与导出

* `penpot.createPage()` / `penpot.openPage(page)` / `penpot.openViewer()`：新增页面、跳转页面或打开 Viewer。
* `penpot.generateMarkup(shapes, { type: "html" | "svg" })`: 生成 HTML/SVG。
* `penpot.generateStyle(shapes, { type: "css", includeChildren })`: 生成 CSS。
* `penpot.generateFontFaces(shapes)`: 提取字体声明。

#### 视图操作快捷示例（常与 `penpotUtils` 联用）

```javascript
// 将当前选区水平置中
penpot.alignHorizontal(penpot.selection, "center");

// 生成当前页面根节点的 HTML
const html = penpot.generateMarkup([penpot.root], { type: "html" });
```

### `penpotUtils`

`penpotUtils` 对象提供了一系列实用的辅助函数，强烈建议使用这些函数来简化操作。

**核心功能:**

| 能力 | 描述 |
| --- | --- |
| `getPages()` / `getPageById()` / `getPageByName()` | 快速定位页面元数据。 |
| `shapeStructure(shape, maxDepth?)` | 输出树状结构，便于排查命名与嵌套。 |
| `findShapeById()` | 通过 ID 精确定位。 |
| `findShape(predicate, root?)` | 根据断言找到单个 shape。 |
| `findShapes(predicate, root?)` | 根据断言批量获取 shape，支持限定根节点。 |

> 建议：优先使用 `penpotUtils` 定位元素，再调用 `penpot` 原生命令进行修改，可显著减少自定义遍历逻辑。

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
*   **对齐当前选区**:
    ```javascript
    penpot.alignVertical(penpot.selection, 'center');
    penpot.distributeHorizontal(penpot.selection);
    ```
*   **生成 CSS + 字体声明**:
    ```javascript
    const css = penpot.generateStyle(penpot.selection, { type: 'css', includeChildren: true });
    const fonts = await penpot.generateFontFaces(penpot.selection);
    ```
*   **快速创建画板并插入文本**:
    ```javascript
    const board = penpot.createBoard();
    const text = penpot.createText('新方案');
    penpot.group([board, text]);
    ```

## Penpot API 类型

以下是 Penpot API 中可用的所有类型/接口的完整列表，可用于进一步的 API 查询：

`Penpot`, `ActiveUser`, `Blur`, `Board`, `Boolean`, `CloseOverlay`, `Color`, `ColorShapeInfo`, `ColorShapeInfoEntry`, `Comment`, `CommentThread`, `CommonLayout`, `Context`, `ContextGeometryUtils`, `ContextTypesUtils`, `ContextUtils`, `Dissolve`, `Ellipse`, `EventsMap`, `Export`, `File`, `FileVersion`, `Fill`, `FlexLayout`, `Flow`, `Font`, `FontVariant`, `FontsContext`, `GridLayout`, `Group`, `GuideColumn`, `GuideColumnParams`, `GuideRow`, `GuideSquare`, `GuideSquareParams`, `HistoryContext`, `Image`, `Interaction`, `LayoutCellProperties`, `LayoutChildProperties`, `Library`, `LibraryColor`, `LibraryComponent`, `LibraryElement`, `LibrarySummary`, `LibraryTypography`, `LocalStorage`, `NavigateTo`, `OpenOverlay`, `OpenUrl`, `OverlayAction`, `Page`, `Path`, `PathCommand`, `PluginData`, `PreviousScreen`, `Push`, `Rectangle`, `RulerGuide`, `Shadow`, `ShapeBase`, `Slide`, `Stroke`, `SvgRaw`, `Text`, `TextRange`, `ToggleOverlay`, `Track`, `User`, `Viewport`, `Action`, `Animation`, `BooleanType`, `Bounds`, `Gradient`, `Guide`, `ImageData`, `LibraryContext`, `Point`, `RulerGuideOrientation`, `Shape`, `StrokeCap`, `Theme`, `TrackType`, `Trigger`
