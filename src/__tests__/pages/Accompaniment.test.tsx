import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Router, BrowserRouter } from 'react-router-dom';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  StyledEngineProvider,
} from '@mui/material';
import { createMemoryHistory } from 'history';
import { materialUiTheme } from 'styles/theme/material-ui';

import { AppProvider } from 'hooks';
import { api, viaCepApi } from 'services/api';
import { QuotationStatus } from 'enums/quote';

import Accompaniment from 'pages/Accompaniment';

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

describe('Page: <Accompaniment  />', () => {
  test('should be able to render <RequestUnderAnalysis />', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/financial/quote').reply(200, {
      data: { quotationStatusId: QuotationStatus.Analise },
    });

    render(
      <Providers>
        <Accompaniment />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('requestUnderAnalysisIcon')).toBeDefined();
      expect(screen.getByTestId('requestUnderAnalysis')).toBeDefined();
    });
  });

  test('should be able to render <AwaitingSubmissionOfDocumentation />', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/financial/quote').reply(200, {
      data: { quotationStatusId: QuotationStatus.DocumentacaoPendente },
    });

    render(
      <Providers>
        <Accompaniment />
      </Providers>,
    );

    await waitFor(() => {
      expect(
        screen.getByTestId('awaitingSubmissionOfDocumentationIcon'),
      ).toBeDefined();
      expect(
        screen.getByTestId('awaitingSubmissionOfDocumentation'),
      ).toBeDefined();
    });
  });

  test('should be able to render <DocumentationSent />', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/financial/quote').reply(200, {
      data: { quotationStatusId: QuotationStatus.Documentacao },
    });

    render(
      <Providers>
        <Accompaniment />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('documentationSentIcon')).toBeDefined();
      expect(screen.getByTestId('documentationSent')).toBeDefined();
    });
  });

  test('should be able to render <ContractSigning />', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/financial/quote').reply(200, {
      data: { quotationStatusId: QuotationStatus.AssinaturaContratoPendente },
    });

    render(
      <Providers>
        <Accompaniment />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('contractSigningIcon')).toBeDefined();
      expect(screen.getByTestId('contractSigning')).toBeDefined();
    });
  });

  test('should be able to render <ReleasedCredit />', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/financial/quote').reply(200, {
      data: {
        id: 1,
        quotationStatusId: QuotationStatus.CreditoLiberado,
        quotationStatus: {
          id: 1,
          description: 'Aprovada',
        },
        value: 2000,
        dueDate: new Date(2022, 0, 1),
        installmentQuantity: 48,
        installmentValue: 116.82330815007725,
        installmentEffectiveCostPerYear: 45.28,
        installmentFeesPerMonth: 5.1,
        bankingReferences: {
          id: 1,
          userId: 1,
          bankCode: 1,
          bankDescription: 'Nome do banco',
          agency: 123456,
          accountNumber: '123456',
          digit: '00',
        },
        disapprovedCheck: false,
      },
    });

    render(
      <Providers>
        <Accompaniment />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('releasedCreditIcon')).toBeDefined();
      expect(screen.getByTestId('releasedCredit')).toBeDefined();
      expect(screen.getByTestId('releasedCreditText').textContent).toBe(
        'LIBERADO',
      );
      expect(screen.getByTestId('bankData').textContent).toBe(
        'Banco: Nome do bancoAgência: 123456C/C: 123456-00',
      );
    });
  });

  test('should be able to render <ReprovidedLoan />', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/financial/quote').reply(200, {
      data: { quotationStatusId: QuotationStatus.EmprestimoReprovadoPeloBanco },
    });

    render(
      <Providers>
        <Accompaniment />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('reprovidedLoanIcon')).toBeDefined();
      expect(screen.getByTestId('reprovidedLoan')).toBeDefined();
    });
  });

  test('should be able to render <ApprovedLoan /> - Web', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 921,
    });
    const mock = new MockAdapter(api);
    mock.onGet('/financial/quote').reply(200, {
      data: {
        id: 1,
        quotationStatusId: QuotationStatus.Aprovado,
        quotationStatus: {
          id: 1,
          description: 'Aprovada',
        },
        value: 2000,
        dueDate: new Date(2022, 0, 1),
        installmentQuantity: 48,
        installmentValue: 116.82330815007725,
        installmentEffectiveCostPerYear: 45.28,
        installmentFeesPerMonth: 5.1,
        bankingReferences: null,
        disapprovedCheck: false,
      },
    });
    mock.onGet('/user-account').reply(200, { data: {} });
    mock.onGet('/banks').reply(200, { data: [] });
    mock.onGet('/reason-refuse').reply(200, { data: [] });

    const { container } = render(
      <Providers>
        <Accompaniment />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('approvedLoanIcon')).toBeDefined();
      expect(screen.getByTestId('approvedLoan')).toBeDefined();
      expect(screen.getByTestId('approvedText').textContent).toBe('Aprovada');
      expect(screen.getByTestId('value').textContent).toBe('R$\xa02.000,00');
      expect(screen.getByTestId('dueDate').textContent).toBe('01/01/2022');
      expect(screen.getByRole('grid')).toBeDefined();
      expect(container.querySelectorAll('.MuiDataGrid-row').length).toBe(1);
      expect(screen.getAllByRole('row').length).toBe(2);
    });
  });

  test('should be able to render <ApprovedLoan /> - Mobile', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 920,
    });
    const mock = new MockAdapter(api);
    mock.onGet('/financial/quote').reply(200, {
      data: {
        id: 1,
        quotationStatusId: QuotationStatus.Aprovado,
        quotationStatus: {
          id: 1,
          description: 'Aprovada',
        },
        value: 2000,
        dueDate: new Date(2022, 0, 1),
        installmentQuantity: 48,
        installmentValue: 116.82330815007725,
        installmentEffectiveCostPerYear: 45.28,
        installmentFeesPerMonth: 5.1,
        bankingReferences: null,
        disapprovedCheck: false,
      },
    });
    mock.onGet('/user-account').reply(200, { data: {} });
    mock.onGet('/banks').reply(200, { data: [] });
    mock.onGet('/reason-refuse').reply(200, { data: [] });

    render(
      <Providers>
        <Accompaniment />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('installment-card').length).toBe(1);
    });
  });

  test('should be able to refuse proposal', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/financial/quote').reply(200, {
      data: {
        id: 1,
        quotationStatusId: QuotationStatus.Aprovado,
        quotationStatus: {
          id: 1,
          description: 'Aprovada',
        },
        value: 2000,
        dueDate: new Date(2022, 0, 1),
        installmentQuantity: 48,
        installmentValue: 116.82330815007725,
        installmentEffectiveCostPerYear: 45.28,
        installmentFeesPerMonth: 5.1,
        bankingReferences: null,
        disapprovedCheck: false,
      },
    });
    mock.onGet('/user-account').reply(200, {
      data: {
        cpf: '47087643088',
        name: 'COLABORADOR 10',
        email: 'teste@unidas123.com.br',
        password: 'E10ADC3949BA59ABBE56E057F20F883E',
        phoneNumber: '11111111111',
        bankCode: 1,
        agency: '123456',
        accountNumber: '12345',
        digit: '12',
        birthDate: '1992-09-05T03:00:00',
        professional: 'Dev',
        nationality: 'Brasileiraa',
        zipCode: '38400104',
        publicPlace: 'Rua tal tal tal',
        number: '123',
        district: 'Asdf',
        complement: 'Apartamento tal',
        city: 'Uberlândia',
        state: 'MG',
        cnpj: '10215988000160',
      },
    });
    mock.onGet('/banks').reply(200, { data: [] });
    mock.onGet('/reason-refuse').reply(200, {
      data: [
        {
          id: 1,
          description: 'Quero mudar as condições do meu empréstimo',
          required: true,
        },
        {
          id: 2,
          description: 'Opt 2',
          required: true,
        },
      ],
    });
    mock.onPost('/financial/quote/refuse').reply(200);

    const history = createMemoryHistory();

    render(
      <Providers>
        <Router history={history}>
          <Accompaniment />
        </Router>
      </Providers>,
    );

    await new Promise(r => setTimeout(r, 1000));
    fireEvent.click(screen.getByTestId('refuseProposalButton'));

    await waitFor(() => {
      expect(screen.getByTestId('refuseProposalModal')).toBeDefined();
    });

    fireEvent.click(screen.getByTestId('confirmRefuse'));

    await waitFor(() => {
      expect(screen.getByTestId('refuseModalForm')).toBeDefined();
    });

    const reasonRefuseId = screen.getByTestId('reasonRefuseId');
    fireEvent.change(reasonRefuseId, { target: { value: '2' } });

    const reasonDescription = screen.getByTestId('reasonDescription');
    reasonDescription.focus();
    fireEvent.change(reasonDescription, { target: { value: 'Pq' } });

    fireEvent.click(screen.getByTestId('refuseButton'));

    await waitFor(() => {
      expect(mock.history.post[0].data).toBe(
        JSON.stringify({
          quotationId: 1,
          reasonRefuseId: '2',
          reasonDescription: 'Pq',
        }),
      );

      expect(screen.getByTestId('refuseAcceptedModal')).toBeDefined();
    });

    fireEvent.click(screen.getByTestId('button-go-to-home'));

    await new Promise(r => setTimeout(r, 1000));

    await waitFor(() => {
      expect(history.location.pathname).toBe('/area-logada');
    });
  }, 50000);

  test('should be able to accept proposal', async () => {
    const mock = new MockAdapter(api);
    const mockViaCep = new MockAdapter(viaCepApi);
    mock.onGet('/financial/quote').reply(200, {
      data: {
        id: 1,
        quotationStatusId: QuotationStatus.Aprovado,
        quotationStatus: {
          id: 1,
          description: 'Aprovada',
        },
        value: 2000,
        dueDate: new Date(2022, 0, 1),
        installmentQuantity: 48,
        installmentValue: 116.82330815007725,
        installmentEffectiveCostPerYear: 45.28,
        installmentFeesPerMonth: 5.1,
        bankingReferences: null,
        disapprovedCheck: false,
      },
    });
    mock.onGet('/user-account').reply(200, {
      data: {
        cpf: '47087643088',
        name: 'COLABORADOR 10',
        email: 'teste@unidas123.com.br',
        password: 'E10ADC3949BA59ABBE56E057F20F883E',
        phoneNumber: '11111111111',
        bankCode: 1,
        agency: '123456',
        accountNumber: '12345',
        digit: '12',
        birthDate: '1992-09-05T03:00:00',
        professional: 'Dev',
        nationality: 'Brasileiraa',
        zipCode: '38400104',
        publicPlace: 'Rua tal tal tal',
        number: '123',
        district: 'Asdf',
        complement: 'Apartamento tal',
        city: 'Uberlândia',
        state: 'MG',
        cnpj: '10215988000160',
      },
    });
    mock.onGet('/banks').reply(200, {
      data: [
        {
          id: 1,
          description: 'Acesso Soluções de Pagamento S.A.',
        },
      ],
    });
    mock.onGet('/reason-refuse').reply(200, {
      data: [],
    });
    mock.onPatch('/financial/quotations/1/accept').reply(200);
    mockViaCep.onGet('38400104/json/').reply(200, {
      logradouro: 'Rua Coronel Antônio Alves Pereira',
      complemento: 'até 1257/1258',
      bairro: 'Centro',
      localidade: 'Uberlândia',
      uf: 'MG',
    });

    render(
      <Providers>
        <Accompaniment />
      </Providers>,
    );

    await new Promise(r => setTimeout(r, 1000));

    fireEvent.click(screen.getByTestId('acceptProposalButton'));

    await waitFor(() => {
      expect(screen.getAllByTestId('confirmationModal')).toBeDefined();
    });

    fireEvent.click(screen.getByTestId('confirmationButton'));
    await new Promise(r => setTimeout(r, 10000));

    await waitFor(() => {
      expect(mock.history.patch[0].data).toBe(
        JSON.stringify({
          nationality: 'Brasileiraa',
          professional: 'Dev',
          number: '123',
          complement: 'Apartamento tal',
          bankCode: '1',
          agency: '123456',
          digit: '12',
          accountNumber: '12345',
          accountType: 'Conta corrente',
          zipCode: '38400104',
          publicPlace: 'Rua Coronel Antônio Alves Pereira',
          district: 'Centro',
          city: 'Uberlândia',
          state: 'MG',
        }),
      );

      expect(screen.getAllByTestId('modal-success')).toBeDefined();
    });
  }, 50000);
});
