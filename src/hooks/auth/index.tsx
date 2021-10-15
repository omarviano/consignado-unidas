import {
  createContext,
  useCallback,
  useEffect,
  useContext,
  FC,
  useMemo,
  useReducer,
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

  const [state, dispatch] = useReducer(
    authReducer,
    initialProps || initialState,
  );

  const isAuthenticated = useMemo(
    () => state.data?.token != null,
    [state.data?.token],
  );

  useEffect(() => {
    persistToken(state.data);
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
    } catch (error) {
      dispatch({ type: AuthActions.RequestUserError });
    }
  }, []);

  const signOut = useCallback(() => {
    clearPersistedToken();
    dispatch({ type: AuthActions.SignOut });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        isAuthenticated,
        signIn,
        signOut,
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
