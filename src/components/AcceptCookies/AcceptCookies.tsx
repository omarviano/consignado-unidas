import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ACCEPTED_COOKIES } from 'utils/storage';
import { RoutingPath } from 'utils/routing';

import { Button } from 'components/Buttons/Button';

import * as Styled from './styles';

const AcceptCookies: React.FC = () => {
  const [acceptedCookies, setAcceptedCookies] = useState<boolean>(() => {
    const accepted = localStorage.getItem(ACCEPTED_COOKIES);

    return !!accepted;
  });

  const handleClickAgree = () => {
    localStorage.setItem(ACCEPTED_COOKIES, 'true');
    setAcceptedCookies(true);
  };

  return acceptedCookies ? null : (
    <Styled.Container>
      <Styled.Text>
        A Unidas veicula cookies com o objetivo de analisar o tráfego para este
        site. As informações sobre seu uso do nosso site são compartilhadas com
        a Unidas por esse motivo. Saiba mais em nossa{' '}
        <Link to={RoutingPath.PRIVACY}>Política de privacidade</Link>
      </Styled.Text>

      <Button type="button" variant="contained" onClick={handleClickAgree}>
        Concordar
      </Button>
    </Styled.Container>
  );
};

export { AcceptCookies };
