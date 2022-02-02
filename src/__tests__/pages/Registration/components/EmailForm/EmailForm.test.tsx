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
import { EmailForm } from 'pages/Registration/components/EmailForm';

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

describe('Component: <EmailForm />', () => {
  test('should be able to render input', async () => {
    render(
      <Providers>
        <EmailForm onSubmit={jest.fn} />
      </Providers>,
    );

    await waitFor(() => expect(screen.getByRole('textbox')).toBeDefined());
  });

  test('should be able to show required field', async () => {
    const { container } = render(
      <Providers>
        <EmailForm onSubmit={jest.fn} />
      </Providers>,
    );

    const input = screen.getByRole('textbox');
    fireEvent.focusOut(input);

    await waitFor(() => {
      expect(container.querySelector('#error')?.firstChild).toBeDefined();
    });
  });

  test('should be able to not submit form', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <EmailForm onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('email-form');
    fireEvent.submit(form);

    await waitFor(async () => {
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to show invalid email', async () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <Providers>
        <EmailForm onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('email-form');

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Fulano@' } });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(container.querySelector('#error')?.textContent).toBe(
        'Informe um e-mail válido',
      );
    });
  });

  test('should be able to async validation: invalid email', async () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <Providers>
        <EmailForm onSubmit={onSubmit} />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock
      .onPost('/auth/validate-email', { email: 'email@email.com' })
      .reply(400);

    const form = screen.getByTestId('email-form');

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'email@email.com' } });

    fireEvent.submit(form);

    await waitFor(async () => {
      expect(container.querySelector('#error')?.textContent).toBe(
        'Falha ao verificar E-mail. Contate o RH.',
      );
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to async validation: valid email', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <EmailForm onSubmit={onSubmit} />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock
      .onPost('/auth/validate-email', { email: 'email@email.com' })
      .reply(200);

    const form = screen.getByTestId('email-form');

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'email@email.com' } });

    fireEvent.submit(form);

    await waitFor(async () => {
      expect(onSubmit).toBeCalled();
    });
  });

  test('should be able to submit form data', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <EmailForm onSubmit={onSubmit} />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock
      .onPost('/auth/validate-email', { email: 'email_valido@email.com' })
      .reply(200);

    const form = screen.getByTestId('email-form');

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'email_valido@email.com' } });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSubmit).toBeCalled();
    });
  });
});
