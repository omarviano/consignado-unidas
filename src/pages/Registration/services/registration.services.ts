import { AxiosResponse } from 'axios';
import { ResponseData } from 'interface/responseData';
import { api } from 'services/api';
import { Bank } from '../models/bank';

import { Register } from '../models/register';

export const RegistrationServices = {
  register: (data: Register): Promise<AxiosResponse<ResponseData>> =>
    api.post(`auth/register`, data),
  fetchBanks: (): Promise<AxiosResponse<ResponseData<Bank[]>>> =>
    api.get(`banks`),
  validateData: (data): Promise<AxiosResponse<ResponseData>> =>
    api.post(`/auth/validate-personal-info`, data),
  validateCPF: (cpf: string): Promise<AxiosResponse<ResponseData>> =>
    api.post(`/auth/validate-cpf`, { cpf }),
  validateEmail: (email: string): Promise<AxiosResponse<ResponseData>> =>
    api.post(`/auth/validate-email`, { email }),
};
