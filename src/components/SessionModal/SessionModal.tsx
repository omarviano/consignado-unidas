import React, { useMemo } from 'react';
import Countdown from 'react-countdown';

import { useSession } from 'hooks/session';
import { useAuth } from 'hooks/auth';

import { SessionExpired } from 'components/SessionExpired';

const FIFTEEN_MINUTES = 30000;

const SessionModal: React.FC = () => {
  const { lastSession } = useSession();
  const { clearSessionData } = useAuth();
  const time = useMemo(
    () => lastSession.getTime() + FIFTEEN_MINUTES,
    [lastSession],
  );

  const renderer = ({ completed }) => {
    if (completed) {
      clearSessionData();

      return <SessionExpired />;
    }

    return null;
  };

  return <Countdown date={time} renderer={renderer} />;
};

export { SessionModal };
