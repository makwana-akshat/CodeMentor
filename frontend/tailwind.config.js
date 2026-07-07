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
        background: '#0D1117',
        sidebar: '#161B22',
        cards: '#21262D',
        accent: '#10A37F',
        border: '#30363D',
        'primary-text': '#F0F6FC',
        'secondary-text': '#8B949E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
