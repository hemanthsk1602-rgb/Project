/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/services/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // NEXUS Semantic & Base Colors
        nexus: {
          light: {
            bg: '#F7F8FA',
            card: '#FFFFFF',
            border: '#E5E7EB',
            text: '#111827',
            secondary: '#6B7280',
            primary: '#2563EB',
            primaryHover: '#1D4ED8',
            ai: '#7C3AED',
            success: '#16A34A',
            warning: '#D97706',
            danger: '#DC2626',
          },
          dark: {
            bg: '#0B0F19',
            card: '#111827',
            border: '#1F2937',
            text: '#F9FAFB',
            secondary: '#9CA3AF',
            primary: '#3B82F6',
            ai: '#8B5CF6',
          },
        },
        // Dedicated Module Colors (Section 8)
        module: {
          study: {
            DEFAULT: '#2563EB',
            light: '#EFF6FF',
            dark: '#1D4ED8',
            border: '#BFDBFE',
          },
          fitness: {
            DEFAULT: '#16A34A',
            light: '#F0FDF4',
            dark: '#15803D',
            border: '#BBF7D0',
          },
          finance: {
            DEFAULT: '#059669',
            light: '#ECFDF5',
            dark: '#047857',
            border: '#A7F3D0',
          },
          productivity: {
            DEFAULT: '#D97706',
            light: '#FFFBEB',
            dark: '#B45309',
            border: '#FDE68A',
          },
          skillforge: {
            DEFAULT: '#4F46E5',
            light: '#EEF2FF',
            dark: '#4338CA',
            border: '#C7D2FE',
          },
          navigate: {
            DEFAULT: '#0891B2',
            light: '#ECFEFF',
            dark: '#0E7490',
            border: '#A5F3FC',
          },
          ai: {
            DEFAULT: '#7C3AED',
            light: '#F5F3FF',
            dark: '#6D28D9',
            glow: '#8B5CF6',
            border: '#DDD6FE',
          },
        },
      },
      fontFamily: {
        heading: ['var(--font-plus-jakarta)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      borderRadius: {
        sm: '8px',
        btn: '10px',
        card: '16px',
        'card-lg': '20px',
        pill: '9999px',
      },
      boxShadow: {
        'subtle-sm': '0 1px 3px rgba(15, 23, 42, 0.05)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'card-dark': '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 20px 40px -10px rgba(37, 99, 235, 0.1)',
        'card-hover-dark': '0 20px 40px -10px rgba(59, 130, 246, 0.2)',
        'ai-glow': '0 0 35px -5px rgba(124, 58, 237, 0.35)',
        'ai-glow-lg': '0 0 60px -5px rgba(124, 58, 237, 0.45)',
      },
      animation: {
        'orb-rotate': 'orbRotate 20s linear infinite',
        'orb-pulse': 'orbPulse 4s ease-in-out infinite',
        'orb-glow': 'orbGlow 3s ease-in-out infinite alternate',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        orbRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        orbPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        orbGlow: {
          '0%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(124, 58, 237, 0.4))' },
          '100%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.7))' },
        },
      },
    },
  },
  plugins: [],
};
