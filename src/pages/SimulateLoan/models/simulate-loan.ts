interface InstallmentProps {
  quantity: number;
  value: number;
  feesPerMonth: number;
  effectiveCostPerYear: number;
}

export interface SimulateLoanData {
  simulationId: number;
  value: number;
  installment: InstallmentProps;
}

export interface InstallmentTableData extends InstallmentProps {
  id: number;
  valueFormatted: string;
  effectiveCostPerYearFormatted: string;
  feesPerMonthFormatted: string;
  quantityFormatted: string;
}
