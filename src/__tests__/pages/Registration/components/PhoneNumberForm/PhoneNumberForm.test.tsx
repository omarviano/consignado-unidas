import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  CssBaseline,
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';
import { PhoneNumberForm } from 'pages/Registration/components/PhoneNumberForm';

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

describe('Component: <PhoneNumberForm />', () => {
  test('should be able to render input', async () => {
    render(
      <Providers>
        <PhoneNumberForm onSubmit={jest.fn} />
      </Providers>,
    );

    await waitFor(() => expect(screen.getByRole('textbox')).toBeDefined());
  });

  test('should be able to show required field', async () => {
    const { container } = render(
      <Providers>
        <PhoneNumberForm onSubmit={jest.fn} />
      </Providers>,
    );

    const input = screen.getByRole('textbox');
    fireEvent.focusOut(input);

    await waitFor(() => {
      expect(container.querySelector('#error')?.firstChild).toBeDefined();
    });
  });

  test('should be able to not submit form', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <PhoneNumberForm onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('form');
    fireEvent.submit(form);

    await waitFor(async () => {
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to show invalid phone', async () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <Providers>
        <PhoneNumberForm onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('form');

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '1a' } });

    fireEvent.submit(form);

    await waitFor(async () => {
      expect(container.querySelector('#error')?.textContent).toBe(
        'Número inválido. Informe o telefone com o DDD e os 9 dígitos do número',
      );
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to submit form data', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <PhoneNumberForm onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('form');

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '11111111111' } });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSubmit).toBeCalled();
    });
  });
});
