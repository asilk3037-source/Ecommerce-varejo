/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#e8f0f9',
          100: '#c5d8f0',
          200: '#9fbde6',
          300: '#79a2dc',
          400: '#5d8ed5',
          500: '#4179cd',
          600: '#3a6ec4',
          700: '#3061bc',
          800: '#2653b3',
          900: '#0f2744',
          950: '#080f1e',
        },
        accent: {
          300: '#fdb97e',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea6c0b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceOnce: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.25)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.25s ease-out',
        'bounce-once': 'bounceOnce 0.4s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'ticker': 'ticker 20s linear infinite',
      },
    },
  },
  plugins: [],
}
