import React from 'react';

/**
 * 答案查看面板 - HeroUI 风格
 */

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 10.5V3.5C3 2.67 3.67 2 4.5 2H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13 8A5 5 0 1 1 8 3M13 8V4M13 8H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AnswerPanel = ({ prompt, onCopy }) => {
  const handleCopy = () => {
    if (onCopy) {
      onCopy();
    }
  };

  return (
    <div className="answer-panel">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <span>💡</span>
        <span>AI 生成的答案</span>
      </h3>
      <div className="bg-muted/50 border border-border rounded-xl p-4 mb-4 max-h-[400px] overflow-y-auto">
        <pre className="m-0 text-xs leading-relaxed text-foreground whitespace-pre-wrap break-words font-mono">
          {prompt.answer}
        </pre>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={handleCopy}
          className="flex-1 h-10 px-4 text-sm font-semibold rounded-full transition-all duration-150 text-white border-0 cursor-pointer hover:opacity-90 active:scale-95 shadow-sm flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, hsl(262, 83%, 58%), hsl(262, 83%, 48%))'
          }}
        >
          <CopyIcon />
          <span>复制答案</span>
        </button>
        <button className="flex-1 h-10 px-4 text-sm font-semibold rounded-full transition-all duration-150 bg-background text-foreground border border-border cursor-pointer hover:bg-muted active:scale-95 flex items-center justify-center gap-2">
          <RefreshIcon />
          <span>重新生成</span>
        </button>
      </div>
    </div>
  );
};

export default AnswerPanel;
