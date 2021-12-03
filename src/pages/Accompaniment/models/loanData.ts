export interface LoanDataProps {
  status: string;
  requestedAmount: number;
  dueDate: Date;
  quantity: number;
  value: number;
  effectiveCostPerYear: number;
  feesPerMonth: number;
}
