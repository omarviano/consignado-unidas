import { ContractFormatted } from '../../models/contract';

export interface ContractCardProps {
  data: ContractFormatted;
  onClickButton(id: string): void;
}
