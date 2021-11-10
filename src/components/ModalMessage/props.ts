import { ReactNode } from 'react';

export interface ModalMessageProps {
  showCloseIcon?: boolean;
  open: boolean;
  onClose?:
    | ((event: any, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
  icon?: ReactNode;
  title?: ReactNode;
  text?: ReactNode;
}
