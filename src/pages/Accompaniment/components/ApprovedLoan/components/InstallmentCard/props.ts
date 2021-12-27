export interface InstallmentTableDataProps {
  id: number;
  valueFormatted: string;
  effectiveCostPerYearFormatted: string;
  feesPerMonthFormatted: string;
  quantityFormatted: string;
}

export interface InstallmentCardProps {
  data: InstallmentTableDataProps[];
}
