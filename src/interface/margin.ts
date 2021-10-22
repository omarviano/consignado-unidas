export interface DataProps {
  relationship: string;
  totalValue: number;
  availableValue: number;
  admissionDate: Date;
}

export interface MarginProps {
  success: boolean;
  errors: string[];
  message: string;
  statusCode: number;
  data: DataProps[];
}
