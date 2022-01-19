import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { BrowserRouter, Switch } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';

import { api } from 'services/api';

import ChangePassword from 'pages/ChangePassword';
import { AppProvider } from 'hooks';

const Providers = ({ children }) => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <StyledEngineProvider injectFirst>
      <ThemeProviderStyledComponents theme={materialUiTheme}>
        <AppProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </AppProvider>
      </ThemeProviderStyledComponents>
    </StyledEngineProvider>
  </ThemeProviderMaterialUi>
);

describe('Page <ChangePassword />', () => {
  /* test('should be able to render inputs', async () => {
    jest.mock('hooks/auth', () => ({
      useAuth: () => ({
        isAuthenticated: false,
      }),
    }));

    const { container } = render(
      <Providers>
        <ChangePassword />
      </Providers>,
    );

    screen.debug(container, 300000);

    await waitFor(() => {
      expect(screen.queryByTestId('form')).toBeDefined();
      expect(screen.queryByTestId('passwordConfirmation')).toBeDefined();
    });
  });

  test('should be able to show error messages', async () => {
    const { container, getByTestId } = render(
      <Providers>
        <ChangePassword />
      </Providers>,
    );

    const form = getByTestId('form');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(container.querySelector('#password-error')).toBeDefined();
    });
  }); */
});
