/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d9ff',
          300: '#a4c3ff',
          400: '#7fa3ff',
          500: '#6a82f6',
          600: '#5861e6',
          700: '#4849d1',
          800: '#3c3ba9',
          900: '#333186',
          950: '#1f1f4d',
        },
      },
      backgroundColor: {
        dark: '#2F2F2F',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
