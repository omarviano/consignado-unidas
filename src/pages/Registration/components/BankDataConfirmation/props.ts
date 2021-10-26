export interface BankDataConfirmationProps {
  submitting: boolean;
  onSubmit(data: object): void;
  onClickNoButton(): void;
  username?: string;
  email?: string;
}
