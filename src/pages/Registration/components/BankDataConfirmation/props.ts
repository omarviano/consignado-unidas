export interface BankDataConfirmationProps {
  onSubmit(data: object): void;
  onClickNoButton(): void;
  username?: string;
  email?: string;
}
