import { ResponseData } from 'interface/responseData';
import { api } from 'services/api';
import { Quote } from 'interface/quote';
import { AxiosResponse } from 'axios';
import { Bank } from '../models/bank';
import { UserDataProps } from '../models/userData';
import { Reasons } from '../models/reasons';

export const AccompanimentServices = {
  checkCreditUnderReview: (): Promise<AxiosResponse<ResponseData<Quote>>> =>
    api.get(`/financial/quote`),
  fetchBanks: (): Promise<AxiosResponse<ResponseData<Bank[]>>> =>
    api.get(`banks`),
  refuseLoan: (data): Promise<AxiosResponse<ResponseData>> =>
    api.post(`/financial/quote/refuse`, data),
  approveLoan: (
    data: UserDataProps,
    quotationId: number,
  ): Promise<AxiosResponse<ResponseData>> =>
    api.patch(`/financial/quotations/${quotationId}/accept`, data),
  fetchUserData: (): Promise<AxiosResponse<ResponseData<UserDataProps>>> =>
    api.get('/user-account'),
  fetchReasons: (): Promise<AxiosResponse<ResponseData<Reasons[]>>> =>
    api.get('/ReasonRefuse'),
};
