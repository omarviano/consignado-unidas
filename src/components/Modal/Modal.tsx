import React from 'react';
import { Close } from '@mui/icons-material';

import { ModalProps } from './props';
import * as Styled from './styles';

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  showCloseIcon = true,
  children,
  ...rest
}) =>
  open ? (
    <Styled.Modal open={open} onClose={onClose} {...rest}>
      <Styled.ModalContent>
        {showCloseIcon && onClose && (
          <Styled.CloseButton
            type="button"
            onClick={e => onClose(e, 'backdropClick')}
          >
            <Close fontSize="small" color="primary" />
          </Styled.CloseButton>
        )}
        {children}
      </Styled.ModalContent>
    </Styled.Modal>
  ) : null;

export { Modal };
