import { AxiosResponse } from 'axios';
import { ActionMapData } from 'hooks/props';
import { ResponseData } from 'interface/responseData';

export interface LoginCredentials {
  cpf: string;
  password: string;
}

export type User = {
  name: string;
  email: string;
  phoneNumber: string;
};

export type TokenProps = {
  token: string;
  user: User;
};

export type AuthResponse = {
  token: TokenProps;
};

export interface AuthState {
  data: TokenProps | null;
  isAuthenticating: boolean;
}

export enum AuthActions {
  RequestUser = 'REQUEST_USER',
  RequestUserSuccess = 'REQUEST_USER_SUCCESS',
  RequestUserError = 'REQUEST_USER_ERROR',
  Reset = 'RESET',
  SignOut = 'SIGN_OUT',
}

export type AuthPayload = {
  [AuthActions.RequestUser]: undefined;
  [AuthActions.RequestUserSuccess]: AxiosResponse<ResponseData<TokenProps>>;
  [AuthActions.RequestUserError]: undefined;
  [AuthActions.Reset]: undefined;
  [AuthActions.SignOut]: undefined;
};

export type AuthReducerActionMap = ActionMapData<AuthPayload>;

export type AuthContextProviderProps = {
  initialProps?: AuthState;
};

export type AuthContextData = AuthState & {
  isAuthenticated: boolean;
  signIn(credentials: LoginCredentials): Promise<void>;
  signOut(): void;
  refreshToken(token: string): void;
  clearSessionData(): void;
  messageError: string;
  modalActive: boolean;
  resetModalActive(): void;
  statusCode: number;
};
