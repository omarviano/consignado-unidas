import { AxiosResponse } from 'axios';
import { api } from 'services/api';
import { UserDataProps } from '../models/userData';

export const AccompanimentServices = {
  checkCreditUnderReview: (): Promise<AxiosResponse> =>
    api.get(`/financial/quote`),
  fetchBanks: (): Promise<AxiosResponse> => api.get(`banks`),
  approveLoan: (data: UserDataProps): Promise<AxiosResponse> =>
    api.post('/xxx', data),
  fetchUserData: (): Promise<AxiosResponse> => api.get('/api/user-account'),
};
