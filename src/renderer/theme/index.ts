/** @format */

/** @format */

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#CADB2D',
    },
    secondary: {
      main: '#21E8E4',
    },
    info: { main: '#66C8FF' },
    yellow_green: {
      50: '#FAFBEA',
      100: '#EEF4BD',
      200: '#E6EE9D',
      300: '#DBE671',
      400: '#D4E155',
      500: '#C9DA2B',
      600: '#B7C627',
      700: '#8F9B1F',
      800: '#6F7818',
      900: '#545C12',
    },
    aqua: {
      50: '#E9FDFC',
      100: '#BAF8F7',
      200: '#99F4F3',
      300: '#6AF0ED',
      400: '#4DEDE9',
      500: '#21E8E4',
      600: '#1ED3CF',
      700: '#17A5A2',
      800: '#12807D',
      900: '#0E6160',
    },
    black: {
      main: '#000000',
      50: '#BDBEC7',
      100: 'rgba(75, 76, 90, 0.3)',
      200: '#4B4C5A',
      300: '#2F2F3D',
      400: '#39374C',
      500: '#848689',
    },
    white: {
      main: '#FFFFFF',
      50: '#D9D9D9',
      100: '#EEEFF2',
      200: '#F1F5FB',
      300: '#FAFDFF',
      400: '#EEF0FA',
    },
    purple: { main: '#8676FF' },
    bluebird: { main: '#66C8FF' },
    orange: { main: '#FF9066' },
    linear: {
      orange: 'linear-gradient(90deg, #FAFA60 0%, #FE0600 100%)',
      purple: 'linear-gradient(90deg, #A200FF 0%, #FD40E0 97.43%)',
      lagoon: 'linear-gradient(90deg, #21E8E4 0%, #12807D 100%)',
      red: 'linear-gradient(90deg, #F9444F 0%, #F73087 100%)',
      green: 'linear-gradient(90deg, #B7C627 0.19%, #DBE671 99.83%)',
      blue_purple: 'linear-gradient(90deg, #02A4FF 0%, #7D40FF 100%)',
      blue_green:
        'linear-gradient(90deg, #4DA1FF 0%, #4DFFDF 103.26%, rgba(217, 217, 217, 0.00) 103.27%)',
    },
  },
  typography: {
    fontFamily: 'Inter',
    subtitle2: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: 500,
    },
    button: {
      fontSize: '14px',
      lineHeight: '17px',
      fontWeight: 600,
    },
    body2: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
    },
    caption: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 500,
    },
    overline: {
      fontSize: '10px',
      lineHeight: '16px',
      fontWeight: 700,
    },
    paragraph: {
      fontSize: '16px',
      lineHeight: '19px',
      fontWeight: 400,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
});

// custom for typography
theme.typography = {
  ...theme.typography,
  fontFamily: 'Inter',
  h1: {
    fontSize: '65px',
    lineHeight: '79px',
    fontWeight: 800,
    color: '#2F2F3D',

    [theme.breakpoints.down('sm')]: {
      fontSize: '45px',
      lineHeight: '55px',
      fontWeight: 700,
      color: '#2F2F3D',
    },
  },
  h2: {
    fontSize: '55px',
    lineHeight: '67px',
    fontWeight: 800,
    color: '#2F2F3D',

    [theme.breakpoints.down('sm')]: {
      fontSize: '35px',
      lineHeight: '43px',
      fontWeight: 700,
      color: '#2F2F3D',
    },
  },
  h3: {
    fontSize: '45px',
    lineHeight: '55px',
    fontWeight: 700,
    color: '#2F2F3D',

    [theme.breakpoints.down('sm')]: {
      fontSize: '25px',
      lineHeight: '30px',
      color: '#2F2F3D',
    },
  },
  h4: {
    fontSize: '35px',
    lineHeight: '43px',
    fontWeight: 500,
    color: '#2F2F3D',

    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '22px',
      color: '#2F2F3D',
    },
  },
  h5: {
    fontSize: '26px',
    lineHeight: '32px',
    fontWeight: 500,
    color: '#2F2F3D',

    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      lineHeight: '19px',
    },
  },
};

theme.components = {
  ...theme.components,
  MuiButton: {
    variants: [
      {
        props: { variant: 'action' },
        style: {
          borderRadius: '10px',
          backgroundColor: theme.palette.black[50],
          height: '22px',
          padding: '4px 14px',
          fontSize: '10px',
          fontWeight: 700,
          color: theme.palette.black[300],
          textTransform: 'uppercase',

          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          },

          '&:disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'all !important',
            backgroundColor: theme.palette.black[50],
          },
        },
      },

      {
        props: { variant: 'contained' },
        style: {
          textTransform: 'capitalize',
          fontWeight: '500',
          color: ' #2F2F3D',
          borderRadius: '10px',
        },
      },
    ],
  },
};

// theme.typography = {
//   ...theme.typography,

// };

export default theme;
