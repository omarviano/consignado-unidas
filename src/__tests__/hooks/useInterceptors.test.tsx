import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';
import MockAdapter from 'axios-mock-adapter';

import { api, apiWithoutInterceptors } from 'services/api';

import { SessionContext } from 'hooks/session';
import { AuthContext } from 'hooks/auth';

import { Interceptors } from 'components/Interceptors';
import { useEffect } from 'react';

const refreshTokenFn = jest.fn(() => Promise.resolve());

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
            refreshToken: refreshTokenFn,
            clearSessionData: jest.fn,
            messageError: '',
            modalActive: true,
            resetModalActive: jest.fn,
            statusCode: 200,
          }}
        >
          <SessionContext.Provider
            value={{ lastSession: new Date(), updateSession: jest.fn }}
          >
            <Interceptors />
            {children}
          </SessionContext.Provider>
        </AuthContext.Provider>
      </ThemeProviderStyledComponents>
    </StyledEngineProvider>
  </ThemeProviderMaterialUi>
);

const ComponentWithServerErrorRequests = () => {
  useEffect(() => {
    api.get('/endpoint').catch(e => e);
    api.post('/endpoint').catch(e => e);
    api.patch('/endpoint').catch(e => e);
    api.delete('/endpoint').catch(e => e);
    api.put('/endpoint').catch(e => e);
  }, []);

  return <></>;
};

const ComponentWithUnauthorizedRequest = () => {
  useEffect(() => {
    api.get('/endpoint').catch(e => e);
  }, []);

  return <></>;
};

const ComponentWithRequest = () => {
  useEffect(() => {
    api.get('/endpoint');
  }, []);

  return <></>;
};

describe('Hook interceptor', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 11, 31, 8, 0, 0).getTime());
  });

  test('should be able to show modal Error500', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/endpoint').reply(500);
    mock.onPost('/endpoint').reply(500);
    mock.onPatch('/endpoint').reply(500);
    mock.onDelete('/endpoint').reply(500);
    mock.onPut('/endpoint').reply(500);

    render(
      <Providers>
        <ComponentWithServerErrorRequests />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('erro500')).toBeDefined();
    });
  });

  test('should be able to show modal Session expired', async () => {
    const mock = new MockAdapter(api);
    mock.onGet('/endpoint').reply(401);

    render(
      <Providers>
        <ComponentWithUnauthorizedRequest />
      </Providers>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('session-modal')).toBeDefined();
    });
  });

  test('should be able to call refresh token', async () => {
    api.defaults.headers.authorization = `Bearer token`;
    const mock = new MockAdapter(api);
    const mock2 = new MockAdapter(apiWithoutInterceptors);
    mock.onGet('/endpoint').reply(200);
    mock2.onGet('/auth/refresh-token').reply(200, {
      data: {},
    });

    render(
      <Providers>
        <ComponentWithRequest />
      </Providers>,
    );

    await waitFor(() => {
      expect(refreshTokenFn).toBeCalled();
    });
  });
});
