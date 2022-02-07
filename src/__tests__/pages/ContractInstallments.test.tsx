import { render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { AppProvider } from 'hooks';
import { api } from 'services/api';

import ContractInstallments from 'pages/ContractInstallments';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '123',
  }),
}));

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

describe('Page: <ContractInstallments />', () => {
  beforeAll(() => {
    const mock = new MockAdapter(api);
    mock.onGet('/contracts/details?contratNumber=123').reply(200, {
      data: {
        contractNumber: 2001202201,
        contractDate: '0001-01-01T00:00:00',
        quantityInstallment: 36,
        value: 13566.33,
        installmentsValue: 376.84,
        status: 'Cancelado',
        authorizationNumber: '4690692',
        installmentDetails: [
          {
            installment: 1,
            dateSheet: '202202',
            installmentsValue: 376.84,
            installmentStatus: 'Cancelada Pela Instituicao',
          },
        ],
      },
    });
  });

  test('should be able to render grid', async () => {
    render(
      <Providers>
        <ContractInstallments />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByRole('grid')).toBeDefined();
    });
  });

  test('should be able to render cards', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    render(
      <Providers>
        <ContractInstallments />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('cards-container')).toBeDefined();
    });
  });

  test('should be able to show data', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    render(
      <Providers>
        <ContractInstallments />
      </Providers>,
    );

    await new Promise(r => setTimeout(r, 2000));

    await waitFor(() => {
      expect(screen.getByTestId('contract-number').textContent).toBe(
        '2001202201',
      );
      expect(screen.getByTestId('contract-date').textContent).toBe('-');
      expect(screen.getByTestId('quantity-installment').textContent).toBe('36');
      expect(screen.getByTestId('installments-value').textContent).toBe(
        'R$\xa0376,84',
      );
      expect(screen.getByTestId('first-discount').textContent).toBe(
        'fevereiro/2022',
      );
      expect(screen.getByTestId('last-discount').textContent).toBe(
        'fevereiro/2022',
      );
      expect(screen.getByTestId('value').textContent).toBe('R$\xa013.566,33');
    });
  });

  test('should be able to render data in table - Web', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 769,
    });

    const { container } = render(
      <Providers>
        <ContractInstallments />
      </Providers>,
    );

    await waitFor(() => {
      expect(container.querySelectorAll('.MuiDataGrid-row').length).toBe(1);
      expect(screen.getAllByRole('row').length).toBe(2);
    });
  });

  test('should be able to render cards - Mobile', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 720,
    });

    render(
      <Providers>
        <ContractInstallments />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('installment-card').length).toBe(1);
    });
  });

  test('should be able redirect to Contracts Page when occurred error', async () => {
    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, 'push'); //

    const mock = new MockAdapter(api);
    mock.onGet('/contracts/details?contratNumber=123').reply(400);

    render(
      <Providers>
        <Router history={history}>
          <ContractInstallments />
        </Router>
      </Providers>,
    );

    await waitFor(() => {
      expect(pushSpy).toHaveBeenCalled();
    });
  });
});
