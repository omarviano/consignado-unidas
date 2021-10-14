import { FC } from 'react';

import { ptBR } from 'date-fns/locale';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import { GlobalStyles } from 'styles';
import { materialUiTheme } from 'styles/theme/material-ui';
import DateFnsUtils from '@date-io/date-fns';

import {
  ThemeProvider as ThemeProviderMaterialUi,
  CssBaseline,
  StylesProvider,
} from '@material-ui/core';
import { MuiPickersUtilsProvider as ThemeProviderPickers } from '@material-ui/pickers';
import { Routes } from './routes';

const App: FC = () => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <ThemeProviderPickers utils={DateFnsUtils} locale={ptBR}>
      <StylesProvider injectFirst>
        <ThemeProviderStyledComponents theme={materialUiTheme}>
          <GlobalStyles />
          <CssBaseline />
          <Routes />
        </ThemeProviderStyledComponents>
      </StylesProvider>
    </ThemeProviderPickers>
  </ThemeProviderMaterialUi>
);

export { App };
