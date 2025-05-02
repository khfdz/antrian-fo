/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        biru1: "#4E73DE",
        hijau1: "#1CCB8C",
      },
      animation: {
        'pulse-slow': 'pulse 2s infinite',
        'slide-fade': 'slideFade 2s ease-in-out infinte' 
      },
      keyframes: {
        slideFade: {
          '0%, 100%': { transform: 'translateY(0)', opacity: 1 },
          '50%': { transform: 'translateY(-8px)', opacity: 0.7 },
        }
      }
    },
  },
  plugins: [],
}