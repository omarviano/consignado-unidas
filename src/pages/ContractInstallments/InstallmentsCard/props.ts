import { InstallmentDetailsFormatted } from '../models/contractInstallments';

export interface InstallmentsCardProps {
  data?: InstallmentDetailsFormatted;
  totalInstallments?: number;
}
