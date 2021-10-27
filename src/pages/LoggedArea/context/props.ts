import { DataProps } from 'interface/margin';

export interface SimulateLoanProps {
  value: number;
  marginTotalValue: number;
  marginAvailableValue: number;
  relationship: string;
  admissionDate: Date;
}

export interface MarginUserContextData {
  getMargin(): Promise<void>;

  dataMargin: DataProps[];

  messageError: string;

  modalActive: boolean;

  resetModalActive(): void;

  statusCode: number;

  simulateLoan(data: SimulateLoanProps): Promise<void>;
}
