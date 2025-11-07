import React, { useState, useRef, useEffect } from 'react';

/**
 * 排序下拉组件 - HeroUI 风格
 * 
 * 规范要求:
 * - 圆角按钮设计
 * - 渐变色选中状态
 * - 带图标的下拉菜单
 */

const ChevronDownIcon = ({ className }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    className={className}
  >
    <path
      d="M19 9l-7 7-7-7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
  >
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const SortDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'newest', label: '最新优先', icon: '🕒' },
    { value: 'oldest', label: '最早优先', icon: '📅' },
    { value: 'mostLiked', label: '最多点赞', icon: '👍' },
    { value: 'mostUsed', label: '最常使用', icon: '🔥' }
  ];

  const currentOption = sortOptions.find(opt => opt.value === value) || sortOptions[0];

  // 点击外部关闭下拉
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 触发按钮 - HeroUI 风格 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-8 px-4 text-xs font-medium rounded-full bg-muted/50 hover:bg-muted text-foreground transition-all duration-150 border border-transparent hover:border-border"
      >
        <span className="text-sm">{currentOption.icon}</span>
        <span>{currentOption.label}</span>
        <ChevronDownIcon className={`w-3 h-3 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* 下拉菜单 - HeroUI 风格 */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 min-w-[160px] bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in-0 slide-in-from-top-2 duration-150">
          {sortOptions.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs text-left transition-all duration-150 ${
                  isSelected
                    ? 'text-white font-medium'
                    : 'hover:bg-muted/50 text-foreground'
                }`}
                style={isSelected ? {
                  background: 'linear-gradient(135deg, hsl(262, 83%, 58%), hsl(262, 83%, 48%))'
                } : {}}
              >
                <span className="text-base">{option.icon}</span>
                <span className="flex-1">{option.label}</span>
                {isSelected && (
                  <span className="w-4 h-4">
                    <CheckIcon />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
