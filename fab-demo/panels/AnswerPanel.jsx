import React, { useState } from 'react';
import { Tooltip } from '@heroui/tooltip';
import { Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SOURCE_ICONS, getSourceName } from '../components/SourceLogos';
import { motion } from 'framer-motion';

/**
 * 答案查看面板 - HeroUI 风格
 * 支持多平台答案切换和Markdown渲染
 */

const AnswerPanel = ({ prompt, onCopy }) => {
  const [selectedSource, setSelectedSource] = useState(prompt.sources?.[0] || 'deepseek');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const currentAnswer = prompt.answer || '';
    navigator.clipboard.writeText(currentAnswer);
    setCopied(true);
    if (onCopy) {
      onCopy();
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const currentAnswer = prompt.answer || '暂无答案';

  return (
    <div className="answer-panel">
      {/* 平台切换Tab */}
      {prompt.sources && prompt.sources.length > 1 && (
        <div className="mb-2 px-4">
          <div className="flex gap-6 relative">
            {prompt.sources.map((source) => {
              const IconComponent = SOURCE_ICONS[source];
              const isSelected = selectedSource === source;
              return (
                <button
                  key={source}
                  onClick={() => setSelectedSource(source)}
                  className="flex items-center gap-1.5 h-10 px-0 pb-2 relative cursor-pointer border-0 bg-transparent"
                >
                  <motion.div
                    className={`flex items-center gap-1.5 transition-colors duration-200 ${
                      isSelected ? 'text-violet-600' : 'text-slate-500 hover:text-slate-900'
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
                  </motion.div>
                  {/* 下划线指示器 - 使用 Framer Motion 实现平滑动画 */}
                  {isSelected && (
                    <motion.span
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-violet-600"
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
        </div>
      )}

      {/* Markdown答案内容 */}
      <div className="px-4 mb-4 relative group">
        {/* 浮动复制按钮 */}
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
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-lg bg-background/90 backdrop-blur-sm border border-border/50 cursor-pointer flex items-center justify-center transition-all duration-200 text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-md active:scale-95 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </Tooltip>
        
        <div className="bg-muted/50 border border-border rounded-xl p-4">
          <div className="markdown-content prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: '1em 0',
                      borderRadius: '8px',
                      fontSize: '0.85em',
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-violet-100 text-violet-800 px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                    {children}
                  </code>
                );
              },
              table({ children }) {
                return (
                  <div className="overflow-x-auto my-4">
                    <table className="min-w-full border-collapse border border-border">
                      {children}
                    </table>
                  </div>
                );
              },
              thead({ children }) {
                return <thead className="bg-muted">{children}</thead>;
              },
              th({ children }) {
                return (
                  <th className="border border-border px-4 py-2 text-left text-xs font-semibold text-foreground">
                    {children}
                  </th>
                );
              },
              td({ children }) {
                return (
                  <td className="border border-border px-4 py-2 text-xs text-foreground">
                    {children}
                  </td>
                );
              },
              h1({ children }) {
                return <h1 className="text-xl font-bold text-foreground mt-6 mb-3">{children}</h1>;
              },
              h2({ children }) {
                return <h2 className="text-lg font-semibold text-foreground mt-5 mb-2">{children}</h2>;
              },
              h3({ children }) {
                return <h3 className="text-base font-semibold text-foreground mt-4 mb-2">{children}</h3>;
              },
              p({ children }) {
                return <p className="text-sm text-foreground mb-3 leading-relaxed">{children}</p>;
              },
              ul({ children }) {
                return <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>;
              },
              li({ children }) {
                return <li className="text-sm text-foreground">{children}</li>;
              },
              blockquote({ children }) {
                return (
                  <blockquote className="border-l-4 border-primary pl-4 py-2 my-3 bg-muted/30 italic">
                    {children}
                  </blockquote>
                );
              },
            }}
          >
            {currentAnswer}
          </ReactMarkdown>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerPanel;
