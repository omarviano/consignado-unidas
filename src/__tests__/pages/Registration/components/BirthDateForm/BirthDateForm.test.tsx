import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const { container } = render(
      <Providers>
        <BirthDateForm onSubmit={() => null} />
      </Providers>,
    );

    const input = screen.getByRole('textbox');
    fireEvent.focusOut(input);

    await waitFor(() => {
      expect(
        container.querySelector('#dateInput_birthDate-helper-text')
          ?.textContent,
      ).toBe('Informe sua data de nascimento');
    });
  });
});
