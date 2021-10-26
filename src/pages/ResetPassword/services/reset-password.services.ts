import { AxiosResponse } from 'axios';
import { api } from 'services/api';

export const ResetPasswordServices = {
  resetPassword: (password: string, token: string): Promise<AxiosResponse> =>
    api.post(`/auth/password-reset`, { password, token }),
};
