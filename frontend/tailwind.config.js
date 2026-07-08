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
        background: 'var(--cm-bg-main)',
        sidebar: 'var(--cm-bg-sidebar)',
        cards: 'var(--cm-bg-cards)',
        accent: 'var(--cm-accent)',
        border: 'var(--cm-border)',
        'primary-text': 'var(--cm-primary-text)',
        'secondary-text': 'var(--cm-secondary-text)',
        surface: 'var(--cm-surface)',
        'surface-hover': 'var(--cm-surface-hover)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
