import { createTheme } from '@mui/material';
import { ptBR } from '@mui/material/locale';

const materialUiTheme = createTheme(
  {
    typography: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
      // H1 - Large header 20px
      h1: {
        fontSize: '1.25rem',
        fontWeight: 500,
        lineHeight: '25px',
      },
      // H2 - Medium header 18px
      h2: {
        fontSize: '1.125rem',
        fontWeight: 500,
        lineHeight: '21.6px',
      },
      // H3 - Regular header 16px
      h3: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: '19.2px',
      },
      // H4 - Small header 14px
      h4: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: '16.8px',
      },
      // P1 - Large paragraph 16px
      h5: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '19.2px',
      },
      // P2 - Medium paragraph 14px
      h6: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '16.8px',
      },
      // P3 - Regular paragraph 14px
      body1: {
        fontSize: '0.875rem',
        fontWeight: 300,
        lineHeight: '16.8px',
      },
      // P4 - Small paragraph 12px
      body2: {
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: '14.4px',
      },
      // B1 - Regular button/link 16px
      button: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: '19.2px',
      },
    },
    palette: {
      primary: {
        main: '#005B9E',
        dark: '#032d4b',
        light: '#00A6D8',
        contrastText: '#FFFF',
      },
      secondary: {
        main: '#4A5970',
        light: '#ED1C24',
        dark: '#0B3A7A',
        contrastText: '#E3F6FD',
      },
      error: {
        main: '#D81616',
      },
      success: {
        main: '#08803A',
      },
      warning: {
        main: '#F2C94C',
      },
      grey: {
        '50': '#C4C4C4',
        '100': '#848484',
        '200': '#646464',
        '300': '#4F4F4F',
        '400': '#3D3D3D',
        '500': '#848484',
      },
    },
  },
  ptBR,
);

export { materialUiTheme };
