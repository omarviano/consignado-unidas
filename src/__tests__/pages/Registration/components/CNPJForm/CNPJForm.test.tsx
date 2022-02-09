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
import { CNPJForm } from 'pages/Registration/components/CNPJForm';

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

describe('Component: <CNPJForm />', () => {
  test('should be able to render input', async () => {
    render(
      <Providers>
        <CNPJForm data={{}} onSubmit={() => null} />
      </Providers>,
    );

    await waitFor(() => expect(screen.getByTestId('cnpj')).toBeDefined());
  });

  test('should be able to show required field', async () => {
    const { container } = render(
      <Providers>
        <CNPJForm data={{}} onSubmit={() => null} />
      </Providers>,
    );

    const input = screen.getByTestId('cnpj');
    fireEvent.focusOut(input);

    await waitFor(async () => {
      expect(container.querySelector('#cnpj-error')?.textContent).toBe(
        'Campo obrigatório',
      );
    });
  });

  test('should be able to show incomplete field', async () => {
    const { container } = render(
      <Providers>
        <CNPJForm data={{}} onSubmit={() => null} />
      </Providers>,
    );

    const input = screen.getByTestId('cnpj');
    fireEvent.change(input, { target: { value: '111' } });
    fireEvent.focusOut(input);

    await waitFor(async () => {
      expect(container.querySelector('#cnpj-error')?.textContent).toBe(
        'CNPJ incompleto',
      );
    });
  });

  test('should be able to not submit form', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <CNPJForm data={{}} onSubmit={() => null} />
      </Providers>,
    );

    const form = screen.getByTestId('cnpj-form');
    fireEvent.submit(form);

    await waitFor(async () => {
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to validate data', async () => {
    const mock = new MockAdapter(api);
    mock
      .onPost('/auth/validate-cnpj-info', {
        cpf: '11111111111',
        cnpj: '40515554000147',
      })
      .reply(400, {
        message: 'Mensagem de erro da API',
      });

    const onSubmit = jest.fn();

    const { container } = render(
      <Providers>
        <CNPJForm data={{ cpf: '111.111.111-11' }} onSubmit={() => null} />
      </Providers>,
    );

    const form = screen.getByTestId('cnpj-form');

    const input = screen.getByTestId('cnpj');
    fireEvent.change(input, { target: { value: '40.515.554/0001-47' } });
    fireEvent.focusOut(input);

    fireEvent.submit(form);

    await waitFor(async () => {
      expect(container.querySelector('#cnpj-error')?.textContent).toBe(
        'Mensagem de erro da API',
      );
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to submit form data', async () => {
    const onSubmit = jest.fn();

    const mock = new MockAdapter(api);
    mock
      .onPost('/auth/validate-cnpj-info', {
        cpf: '11111111111',
        cnpj: '40515554000146',
      })
      .reply(200);

    render(
      <Providers>
        <CNPJForm data={{ cpf: '111.111.111-11' }} onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('cnpj-form');

    const input = screen.getByTestId('cnpj');
    fireEvent.change(input, { target: { value: '40.515.554/0001-46' } });
    fireEvent.focusOut(input);

    fireEvent.submit(form);

    await waitFor(async () => {
      expect(onSubmit).toBeCalled();
    });
  });
});
