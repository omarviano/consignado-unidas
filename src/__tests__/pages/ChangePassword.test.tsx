import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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
  test('should be able to render inputs', async () => {
    render(
      <Providers>
        <ChangePassword />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('password')).toBeDefined();
      expect(screen.getByTestId('passwordConfirmation')).toBeDefined();
    });
  });

  test('should be able to show username e e-mail', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key: string) => {
          const data = {
            '@UserInfo:persist': {
              token: 'token',
              user: {
                name: 'COLABORADOR 10',
                email: 'frwk.luciane@unidas.com.br',
                phoneNumber: '11111111111',
                id: 115,
              },
            },
          };

          return data[key];
        }),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });

    render(
      <Providers>
        <ChangePassword />
      </Providers>,
    );

    await waitFor(() => {
      expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.getItem).toHaveBeenCalledWith('@SESSION');
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
      expect(container.querySelector('#password-error')?.textContent).toBe(
        'Campo obrigat??rio',
      );
      expect(
        container.querySelector('#passwordConfirmation-error')?.textContent,
      ).toBe('Campo obrigat??rio');
    });
  });

  test('should be able to show confirm your password', async () => {
    const { container } = render(
      <Providers>
        <ChangePassword />
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
      ).toBe('Campo obrigat??rio');
    });
  });

  test('should be able to show inform your password', async () => {
    const { container } = render(
      <Providers>
        <ChangePassword />
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
        'Campo obrigat??rio',
      );
      expect(
        container.querySelector('#passwordConfirmation-error')?.textContent,
      ).toBe('As senhas devem ser iguais');
    });
  });

  test('should be able to show password does not meet minimum requirements', async () => {
    const { container } = render(
      <Providers>
        <ChangePassword />
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
        'A senha n??o atende os requisitos m??nimos',
      );
    });
  });

  test('should be able to show unchanged password', async () => {
    render(
      <Providers>
        <ChangePassword />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock.onPost('auth/validate-password').reply(200);
    mock.onPost('/auth/password-reset').reply(400);

    const form = screen.getByTestId('form');

    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: '@A234567a' } });

    const passwordConfirmation = screen.getByTestId('passwordConfirmation');
    fireEvent.change(passwordConfirmation, { target: { value: '@A234567a' } });

    fireEvent.submit(form);

    await new Promise(r => setTimeout(r, 1000));

    await waitFor(() => {
      expect(screen.getByRole('presentation')).toBeDefined();
    });
  }, 50000);

  test('should be able to change password', async () => {
    render(
      <Providers>
        <ChangePassword />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock.onPost('auth/validate-password').reply(200);
    mock.onPost('/auth/password-reset').reply(200);

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
});
