import { AxiosResponse } from 'axios';
import { ResponseData } from 'interface/responseData';
import { api } from 'services/api';

export const ChangePasswordServices = {
  changePassword: (password: string): Promise<AxiosResponse<ResponseData>> =>
    api.post(`/auth/password-reset`, { password }),
};
