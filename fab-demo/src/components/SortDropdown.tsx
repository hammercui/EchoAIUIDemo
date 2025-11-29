import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Clock, Calendar, ThumbsUp, Flame } from 'lucide-react';

/**
 * 排序下拉组件 - HeroUI 风格
 *
 * 特性:
 * - Lucide React 图标
 * - Ripple 波纹效果
 * - 渐变色选中状态
 * - 流畅动画过渡
 */

const SortDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ripples, setRipples] = useState<any[]>([]);
  const dropdownRef = useRef<any>(null);

  const sortOptions = [
    { value: 'newest', label: '最新优先', Icon: Clock },
    { value: 'oldest', label: '最早优先', Icon: Calendar },
    { value: 'mostLiked', label: '最多点赞', Icon: ThumbsUp },
    { value: 'mostUsed', label: '最常使用', Icon: Flame }
  ];

  const currentOption = sortOptions.find(opt => opt.value === value) || sortOptions[0];

  // Ripple 效果创建
  const createRipple = (e, key, target = 'trigger') => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = { x, y, size, key, target };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.key !== key));
    }, 600);
  };

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
      {/* 触发按钮 - HeroUI 风格 + Ripple */}
      <button
        onClick={(e) => {
          createRipple(e, Date.now(), 'trigger');
          setIsOpen(!isOpen);
        }}
        className="relative overflow-hidden flex items-center gap-2 h-8 px-4 text-xs font-medium rounded-full bg-muted/50 hover:bg-muted text-foreground transition-all duration-150 border border-transparent hover:border-border active:scale-[0.97]"
      >
        <currentOption.Icon className="w-3.5 h-3.5" />
        <span>{currentOption.label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />

        {/* Ripple 波纹 */}
        {ripples
          .filter(r => r.target === 'trigger')
          .map(ripple => (
            <span
              key={ripple.key}
              className="absolute rounded-full bg-current opacity-0 pointer-events-none animate-ripple"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}
      </button>

      {/* 下拉菜单 - HeroUI 风格 + Ripple */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 min-w-full bg-background border border-border rounded-xl shadow-lg z-50 animate-in fade-in-0 slide-in-from-top-2 duration-150">
          {sortOptions.map((option) => {
            const isSelected = option.value === value;
            const OptionIcon = option.Icon;

            return (
              <button
                key={option.value}
                onClick={(e) => {
                  createRipple(e, Date.now(), option.value);
                  setTimeout(() => handleSelect(option.value), 150);
                }}
                className={`relative w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-all duration-150 active:scale-[0.98] ${isSelected
                  ? 'bg-primary-gradient text-white font-medium'
                  : 'hover:bg-muted/50 text-foreground'
                  }`}
              >
                <OptionIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                <span className="flex-1 truncate">{option.label}</span>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />
                )}

                {/* Ripple 波纹 */}
                {ripples
                  .filter(r => r.target === option.value)
                  .map(ripple => (
                    <span
                      key={ripple.key}
                      className="absolute rounded-full bg-current opacity-0 pointer-events-none animate-ripple"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                      }}
                    />
                  ))}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
