export interface UserDataProps {
  name?: string;
  bankCode: number;
  agency: string;
  accountNumber: string;
  accountType?: string;
  digit: string;
  professional: string;
  nationality: string;
  zipCode: string;
  publicPlace: string;
  number: string;
  district: string;
  complement: string;
  city: string;
  state: string;
  isBankAccountSet?: boolean;
  isAddressSet?: boolean;
}

export interface FormProps {
  name?: string;
  nationality: string;
  professional: string;
  bankCode: string;
  number: number | string;
  agency: number | string;
  accountNumber: number | string;
  digit: number | string;
  complement: string;
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}
