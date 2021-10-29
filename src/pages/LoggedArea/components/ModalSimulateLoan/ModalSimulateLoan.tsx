import { useMemo, memo, FC } from 'react';
import ImageClose from 'assets/icons/close.svg';
import ImageAlert from 'assets/icons/alert.svg';
import { useSimulateLoan } from 'hooks/simulate';
import { useModalSimulateLoan } from './context';

import * as Styled from './styles';

const ModalSimulateLoan: FC = memo(() => {
  const { modalActive, toggleModal } = useModalSimulateLoan();
  const { messageError } = useSimulateLoan();

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
        style: { position: 'absolute', top: 50, width: 544, height: 400 },
      }}
      open={modalActive}
      onClose={toggleModal}
      fullWidth
    >
      <Styled.Container>
        {DialogTitle}
        <Styled.Content>
          <img src={ImageAlert} alt="Alert" />
          <Styled.MessaError>{messageError}</Styled.MessaError>
        </Styled.Content>
      </Styled.Container>
    </Styled.Dialog>
  );
});

export { ModalSimulateLoan };
