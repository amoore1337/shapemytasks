const constants = require('./src/constants.js');

const formattedBreakpoints = {};
const breakpointEntries = Object.entries(constants.breakpoints);
// eslint-disable-next-line no-restricted-syntax
for (const [key, value] of breakpointEntries) {
  formattedBreakpoints[key] = `${value}px`;
}

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: formattedBreakpoints,
    extend: {
      colors: constants.colors,
    },
  },
  variants: {
    extend: {},
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
