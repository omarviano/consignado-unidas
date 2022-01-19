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
import { CPFForm } from 'pages/Registration/components/CPFForm';

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

describe('Component: <CPFForm />', () => {
  test('should be able to render input', async () => {
    render(
      <Providers>
        <CPFForm onSubmit={() => null} />
      </Providers>,
    );

    await waitFor(() => expect(screen.getByRole('textbox')).toBeDefined());
  });

  test('should be able to show required field', async () => {
    render(
      <Providers>
        <CPFForm onSubmit={() => null} />
      </Providers>,
    );

    const input = screen.getByRole('textbox');
    fireEvent.focusOut(input);

    await waitFor(async () => {
      expect(screen.getByText('Campo obrigatório')).toBeDefined();
    });
  });

  test('should be able to show incomplete field', async () => {
    render(
      <Providers>
        <CPFForm onSubmit={() => null} />
      </Providers>,
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '111' } });
    fireEvent.focusOut(input);

    await waitFor(async () => {
      expect(screen.getByText('CPF incompleto')).toBeDefined();
    });
  });

  test('should be able to not submit form', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <CPFForm onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('form');
    fireEvent.submit(form);

    await waitFor(async () => {
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to show user not found', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <CPFForm onSubmit={onSubmit} />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock.onPost('auth/validate-cpf', { cpf: '11111111111' }).reply(400, {
      success: false,
      errors: ['CPF: Usuário não encontrado.'],
      message: 'Usuário não encontrado.',
      statusCode: 400,
      data: null,
    });

    const form = screen.getByTestId('form');

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '111.111.111-11' } });
    fireEvent.focusOut(input);

    fireEvent.submit(form);

    await waitFor(async () => {
      expect(screen.getByText('Usuário não encontrado.')).toBeDefined();
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to submit form data', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <CPFForm onSubmit={onSubmit} />
      </Providers>,
    );

    const mock = new MockAdapter(api, { delayResponse: 200 });
    mock.onPost('auth/validate-cpf', { cpf: '11111111111' }).reply(200);

    const form = screen.getByTestId('form');

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '111.111.111-11' } });
    fireEvent.focusOut(input);

    fireEvent.submit(form);

    await waitFor(async () => {
      expect(onSubmit).toBeCalled();
    });
  });
});
