import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Tooltip } from '@heroui/tooltip';
import { SOURCE_ICONS } from '@/view/components/common/SourceLogos';
import SingleAnswerView from './SingleAnswerView';

/**
 * 对比答案视图组件
 * 并列显示多个平台的答案，支持最多3个平台对比
 */
const CompareAnswerView = ({ selectedSources = [] as any[], prompt }) => {
  // 复制状态管理 - 为每个平台单独管理
  const [copiedStates, setCopiedStates] = useState({});

  // 处理复制
  const handleCopy = (source) => {
    const answer = prompt.answer || '暂无答案';
    navigator.clipboard.writeText(answer);
    setCopiedStates({ ...copiedStates, [source]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [source]: false });
    }, 2000);
  };

  // 如果没有选中的平台，显示提示
  if (selectedSources.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-muted-foreground">
        <p className="text-sm">请至少选择一个平台进行对比</p>
      </div>
    );
  }

  // 单个平台时，全宽显示
  if (selectedSources.length === 1) {
    const source = selectedSources[0];
    const IconComponent = SOURCE_ICONS[source];
    const isCopied = copiedStates[source];

    return (
      <div className="px-4">
        <div className="relative">
          {/* 平台 Logo - 左上角 */}
          <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center border border-border">
            {IconComponent && <IconComponent className="w-5 h-5" />}
          </div>

          {/* 答案内容 */}
          <div className="relative">
            <SingleAnswerView answer={prompt.answer || '暂无答案'} />

            {/* 底部复制按钮 */}
            <div className="flex justify-end mt-3">
              <Tooltip
                content={isCopied ? "已复制" : "复制答案"}
                placement="top"
                delay={0}
                closeDelay={0}
                classNames={{
                  content: "bg-foreground text-background px-2 py-1 text-xs rounded-md shadow-lg"
                }}
              >
                <button
                  onClick={() => handleCopy(source)}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-background border border-border cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-muted hover:text-foreground hover:border-accent active:scale-95"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-xs">已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-xs">复制</span>
                    </>
                  )}
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 多个平台对比视图
  return (
    <div className="px-4">
      <div className={`grid gap-4 ${selectedSources.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
        }`}>
        {selectedSources.map((source, index) => {
          const IconComponent = SOURCE_ICONS[source];
          const isLast = index === selectedSources.length - 1;
          const isCopied = copiedStates[source];

          return (
            <div
              key={source}
              className={`relative ${!isLast ? 'pr-4' : ''}`}
            >
              {/* 虚线分隔线 */}
              {!isLast && (
                <div className="absolute top-0 right-0 bottom-0 w-px border-r border-dashed border-border" />
              )}

              <div className="relative">
                {/* 平台 Logo - 左上角 */}
                <div className="absolute -top-2 -left-2 z-10 w-7 h-7 bg-white rounded-lg shadow-md flex items-center justify-center border border-border">
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                </div>

                {/* 答案内容 */}
                <div className="relative">
                  <SingleAnswerView answer={prompt.answer || '暂无答案'} />

                  {/* 底部复制按钮 */}
                  <div className="flex justify-end mt-3">
                    <Tooltip
                      content={isCopied ? "已复制" : "复制答案"}
                      placement="top"
                      delay={0}
                      closeDelay={0}
                      classNames={{
                        content: "bg-foreground text-background px-2 py-1 text-xs rounded-md shadow-lg"
                      }}
                    >
                      <button
                        onClick={() => handleCopy(source)}
                        className="flex items-center gap-1 h-7 px-2.5 rounded-lg bg-background border border-border cursor-pointer transition-all duration-200 text-muted-foreground hover:bg-muted hover:text-foreground hover:border-accent active:scale-95"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompareAnswerView;

