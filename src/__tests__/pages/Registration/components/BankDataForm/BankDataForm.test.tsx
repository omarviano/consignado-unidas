import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  CssBaseline,
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';
import { BankDataForm } from 'pages/Registration/components/BankDataForm';

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

  test('should be able to show invalid agency', async () => {
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
      expect(onSubmit).not.toBeCalled();
    });
  });

  /* test('Conta corrente inválida', async () => {});

  test('Dígito inválido', async () => {}); */
});
