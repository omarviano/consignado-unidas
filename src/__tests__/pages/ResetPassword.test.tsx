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

import ResetPassword from 'pages/ResetPassword';
import { BrowserRouter } from 'react-router-dom';

const Providers = ({ children }) => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <StyledEngineProvider injectFirst>
      <ThemeProviderStyledComponents theme={materialUiTheme}>
        <CssBaseline />
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProviderStyledComponents>
    </StyledEngineProvider>
  </ThemeProviderMaterialUi>
);

describe('Page: <ResetPassword />', () => {
  test('should be able to render inputs', async () => {
    render(
      <Providers>
        <ResetPassword />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('password')).toBeDefined();
      expect(screen.getByTestId('passwordConfirmation')).toBeDefined();
    });
  });

  test('should be able to show error messages', async () => {
    const { container } = render(
      <Providers>
        <ResetPassword />
      </Providers>,
    );

    const form = screen.getByTestId('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(container.querySelector('#password-error')?.textContent).toBe(
        'Informe sua senha',
      );
      expect(
        container.querySelector('#passwordConfirmation-error')?.textContent,
      ).toBe('Confirme sua senha');
    });
  });

  test('should be able to show confirm your password', async () => {
    const { container } = render(
      <Providers>
        <ResetPassword />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock.onPost('auth/validate-password').reply(200);

    const form = screen.getByTestId('form');

    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: 'Aaaaaa11.' } });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(container.querySelector('#password-error')).toBe(null);
      expect(
        container.querySelector('#passwordConfirmation-error')?.textContent,
      ).toBe('Confirme sua senha');
    });
  });

  test('should be able to show inform your password', async () => {
    const { container } = render(
      <Providers>
        <ResetPassword />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock.onPost('auth/validate-password').reply(200);

    const form = screen.getByTestId('form');

    const passwordConfirmation = screen.getByTestId('passwordConfirmation');
    fireEvent.change(passwordConfirmation, { target: { value: 'Aaaaaa11.' } });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(container.querySelector('#password-error')?.textContent).toBe(
        'Informe sua senha',
      );
      expect(
        container.querySelector('#passwordConfirmation-error')?.textContent,
      ).toBe('As senhas devem ser iguais');
    });
  });

  test('should be able to show password does not meet minimum requirements', async () => {
    const { container } = render(
      <Providers>
        <ResetPassword />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock.onPost('auth/validate-password').reply(400);

    const form = screen.getByTestId('form');

    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: '123456789.' } });

    const passwordConfirmation = screen.getByTestId('passwordConfirmation');
    fireEvent.change(passwordConfirmation, { target: { value: '123456789.' } });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(container.querySelector('#password-error')?.textContent).toBe(
        'A senha não atende os requisitos mínimos',
      );
    });
  });

  test('should be able to show token not found', async () => {
    render(
      <Providers>
        <ResetPassword />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock.onPost('auth/validate-password').reply(200);

    const form = screen.getByTestId('form');

    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: '@A234567a' } });

    const passwordConfirmation = screen.getByTestId('passwordConfirmation');
    fireEvent.change(passwordConfirmation, { target: { value: '@A234567a' } });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByRole('presentation')).toBeDefined();
    });
  });

  test('should be able to show invalid data', async () => {
    const location = {
      ...window.location,
      search: '?token=token',
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: location,
    });

    render(
      <Providers>
        <ResetPassword />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock.onPost('auth/validate-password').reply(200);
    mock.onPost('auth/password-reset-token').reply(400);

    const form = screen.getByTestId('form');

    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: '@A234567a' } });

    const passwordConfirmation = screen.getByTestId('passwordConfirmation');
    fireEvent.change(passwordConfirmation, { target: { value: '@A234567a' } });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByRole('presentation')).toBeDefined();
    });
  });

  test('should be able to change password', async () => {
    const location = {
      ...window.location,
      search: '?token=token',
    };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: location,
    });

    render(
      <Providers>
        <ResetPassword />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock.onPost('auth/validate-password').reply(200);
    mock.onPost('auth/password-reset-token').reply(200);

    const form = screen.getByTestId('form');

    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: '@A234567a' } });

    const passwordConfirmation = screen.getByTestId('passwordConfirmation');
    fireEvent.change(passwordConfirmation, { target: { value: '@A234567a' } });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByTestId('password-redefined')).toBeDefined();
    });
  });
});
