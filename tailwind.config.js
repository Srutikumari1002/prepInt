/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60a5fa',
          DEFAULT: '#3b82f6',
          dark: '#1d4ed8',
        },
        secondary: {
          light: '#c084fc',
          DEFAULT: '#a855f7',
          dark: '#7e22ce',
        },
        success: {
          light: '#4ade80',
          DEFAULT: '#22c55e',
          dark: '#16a34a',
        },
        darkBg: '#111827',
        darkCard: '#1f2937',
        darkBorder: '#374151',
      },
    },
  },
  plugins: [],
}
