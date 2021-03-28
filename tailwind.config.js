// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      ...colors,
      transparent: 'transparent'
    },
    boxShadow: {
      image: '0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)'
    },
    extend: {
      keyframes: {
        'bounce-opacity': {
          '0%, 100%': {
            transform: 'translateY(-100%)',
            opacity: 0.5,
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            opacity: 1,
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        }
      },
      animation: {
        'bounce-opacity': 'bounce-opacity 1s infinite'
      }
    }
  },
  variants: {
    extend: {
      inset: ['hover', 'responsive']
    }
  },
  plugins: [],
  important: true,
  future: {
    removeDeprecatedGapUtilities: true,
    defaultLineHeights: true,
    standardFontWeights: true,
    purgeLayersByDefault: true
  }
}
