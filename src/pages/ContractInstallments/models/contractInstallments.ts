export interface InstallmentDetails {
  installment: number;
  dateSheet: string;
  installmentsValue: number;
  installmentStatus: string;
}

export interface InstallmentDetailsFormatted {
  id: number;
  installment: number;
  dateSheet: string;
  installmentsValue: string;
  installmentStatus: string;
}

export interface ContractInstallments {
  contractNumber: number;
  contractDate: Date;
  quantityInstallment: number;
  value: number;
  installmentsValue: number;
  status: string;
  authorizationNumber: string;
  installmentDetails: InstallmentDetails[];
}
