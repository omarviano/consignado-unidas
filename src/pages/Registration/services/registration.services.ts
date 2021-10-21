import { AxiosResponse } from 'axios';
import { api } from 'services/api';

import { Register } from '../models/register';

export const RegistrationServices = {
  register: (data: Register): Promise<AxiosResponse> =>
    api.post(`auth/register`, data),
  fetchBanks: (): Promise<AxiosResponse> => api.get(`banks`),
};
