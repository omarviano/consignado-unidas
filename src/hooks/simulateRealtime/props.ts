import { RequestStatus } from 'interface/common';
import { DataProps } from 'interface/margin';
import { DataSimulateProps } from 'interface/simulate';

export interface SimulateLoanRealTimeContextData {
  getMargin(): Promise<void>;

  dataMargin: DataProps[];

  requestStatus: RequestStatus;

  dataSimulateLoan: DataSimulateProps;

  addDataSimulateLoan(data: DataSimulateProps): void;

  valueSliderSimulate: number;

  addValueSliderSimulate(value: number): void;
}
