import { AxiosResponse } from 'axios';
import { api } from 'services/api';

export const AccompanimentServices = {
  check: (): Promise<AxiosResponse> => api.get(`/`),
};
