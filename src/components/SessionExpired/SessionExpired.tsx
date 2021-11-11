import React from 'react';
import { Update } from '@mui/icons-material';

import { Modal } from 'components/Modal';

import * as Styled from './styles';

const SessionExpired: React.FC = () => {
  const clearStorage = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Modal open>
      <Styled.ModalContent>
        <Update />
        <Styled.ModalText>Sessão expirada</Styled.ModalText>

        <Styled.Button
          type="button"
          variant="contained"
          disableElevation
          onClick={clearStorage}
        >
          Logar novamente
        </Styled.Button>
      </Styled.ModalContent>
    </Modal>
  );
};

export { SessionExpired };
