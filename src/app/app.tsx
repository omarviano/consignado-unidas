import { FC } from 'react';

import { ptBR } from 'date-fns/locale';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import { GlobalStyles } from 'styles';
import { materialUiTheme } from 'styles/theme/material-ui';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { AppProvider } from 'hooks';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  CssBaseline,
  StyledEngineProvider,
} from '@material-ui/core';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { Interceptors } from 'components/Interceptors';
import { Routes } from './routes';

const App: FC = () => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <StyledEngineProvider injectFirst>
        <ThemeProviderStyledComponents theme={materialUiTheme}>
          <GlobalStyles />
          <CssBaseline />
          <AppProvider>
            <Routes />
            <Interceptors />
          </AppProvider>
        </ThemeProviderStyledComponents>
      </StyledEngineProvider>
    </LocalizationProvider>
  </ThemeProviderMaterialUi>
);

export { App };
