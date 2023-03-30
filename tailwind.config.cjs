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
      pulse: {
        '0%': { transform: 'scale(0.95)' },
        '50%': { transform: 'scale(1.0)' },
        '100%': { transform: 'scale(0.95)' },
      },
    },

    colors: {
      "primary-coolor": "var(--primary-color)",
      "secondary-coolor": "var(--secondary-color)"
    },

    },
  },
  plugins: [],
}
