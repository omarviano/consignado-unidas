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

import Contracts from 'pages/Contracts';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
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

describe('Page: <Contracts />', () => {
  test('should be able to render grid', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/contracts').reply(200, []);

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 721,
    });

    render(
      <Providers>
        <Contracts />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByRole('grid')).toBeDefined();
    });
  }, 5000);

  test('should be able to render cards', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/contracts').reply(200, []);

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 720,
    });

    render(
      <Providers>
        <Contracts />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('cards-container')).toBeDefined();
    });
  });

  test('should be able to show no contracts - WEB', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/contracts').reply(200, []);

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 721,
    });

    render(
      <Providers>
        <Contracts />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('no-table-data').textContent).toBe(
        'Você ainda não possui contratos',
      );
    });
  });

  test('should be able to show no contracts - Mobile', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/contracts').reply(200, []);

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 720,
    });

    render(
      <Providers>
        <Contracts />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('no-data-mobile').textContent).toBe(
        'Você ainda não possui contratos',
      );
    });
  });

  test('should be able to render data in table - Web', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/contracts').reply(200, {
      data: [
        {
          value: 13566.33,
          number: '2001202201',
          status: 'Cancelado',
          date: null,
          installments: 36,
          installmentValue: 376.84,
        },
        {
          value: 13566.33,
          number: '1401202210',
          status: 'Cancelado',
          date: null,
          installments: 36,
          installmentValue: 376.84,
        },
      ],
    });

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 721,
    });

    const { container } = render(
      <Providers>
        <Contracts />
      </Providers>,
    );

    await waitFor(() => {
      expect(container.querySelectorAll('.MuiDataGrid-row').length).toBe(2);
    });
  });

  test('should be able to render cards - Mobile', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/contracts').reply(200, {
      data: [
        {
          value: 13566.33,
          number: '2001202201',
          status: 'Cancelado',
          date: null,
          installments: 36,
          installmentValue: 376.84,
        },
        {
          value: 13566.33,
          number: '1401202210',
          status: 'Cancelado',
          date: null,
          installments: 36,
          installmentValue: 376.84,
        },
      ],
    });

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 720,
    });

    render(
      <Providers>
        <Contracts />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('card-contract').length).toBe(2);
    });
  });

  test('should be able go to home', async () => {
    render(
      <Providers>
        <Contracts />
      </Providers>,
    );

    const goToHomeButton = screen.getByTestId('go-to-home');
    fireEvent.click(goToHomeButton);

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/area-logada');
    });
  });

  test('should be able go to installments page - Mobile', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/contracts').reply(200, {
      data: [
        {
          value: 13566.33,
          number: '2001202201',
          status: 'Cancelado',
          date: null,
          installments: 36,
          installmentValue: 376.84,
        },
        {
          value: 13566.33,
          number: '1401202210',
          status: 'Cancelado',
          date: null,
          installments: 36,
          installmentValue: 376.84,
        },
      ],
    });

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 720,
    });

    render(
      <Providers>
        <Contracts />
      </Providers>,
    );

    await new Promise(r => setTimeout(r, 20000));

    const detailsButton = screen.getAllByTestId('cards-button');
    fireEvent.click(detailsButton[0]);

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/contratos/asdf');
    });
  }, 50000);

  /* test('should be able go to installments page - WEB', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/contracts').reply(200, {
      data: [
        {
          value: 13566.33,
          number: '2001202201',
          status: 'Cancelado',
          date: null,
          installments: 36,
          installmentValue: 376.84,
        },
        {
          value: 13566.33,
          number: '1401202210',
          status: 'Cancelado',
          date: null,
          installments: 36,
          installmentValue: 376.84,
        },
      ],
    });

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 721,
    });

    render(
      <Providers>
        <Contracts />
      </Providers>,
    );

    await new Promise(r => setTimeout(r, 20000));

    const accessButton = screen.getByTestId('table-button');
    fireEvent.click(accessButton);

    await waitFor(() => {
      expect(screen.getByRole('grid')).toBeDefined();

      expect(mockHistoryPush).toHaveBeenCalledWith('/contratos/asdf');
    });
  }, 50000); */
});
