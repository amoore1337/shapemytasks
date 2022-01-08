import { createTheme } from '@mui/material/styles';

import { colors, typography, breakpoints } from './constants';

export default createTheme({
  typography: {
    htmlFontSize: typography.htmlFontSize,
    fontFamily: ['Poppins'].join(','),
  },
  breakpoints: breakpoints as Partial<{}>,
  palette: {
    primary: {
      main: colors.primary,
      contrastText: colors.gray['800'],
    },
    secondary: {
      main: colors.secondary,
    },
    text: {
      primary: colors.gray['800'],
    },
  },
});
