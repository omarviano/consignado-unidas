import { ModalProps as MaterialModalProps } from '@mui/material';

export interface ModalProps {
  showCloseIcon?: boolean;
  open: boolean;
  onClose?:
    | ((event: any, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
  modalProps?: MaterialModalProps;
}
