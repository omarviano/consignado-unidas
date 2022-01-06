import { AxiosResponse } from 'axios';
import { ResponseData } from 'interface/responseData';
import { api } from 'services/api';
import { SimulateLoanData } from '../models/simulate-loan';

export const SimulateLoanServices = {
  simulate: (data: SimulateLoanData): Promise<AxiosResponse<ResponseData>> =>
    api.post(`/financial/quote`, data),
};
