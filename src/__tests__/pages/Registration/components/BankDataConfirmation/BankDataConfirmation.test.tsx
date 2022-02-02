import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  CssBaseline,
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';
import { BankDataConfirmation } from 'pages/Registration/components/BankDataConfirmation';

const Providers = ({ children }) => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <StyledEngineProvider injectFirst>
      <ThemeProviderStyledComponents theme={materialUiTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>{children}</Switch>
        </BrowserRouter>
      </ThemeProviderStyledComponents>
    </StyledEngineProvider>
  </ThemeProviderMaterialUi>
);

describe('Component: <BankDataConfirmation />', () => {
  test('should be able to show data', async () => {
    const { container } = render(
      <Providers>
        <BankDataConfirmation
          submitting
          username="Fulano de tal"
          email="fuuu.lano@gmail.com"
          onClickNoButton={jest.fn}
          onSubmit={jest.fn}
        />
      </Providers>,
    );

    await waitFor(() => {
      expect(container.querySelector('#username')?.textContent).toBe(
        'Olá Fulano de tal!',
      );

      expect(container.querySelector('#email')?.textContent).toBe(
        'fuuu.lano@gmail.com',
      );
    });
  });

  test('should be able to show terms not accepted when click "yes"', async () => {
    render(
      <Providers>
        <BankDataConfirmation
          submitting
          username="Fulano de tal"
          email="fuuu.lano@gmail.com"
          onClickNoButton={jest.fn}
          onSubmit={jest.fn}
        />
      </Providers>,
    );

    const yesButton = screen.getByTestId('yesButton');
    fireEvent.click(yesButton);

    await waitFor(() => {
      expect(screen.getByRole('presentation')).toBeDefined();
    });
  });

  test('should be able to show terms not accepted when click "not now"', async () => {
    const onClickNoButton = jest.fn();

    render(
      <Providers>
        <BankDataConfirmation
          submitting
          username="Fulano de tal"
          email="fuuu.lano@gmail.com"
          onClickNoButton={onClickNoButton}
          onSubmit={jest.fn}
        />
      </Providers>,
    );

    const noButton = screen.getByTestId('noButton');
    fireEvent.click(noButton);

    await waitFor(() => {
      expect(onClickNoButton).not.toBeCalled();
    });
  });

  test('should be able to accept terms', async () => {
    const onSubmit = jest.fn();
    const onClickNoButton = jest.fn();
    const { getByTestId } = render(
      <Providers>
        <BankDataConfirmation
          submitting
          username="Fulano de tal"
          email="fuuu.lano@gmail.com"
          onClickNoButton={onClickNoButton}
          onSubmit={onSubmit}
        />
      </Providers>,
    );

    const form = screen.getByTestId('form-terms');

    const check = getByTestId('check').querySelector(
      'input[type="checkbox"]',
    ) as Element;

    fireEvent.click(check);
    fireEvent.submit(form);

    await waitFor(() => {
      expect(check).toHaveProperty('checked', true);
      expect(onSubmit).toBeCalled();
    });
  });

  test('should be able to accept terms and click not now', async () => {
    const onSubmit = jest.fn();
    const onClickNoButton = jest.fn();

    render(
      <Providers>
        <BankDataConfirmation
          submitting={false}
          username="Fulano de tal"
          email="fuuu.lano@gmail.com"
          onSubmit={onSubmit}
          onClickNoButton={onClickNoButton}
        />
      </Providers>,
    );

    const check = screen
      .getByTestId('check')
      .querySelector('input[type="checkbox"]') as Element;

    fireEvent.click(check);

    const noButton = screen.getByTestId('noButton');
    fireEvent.click(noButton);

    await waitFor(() => {
      expect(check).toHaveProperty('checked', true);
      expect(onClickNoButton).toBeCalled();
    });
  });
});
