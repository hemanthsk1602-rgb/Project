/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8FAFC',
          subtle: '#F1F5F9',
        },
        foreground: {
          DEFAULT: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
        },
        border: {
          DEFAULT: '#E2E8F0',
          hover: '#CBD5E1',
        },
        accent: {
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          'blue-light': '#EFF6FF',
          purple: '#7C3AED',
          'purple-hover': '#6D28D9',
          'purple-light': '#F5F3FF',
        },
        dark: {
          950: '#06090E',
          900: '#0A0E17',
          850: '#0F1523',
          800: '#141D2E',
          750: '#1A253A',
          700: '#212E47',
          600: '#334155',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
        },
        brand: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        btn: '10px',
        card: '16px',
        'card-lg': '18px',
      },
      boxShadow: {
        'subtle-sm': '0 1px 3px rgba(15, 23, 42, 0.05)',
        'card': '0 8px 30px -4px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 14px 35px -4px rgba(37, 99, 235, 0.08)',
        'card-glow': '0 0 45px -10px rgba(37, 99, 235, 0.12)',
        'button-primary': '0 4px 14px 0 rgba(37, 99, 235, 0.25)',
        'button-primary-hover': '0 6px 20px rgba(37, 99, 235, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cursor-blink': 'blink 1s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

