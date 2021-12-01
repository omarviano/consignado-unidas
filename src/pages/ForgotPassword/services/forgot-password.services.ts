import { AxiosResponse } from 'axios';
import { api } from 'services/api';

export const ForgotPasswordServices = {
  forgotPassword: (email: string): Promise<AxiosResponse> =>
    api.post(`/auth/password-forgot`, { email }),
};
