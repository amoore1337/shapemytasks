import type { BreakpointsOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
  }
}

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
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            backgroundColor: '#03a9f4!important',
            color: 'white',
            ':hover': {
              backgroundColor: '#0288d1!important',
            },
            ':disabled': {
              backgroundColor: '#b0bec5!important',
              color: 'white',
            },
          },
        },
      ],
    },
  },
});
