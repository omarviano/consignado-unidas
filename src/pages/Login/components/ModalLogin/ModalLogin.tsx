import { memo, FC } from 'react';

import ImageAlert from 'assets/icons/alert.svg';

import { useAuth } from 'hooks/auth';

import { ModalMessage } from 'components/ModalMessage';
import { useModalLogin } from './context';

const ModalLogin: FC = memo(() => {
  const { modalActive, toggleModal } = useModalLogin();
  const { messageError } = useAuth();

  return (
    <ModalMessage
      open={modalActive}
      onClose={toggleModal}
      icon={<img src={ImageAlert} alt="Alert" />}
      text={messageError}
      width="544px"
      height="400px"
    />
  );
});

export { ModalLogin };
