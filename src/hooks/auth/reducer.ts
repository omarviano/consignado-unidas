import { Reducer } from 'hooks/props';
import { produce } from 'immer';

import { AuthState, AuthReducerActionMap, AuthActions } from './props';
import { getToken } from './storage';

const initialState: AuthState = {
  isAuthenticating: false,
  data: getToken(),
  requestProfileStatus: {
    error: false,
    loading: false,
    success: false,
  },
};

const authReducer: Reducer<AuthState, AuthReducerActionMap> = (
  state,
  action,
) => {
  switch (action.type) {
    case AuthActions.Reset:
      return initialState;

    case AuthActions.RequestUser:
      state.isAuthenticating = true;
      return state;

    case AuthActions.RequestUserSuccess:
      state.data = action.payload.data.token;
      state.isAuthenticating = false;
      return state;

    case AuthActions.RequestUserError:
      state.data = null;
      state.isAuthenticating = false;
      return state;

    case AuthActions.SignOut:
      state.data = null;
      return state;

    default:
      return state;
  }
};

export { initialState };
export default produce(authReducer);
