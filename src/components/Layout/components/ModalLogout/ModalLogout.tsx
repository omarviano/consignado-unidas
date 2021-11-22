import { memo, FC } from 'react';
import { useAuth } from 'hooks/auth';

import { Modal } from 'components/Modal';

import { clearStorage } from 'utils/storage';
import { useModalLogout } from './context';

import * as Styled from './styles';

const ModalLogout: FC = memo(() => {
  const { modalActive, toggleModal } = useModalLogout();
  const { signOut } = useAuth();

  const clearSessionStorage = () => {
    clearStorage();
    signOut();
  };

  return (
    <Modal open={modalActive} onClose={toggleModal}>
      <Styled.Content>
        <Styled.Title variant="h2">Tem certeza que deseja sair?</Styled.Title>

        <Styled.DivButtons>
          <Styled.ButtonYes
            color="primary"
            variant="contained"
            onClick={clearSessionStorage}
          >
            Sim
          </Styled.ButtonYes>

          <Styled.ButtonNo
            color="primary"
            variant="outlined"
            onClick={() => toggleModal()}
          >
            Não
          </Styled.ButtonNo>
        </Styled.DivButtons>
      </Styled.Content>
    </Modal>
  );
});

export { ModalLogout };
