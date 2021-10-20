export interface BankDataFormProps {
  submitting: boolean;
  onSubmit(data: object): void;
  username?: string;
  email?: string;
}
