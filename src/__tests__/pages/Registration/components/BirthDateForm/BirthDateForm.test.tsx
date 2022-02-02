import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ptBR } from 'date-fns/locale';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  CssBaseline,
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';
import { BirthDateForm } from 'pages/Registration/components/BirthDateForm';

const Providers = ({ children }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
    <ThemeProviderMaterialUi theme={materialUiTheme}>
      <StyledEngineProvider injectFirst>
        <ThemeProviderStyledComponents theme={materialUiTheme}>
          <CssBaseline />
          {children}
        </ThemeProviderStyledComponents>
      </StyledEngineProvider>
    </ThemeProviderMaterialUi>
  </LocalizationProvider>
);

describe('Component: <BirthDateForm />', () => {
  test('should be able to render input', async () => {
    render(
      <Providers>
        <BirthDateForm onSubmit={() => null} />
      </Providers>,
    );

    await waitFor(() =>
      expect(screen.getByTestId('date-picker_birthDate')).toBeDefined(),
    );
  });

  test('should be able to show required field', async () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <Providers>
        <BirthDateForm onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('birthDate-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(
        container.querySelector('#dateInput_birthDate-helper-text')
          ?.textContent,
      ).toBe('Informe sua data de nascimento');

      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to not submit form', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <BirthDateForm onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('birthDate-form');
    fireEvent.submit(form);

    await waitFor(async () => {
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to show future date not allowed ', async () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <Providers>
        <BirthDateForm onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('birthDate-form');

    const input = screen.getByTestId('date-picker_birthDate');

    fireEvent.change(input, { target: { value: `01/01/2100` } });

    fireEvent.submit(form);

    await waitFor(async () => {
      expect(
        container.querySelector('#dateInput_birthDate-helper-text')
          ?.textContent,
      ).toBe('Data de nascimento futura não é permitida');
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to show invalid date', async () => {
    const onSubmit = jest.fn();

    const { container } = render(
      <Providers>
        <BirthDateForm onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('birthDate-form');

    const input = screen.getByTestId('date-picker_birthDate');

    fireEvent.change(input, { target: { value: `01/00/210` } });

    fireEvent.submit(form);

    await waitFor(async () => {
      expect(
        container.querySelector('#dateInput_birthDate-helper-text')
          ?.textContent,
      ).toBeDefined();
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should be able to submit form', async () => {
    const onSubmit = jest.fn();

    render(
      <Providers>
        <BirthDateForm onSubmit={onSubmit} />
      </Providers>,
    );

    const form = screen.getByTestId('birthDate-form');

    const input = screen.getByTestId('date-picker_birthDate');

    fireEvent.change(input, { target: { value: `12/05/1997` } });

    fireEvent.submit(form);

    await waitFor(async () => {
      expect(onSubmit).toBeCalled();
    });
  });
});
