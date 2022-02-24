import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';

import { SessionContext } from 'hooks/session';
import { AuthContext } from 'hooks/auth';
import { HeaderMobileContext } from 'hooks/headerMobile';
import { Layout } from 'components/Layout';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const signOutFn = jest.fn();
const AuthContextValue = {
  data: null,
  isAuthenticating: false,
  isAuthenticated: true,
  signIn: jest.fn(() => Promise.resolve()),
  signOut: signOutFn,
  refreshToken: jest.fn,
  clearSessionData: jest.fn,
  messageError: '',
  modalActive: true,
  resetModalActive: jest.fn,
  statusCode: 200,
};

const HeaderMobileContextValue = { open: true, toggle: jest.fn };

const SessionContextValue = {
  lastSession: new Date(),
  updateSession: jest.fn,
};

const Providers = ({ children }) => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <StyledEngineProvider injectFirst>
      <ThemeProviderStyledComponents theme={materialUiTheme}>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProviderStyledComponents>
    </StyledEngineProvider>
  </ThemeProviderMaterialUi>
);

const Component = () => <span data-testid="child">child</span>;

describe('<Layout />', () => {
  test('should be able to render a child', async () => {
    render(
      <Providers>
        <AuthContext.Provider value={AuthContextValue}>
          <SessionContext.Provider value={SessionContextValue}>
            <HeaderMobileContext.Provider value={HeaderMobileContextValue}>
              <Layout>
                <Component />
              </Layout>
            </HeaderMobileContext.Provider>
          </SessionContext.Provider>
        </AuthContext.Provider>
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('child')).toBeDefined();
    });
  });

  test('should be able to render a Layout when user is not authenticated', async () => {
    render(
      <Providers>
        <AuthContext.Provider
          value={{ ...AuthContextValue, isAuthenticated: false }}
        >
          <SessionContext.Provider value={SessionContextValue}>
            <HeaderMobileContext.Provider value={HeaderMobileContextValue}>
              <Layout>
                <Component />
              </Layout>
            </HeaderMobileContext.Provider>
          </SessionContext.Provider>
        </AuthContext.Provider>
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('sign-in')).toBeDefined();
      expect(screen.getByTestId('child')).toBeDefined();
    });
  });

  test('should be able to render a Layout when user is authenticated', async () => {
    render(
      <Providers>
        <AuthContext.Provider value={AuthContextValue}>
          <SessionContext.Provider value={SessionContextValue}>
            <HeaderMobileContext.Provider value={HeaderMobileContextValue}>
              <Layout>
                <Component />
              </Layout>
            </HeaderMobileContext.Provider>
          </SessionContext.Provider>
        </AuthContext.Provider>
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('menu')).toBeDefined();
      expect(screen.getByTestId('child')).toBeDefined();
    });
  });

  test('should be able to Sign out', async () => {
    render(
      <Providers>
        <AuthContext.Provider value={AuthContextValue}>
          <SessionContext.Provider value={SessionContextValue}>
            <HeaderMobileContext.Provider value={HeaderMobileContextValue}>
              <Layout>
                <Component />
              </Layout>
            </HeaderMobileContext.Provider>
          </SessionContext.Provider>
        </AuthContext.Provider>
      </Providers>,
    );

    fireEvent.click(screen.getByTestId('sign-out-button'));

    await waitFor(() => {
      expect(screen.getByTestId('sign-out-modal')).toBeDefined();
    });

    fireEvent.click(screen.getByTestId('sign-out-confirm-button'));

    await waitFor(() => {
      expect(signOutFn).toBeCalled();
      expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });
  });
});
