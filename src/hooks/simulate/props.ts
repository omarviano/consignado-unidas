import { DataProps } from 'interface/margin';
import { RequestStatus } from 'interface/common';

export interface SimulateLoanProps {
  value: number;
  marginTotalValue: number;
  marginAvailableValue: number;
  relationship: string;
  admissionDate: Date;
}

export interface SimulateLoanContextData {
  getMargin(): Promise<void>;

  dataMargin: DataProps[];

  messageError: string;

  modalActive: boolean;

  resetModalActive(): void;

  statusCode: number;

  simulateLoan(data: SimulateLoanProps): Promise<void>;

  requestStatus: RequestStatus;
}
