import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'components/Card';
import { RouteAccess } from 'components/RouteAccess';
import { withContext } from 'utils/withContext';
import { ModalLogin } from './components/ModalLogin';
import { ModalLoginProvider } from './components/ModalLogin/context';
import { Form } from './components/Form';
import * as Styled from './styles';

const Login: FC = memo(
  withContext(
    () => (
      <RouteAccess typesOfAccess="guest">
        <Styled.Container>
          <Card>
            <Styled.TextAccessAccount>
              Acesse sua conta
            </Styled.TextAccessAccount>
            <Form />
            <Styled.ContentTexts>
              <Styled.TextSignUp color="primary" variant="h3">
                <Link to="/registration">Cadastre-se</Link>
              </Styled.TextSignUp>

              {/* <Styled.TextSignUp color="primary" variant="h3">
                Esqueci minha senha
              </Styled.TextSignUp> */}
            </Styled.ContentTexts>
          </Card>
          <ModalLogin />
        </Styled.Container>
      </RouteAccess>
    ),
    ModalLoginProvider,
  ),
);

export { Login };
