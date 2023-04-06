/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minHeight: (theme) => ({
      ...theme('spacing'),
    }),

    keyframes: {
      'pulse-fade': {
        '0%': { transform: 'scale(1)', opacity: '1' },
        '100%': { transform: 'scale(1.3)', opacity: '0'},
      },
    },

    animation: {
      'pulse-fade': 'pulse-fade infinite 1.5s'
    },

    colors: {
      "primary-coolor": "var(--primary-color)",
      "secondary-coolor": "var(--secondary-color)"
    },

    gridTemplateColumns: {
      'analysis-grid': 'min-content 200px',
    },
    gridTemplateRows: {
      'analysis-grid': '1fr 1fr 1fr',
    },


    },
  },
  plugins: [],
}
