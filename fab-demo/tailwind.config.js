/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx,html}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* --------------------------------------------------------------------------
           Shadcn UI 基础映射
           -------------------------------------------------------------------------- */
        border: "rgba(var(--border), <alpha-value>)", 
        input: "rgba(var(--input), <alpha-value>)", 
        ring: "rgba(var(--ring), <alpha-value>)", 
        background: "rgba(var(--background), <alpha-value>)", 
        foreground: "rgba(var(--foreground), <alpha-value>)", 
        
        primary: {
          DEFAULT: "rgba(var(--primary), <alpha-value>)", 
          foreground: "rgba(var(--primary-foreground), <alpha-value>)", 
        },
        secondary: {
          DEFAULT: "rgba(var(--secondary), <alpha-value>)", 
          foreground: "rgba(var(--secondary-foreground), <alpha-value>)", 
        },
        destructive: {
          DEFAULT: "rgba(var(--destructive), <alpha-value>)", 
          foreground: "rgba(var(--destructive-foreground), <alpha-value>)", 
        },
        muted: {
          DEFAULT: "rgba(var(--muted), <alpha-value>)", 
          foreground: "rgba(var(--muted-foreground), <alpha-value>)", 
        },
        accent: {
          DEFAULT: "rgba(var(--accent), <alpha-value>)", 
          foreground: "rgba(var(--accent-foreground), <alpha-value>)", 
        },
        popover: {
          DEFAULT: "rgba(var(--popover), <alpha-value>)", 
          foreground: "rgba(var(--popover-foreground), <alpha-value>)", 
        },
        card: {
          DEFAULT: "rgba(var(--card), <alpha-value>)", 
          foreground: "rgba(var(--card-foreground), <alpha-value>)", 
        },

        /* --------------------------------------------------------------------------
           Gemini 扩展颜色系统映射
           -------------------------------------------------------------------------- */
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
        /* --------------------------------------------------------------------------
           Gemini 间距系统
           -------------------------------------------------------------------------- */
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
        /* --------------------------------------------------------------------------
           字体配置
           -------------------------------------------------------------------------- */
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
        /* --------------------------------------------------------------------------
           圆角配置
           -------------------------------------------------------------------------- */
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        
        // Gemini Tokens
        'gemini-md': 'var(--radius-md-gemini)',
        'gemini-lg': 'var(--radius-lg-gemini)',
        'gemini-full': 'var(--radius-full-gemini)',
      },
      boxShadow: {
        /* --------------------------------------------------------------------------
           阴影配置
           -------------------------------------------------------------------------- */
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}