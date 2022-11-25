import { BreakpointsOptions, createTheme } from '@mui/material/styles';

export default createTheme({
  typography: {
    htmlFontSize: 16,
    fontFamily: ['Poppins'].join(','),
  },
  breakpoints: {
    xs: 0,
    sm: 360,
    md: 768,
    lg: 1280,
    xl: 1920,
  } as BreakpointsOptions,
  palette: {
    primary: {
      main: '#03a9f4',
      contrastText: '#37474f',
    },
    secondary: {
      main: '#37474f',
    },
    text: {
      primary: '#37474f',
    },
  },
});
