/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
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
          50: '#F7FEE7',
          100: '#ECFCCB',
          200: '#D9F99D',
          300: '#BEF264',
          400: '#A3E635',
          500: '#10B981',
          600: '#059669',
          neon: '#D5FF3E',
          neonHover: '#c4f035',
          cyan: '#06B6D4',
          orange: '#FF7A00',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px -3px rgba(213, 255, 62, 0.3)' },
          '100%': { boxShadow: '0 0 25px 2px rgba(213, 255, 62, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
