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
import { api, viaCepApi } from 'services/api';

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

    const autocomplete = screen.getByTestId('autocomplete');
    const input = within(autocomplete).getByTestId('bankCode');
    autocomplete.focus();
    fireEvent.change(input, { target: { value: 'Ban' } });

    await waitFor(() => null);

    fireEvent.keyDown(autocomplete, {
      key: 'ArrowDown',
    });
    fireEvent.keyDown(autocomplete, {
      key: 'Enter',
    });

    const agencyInput = screen.getByTestId('agency');
    fireEvent.change(agencyInput, { target: { value: '12345' } });

    const accountNumberInput = screen.getByTestId('accountNumber');
    fireEvent.change(accountNumberInput, { target: { value: '12345' } });

    const digitInput = screen.getByTestId('digit');
    fireEvent.change(digitInput, { target: { value: '01' } });

    fireEvent.submit(form);

    await waitFor(async () => {
      expect(onSubmit).toBeCalled();
      expect(onSubmit).toBeCalledWith({
        accountNumber: '12345',
        accountType: '',
        agency: '12345',
        bairro: '',
        bankCode: '3',
        city: '',
        complement: '',
        complemento: '',
        digit: '01',
        district: '',
        localidade: '',
        logradouro: '',
        nationality: 'Brasileira',
        number: '',
        professional: '',
        publicPlace: '',
        state: '',
        uf: '',
        zipCode: undefined,
      });
    });
  }, 50000);

  test('should be able to submit form all fields filled', async () => {
    const onSubmit = jest.fn();

    const mockViaCep = new MockAdapter(viaCepApi);
    mockViaCep.onGet('38400104/json/').reply(200, {
      logradouro: 'Rua Coronel Antônio Alves Pereira',
      complemento: 'até 1257/1258',
      bairro: 'Centro',
      localidade: 'Uberlândia',
      uf: 'MG',
    });

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

    const professionalInput = screen.getByTestId('professional');
    fireEvent.change(professionalInput, {
      target: { value: 'Desenvolvedor' },
    });

    const zipCodeInput = screen.getByTestId('zipCode');
    fireEvent.change(zipCodeInput, { target: { value: '38400104' } });
    await waitFor(() => null);

    fireEvent.keyUp(zipCodeInput, {
      key: 'ArrowDown',
    });
    await waitFor(() => null);

    const numberInput = screen.getByTestId('number');
    fireEvent.change(numberInput, { target: { value: '1225' } });

    const complementInput = screen.getByTestId('complement');
    fireEvent.change(complementInput, { target: { value: 'até 1257/1258' } });

    const autocomplete = screen.getByTestId('autocomplete');
    const input = within(autocomplete).getByTestId('bankCode');
    autocomplete.focus();
    fireEvent.change(input, { target: { value: 'Ban' } });

    await waitFor(() => null);

    fireEvent.keyDown(autocomplete, {
      key: 'ArrowDown',
    });
    fireEvent.keyDown(autocomplete, {
      key: 'Enter',
    });

    const agencyInput = screen.getByTestId('agency');
    fireEvent.change(agencyInput, { target: { value: '12345' } });

    const accountNumberInput = screen.getByTestId('accountNumber');
    fireEvent.change(accountNumberInput, { target: { value: '12345' } });

    const digitInput = screen.getByTestId('digit');
    fireEvent.change(digitInput, { target: { value: '01' } });

    fireEvent.submit(form);

    await waitFor(async () => {
      expect(onSubmit).toBeCalled();
      expect(onSubmit).toBeCalledWith({
        accountNumber: '12345',
        accountType: '',
        agency: '12345',
        bairro: 'Centro',
        bankCode: '3',
        city: 'Uberlândia',
        complement: 'até 1257/1258',
        complemento: 'até 1257/1258',
        digit: '01',
        district: 'Centro',
        localidade: 'Uberlândia',
        logradouro: 'Rua Coronel Antônio Alves Pereira',
        nationality: 'Brasileira',
        number: '1225',
        professional: 'Desenvolvedor',
        publicPlace: 'Rua Coronel Antônio Alves Pereira',
        state: 'MG',
        uf: 'MG',
        zipCode: '38400104',
      });
    });
  }, 50000);
});
