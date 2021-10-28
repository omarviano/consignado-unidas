import { AxiosResponse } from 'axios';
import { api } from 'services/api';

export const AccompanimentServices = {
  checkCreditUnderReview: (): Promise<AxiosResponse> =>
    api.get(`/financial/quote`),
};
