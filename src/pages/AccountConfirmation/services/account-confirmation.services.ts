import { AxiosResponse } from 'axios';
import { api } from 'services/api';

export const AccountConfirmationServices = {
  confirmation: (confirmationToken: string): Promise<AxiosResponse> =>
    api.post(`/auth/register/confirmation`, { confirmationToken }),
};
