import { render, fireEvent, waitFor } from '@testing-library/react';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  CssBaseline,
  StyledEngineProvider,
} from '@mui/material';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';

import { materialUiTheme } from 'styles/theme/material-ui';

import Login from 'pages/Login';

const mockedRouter = jest.fn();
const mockedResetModalActive = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockedRouter,
  }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('hooks/auth', () => ({
  useAuth: () => ({
    resetModalActive: mockedResetModalActive,
  }),
}));

const Providers: React.FC = ({ children }) => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <StyledEngineProvider injectFirst>
      <ThemeProviderStyledComponents theme={materialUiTheme}>
        <CssBaseline />
        {children}
      </ThemeProviderStyledComponents>
    </StyledEngineProvider>
  </ThemeProviderMaterialUi>
);

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedResetModalActive.mockClear();
  });

  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByTestId } = render(<Login />, {
      wrapper: Providers,
    });

    const cpfField = getByPlaceholderText('CPF');
    const passwordField = getByPlaceholderText('Senha');

    fireEvent.change(cpfField, { target: { value: '47087643088' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.submit(getByTestId('form'));

    await waitFor(() => {
      expect(mockedResetModalActive).toBeTruthy();
    });
  });
});
