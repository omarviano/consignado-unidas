import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import {
  ThemeProvider as ThemeProviderMaterialUi,
  StyledEngineProvider,
} from '@mui/material';
import { materialUiTheme } from 'styles/theme/material-ui';
import MockAdapter from 'axios-mock-adapter';

import { api } from 'services/api';

import { SessionContext } from 'hooks/session';
import { AuthContext } from 'hooks/auth';

import { Interceptors } from 'components/Interceptors';
import { useEffect } from 'react';

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

describe('Page: <Error500 />', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 11, 31, 8, 0, 0).getTime());
  });

  test('should be able to show modal <Error500 />', async () => {
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
});
