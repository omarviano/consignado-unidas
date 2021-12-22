export interface SimulateLoanProps {
  value: number;
  marginTotalValue: number;
  marginAvailableValue: number;
  relationship: string;
  admissionDate: Date;
}

export interface Installment {
  quantity: number;
  value: number;
  feesPerMonth: number;
  effectiveCostPerYear: number;
}

export interface DataSimulateProps {
  id: number;
  value: number;
  installments: Installment[];
}
