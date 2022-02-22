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

import LoggedArea from 'pages/LoggedArea';
import { SimulateLoanContext } from 'hooks/simulate';
import { SimulateLoanRealTimeContext } from 'hooks/simulateRealtime';
import { QuotationStatus } from 'enums/quote';

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
      availableValue: 999.77,
      admissionDate: new Date(2014, 0, 31),
      situation: 'string',
      employeeSalary: 1000,
      creditLimit: 10000,
    },
  ],
  valueSliderSimulate: 5,
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

describe('Page  <LoggedArea />', () => {
  /* test('should be able to render available value', async () => {
    render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <LoggedArea />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('value').textContent).toBe('R$\xa0999,77');
    });
  }, 5000); */

  test('should be able to not render recused loan card', async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet('/financial/quote').reply(200, {
      data: {
        quotationStatusId: QuotationStatus.RecusadoPeloUsuario,
      },
    });

    render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <LoggedArea />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('creditUnderAnalysis')).toBe(null);
    });
  }, 5000);

  test('should be able to render <CreditUnderAnalysis /> and correct text', async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet('/financial/quote').reply(200, {
      data: {
        quotationStatusId: QuotationStatus.Aprovado,
      },
    });

    render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <LoggedArea />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('creditUnderAnalysis')).toBeDefined();
      expect(screen.getByTestId('text').textContent).toBe(
        'Empréstimo aprovado',
      );
    });
  }, 5000);

  test('should be able to redirect to <Accompaniment />', async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet('financial/quote').reply(200, {
      data: {
        id: 1,
        quotationStatusId: QuotationStatus.Aprovado,
      },
    });
    apiMock.onPut(`/financial/quotations/1/disapproved-check`).reply(200);

    render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <LoggedArea />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    await new Promise(r => setTimeout(r, 2000));

    fireEvent.click(screen.getByTestId('creditUnderAnalysis'));

    await waitFor(() => {
      expect(mockHistoryPush).toBeCalled();
      expect(mockHistoryPush).toBeCalledWith('/acompanhamento');
    });
  }, 5000);

  test('should be able to change slider value', async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet('/financial/quote').reply(200, {
      data: {
        quotationStatusId: QuotationStatus.Aprovado,
      },
    });
    apiMock.onGet('/margins').reply(200);
    apiMock.onPost('/financial/simulate').reply(200);

    const { container } = render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <LoggedArea />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    const input = container.querySelector(
      'input[type="range"]',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 1200 } });

    await waitFor(() => {
      expect(screen.getByTestId('slider-value').textContent).toBe(
        'R$\xa01.200,00',
      );
    });
  }, 5000);

  /*  test('should be able to request loan', async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet('financial/quote').reply(200, {
      data: {
        quotationStatusId: QuotationStatus.Aprovado,
      },
    });

    apiMock.onGet('margins').reply(200);
    apiMock.onPost('financial/simulate').reply(200);

    render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <LoggedArea />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    fireEvent.click(screen.getByTestId('redirect-button'));

    await waitFor(() => {
      expect(screen.getByTestId('text').textContent).toBe(
        'Empréstimo aprovado',
      );
    });
  }, 5000); */
});
