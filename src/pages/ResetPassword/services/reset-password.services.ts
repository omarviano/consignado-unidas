import { AxiosResponse } from 'axios';
import { ResponseData } from 'interface/responseData';
import { api } from 'services/api';

export const ResetPasswordServices = {
  resetPassword: (
    password: string,
    token: string,
  ): Promise<AxiosResponse<ResponseData>> =>
    api.post(`/auth/password-reset-token`, { password, token }),
};
