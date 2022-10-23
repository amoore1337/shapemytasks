// const constants = require('./src/constants.cjs');

// const formattedBreakpoints = {};
// const breakpointEntries = Object.entries(constants.breakpoints);
// // eslint-disable-next-line no-restricted-syntax
// for (const [key, value] of breakpointEntries) {
//   formattedBreakpoints[key] = `${value}px`;
// }

module.exports = {
  // content: ['**/**/*'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ['Poppins'],
    },
    screens: {
      xs: '0px',
      sm: '360px',
      md: '768px',
      lg: '1280px',
      xl: '1920px',
    },
    extend: {
      colors: {
        primary: '#03a9f4',
        secondary: '#37474f',
        danger: '#d32f2f',

        gray: {
          50: '#eceff1',
          100: '#cfd8dc',
          200: '#b0bec5',
          300: '#90a4ae',
          400: '#78909c',
          500: '#607d8b',
          600: '#546e7a',
          700: '#455a64',
          800: '#37474f',
          900: '#263238',
        },

        blue: {
          50: '#e1f5fe',
          100: '#b3e5fc',
          200: '#81d4fa',
          300: '#4fc3f7',
          400: '#29b6f6',
          500: '#03a9f4',
          600: '#039be5',
          700: '#0288d1',
          800: '#0277bd',
          900: '#01579b',
        },

        green: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
      cursor: ['disabled'],
    },
  },
  plugins: [
    flexFreeze,
  ],
  important: true,
};

function flexFreeze({ addComponents }) {
  addComponents({
    '.flex-freeze': { flex: '0 0 auto' },
  });
}
