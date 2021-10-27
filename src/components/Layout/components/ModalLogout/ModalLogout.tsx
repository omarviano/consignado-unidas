import { useMemo, memo, FC } from 'react';
import ImageClose from 'assets/icons/close-blue.svg';
import { useAuth } from 'hooks/auth';

import { useModalLogout } from './context';

import * as Styled from './styles';

const ModalLogout: FC = memo(() => {
  const { modalActive, toggleModal } = useModalLogout();
  const { signOut } = useAuth();

  const DialogTitle = useMemo(
    () => (
      <Styled.DialogTitle>
        <Styled.ContenDialogTitle>
          {toggleModal && (
            <Styled.IconButton aria-label="close" onClick={toggleModal}>
              <Styled.Icon src={ImageClose} />
            </Styled.IconButton>
          )}
        </Styled.ContenDialogTitle>
      </Styled.DialogTitle>
    ),
    [toggleModal],
  );

  return (
    <Styled.Dialog
      PaperProps={{
        style: { position: 'absolute', top: 50, width: 507, height: 206 },
      }}
      open={modalActive}
      onClose={toggleModal}
      fullWidth
    >
      <Styled.Container>
        {DialogTitle}
        <Styled.Content>
          <Styled.Title variant="h2">Tem certeza que deseja sair?</Styled.Title>

          <Styled.DivButtons>
            <Styled.ButtonYes
              color="primary"
              variant="contained"
              onClick={() => signOut()}
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
      </Styled.Container>
    </Styled.Dialog>
  );
});

export { ModalLogout };
