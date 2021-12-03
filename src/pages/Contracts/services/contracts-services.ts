import { AxiosResponse } from 'axios';
import { api } from 'services/api';

export const ContractsServices = {
  fetchContracts: (): Promise<AxiosResponse> => api.get(`/contracts`),
};
