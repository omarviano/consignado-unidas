import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';

import { AppProvider } from 'hooks';

import { api } from 'services/api';

import SimulateLoan from 'pages/SimulateLoan';
import { SimulateLoanRealTimeContext } from 'hooks/simulateRealtime';
import { SimulateLoanContext } from 'hooks/simulate';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const getMarginFn = jest.fn(() => Promise.resolve());
const addValueSliderSimulateFn = jest.fn(() => Promise.resolve());
const addDataSimulateLoanFn = jest.fn(() => Promise.resolve());
const simulateLoanFn = jest.fn(() => Promise.resolve());

const mockSimulateLoan = {
  messageError: '',
  modalActive: false,
  resetModalActive: jest.fn,
  statusCode: 200,
  simulateLoan: simulateLoanFn,
  requestStatus: {
    error: false,
    loading: false,
    success: true,
  },
};

const mockSimulateLoanRealTime = {
  requestStatus: {
    error: false,
    loading: false,
    success: true,
  },
  dataSimulateLoan: {
    id: 1,
    value: 5000,
    installments: [
      {
        quantity: 100,
        value: 1000,
        feesPerMonth: 2,
        effectiveCostPerYear: 22,
      },
    ],
  },
  dataMargin: [
    {
      relationship: 'TRABALHANDO',
      totalValue: 1000,
      availableValue: 1000,
      admissionDate: new Date(2014, 0, 31),
      situation: 'string',
      employeeSalary: 1000,
      creditLimit: 10000,
    },
  ],
  valueSliderSimulate: 1000,
  getMargin: getMarginFn,
  addValueSliderSimulate: addValueSliderSimulateFn,
  addDataSimulateLoan: addDataSimulateLoanFn,
};

const Providers = ({ children }) => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <StyledEngineProvider injectFirst>
      <ThemeProviderStyledComponents theme={materialUiTheme}>
        <AppProvider>
          <SimulateLoanContext.Provider value={mockSimulateLoan}>
            <BrowserRouter>{children}</BrowserRouter>
          </SimulateLoanContext.Provider>
        </AppProvider>
      </ThemeProviderStyledComponents>
    </StyledEngineProvider>
  </ThemeProviderMaterialUi>
);

