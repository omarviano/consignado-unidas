export interface Contract {
  value: number;
  number: string;
  status: string;
  date: Date;
  installments: number;
  installmentValue: number;
}

export interface ContractFormatted {
  id: string;
  number: string;
  date: string;
  value: string;
  installmentValue: string;
  installments: string;
  status: string;
}
