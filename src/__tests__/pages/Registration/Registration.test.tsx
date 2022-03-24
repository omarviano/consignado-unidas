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
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';
import { ptBR } from 'date-fns/locale';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { api, viaCepApi } from 'services/api';

import Registration from 'pages/Registration';
import { AppProvider } from 'hooks';
import { BrowserRouter } from 'react-router-dom';

const Providers = ({ children }) => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <StyledEngineProvider injectFirst>
      <ThemeProviderStyledComponents theme={materialUiTheme}>
        <AppProvider>
          <BrowserRouter>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
              <ThemeProviderMaterialUi theme={materialUiTheme}>
                {children}
              </ThemeProviderMaterialUi>
            </LocalizationProvider>
          </BrowserRouter>
        </AppProvider>
      </ThemeProviderStyledComponents>
    </StyledEngineProvider>
  </ThemeProviderMaterialUi>
);

describe('Component: <Registration />', () => {
  test('should be able to register without bank data', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/banks').reply(200, {
      data: [{ id: '3', description: 'Banco da Amazônia S.A.' }],
    });
    mock.onPost('auth/validate-cpf', { cpf: '11111111111' }).reply(200);
    mock
      .onPost('/auth/validate-cnpj-info', {
        cpf: '11111111111',
        cnpj: '40515554000146',
      })
      .reply(200);
    mock.onPost('/auth/validate-personal-info').reply(200);
    mock
      .onPost('/auth/validate-email', { email: 'email_valido@email.com' })
      .reply(200);
    mock.onPost('auth/validate-password').reply(200);
    mock.onPost('auth/register').reply(200);

    render(
      <Providers>
        <Registration />
      </Providers>,
    );

    // Informing the CPF

    const cpfForm = screen.getByTestId('cpf-form');

    const cpfInput = screen.getByTestId('cpf');
    fireEvent.change(cpfInput, { target: { value: '111.111.111-11' } });

    fireEvent.submit(cpfForm);

    await new Promise(r => setTimeout(r, 200));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 2 de 9');
    });

    // tirar steps do array

    // Informing the CNPJ
    const cnpjForm = screen.getByTestId('cnpj-form');

    const cnpjInput = screen.getByTestId('cnpj');
    fireEvent.change(cnpjInput, { target: { value: '40.515.554/0001-46' } });

    fireEvent.submit(cnpjForm);

    await new Promise(r => setTimeout(r, 200));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 3 de 9');
    });

    // Informing the Name

    const completeNameForm = screen.getByTestId('completeName-form');

    const completeNameInput = screen.getByTestId('name');
    fireEvent.change(completeNameInput, {
      target: { value: 'Fulano de tal' },
    });

    fireEvent.submit(completeNameForm);

    await new Promise(r => setTimeout(r, 200));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 4 de 9');
    });

    // Informing the BirthDate

    const birthDateForm = screen.getByTestId('birthDate-form');

    const birthDateInput = screen.getByTestId('date-picker_birthDate');
    fireEvent.change(birthDateInput, { target: { value: `12/05/1997` } });

    fireEvent.submit(birthDateForm);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 5 de 9');
    });

    // Informing the Email

    const emailForm = screen.getByTestId('email-form');

    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, {
      target: { value: `email_valido@email.com` },
    });

    fireEvent.submit(emailForm);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 6 de 9');
    });

    // Informing the PhoneNumber

    const phoneNumberForm = screen.getByTestId('phoneNumber-form');

    const phoneNumberInput = screen.getByTestId('phoneNumber');
    fireEvent.change(phoneNumberInput, { target: { value: '11111111111' } });

    fireEvent.submit(phoneNumberForm);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 7 de 9');
    });

    // Informing the Password

    const passwordForm = screen.getByTestId('password-form');

    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: 'A123456a' } });

    const passwordConfirmation = screen.getByTestId('passwordConfirmation');
    fireEvent.change(passwordConfirmation, { target: { value: 'A123456a' } });

    fireEvent.submit(passwordForm);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 8 de 9');
    });

    // Accept terms and Click not now button

    const check = screen
      .getByTestId('check')
      .querySelector('input[type="checkbox"]') as Element;

    fireEvent.click(check);

    const noButton = screen.getByTestId('noButton');
    fireEvent.click(noButton);

    await waitFor(() => {
      expect(screen.getByTestId('success-modal-message').textContent).toBe(
        'Olá Fulano de tal! Favor acessar o seu e-mail e confirmar a conta.',
      );
    });
  }, 50000);

  test('should be able to register whith all data', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/banks').reply(200, {
      data: [{ id: '3', description: 'Banco da Amazônia S.A.' }],
    });
    mock.onPost('auth/validate-cpf', { cpf: '11111111111' }).reply(200);
    mock
      .onPost('/auth/validate-cnpj-info', {
        cpf: '11111111111',
        cnpj: '40515554000146',
      })
      .reply(200);
    mock.onPost('/auth/validate-personal-info').reply(200);
    mock
      .onPost('/auth/validate-email', { email: 'email_valido@email.com' })
      .reply(200);
    mock.onPost('auth/validate-password').reply(200);
    mock.onPost('auth/register').reply(200);

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
        <Registration />
      </Providers>,
    );

    // Informing the CPF

    const cpfForm = screen.getByTestId('cpf-form');

    const cpfInput = screen.getByTestId('cpf');
    fireEvent.change(cpfInput, { target: { value: '111.111.111-11' } });

    fireEvent.submit(cpfForm);

    await new Promise(r => setTimeout(r, 200));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 2 de 9');
    });

    // Informing the CNPJ
    const cnpjForm = screen.getByTestId('cnpj-form');

    const cnpjInput = screen.getByTestId('cnpj');
    fireEvent.change(cnpjInput, { target: { value: '40.515.554/0001-46' } });

    fireEvent.submit(cnpjForm);

    await new Promise(r => setTimeout(r, 200));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 3 de 9');
    });

    // Informing the Name

    const completeNameForm = screen.getByTestId('completeName-form');

    const completeNameInput = screen.getByTestId('name');
    fireEvent.change(completeNameInput, {
      target: { value: 'Fulano de tal' },
    });

    fireEvent.submit(completeNameForm);

    await new Promise(r => setTimeout(r, 200));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 4 de 9');
    });

    // Informing the BirthDate

    const birthDateForm = screen.getByTestId('birthDate-form');

    const birthDateInput = screen.getByTestId('date-picker_birthDate');
    fireEvent.change(birthDateInput, { target: { value: `12/05/1997` } });

    fireEvent.submit(birthDateForm);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 5 de 9');
    });

    // Informing the Email

    const emailForm = screen.getByTestId('email-form');

    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, {
      target: { value: `email_valido@email.com` },
    });

    fireEvent.submit(emailForm);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 6 de 9');
    });

    // Informing the PhoneNumber

    const phoneNumberForm = screen.getByTestId('phoneNumber-form');

    const phoneNumberInput = screen.getByTestId('phoneNumber');
    fireEvent.change(phoneNumberInput, { target: { value: '11111111111' } });

    fireEvent.submit(phoneNumberForm);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 7 de 9');
    });

    // Informing the Password

    const passwordForm = screen.getByTestId('password-form');

    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: 'A123456a' } });

    const passwordConfirmation = screen.getByTestId('passwordConfirmation');
    fireEvent.change(passwordConfirmation, { target: { value: 'A123456a' } });

    fireEvent.submit(passwordForm);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 8 de 9');
    });

    // Accept terms and Click yes button

    const formTerms = screen.getByTestId('form-terms');
    const check = screen
      .getByTestId('check')
      .querySelector('input[type="checkbox"]') as Element;

    fireEvent.click(check);
    fireEvent.submit(formTerms);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 9 de 9');
    });

    // Informing all data
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

    await waitFor(() => {
      expect(screen.getByTestId('success-modal-message').textContent).toBe(
        'Olá Fulano de tal! Favor acessar o seu e-mail e confirmar a conta.',
      );
    });
  }, 50000);

  test('should be able to validate personal data', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/banks').reply(200, {
      data: [{ id: '3', description: 'Banco da Amazônia S.A.' }],
    });
    mock.onPost('auth/validate-cpf', { cpf: '11111111111' }).reply(200);
    mock
      .onPost('/auth/validate-cnpj-info', {
        cpf: '11111111111',
        cnpj: '40515554000146',
      })
      .reply(200);
    mock.onPost('/auth/validate-personal-info').reply(400, {
      message: 'Mensagem de erro da API (/auth/validate-personal-info)',
    });

    render(
      <Providers>
        <Registration />
      </Providers>,
    );

    // Informing the CPF

    const cpfForm = screen.getByTestId('cpf-form');

    const cpfInput = screen.getByTestId('cpf');
    fireEvent.change(cpfInput, { target: { value: '111.111.111-11' } });

    fireEvent.submit(cpfForm);

    await new Promise(r => setTimeout(r, 200));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 2 de 9');
    });

    // Informing the CNPJ
    const cnpjForm = screen.getByTestId('cnpj-form');

    const cnpjInput = screen.getByTestId('cnpj');
    fireEvent.change(cnpjInput, { target: { value: '40.515.554/0001-46' } });

    fireEvent.submit(cnpjForm);

    await new Promise(r => setTimeout(r, 200));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 3 de 9');
    });

    // Informing the Name

    const completeNameForm = screen.getByTestId('completeName-form');

    const completeNameInput = screen.getByTestId('name');
    fireEvent.change(completeNameInput, {
      target: { value: 'Fulano de tal' },
    });

    fireEvent.submit(completeNameForm);

    await new Promise(r => setTimeout(r, 200));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 4 de 9');
    });

    // Informing the BirthDate

    const birthDateForm = screen.getByTestId('birthDate-form');

    const birthDateInput = screen.getByTestId('date-picker_birthDate');
    fireEvent.change(birthDateInput, { target: { value: `12/05/1997` } });

    fireEvent.submit(birthDateForm);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('validation-modal-message').textContent).toBe(
        'Mensagem de erro da API (/auth/validate-personal-info)',
      );
    });

    const enterDataAgainButton = screen.getByTestId('enter-data-again');
    fireEvent.click(enterDataAgainButton);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 1 de 9');
    });
  }, 50000);

  test('should be able to show register failed', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/banks').reply(200, {
      data: [{ id: '3', description: 'Banco da Amazônia S.A.' }],
    });
    mock.onPost('auth/validate-cpf', { cpf: '11111111111' }).reply(200);
    mock
      .onPost('/auth/validate-cnpj-info', {
        cpf: '11111111111',
        cnpj: '40515554000146',
      })
      .reply(200);
    mock.onPost('/auth/validate-personal-info').reply(200);
    mock
      .onPost('/auth/validate-email', { email: 'email_valido@email.com' })
      .reply(200);
    mock.onPost('auth/validate-password').reply(200);
    mock.onPost('auth/register').reply(400, {
      message: 'Mensagem de erro da API (auth/register)',
    });

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
        <Registration />
      </Providers>,
    );

    // Informing the CPF

    const cpfForm = screen.getByTestId('cpf-form');

    const cpfInput = screen.getByTestId('cpf');
    fireEvent.change(cpfInput, { target: { value: '111.111.111-11' } });

    fireEvent.submit(cpfForm);

    await new Promise(r => setTimeout(r, 200));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 2 de 9');
    });

    // Informing the CNPJ
    const cnpjForm = screen.getByTestId('cnpj-form');

    const cnpjInput = screen.getByTestId('cnpj');
    fireEvent.change(cnpjInput, { target: { value: '40.515.554/0001-46' } });

    fireEvent.submit(cnpjForm);

    await new Promise(r => setTimeout(r, 200));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 3 de 9');
    });

    // Informing the Name

    const completeNameForm = screen.getByTestId('completeName-form');

    const completeNameInput = screen.getByTestId('name');
    fireEvent.change(completeNameInput, {
      target: { value: 'Fulano de tal' },
    });

    fireEvent.submit(completeNameForm);

    await new Promise(r => setTimeout(r, 200));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 4 de 9');
    });

    // Informing the BirthDate

    const birthDateForm = screen.getByTestId('birthDate-form');

    const birthDateInput = screen.getByTestId('date-picker_birthDate');
    fireEvent.change(birthDateInput, { target: { value: `12/05/1997` } });

    fireEvent.submit(birthDateForm);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 5 de 9');
    });

    // Informing the Email

    const emailForm = screen.getByTestId('email-form');

    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, {
      target: { value: `email_valido@email.com` },
    });

    fireEvent.submit(emailForm);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 6 de 9');
    });

    // Informing the PhoneNumber

    const phoneNumberForm = screen.getByTestId('phoneNumber-form');

    const phoneNumberInput = screen.getByTestId('phoneNumber');
    fireEvent.change(phoneNumberInput, { target: { value: '11111111111' } });

    fireEvent.submit(phoneNumberForm);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 7 de 9');
    });

    // Informing the Password

    const passwordForm = screen.getByTestId('password-form');

    const password = screen.getByTestId('password');
    fireEvent.change(password, { target: { value: 'A123456a' } });

    const passwordConfirmation = screen.getByTestId('passwordConfirmation');
    fireEvent.change(passwordConfirmation, { target: { value: 'A123456a' } });

    fireEvent.submit(passwordForm);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 8 de 9');
    });

    // Accept terms and Click yes button

    const formTerms = screen.getByTestId('form-terms');
    const check = screen
      .getByTestId('check')
      .querySelector('input[type="checkbox"]') as Element;

    fireEvent.click(check);
    fireEvent.submit(formTerms);

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('step').textContent).toBe('Passo 9 de 9');
    });

    // Informing all data
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

    await waitFor(() => {
      expect(screen.getByTestId('error-modal-message').textContent).toBe(
        'Mensagem de erro da API (auth/register)',
      );
    });
  }, 50000);
});
