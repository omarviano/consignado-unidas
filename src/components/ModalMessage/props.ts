import { ReactNode } from 'react';

export interface ModalMessageProps {
  showCloseIcon?: boolean;
  open: boolean;
  onClose?: (event: any, reason: 'backdropClick' | 'escapeKeyDown') => void;
  icon?: ReactNode;
  title?: ReactNode;
  text?: ReactNode;
  width?: string;
  height?: string;
}
