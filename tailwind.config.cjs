const defaultTheme = require('tailwindcss/defaultTheme')
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

    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },

    keyframes: {
      'pulse-fade-grow': {
        '0%': { transform: 'scale(1)', opacity: '1' },
        '100%': { transform: 'scale(1.4)', opacity: '0'},
      },
    },

    animation: {
      'pulse-fade-grow': 'pulse-fade-grow infinite 1.5s',
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
