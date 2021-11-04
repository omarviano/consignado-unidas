import { AxiosResponse } from 'axios';
import { api } from 'services/api';

export const ChangePasswordServices = {
  changePassword: (password: string): Promise<AxiosResponse> =>
    api.post(`/auth/password-reset`, { password }),
};
