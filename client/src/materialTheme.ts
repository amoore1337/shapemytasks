import { createMuiTheme } from '@material-ui/core/styles';
import { colors, typography, breakpoints } from './constants';

export default createMuiTheme({
  typography: {
    htmlFontSize: typography.htmlFontSize,
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
