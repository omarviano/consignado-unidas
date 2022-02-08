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
import { SimulateLoanRealTimeProvider } from 'hooks/simulateRealtime';
import * as hooks from 'hooks/simulateRealtime';

import { api } from 'services/api';

import SimulateLoan from 'pages/SimulateLoan';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

/* jest.mock('hooks/simulateRealtime', () => ({
  requestStatus: {
    error: false,
    loading: false,
    success: true,
  },
  dataSimulateLoan: {
    id: 1,
    value: 5000,
    installments: [
      { quantity: 100, value: 1000, feesPerMonth: 2, effectiveCostPerYear: 22 },
    ],
  },
  getMargin: jest.fn,
  dataMargin: {
    relationship: 'string',
    totalValue: 1000,
    availableValue: 1000,
    admissionDate: new Date(),
    situation: 'string',
    employeeSalary: 1000,
    creditLimit: 1000,
  },
  addValueSliderSimulate: jest.fn,
  valueSliderSimulate: 1000,
  addDataSimulateLoan: jest.fn,
})); */

const Providers = ({ children }) => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <StyledEngineProvider injectFirst>
      <ThemeProviderStyledComponents theme={materialUiTheme}>
        <AppProvider>
          <SimulateLoanRealTimeProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </SimulateLoanRealTimeProvider>
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

    render(
      <Providers>
        <SimulateLoan />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByRole('grid')).toBeDefined();
    });
  }, 5000);

  test('should be able to render cards', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000,
    });

    render(
      <Providers>
        <SimulateLoan />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('cards-container')).toBeDefined();
    });
  }, 5000);

  test('should be able to render selected value', async () => {
    jest.spyOn(hooks, 'useSimulateLoanRealTime').mockImplementation(() => ({
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
      dataMargin: {
        relationship: 'string',
        totalValue: 1000,
        availableValue: 1000,
        admissionDate: new Date(),
        situation: 'string',
        employeeSalary: 1000,
        creditLimit: 1000,
      },
      valueSliderSimulate: 1000,
      getMargin: () => Promise<void>,
      addValueSliderSimulate: () => null,
      addDataSimulateLoan: () => null,
    }));

    render(
      <Providers>
        <SimulateLoan />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('value').textContent).toBe('R$\xa00,00');
    });
  }, 5000);
});
