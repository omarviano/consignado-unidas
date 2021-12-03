import { memo, FC } from 'react';
import ImageAlert from 'assets/icons/alert.svg';
import { useSimulateLoan } from 'hooks/simulate';
import { ModalMessage } from 'components/ModalMessage';
import { useModalSimulateLoan } from './context';

const ModalSimulateLoan: FC = memo(() => {
  const { modalActive, toggleModal } = useModalSimulateLoan();
  const { messageError } = useSimulateLoan();

  return (
    <ModalMessage
      open={modalActive}
      onClose={toggleModal}
      width="544px"
      height="400px"
      icon={<img src={ImageAlert} alt="Alert" />}
      text={messageError}
    />
  );
});

export { ModalSimulateLoan };
