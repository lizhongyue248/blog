module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
    extend: {}
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
