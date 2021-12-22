import { AxiosResponse } from 'axios';
import { ResponseData } from 'interface/responseData';
import { api } from 'services/api';

export const AccountConfirmationServices = {
  confirmation: (
    confirmationToken: string,
  ): Promise<AxiosResponse<ResponseData>> =>
    api.post(`/auth/register/confirmation`, { confirmationToken }),
};
