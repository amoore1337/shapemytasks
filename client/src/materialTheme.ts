import { createMuiTheme } from '@material-ui/core/styles';
import { colors, typography, breakpoints } from '../constants';

export default createMuiTheme({
  typography: {
    htmlFontSize: typography.htmlFontSize,
  },
  breakpoints: breakpoints as Partial<{}>,
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
});
