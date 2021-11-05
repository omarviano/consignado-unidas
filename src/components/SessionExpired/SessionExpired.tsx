import React from 'react';
import { Modal } from '@mui/material';
import { Update } from '@mui/icons-material';
import { Button } from 'components/Buttons/Button';

import { useAuth } from 'hooks/auth';

import * as Styled from './styles';

const SessionExpired: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Modal open>
      <Styled.ModalContent>
        <Update />
        <Styled.ModalText>Sessão expirada</Styled.ModalText>
        <Button type="button" variant="contained" onClick={signOut}>
          Logar novamente
        </Button>
      </Styled.ModalContent>
    </Modal>
  );
};

export { SessionExpired };
