interface QuotationStatusProps {
  id: number;
  description: string;
}

export interface LoanDataProps {
  id: number;
  quotationStatus: QuotationStatusProps;
  value: number;
  dueDate: any;
  installmentQuantity: number;
  installmentValue: number;
  installmentEffectiveCostPerYear: number;
  installmentFeesPerMonth: number;
}
