import {
  createContext,
  useCallback,
  useEffect,
  useContext,
  FC,
  useMemo,
  useReducer,
  useState,
} from 'react';

import { api } from 'services/api';
import { Document } from 'utils/document';

import {
  AuthContextData,
  LoginCredentials,
  AuthActions,
  AuthContextProviderProps,
} from './props';
import authReducer, { initialState } from './reducer';
import { persistToken, clearPersistedToken } from './storage';

const initialValues = {} as AuthContextData;
const AuthContext = createContext(initialValues);

export const AuthProvider: FC<AuthContextProviderProps> = props => {
  const { children, initialProps } = props;
  const [messageError, setMessageError] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

  const [state, dispatch] = useReducer(
    authReducer,
    initialProps || initialState,
  );

  useEffect(() => {
    persistToken(state.data);
    if (state.data?.token)
      api.defaults.headers.authorization = `Bearer ${state.data?.token}`;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = useCallback(async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: AuthActions.RequestUser });

      credentials.cpf = Document.removeMask(credentials.cpf);

      const response = await api.post('/auth', credentials);
      const { data } = response.data;
      persistToken(data);

      dispatch({ type: AuthActions.RequestUserSuccess, payload: response });
    } catch (error: any) {
      const { response } = error;
      const { ...errorObject } = response;
      setStatusCode(response.status);
      setMessageError(errorObject.data.message);
      setModalActive(true);
      dispatch({ type: AuthActions.RequestUserError });
    }
  }, []);

  const signOut = useCallback(() => {
    clearPersistedToken();
    dispatch({ type: AuthActions.SignOut });
  }, []);

  const resetModalActive = useCallback(() => {
    setModalActive(false);
  }, []);

  const isAuthenticated = useMemo(() => state.data !== null, [state.data]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        resetModalActive,
        messageError,
        isAuthenticated,
        signIn,
        signOut,
        modalActive,
        statusCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context || context === initialValues) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}
