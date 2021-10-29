import React, { useMemo } from 'react';
import Countdown from 'react-countdown';
import { Modal } from '@material-ui/core';
import { Update } from '@material-ui/icons';
import { Button } from 'components/Buttons/Button';

import { useSession } from 'hooks/session';
import { useAuth } from 'hooks/auth';

import * as Styled from './styles';

const FIFTEEN_MINUTES = 900000;

const SessionModal: React.FC = () => {
  const { lastSession } = useSession();
  const { signOut, clearSessionData } = useAuth();
  const time = useMemo(
    () => lastSession.getTime() + FIFTEEN_MINUTES,
    [lastSession],
  );

  const renderer = ({ completed }) => {
    if (completed) {
      clearSessionData();

      return (
        <Modal open>
          <Styled.ModalContent>
            <Update />
            <Styled.ModalText>Sessão expirada</Styled.ModalText>
            <Button type="button" variant="contained" onClick={signOut}>
              Loggar novamente
            </Button>
          </Styled.ModalContent>
        </Modal>
      );
    }

    return null;
  };

  return <Countdown date={time} renderer={renderer} />;
};

export { SessionModal };
