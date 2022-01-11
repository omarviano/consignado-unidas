import { AxiosResponse } from 'axios';
import { Quote } from 'interface/quote';
import { ResponseData } from 'interface/responseData';
import { api } from 'services/api';

export const LoggedAreaServices = {
  checkCreditUnderReview: (): Promise<AxiosResponse<ResponseData<Quote>>> =>
    api.get(`/financial/quote`),
  disapprovedcheck: (
    quotationId: number,
  ): Promise<AxiosResponse<ResponseData>> =>
    api.put(`/financial/quotations/${quotationId}/disapproved-check`),
};
