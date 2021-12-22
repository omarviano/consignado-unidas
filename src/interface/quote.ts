export interface Quote {
  id: number;
  quotationStatusId: number;
  quotationStatus: {
    id: number;
    description: string;
  };
  value: number;
  dueDate: Date;
  installmentQuantity: number;
  installmentValue: number;
  installmentEffectiveCostPerYear: number;
  installmentFeesPerMonth: number;
  bankingReferences: {
    id: number;
    userId: number;
    bankCode: number;
    bankDescription: string;
    agency: number;
    accountNumber: string;
    digit: string;
  };
  disapprovedCheck: true;
}
