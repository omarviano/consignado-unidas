import { DataProps } from 'interface/margin';

export interface MarginUserContextData {
  getMargin(): Promise<void>;

  dataMargin: DataProps[];
}
