import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  CssBaseline,
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';

import { api } from 'services/api';

import AccountConfirmation from 'pages/AccountConfirmation';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from 'hooks';

const Providers = ({ children }) => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <StyledEngineProvider injectFirst>
      <ThemeProviderStyledComponents theme={materialUiTheme}>
        <CssBaseline />
        <AppProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </AppProvider>
      </ThemeProviderStyledComponents>
    </StyledEngineProvider>
  </ThemeProviderMaterialUi>
);

describe('Page: <AccountConfirmation />', () => {
  test('should be able to render content', async () => {
    render(
      <Providers>
        <AccountConfirmation />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('title').textContent).toBe(
        'Agora falta pouco!Clique no botão abaixo para confirmar sua conta.',
      );
      expect(screen.getByTestId('confirmationButton')).toBeDefined();
    });
  });

  test('should be able to confirm account', async () => {
    const mock = new MockAdapter(api);
    mock.onPost('/auth/register/confirmation').reply(200);

    const location = {
      ...window.location,
      search: '?token=token123',
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: location,
    });

    render(
      <Providers>
        <AccountConfirmation />
      </Providers>,
    );

    fireEvent.click(screen.getByTestId('confirmationButton'));

    await waitFor(() => {
      expect(screen.getByTestId('modal-success')).toBeDefined();
      expect(mock.history.post[0].data).toBe(
        JSON.stringify({
          confirmationToken: 'token123',
        }),
      );
    });
  });

  test('should be able to show error message', async () => {
    const mock = new MockAdapter(api);
    mock.onPost('/auth/register/confirmation').reply(400, {
      message: 'Mensagem de erro da api.',
    });

    const location = {
      ...window.location,
      search: '?token=token123',
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: location,
    });

    render(
      <Providers>
        <AccountConfirmation />
      </Providers>,
    );

    fireEvent.click(screen.getByTestId('confirmationButton'));

    await waitFor(() => {
      expect(screen.getByTestId('error-message').textContent).toBe(
        'Mensagem de erro da api.',
      );
    });
  });
});
