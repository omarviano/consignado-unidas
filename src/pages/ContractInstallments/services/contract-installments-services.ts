import { AxiosResponse } from 'axios';
import { ResponseData } from 'interface/responseData';
import { api } from 'services/api';
import { ContractInstallments } from '../models/contractInstallments';

export const ContractsInstallmentsServices = {
  fetchContractDetails: (
    id: string,
  ): Promise<AxiosResponse<ResponseData<ContractInstallments>>> =>
    api.get(`/contracts/details?contratNumber=${id}`),
};
