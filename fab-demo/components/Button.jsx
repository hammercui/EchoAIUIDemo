import React, { forwardRef, useState } from 'react';

/**
 * Button 组件 - HeroUI 风格
 *
 * 基于 HeroUI 设计规范封装的按钮组件
 *
 * Props:
 * @param {ReactNode} children - 按钮内容
 * @param {'solid' | 'bordered' | 'light' | 'flat' | 'ghost'} variant - 按钮变体
 * @param {'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'} color - 按钮颜色
 * @param {'sm' | 'md' | 'lg'} size - 按钮尺寸
 * @param {'none' | 'sm' | 'md' | 'lg' | 'full'} radius - 圆角大小
 * @param {ReactNode} startContent - 左侧内容（图标）
 * @param {ReactNode} endContent - 右侧内容（图标）
 * @param {boolean} isIconOnly - 仅图标模式
 * @param {boolean} isDisabled - 禁用状态
 * @param {boolean} isLoading - 加载状态
 * @param {boolean} disableRipple - 禁用波纹效果
 * @param {boolean} fullWidth - 全宽
 * @param {string} className - 自定义类名
 * @param {Function} onClick - 点击事件
 */

const Button = forwardRef(({
  children,
  variant = 'solid',
  color = 'default',
  size = 'md',
  radius = 'md',
  startContent,
  endContent,
  isIconOnly = false,
  isDisabled = false,
  isLoading = false,
  disableRipple = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}, ref) => {

  // Ripple 波纹状态
  const [ripples, setRipples] = useState([]);

  // 基础样式
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer border-0 outline-none select-none';

  // 尺寸样式
  const sizeStyles = {
    sm: isIconOnly ? 'w-7 h-7 min-w-7' : 'h-7 px-3 text-xs gap-1.5',
    md: isIconOnly ? 'w-10 h-10 min-w-10' : 'h-10 px-4 text-sm gap-2',
    lg: isIconOnly ? 'w-12 h-12 min-w-12' : 'h-12 px-6 text-base gap-2.5'
  };

  // 圆角样式
  const radiusStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full'
  };

  // 颜色和变体组合样式
  const getVariantStyles = () => {
    const styles = {
      // Solid 变体
      solid: {
        default: 'bg-foreground text-background hover:bg-foreground/90 active:scale-[0.97]',
        primary: 'bg-primary-gradient text-white shadow-sm hover:shadow-md active:scale-[0.97]',
        secondary: 'bg-secondary text-white hover:bg-secondary/90 active:scale-[0.97]',
        success: 'bg-green-500 text-white hover:bg-green-600 active:scale-[0.97]',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600 active:scale-[0.97]',
        danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-[0.97]'
      },
      // Bordered 变体
      bordered: {
        default: 'bg-transparent border border-border text-foreground hover:bg-muted active:scale-[0.97]',
        primary: 'bg-transparent border border-accent text-accent hover:bg-accent/10 active:scale-[0.97]',
        secondary: 'bg-transparent border border-secondary text-secondary hover:bg-secondary/10 active:scale-[0.97]',
        success: 'bg-transparent border border-green-500 text-green-600 hover:bg-green-50 active:scale-[0.97]',
        warning: 'bg-transparent border border-yellow-500 text-yellow-600 hover:bg-yellow-50 active:scale-[0.97]',
        danger: 'bg-transparent border border-red-500 text-red-600 hover:bg-red-50 active:scale-[0.97]'
      },
      // Light 变体
      light: {
        default: 'bg-transparent text-foreground hover:bg-muted active:scale-[0.97]',
        primary: 'bg-transparent text-ring hover:bg-ring/10 active:scale-[0.97]',
        secondary: 'bg-transparent text-secondary hover:bg-secondary/10 active:scale-[0.97]',
        success: 'bg-transparent text-green-600 hover:bg-green-50 active:scale-[0.97]',
        warning: 'bg-transparent text-yellow-600 hover:bg-yellow-50 active:scale-[0.97]',
        danger: 'bg-transparent text-red-600 hover:bg-red-50 active:scale-[0.97]'
      },
      // Flat 变体
      flat: {
        default: 'bg-muted text-foreground hover:bg-muted/70 active:scale-[0.97]',
        primary: 'bg-ring/10 text-ring hover:bg-ring/20 active:scale-[0.97]',
        secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20 active:scale-[0.97]',
        success: 'bg-green-50 text-green-600 hover:bg-green-100 active:scale-[0.97]',
        warning: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100 active:scale-[0.97]',
        danger: 'bg-red-50 text-red-600 hover:bg-red-100 active:scale-[0.97]'
      },
      // Ghost 变体
      ghost: {
        default: 'bg-transparent border border-border text-foreground hover:bg-foreground hover:text-background active:scale-[0.97]',
        primary: 'bg-transparent border border-ring text-ring hover:bg-primary-gradient hover:text-white hover:border-transparent active:scale-[0.97]',
        secondary: 'bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-white active:scale-[0.97]',
        success: 'bg-transparent border border-green-500 text-green-600 hover:bg-green-500 hover:text-white active:scale-[0.97]',
        warning: 'bg-transparent border border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white active:scale-[0.97]',
        danger: 'bg-transparent border border-red-500 text-red-600 hover:bg-red-500 hover:text-white active:scale-[0.97]'
      }
    };

    return styles[variant]?.[color] || styles.solid.default;
  };

  // Primary 颜色的渐变背景（仅 solid 变体）
  const getPrimaryGradient = () => {
    if (variant === 'solid' && color === 'primary') {
      return {};  // 使用 CSS 类 bg-primary-gradient
    }
    if (variant === 'ghost' && color === 'primary') {
      return {};  // 使用 CSS 类处理
    }
    return {};
  };

  // 禁用样式
  const disabledStyles = isDisabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  // 全宽样式
  const widthStyles = fullWidth ? 'w-full' : '';

  // 加载状态的 Spinner
  const Spinner = () => (
    <svg
      className="animate-spin"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  // 组合所有样式
  const combinedClassName = [
    baseStyles,
    sizeStyles[size],
    radiusStyles[radius],
    getVariantStyles(),
    disabledStyles,
    widthStyles,
    className
  ].filter(Boolean).join(' ');

  // 创建 Ripple 波纹
  const createRipple = (e) => {
    if (disableRipple || isDisabled || isLoading) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      key: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    // 600ms 后移除波纹
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.key !== newRipple.key));
    }, 600);
  };

  // 处理点击事件
  const handleClick = (e) => {
    if (isDisabled || isLoading) {
      e.preventDefault();
      return;
    }
    createRipple(e);
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type={type}
      className={`${combinedClassName} relative overflow-hidden`}
      style={getPrimaryGradient()}
      onClick={handleClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && <Spinner />}
      {!isLoading && startContent && <span className="inline-flex shrink-0">{startContent}</span>}
      {!isIconOnly && children && <span className="flex-1">{children}</span>}
      {isIconOnly && !isLoading && children}
      {!isLoading && endContent && <span className="inline-flex shrink-0">{endContent}</span>}

      {/* Ripple 波纹效果 */}
      {!disableRipple && ripples.map(ripple => (
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
});

Button.displayName = 'Button';

export default Button;

