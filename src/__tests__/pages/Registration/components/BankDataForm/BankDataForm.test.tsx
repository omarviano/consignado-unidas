import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
});
