import { AxiosResponse } from 'axios';
import { api } from 'services/api';

export const ForgotPasswordServices = {
  resetPassword: (email: string): Promise<AxiosResponse> =>
    api.post(`/auth/password-reset`, { email }),
};