describe('Page: <Contracts />', () => {
  test('should be able to render grid', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1001,
    });

    const { container } = render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <SimulateLoan />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByRole('grid')).toBeDefined();
      expect(container.querySelectorAll('.MuiDataGrid-row').length).toBe(1);
      expect(screen.getAllByRole('row').length).toBe(2);
    });
  }, 5000);

  test('should be able to render cards', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000,
    });

    render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <SimulateLoan />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('cards-container')).toBeDefined();
      expect(screen.getAllByTestId('card-contract').length).toBe(1);
    });
  }, 5000);

  test('should be able to render selected value', async () => {
    render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <SimulateLoan />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('value').textContent).toBe('R$\xa01.000,00');
    });
  }, 5000);

  test('should be able to redirect when value is 0', async () => {
    render(
      <SimulateLoanRealTimeContext.Provider
        value={{ ...mockSimulateLoanRealTime, valueSliderSimulate: 0 }}
      >
        <Providers>
          <SimulateLoan />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/area-logada');
    });
  }, 5000);

  test('should be able to show validation error - WEB', async () => {
    const mock = new MockAdapter(api);
    mock.onPost('/financial/simulate').reply(200, { data: {} });
    mock.onPost('/financial/quote-validator').reply(400);

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1001,
    });

    render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <SimulateLoan />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    const checkboxContainer = screen.getAllByTestId('checkbox');
    const checkbox = checkboxContainer[0].querySelector(
      'input[type="checkbox"]',
    ) as Element;
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByTestId('request-button'));

    await waitFor(() => {
      expect(screen.getByTestId('error-modal-text')).toBeDefined();
      expect(screen.getByTestId('error-modal-text').textContent).toBe(
        'Infelizmente, você não atende os requisitos mínimos para solicitar o empréstimo neste momento. Por favor, verifique a aba Dúvidas Frequentes para conferir os requisitos e envie um e-mail para consignado@unidas.com.br em caso de dúvidas.',
      );
    });
  }, 5000);

  test('should be able to request loan - WEB', async () => {
    const mock = new MockAdapter(api);
    mock.onPost('/financial/quote-validator').reply(200);
    mock.onPost('/financial/quote').reply(200);

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1001,
    });

    render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <SimulateLoan />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    const checkboxContainer = screen.getAllByTestId('checkbox');
    const checkbox = checkboxContainer[0].querySelector(
      'input[type="checkbox"]',
    ) as Element;
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByTestId('request-button'));

    await waitFor(() => {
      expect(screen.getByTestId('modal-confirm-content')).toBeDefined();
    });

    fireEvent.click(screen.getByTestId('confirm-loan-button'));

    await waitFor(() => {
      expect(screen.getByTestId('modal-success-content')).toBeDefined();
    });

    fireEvent.click(screen.getByTestId('redirect-button'));

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/acompanhamento');
    });
  }, 5000);

  test('should be able show error message - WEB', async () => {
    const mock = new MockAdapter(api);
    mock.onPost('/financial/quote-validator').reply(200);
    mock
      .onPost('/financial/quote')
      .reply(400, { message: 'Mensagem de erro da API' });

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1001,
    });

    render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <SimulateLoan />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    const checkboxContainer = screen.getAllByTestId('checkbox');
    const checkbox = checkboxContainer[0].querySelector(
      'input[type="checkbox"]',
    ) as Element;
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByTestId('request-button'));

    await waitFor(() => {
      expect(screen.getByTestId('modal-confirm-content')).toBeDefined();
    });

    fireEvent.click(screen.getByTestId('confirm-loan-button'));

    await waitFor(() => {
      expect(screen.getByTestId('error-modal-text')).toBeDefined();
      expect(screen.getByTestId('error-modal-text').textContent).toBe(
        'Mensagem de erro da API',
      );
    });
  }, 5000);

  test('should be able to show validation error - MOBILE', async () => {
    const mock = new MockAdapter(api);
    mock.onPost('/financial/simulate').reply(200, { data: {} });
    mock
      .onPost('/financial/quote')
      .reply(400, { message: 'Mensagem de erro da API' });

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000,
    });

    render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <SimulateLoan />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    const button = screen.getAllByTestId('request-button-mobile');
    fireEvent.click(button[0]);

    await waitFor(() => {
      expect(screen.getByTestId('error-modal-text')).toBeDefined();
      expect(screen.getByTestId('error-modal-text').textContent).toBe(
        'Infelizmente, você não atende os requisitos mínimos para solicitar o empréstimo neste momento. Por favor, verifique a aba Dúvidas Frequentes para conferir os requisitos e envie um e-mail para consignado@unidas.com.br em caso de dúvidas.',
      );
    });
  }, 5000);

  test('should be able to request loan - Mobile', async () => {
    const mock = new MockAdapter(api);
    mock.onPost('/financial/quote-validator').reply(200);
    mock.onPost('/financial/quote').reply(200);

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000,
    });

    render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <SimulateLoan />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    const button = screen.getAllByTestId('request-button-mobile');
    fireEvent.click(button[0]);

    await waitFor(() => {
      expect(screen.getByTestId('modal-confirm-content')).toBeDefined();
    });

    fireEvent.click(screen.getByTestId('confirm-loan-button'));

    await waitFor(() => {
      expect(screen.getByTestId('modal-success-content')).toBeDefined();
    });

    fireEvent.click(screen.getByTestId('redirect-button'));

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/acompanhamento');
    });
  }, 5000);

  test('should be able show error message - Mobile', async () => {
    const mock = new MockAdapter(api);
    mock.onPost('/financial/quote-validator').reply(200);
    mock
      .onPost('/financial/quote')
      .reply(400, { message: 'Mensagem de erro da API' });

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000,
    });

    render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <SimulateLoan />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    const button = screen.getAllByTestId('request-button-mobile');
    fireEvent.click(button[0]);

    await waitFor(() => {
      expect(screen.getByTestId('modal-confirm-content')).toBeDefined();
    });

    fireEvent.click(screen.getByTestId('confirm-loan-button'));

    await waitFor(() => {
      expect(screen.getByTestId('error-modal-text')).toBeDefined();
      expect(screen.getByTestId('error-modal-text').textContent).toBe(
        'Mensagem de erro da API',
      );
    });
  }, 5000);

  test('should be able to change slider value', async () => {
    const { container } = render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <SimulateLoan />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    const input = container.querySelector(
      'input[type="range"]',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 1109 } });

    await waitFor(() => {
      expect(addValueSliderSimulateFn).toHaveBeenCalledWith(1109);
      expect(addDataSimulateLoanFn).toHaveBeenCalledWith({});
    });
  }, 5000);
});
