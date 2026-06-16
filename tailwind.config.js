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
        },
        accent: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea6c0b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
