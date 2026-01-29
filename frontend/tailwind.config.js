/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        softPink: '#FFF5F5',
        darkChocolate: '#2D2424',
        terracotta: '#D97757',
        dustyPink: '#E89F9F',
        sand: '#F4E4D4',
        stone: '#7D6E6E',
        border: '#EFE6E6',
        success: '#6B9080',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};