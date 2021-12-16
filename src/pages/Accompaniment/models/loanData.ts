interface QuotationStatusProps {
  id: number;
  description: string;
}

export interface LoanDataProps {
  quotationStatus: QuotationStatusProps;
  value: number;
  dueDate: any;
  installmentQuantity: number;
  installmentValue: number;
  installmentEffectiveCostPerYear: number;
  installmentFeesPerMonth: number;
}
