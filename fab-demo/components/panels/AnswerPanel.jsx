import React from 'react';

/**
 * 答案查看面板
 */
const AnswerPanel = ({ prompt, onCopy }) => {
  const handleCopy = () => {
    if (onCopy) {
      onCopy();
    }
  };

  return (
    <div className="answer-panel">
      <h3 className="text-sm font-semibold text-foreground mb-3">
        AI 生成的答案
      </h3>
      <div className="bg-muted border border-border rounded-md p-3 mb-4 max-h-[300px] overflow-y-auto">
        <pre className="m-0 text-xs leading-relaxed text-foreground whitespace-pre-wrap break-words font-mono">
          {prompt.answer}
        </pre>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={handleCopy}
          className="h-10 px-6 text-base font-semibold rounded-full transition-all duration-150 bg-foreground text-background border-0 cursor-pointer hover:opacity-90 active:scale-95"
        >
          复制答案
        </button>
        <button className="h-10 px-6 text-base font-semibold rounded-full transition-all duration-150 bg-background text-foreground border border-border cursor-pointer hover:bg-muted active:scale-95">
          重新生成
        </button>
      </div>
    </div>
  );
};

export default AnswerPanel;
