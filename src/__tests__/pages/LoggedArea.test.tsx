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
import { ModalSimulateLoanContext } from 'pages/LoggedArea/components/ModalSimulateLoan/context';
import { CreditUnderAnalysis } from 'pages/LoggedArea/components/CreditUnderAnalysis';

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

describe('Page  <LoggedArea />', () => {
  test('should be able to render available value', async () => {
    render(
      <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
        <Providers>
          <LoggedArea />
        </Providers>
      </SimulateLoanRealTimeContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('value').textContent).toBe('R$\xa01.000,00');
    });
  }, 5000);

  // test('should be able to render status card under analysis', async () => {
  //   render(
  //     <SimulateLoanRealTimeContext.Provider value={mockSimulateLoanRealTime}>
  //       <Providers>
  //         <LoggedArea />
  //       </Providers>
  //     </SimulateLoanRealTimeContext.Provider>,
  //   );

  //   const apiResponse = {
  //     success: true,
  //     error: null,
  //     message: 'Cotação recuperada com sucesso!',
  //     statusCode: 200,
  //     data: {
  //       id: 89,
  //       quotationStatusId: 1,
  //       quotationStatus: {
  //         id: 1,
  //         description: 'Aprovada',
  //       },
  //       value: 2000,
  //       dueDate: new Date('0001-01-01T00:00:00'),
  //       installmentQuantity: 48,
  //       installmentValue: 116.82330815007725,
  //       installmentEffectiveCostPerYear: 45.28,
  //       installmentFeesPerMonth: 5.1,
  //       bankingReferences: null,
  //       disapprovedCheck: false,
  //     },
  //   };

  //   const apiMock = new MockAdapter(api);

  //   apiMock.onPost('/financial/quote').reply(200, apiResponse);

  //   await waitFor(() => {
  //     expect(screen.getByTestId('text').textContent).toBe(
  //       'Empréstimo aprovado',
  //     );
  //   });
  // }, 5000);

  test('should be able to change slider value', async () => {
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
    fireEvent.change(input, { target: { value: 2000 } });

    await waitFor(() => {
      expect(addValueSliderSimulateFn).toHaveBeenCalledWith(2000);
      expect(addDataSimulateLoanFn).toHaveBeenCalledWith({});
    });
  }, 5000);
});
