import { AxiosResponse } from 'axios';
import { ResponseData } from 'interface/responseData';
import { api } from 'services/api';
import { Contract } from '../models/contract';

export const ContractsServices = {
  fetchContracts: (): Promise<AxiosResponse<ResponseData<Contract[]>>> =>
    api.get(`/contracts`),
};
