const constants = require('./src/constants.js');

const formattedBreakpoints = {};
const breakpointEntries = Object.entries(constants.breakpoints);
// eslint-disable-next-line no-restricted-syntax
for (const [key, value] of breakpointEntries) {
  formattedBreakpoints[key] = `${value}px`;
}

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ['Poppins'],
    },
    screens: formattedBreakpoints,
    extend: {
      colors: constants.colors,
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
