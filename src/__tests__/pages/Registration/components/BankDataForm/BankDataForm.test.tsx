import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  CssBaseline,
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';
import { BankDataForm } from 'pages/Registration/components/BankDataForm';
import { api } from 'services/api';

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

describe('Component: <BankDataForm />', () => {
  beforeAll(() => {
    const mock = new MockAdapter(api);
    mock.onGet('/banks').reply(200, {
      data: [{ id: '3', description: 'Banco da Amazônia S.A.' }],
    });
  });

  test('should be able to show data', async () => {
    const { container } = render(
      <Providers>
        <BankDataForm
          submitting
          onSubmit={jest.fn}
          username="Fulano de tal"
          email="fuuul.ano@gmail.com"
        />
      </Providers>,
    );

    await waitFor(() => {
      expect(container.querySelector('#username')?.textContent).toBe(
        'Olá Fulano de tal!',
      );

      expect(container.querySelector('#email')?.textContent).toBe(
        'fuuul.ano@gmail.com',
      );
    });
  });

  test('should be able to not submit form', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <BankDataForm
          submitting
          onSubmit={onSubmit}
          username="Fulano de tal"
          email="fuuul.ano@gmail.com"
        />
      </Providers>,
    );

    const form = screen.getByTestId('form');
    fireEvent.submit(form);

    await waitFor(async () => {
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to show invalid bank data', async () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <Providers>
        <BankDataForm
          submitting
          onSubmit={onSubmit}
          username="Fulano de tal"
          email="fuuul.ano@gmail.com"
        />
      </Providers>,
    );

    const form = screen.getByTestId('form');

    const agencyInput = screen.getByTestId('agency');
    const accountNumberInput = screen.getByTestId('accountNumber');
    const digitInput = screen.getByTestId('digit');

    fireEvent.change(agencyInput, { target: { value: 'A.' } });
    fireEvent.change(accountNumberInput, { target: { value: 'A.' } });
    fireEvent.change(digitInput, { target: { value: 'A.' } });

    fireEvent.submit(form);

    await waitFor(async () => {
      expect(container.querySelector('#agency-error')?.textContent).toBe(
        'Agência inválida',
      );
      expect(container.querySelector('#accountNumber-error')?.textContent).toBe(
        'Conta corrente inválida',
      );
      expect(container.querySelector('#digit-error')?.textContent).toBe(
        'Dígito inválido',
      );
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to not submit form', async () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <Providers>
        <BankDataForm
          submitting
          onSubmit={onSubmit}
          username="Fulano de tal"
          email="fuuul.ano@gmail.com"
        />
      </Providers>,
    );

    const form = screen.getByTestId('form');
    fireEvent.submit(form);

    await waitFor(async () => {
      expect(container.querySelector('#bankCode-error')?.textContent).toBe(
        'Informe o banco',
      );
      expect(container.querySelector('#agency-error')?.textContent).toBe(
        'Informe a agência',
      );
      expect(container.querySelector('#accountNumber-error')?.textContent).toBe(
        'Informe sua conta corrente',
      );
      expect(container.querySelector('#digit-error')?.textContent).toBe(
        'Informe o dígito',
      );

      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to submit form', async () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <Providers>
        <BankDataForm
          submitting
          onSubmit={onSubmit}
          username="Fulano de tal"
          email="fuuul.ano@gmail.com"
        />
      </Providers>,
    );

    const form = screen.getByTestId('form');
    fireEvent.submit(form);

    const autocomplete = screen.getByTestId('bankCode');
    fireEvent.change(autocomplete, { target: { value: 'Ban' } });
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(autocomplete, { key: 'Enter' });

    const agencyInput = screen.getByTestId('agency');
    const accountNumberInput = screen.getByTestId('accountNumber');
    const digitInput = screen.getByTestId('digit');

    fireEvent.change(agencyInput, { target: { value: 'A.' } });
    fireEvent.change(accountNumberInput, { target: { value: 'A.' } });
    fireEvent.change(digitInput, { target: { value: 'A.' } });

    await waitFor(async () => {
      expect(container.querySelector('#bankCode-error')?.textContent).toBe(
        'Informe o bancoo',
      );
      /*  expect(container.querySelector('#agency-error')?.textContent).toBe(
        'Informe a agência',
      );
      expect(container.querySelector('#accountNumber-error')?.textContent).toBe(
        'Informe sua conta corrente',
      );
      expect(container.querySelector('#digit-error')?.textContent).toBe(
        'Informe o dígito',
      ); */

      expect(onSubmit).not.toBeCalled();
    });
  });
});
