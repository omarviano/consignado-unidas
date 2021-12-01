import { AxiosResponse } from 'axios';
import { api } from 'services/api';

export const LoggedAreaServices = {
  checkCreditUnderReview: (): Promise<AxiosResponse> =>
    api.get(`/financial/quote`),
};
