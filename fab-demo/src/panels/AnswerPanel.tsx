import React, { useState } from 'react';
import { Tooltip } from '@heroui/tooltip';
import { Copy, Check, GitCompare, X } from 'lucide-react';
import { SOURCE_ICONS, getSourceName } from '@/components/common/SourceLogos';
import { motion } from 'framer-motion';
import SingleAnswerView from '@/features/AnswerViewer/components/SingleAnswerView';
import CompareAnswerView from '@/features/AnswerViewer/components/CompareAnswerView';

/**
 * 答案查看面板 - HeroUI 风格
 * 支持多平台答案切换、对比和Markdown渲染
 */

const AnswerPanel = ({ prompt, onCopy }) => {
  // 单选模式：当前选中的平台
  const [selectedSource, setSelectedSource] = useState(prompt.sources?.[0] || 'deepseek');
  // 对比模式：是否启用对比模式
  const [isCompareMode, setIsCompareMode] = useState(false);
  // 对比模式：选中的平台列表
  const [selectedSources, setSelectedSources] = useState<any[]>([]);
  // 复制状态
  const [copied, setCopied] = useState(false);
  // 记住进入对比模式前的平台
  const [previousSource, setPreviousSource] = useState(selectedSource);

  // 切换对比模式
  const toggleCompareMode = () => {
    if (!isCompareMode) {
      // 进入对比模式：记住当前平台，初始化选中列表
      setPreviousSource(selectedSource);
      setSelectedSources([selectedSource]);
      setIsCompareMode(true);
    } else {
      // 退出对比模式：恢复到之前的平台
      setSelectedSource(previousSource);
      setSelectedSources([]);
      setIsCompareMode(false);
    }
  };

  // 处理平台选择（对比模式）
  const handleSourceToggle = (source) => {
    if (selectedSources.includes(source)) {
      // 取消选择
      setSelectedSources(selectedSources.filter(s => s !== source));
    } else {
      // 选择平台
      if (selectedSources.length >= 3) {
        // 超过3个，显示提示
        alert('最多只能选择3个平台进行对比');
        return;
      }
      setSelectedSources([...selectedSources, source]);
    }
  };

  // 处理平台切换（单选模式）
  const handleSourceChange = (source) => {
    if (!isCompareMode) {
      setSelectedSource(source);
    } else {
      handleSourceToggle(source);
    }
  };

  const handleCopy = () => {
    const currentAnswer = prompt.answer || '';
    navigator.clipboard.writeText(currentAnswer);
    setCopied(true);
    if (onCopy) {
      onCopy();
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="answer-panel">
      {/* 平台切换/选择Tab + 对比按钮 */}
      {prompt.sources && prompt.sources.length > 1 && (
        <div className="mb-2 px-4 -mt-1">
          <div className="flex items-center gap-4">
            {/* Tab 区域 */}
            <div className="flex gap-6 relative">
              {prompt.sources.map((source) => {
                const IconComponent = SOURCE_ICONS[source];
                const isSelected = isCompareMode
                  ? selectedSources.includes(source)
                  : selectedSource === source;

                return (
                  <button
                    key={source}
                    onClick={() => handleSourceChange(source)}
                    className="flex items-center gap-1.5 h-10 px-0 pb-1 relative cursor-pointer border-0 bg-transparent"
                  >
                    <motion.div
                      className={`flex items-center gap-1.5 transition-colors duration-200 ${isSelected ? 'text-accent' : 'text-slate-500 hover:text-slate-900'
                        }`}
                      initial={false}
                      animate={{
                        scale: isSelected ? 1.05 : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    >
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                      <span className="text-sm font-medium">{getSourceName(source)}</span>

                      {/* 对比模式：显示勾选标记 */}
                      {isCompareMode && isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-1 text-accent"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.div>

                    {/* 下划线指示器 - 仅在单选模式显示 */}
                    {!isCompareMode && isSelected && (
                      <motion.span
                        layoutId="tab-indicator"
                        className="absolute bottom-0.5 left-0 right-0 h-0.5 rounded-t-full bg-accent"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 40,
                          mass: 0.8
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* 对比按钮 - 带转变动效 */}
            <motion.button
              onClick={toggleCompareMode}
              className={`
                flex items-center gap-1.5 h-7 px-3 rounded-full text-xs font-medium
                border cursor-pointer
                ${isCompareMode
                  ? 'bg-accent text-white border-accent'
                  : 'bg-background text-foreground border-border'
                }
              `}
              animate={{
                backgroundColor: isCompareMode
                  ? 'rgba(97, 40, 255, 1)'
                  : 'rgba(var(--background), 1)',
                borderColor: isCompareMode
                  ? 'rgba(97, 40, 255, 1)'
                  : 'rgba(var(--border), 1)',
                color: isCompareMode
                  ? '#ffffff'
                  : 'rgba(var(--foreground), 1)',
              }}
              whileHover={{
                backgroundColor: isCompareMode
                  ? 'rgba(80, 30, 220, 1)'
                  : 'rgba(var(--muted), 1)',
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="flex items-center gap-1.5"
                initial={false}
                animate={{
                  rotate: isCompareMode ? 180 : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
              >
                {isCompareMode ? <X size={14} /> : <GitCompare size={14} />}
              </motion.div>

              <motion.span
                key={isCompareMode ? 'cancel' : 'compare'}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                {isCompareMode ? '取消对比' : '对比'}
              </motion.span>
            </motion.button>
          </div>
        </div>
      )}

      {/* 答案内容区域 */}
      <div className="mb-4 relative">
        {/* 固定位置浮动复制按钮 - 仅在单选模式显示 */}
        {!isCompareMode && (
          <Tooltip
            content={copied ? "已复制" : "复制答案"}
            placement="left"
            delay={0}
            closeDelay={0}
            classNames={{
              content: "bg-foreground text-background px-2 py-1 text-xs rounded-md shadow-lg"
            }}
          >
            <button
              onClick={handleCopy}
              className="fixed top-20 right-6 z-[100] w-10 h-10 rounded-lg bg-background/95 backdrop-blur-md border border-border shadow-lg cursor-pointer flex items-center justify-center transition-all duration-200 text-muted-foreground hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:shadow-xl active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </Tooltip>
        )}

        {/* 根据模式显示不同视图 */}
        {isCompareMode ? (
          <CompareAnswerView
            selectedSources={selectedSources}
            prompt={prompt}
          />
        ) : (
          <div className="px-4">
            <SingleAnswerView answer={prompt.answer || '暂无答案'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerPanel;
