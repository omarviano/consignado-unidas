export interface UserDataProps {
  name?: string;
  bankCode: number;
  agency: string;
  accountNumber: string;
  digit: string;
  profession: string;
  nationality: string;
  zipCode: string;
  publicPlace: string;
  number: number;
  district: string;
  complement: string;
  city: string;
  state: string;
}

export interface FormProps {
  name: string;
  nationality: string;
  profession: string;
  bankCode: string;
  number: string;
  agency: number;
  accountNumber: number;
  digit: number;
  complement: string;
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}
