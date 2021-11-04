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
