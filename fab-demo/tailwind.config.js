/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx,html}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // shadcn/ui 基础颜色系统 (来源: shadcn/ui 默认配置)
        border: "rgba(var(--border), <alpha-value>)", // 边框色
        input: "rgba(var(--input), <alpha-value>)", // 输入框边框色
        ring: "rgba(var(--ring), <alpha-value>)", // 聚焦环颜色
        background: "rgba(var(--background), <alpha-value>)", // 页面背景色
        foreground: "rgba(var(--foreground), <alpha-value>)", // 前景文字色
        
        // shadcn/ui 主要颜色
        primary: {
          DEFAULT: "rgba(var(--primary), <alpha-value>)", // 主色调
          foreground: "rgba(var(--primary-foreground), <alpha-value>)", // 主色调上的文字色
        },
        
        // shadcn/ui 次要颜色
        secondary: {
          DEFAULT: "rgba(var(--secondary), <alpha-value>)", // 次要色
          foreground: "rgba(var(--secondary-foreground), <alpha-value>)", // 次要色上的文字色
        },
        
        // shadcn/ui 危险/删除颜色
        destructive: {
          DEFAULT: "rgba(var(--destructive), <alpha-value>)", // 危险操作色
          foreground: "rgba(var(--destructive-foreground), <alpha-value>)", // 危险操作文字色
        },
        
        // shadcn/ui 弱化颜色
        muted: {
          DEFAULT: "rgba(var(--muted), <alpha-value>)", // 弱化背景色
          foreground: "rgba(var(--muted-foreground), <alpha-value>)", // 弱化文字色
        },
        
        // shadcn/ui 强调颜色
        accent: {
          DEFAULT: "rgba(var(--accent), <alpha-value>)", // 强调色
          foreground: "rgba(var(--accent-foreground), <alpha-value>)", // 强调色上的文字色
        },
        
        // shadcn/ui 弹出层颜色
        popover: {
          DEFAULT: "rgba(var(--popover), <alpha-value>)", // 弹出层背景色
          foreground: "rgba(var(--popover-foreground), <alpha-value>)", // 弹出层文字色
        },
        
        // shadcn/ui 卡片颜色
        card: {
          DEFAULT: "rgba(var(--card), <alpha-value>)", // 卡片背景色
          foreground: "rgba(var(--card-foreground), <alpha-value>)", // 卡片文字色
        },
        // Gemini Tokens - Colors
        'primary-500': 'var(--color-primary-500)',
        'primary-400': 'var(--color-primary-400)',
        'primary-300': 'var(--color-primary-300)',
        'primary-200': 'var(--color-primary-200)',
        'secondary-500': 'var(--color-secondary-500)',
        'secondary-aux': 'var(--color-secondary-aux)',
        'secondary-bg': 'var(--color-secondary-bg)',
        'accent-500': 'var(--color-accent-500)',
        'background-50': 'var(--color-background-50)',
        'background-100': 'var(--color-background-100)',
        'background-sub': 'var(--color-background-sub)',
        'success-500': 'var(--color-success-500)',
        'warning-500': 'var(--color-warning-500)',
      },
      spacing: {
        'space-1': 'var(--space-1)',
        'space-2': 'var(--space-2)',
        'space-3': 'var(--space-3)',
        'space-4': 'var(--space-4)',
        'space-5': 'var(--space-5)',
        'space-6': 'var(--space-6)',
        'space-7': 'var(--space-7)',
        'space-8': 'var(--space-8)',
        'space-9': 'var(--space-9)',
      },
      fontFamily: {
        sans: ['"D-DIN Exp"', '"DM Sans"', 'Arial', '"Microsoft YaHei"', 'sans-serif'],
        primary: ['"D-DIN Exp"', '"DM Sans"', 'Arial', 'sans-serif'],
        gemini: ['var(--font-family-gemini)'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '18px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['24px', { lineHeight: '32px' }],
        '2xl': ['40px', { lineHeight: '48px' }],
        '3xl': ['48px', { lineHeight: '54px' }],
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        full: '9999px',
        // Gemini Tokens
        'gemini-md': 'var(--radius-md-gemini)',
        'gemini-lg': 'var(--radius-lg-gemini)',
        'gemini-full': 'var(--radius-full-gemini)',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        // Gemini Tokens
        'gemini-sm': 'var(--shadow-sm-gemini)',
        'gemini-md': 'var(--shadow-md-gemini)',
        'gemini-lg': 'var(--shadow-lg-gemini)',
        'selected': 'var(--shadow-selected-gemini)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, rgb(97, 40, 255), rgb(80, 30, 220))',
      },
    },
  },
  plugins: [],
}
