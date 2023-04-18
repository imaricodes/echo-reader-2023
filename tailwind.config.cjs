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

      minWidth: {
        '1/2': '50%',
      },

      maxWidth: {
        '1/2': '50%',
      },
      

    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    //animation for recording mic
    keyframes: {
      'pulse-fade-grow': {
        '0%': { transform: 'scale(1)', opacity: '1' },
        '100%': { transform: 'scale(1.4)', opacity: '0'},
      },

      //dot-elastic keyframes
      'dot-elastic-before': {
        '0%': {
          transform: 'scale(1,1)'
        },
        '25%': {
          transform: 'scale(1,1.5)'
        },
        '50%': {
          transform: 'scale(1,0.67)'
        },
        '75%': {
          transform: 'scale(1,1)'
        },
        '100%': {
          transform: 'scale(1,1)'
        }
      },

      'dot-elastic': {
        '0%': {
          transform: 'scale(1,1)'
        },
        '25%': {
          transform: 'scale(1,1)'
        },
        '50%': {
          transform: 'scale(1,1.5)'
        },
        '75%': {
          transform: 'scale(1,1)'
        },
        '100%': {
          transform: 'scale(1,1)'
        }
      },

      'dot-elastic-after': {
        '0%': {
          transform: 'scale(1,1)'
        },
        '25%': {
          transform: 'scale(1,1)'
        },
        '50%': {
          transform: 'scale(1,0.67)'
        },
        '75%': {
          transform: 'scale(1,1.5)'
        },
        '100%': {
          transform: 'scale(1,1)'
        }
      },
      'dot-elastic-fade-in': {
        '0%': {opacity: '0'},
        '100%': {opacity: '1'},
      },

      //menu animation keyframes
      'menu-slide-in': {
        '0%': {transform: 'translateX(-100%)'},
        '100%': {transform: 'translateX(0)'},
      },
      'menu-slide-out': {
        '0%': {transform: 'translateX(0)'},
        '100%': {transform: 'translateX(-100%)'},
      },
    },

    animation: {
      'pulse-fade-grow': 'pulse-fade-grow infinite 1.5s',

      //dot-elastic animations
      'dot-elatsic-center': 'dot-elastic 1s infinite linear',
      'dot-elastic-before': 'dot-elastic-before 1s infinite linear',
      'dot-elastic-after': 'dot-elastic-after 1s infinite linear',
      'dot-elastic-fade-in': 'dot-elastic-fade-in 2s ease',
      'menu-slide-in': 'menu-slide-in 0.5s ease',
      'menu-slide-out': 'menu-slide-out 0.5s ease',
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
