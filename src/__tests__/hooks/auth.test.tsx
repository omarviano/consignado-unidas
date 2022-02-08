import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { useAuth, AuthProvider } from 'hooks/auth';

import { api } from 'services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      data: {
        token:
          'lasjflç~sdjf9945903klsdnfço4u3905349skdlnflsçdkfj39045u90sknldfnsdlkf',
        user: {
          name: 'COLABORADOR TESTE',
          email: 'colaboradorteste@unidas.com.br',
          phoneNumber: '11111111111',
          id: 900,
        },
      },
      errors: null,
      message: 'Autenticação realizada com sucesso!',
      statusCode: 200,
    };

    apiMock.onPost('/auth').reply(200, apiResponse);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const credentials = {
      cpf: '10269198008',
      password: '123456',
    };

    await act(() =>
      result.current.signIn(
        credentials,
        `${process.env.REACT_APP_RECAPTCHA_KEY}`,
      ),
    );

    expect(result.current.isAuthenticated).toBeTruthy();
  });

  it('should be able not to sign in on password incorrect', async () => {
    const apiResponse = {
      data: null,
      errors: null,
      message: 'Usuário com senha inválida.',
      statusCode: 401,
      success: false,
    };

    apiMock.onPost('/auth').reply(401, apiResponse);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const credentials = {
      cpf: '10269198008',
      password: '1234567',
    };

    await act(() =>
      result.current.signIn(
        credentials,
        `${process.env.REACT_APP_RECAPTCHA_KEY}`,
      ),
    );

    expect(result.current.isAuthenticated).toBeFalsy();
  });

  it('should be able not to sign with on user not found', async () => {
    const apiResponse = {
      data: null,
      errors: null,
      message: 'Usuário não encontrado',
      statusCode: 401,
      success: false,
    };

    apiMock.onPost('/auth').reply(401, apiResponse);

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const credentials = {
      cpf: '50899358071',
      password: '123456',
    };

    await act(() =>
      result.current.signIn(
        credentials,
        `${process.env.REACT_APP_RECAPTCHA_KEY}`,
      ),
    );

    expect(result.current.isAuthenticated).toBeFalsy();
  });
});
