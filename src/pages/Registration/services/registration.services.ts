import { AxiosResponse } from 'axios';
import { api } from 'services/api';

import { Register } from '../models/register';

export const RegistrationServices = {
  register: (data: Register): Promise<AxiosResponse> =>
    api.post(`auth/register`, data),
  fetchBanks: (): Promise<AxiosResponse> => api.get(`banks`),
  validateData: data => api.post(`/auth/validate-personal-info`, data),
  validateCPF: (cpf: string) => api.post(`/auth/validate-cpf`, { cpf }),
  validateEmail: (email: string) => api.post(`/auth/validate-email`, { email }),
};
