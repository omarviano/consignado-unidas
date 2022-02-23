import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';

import { SessionContext } from 'hooks/session';
import { AuthContext } from 'hooks/auth';
import { SessionModal } from 'components/SessionModal';

const MORE_THAN_FIFTEEN_MINUTES = 900200;

const clearSessionDataFn = jest.fn();

const Providers = ({ children }) => (
  <ThemeProviderMaterialUi theme={materialUiTheme}>
    <StyledEngineProvider injectFirst>
      <ThemeProviderStyledComponents theme={materialUiTheme}>
        <AuthContext.Provider
          value={{
            data: null,
            isAuthenticating: false,
            isAuthenticated: true,
            signIn: jest.fn(() => Promise.resolve()),
            signOut: jest.fn,
            refreshToken: jest.fn(() => Promise.resolve()),
            clearSessionData: clearSessionDataFn,
            messageError: '',
            modalActive: true,
            resetModalActive: jest.fn,
            statusCode: 200,
          }}
        >
          {children}
        </AuthContext.Provider>
      </ThemeProviderStyledComponents>
    </StyledEngineProvider>
  </ThemeProviderMaterialUi>
);

describe('Page <SessionModal />', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 11, 31, 8, 0, 0).getTime());
  });

  test('should be able to not render Session Modal', async () => {
    render(
      <Providers>
        <SessionContext.Provider
          value={{ lastSession: new Date(), updateSession: jest.fn }}
        >
          <SessionModal />
        </SessionContext.Provider>
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('session-modal')).toBeNull();
    });
  }, 50000);

  test('should be able to render Session Modal', async () => {
    render(
      <Providers>
        <SessionContext.Provider
          value={{
            lastSession: new Date(
              new Date().getTime() - MORE_THAN_FIFTEEN_MINUTES,
            ),
            updateSession: jest.fn,
          }}
        >
          <SessionModal />
        </SessionContext.Provider>
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByRole('presentation')).toBeDefined();
      expect(clearSessionDataFn).toBeCalled();
    });
  });

  test('should be able to clear storage and log in again', async () => {
    const removeItem = jest.spyOn(Storage.prototype, 'removeItem');

    render(
      <Providers>
        <SessionContext.Provider
          value={{
            lastSession: new Date(
              new Date().getTime() - MORE_THAN_FIFTEEN_MINUTES,
            ),
            updateSession: jest.fn,
          }}
        >
          <SessionModal />
        </SessionContext.Provider>
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByRole('presentation')).toBeDefined();
      expect(clearSessionDataFn).toBeCalled();
    });

    fireEvent.click(screen.getByTestId('log-in-again-button'));

    await waitFor(() => {
      expect(clearSessionDataFn).toBeCalled();
      expect(removeItem).toBeCalledTimes(5);
    });
  });
});
