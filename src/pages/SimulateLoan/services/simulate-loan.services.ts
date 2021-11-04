import { AxiosResponse } from 'axios';
import { api } from 'services/api';
import { SimulateLoanData } from '../models/simulate-loan';

export const SimulateLoanServices = {
  simulate: (data: SimulateLoanData): Promise<AxiosResponse> =>
    api.post(`/financial/quote`, data),
  checkCreditUnderReview: (): Promise<AxiosResponse> =>
    api.get(`/financial/quote`),
};
