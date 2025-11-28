import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * 单个答案视图组件
 * 负责渲染单个平台的 Markdown 答案内容
 */
const SingleAnswerView = ({ answer = '暂无答案' }) => {
  return (
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
                <code className="bg-accent/10 text-accent px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
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
          {answer}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default SingleAnswerView;

