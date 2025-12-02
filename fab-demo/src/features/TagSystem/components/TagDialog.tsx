/**
 * 标签对话框组件 - 索引文件
 * 
 * 为了保持向后兼容，从这里重新导出所有对话框组件
 * 实际组件已拆分到独立文件：
 * - Modal.jsx - 通用模态框组件
 * - AddTagDialog.jsx - 新增标签对话框
 * - DeleteTagDialog.jsx - 删除标签确认对话框
 */

export { default as Modal } from '@/components/common/LegacyModal';
export { default as AddTagDialog } from './AddTagDialog';
export { default as DeleteTagDialog } from './DeleteTagDialog';

