import { AxiosResponse } from 'axios';
import { api } from 'services/api';

export const LoggedAreaServices = {
  checkCreditUnderReview: (): Promise<AxiosResponse> =>
    api.get(`/financial/quote`),
  disapprovedcheck: (quotationId: number): Promise<AxiosResponse> =>
    api.put(`/financial/quote/disapprovedcheck`, null, {
      params: { quotationId },
    }),
};
