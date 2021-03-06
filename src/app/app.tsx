import { FC } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { ptBR } from 'date-fns/locale';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import { GlobalStyles } from 'styles';
import { materialUiTheme } from 'styles/theme/material-ui';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AppProvider } from 'hooks';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  CssBaseline,
  StyledEngineProvider,
} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Interceptors } from 'components/Interceptors';
import { AcceptCookies } from 'components/AcceptCookies';
import { Routes } from './routes';

const App: FC = () => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <StyledEngineProvider injectFirst>
        <ThemeProviderStyledComponents theme={materialUiTheme}>
          <GlobalStyles />
          <CssBaseline />
          <AppProvider>
            <Interceptors />

            <BrowserRouter>
              <Switch>
                <Routes />
              </Switch>
              <AcceptCookies />
            </BrowserRouter>
          </AppProvider>
        </ThemeProviderStyledComponents>
      </StyledEngineProvider>
    </LocalizationProvider>
  </ThemeProviderMaterialUi>
);

export { App };
