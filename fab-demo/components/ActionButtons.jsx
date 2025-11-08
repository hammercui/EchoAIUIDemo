import { Tooltip } from '@heroui/tooltip';
import { Copy, Eye, Settings } from 'lucide-react';

/**
 * Action Buttons 组件 - 优化版
 *
 * 优化内容:
 * - 使用 lucide-react 图标
 * - 使用 @heroui/tooltip 快速提示
 * - 紧凑布局，不超过 PromptItem 高度
 * - 快速响应的 Tooltip (delay: 0)
 */
const ActionButtons = ({ onCopy, onView, onManage, onUsage }) => {
  const handleClick = (action) => (e) => {
    e.stopPropagation();
    onUsage?.(); // 触发使用统计
    action();
  };

  const buttonClass = "w-7 h-7 border-0 rounded-md bg-transparent cursor-pointer flex items-center justify-center transition-all duration-150 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-90";

  return (
    <div className="absolute top-1/2 right-2 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none">
      <Tooltip
        content="复制"
        placement="left"
        delay={0}
        closeDelay={0}
        classNames={{
          content: "bg-foreground text-background px-2 py-1 text-xs rounded-md"
        }}
      >
        <button
          className={buttonClass}
          onClick={handleClick(onCopy)}
        >
          <Copy className="w-4 h-4" />
        </button>
      </Tooltip>

      <Tooltip
        content="查看答案"
        placement="left"
        delay={0}
        closeDelay={0}
        classNames={{
          content: "bg-foreground text-background px-2 py-1 text-xs rounded-md"
        }}
      >
        <button
          className={buttonClass}
          onClick={handleClick(onView)}
        >
          <Eye className="w-4 h-4" />
        </button>
      </Tooltip>

      <Tooltip
        content="管理"
        placement="left"
        delay={0}
        closeDelay={0}
        classNames={{
          content: "bg-foreground text-background px-2 py-1 text-xs rounded-md"
        }}
      >
        <button
          className={buttonClass}
          onClick={handleClick(onManage)}
        >
          <Settings className="w-4 h-4" />
        </button>
      </Tooltip>
    </div>
  );
};

export default ActionButtons;
