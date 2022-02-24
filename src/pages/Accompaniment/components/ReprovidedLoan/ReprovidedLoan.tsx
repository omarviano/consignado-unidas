import { FC } from 'react';
import { getToken } from 'hooks/auth/storage';
import { useHistory } from 'react-router-dom';

import { RoutingPath } from 'utils/routing';
import * as Styled from './styles';

const ReprovidedLoan: FC = () => {
  const history = useHistory();

  return (
    <Styled.Container data-testid="reprovidedLoan">
      <Styled.ReprovidedLoan variant="h2">
        Olá {getToken()?.user.name}! Tudo bem? Temos uma triste notícia. <br />{' '}
        A sua proposta de empréstimo foi{' '}
        <Styled.Reprovided>REPROVADA</Styled.Reprovided>!
      </Styled.ReprovidedLoan>

      <Styled.Simulate variant="h2">
        Entretanto, você pode simular outras condições.
      </Styled.Simulate>

      <Styled.ButtonNewSimulateLoan
        onClick={() => history.push(RoutingPath.LOGGEDAREA)}
        variant="contained"
        color="primary"
      >
        Simular novo empréstimo
      </Styled.ButtonNewSimulateLoan>
    </Styled.Container>
  );
};

export { ReprovidedLoan };
