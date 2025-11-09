import { Tooltip } from '@heroui/tooltip';
import { Copy, Eye, Settings } from 'lucide-react';

/**
 * Action Buttons 组件 - 美化版
 *
 * 优化内容:
 * - 使用 lucide-react 图标
 * - 使用 @heroui/tooltip 快速提示
 * - 固定在右侧的悬浮形态，不占用内容空间
 * - 仅 hover 时显示，平滑过渡
 * - 垂直居中对齐
 * - 磨砂玻璃背景效果
 * - 快速响应的 Tooltip (delay: 0)
 */
const ActionButtons = ({ onCopy, onView, onManage, onUsage }) => {
  const handleClick = (action) => (e) => {
    e.stopPropagation();
    onUsage?.(); // 触发使用统计
    action();
  };

  // 按钮样式 - 磨砂玻璃效果（缩小尺寸）
  const buttonClass = "w-7 h-7 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 cursor-pointer flex items-center justify-center transition-all duration-150 text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-md active:scale-95";

  return (
    <div className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col gap-1 opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto pointer-events-none">
      <Tooltip
        content="复制"
        placement="left"
        delay={0}
        closeDelay={0}
        classNames={{
          content: "bg-foreground text-background px-2 py-1 text-xs rounded-md shadow-lg"
        }}
      >
        <button
          className={buttonClass}
          onClick={handleClick(onCopy)}
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
      </Tooltip>

      <Tooltip
        content="查看答案"
        placement="left"
        delay={0}
        closeDelay={0}
        classNames={{
          content: "bg-foreground text-background px-2 py-1 text-xs rounded-md shadow-lg"
        }}
      >
        <button
          className={buttonClass}
          onClick={handleClick(onView)}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </Tooltip>

      <Tooltip
        content="管理"
        placement="left"
        delay={0}
        closeDelay={0}
        classNames={{
          content: "bg-foreground text-background px-2 py-1 text-xs rounded-md shadow-lg"
        }}
      >
        <button
          className={buttonClass}
          onClick={handleClick(onManage)}
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </Tooltip>
    </div>
  );
};

export default ActionButtons;
