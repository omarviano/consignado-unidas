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

import { PasswordForm } from 'pages/Registration/components/PasswordForm';

const Providers = ({ children }) => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <StyledEngineProvider injectFirst>
      <ThemeProviderStyledComponents theme={materialUiTheme}>
        <CssBaseline />
        {children}
      </ThemeProviderStyledComponents>
    </StyledEngineProvider>
  </ThemeProviderMaterialUi>
);

describe('Component: <PasswordForm />', () => {
  test('should be able to render inputs', async () => {
    render(
      <Providers>
        <PasswordForm onSubmit={jest.fn} />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('password')).toBeDefined();
      expect(screen.getByTestId('passwordConfirmation')).toBeDefined();
    });
  });

  test('should be able to show error messages', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <PasswordForm onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('form');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to show confirm your password', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <PasswordForm onSubmit={onSubmit} />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock.onPost('auth/validate-password').reply(200);

    const form = screen.getByTestId('form');

    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: 'AAAAAA11' } });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to show inform your password', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <PasswordForm onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('form');

    const passwordConfirmation = screen.getByTestId('passwordConfirmation');
    fireEvent.change(passwordConfirmation, { target: { value: 'AAAAAA11' } });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to show password must be the same', async () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <Providers>
        <PasswordForm onSubmit={onSubmit} />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock.onPost('auth/validate-password').reply(200);

    const form = screen.getByTestId('form');

    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: 'Aaaaaa11.' } });

    const passwordConfirmation = screen.getByTestId('passwordConfirmation');
    fireEvent.change(passwordConfirmation, { target: { value: 'Aaaaaa11' } });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(
        container.querySelector('#passwordConfirmation-error')?.textContent,
      ).toBe('As senhas devem ser iguais');
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to show password does not meet minimum requirements', async () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <Providers>
        <PasswordForm onSubmit={onSubmit} />
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
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to create password', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <PasswordForm onSubmit={onSubmit} />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock.onPost('auth/validate-password').reply(200);

    const form = screen.getByTestId('form');

    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: 'A123456a' } });

    const passwordConfirmation = screen.getByTestId('passwordConfirmation');
    fireEvent.change(passwordConfirmation, { target: { value: 'A123456a' } });

    fireEvent.submit(form);

    await waitFor(() => expect(onSubmit).toBeCalled());
  });
});
