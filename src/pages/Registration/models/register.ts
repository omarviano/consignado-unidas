export interface Register {
  cpf: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  bankCode: number;
  agency: string;
  accountNumber: string;
  digit?: string;
  birthDate: Date;
}
