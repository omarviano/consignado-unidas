import { InstallmentTableData } from 'pages/SimulateLoan/models/simulate-loan';

export interface InstallmentCardProps {
  data: InstallmentTableData;
  onSelect(id: number): void;
}
