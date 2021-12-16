import { AxiosResponse } from 'axios';
import { api } from 'services/api';
import { UserDataProps } from '../models/userData';

export const AccompanimentServices = {
  checkCreditUnderReview: (): Promise<AxiosResponse> =>
    api.get(`/financial/quote`),
  fetchBanks: (): Promise<AxiosResponse> => api.get(`banks`),
  refuseLoan: (quotationId: number): Promise<AxiosResponse> =>
    api.patch(`/financial/quote/${quotationId}/refuse`),
  approveLoan: (
    data: UserDataProps,
    quotationId: number,
  ): Promise<AxiosResponse> =>
    api.patch(`/financial/quotations/${quotationId}/accept`, data),
  fetchUserData: (): Promise<AxiosResponse> => api.get('/user-account'),
};
