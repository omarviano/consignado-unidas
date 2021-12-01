import { RequestStatus } from 'interface/common';
import { SimulateLoanProps } from 'interface/simulate';

export interface SimulateLoanContextData {
  messageError: string;

  modalActive: boolean;

  resetModalActive(): void;

  statusCode: number;

  simulateLoan(data: SimulateLoanProps): Promise<void>;

  requestStatus: RequestStatus;
}
