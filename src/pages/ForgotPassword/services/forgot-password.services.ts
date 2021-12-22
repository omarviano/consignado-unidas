import { AxiosResponse } from 'axios';
import { ResponseData } from 'interface/responseData';
import { api } from 'services/api';

export const ForgotPasswordServices = {
  forgotPassword: (email: string): Promise<AxiosResponse<ResponseData>> =>
    api.post(`/auth/password-forgot`, { email }),
};
