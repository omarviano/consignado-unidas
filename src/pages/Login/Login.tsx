import { FC, memo } from 'react';

import { Card } from 'components/Card';
import { RouteAccess } from 'components/RouteAccess';
import * as Styled from './styles';
import { Form } from './components/Form';

const Login: FC = memo(() => (
  <RouteAccess typesOfAccess="guest">
    <Styled.Container>
      <Card>
        <Styled.TextAccessAccount>Acesse sua conta</Styled.TextAccessAccount>
        <Form />
        {/* //TODO vai entrar na proxima estoria
      <Styled.ContentTexts>
      <Styled.TextSignUp color="primary" variant="h3">
      Cadastre-se
      </Styled.TextSignUp>
        <Styled.TextSignUp color="primary" variant="h3">
          Esqueci minha senha
          </Styled.TextSignUp>
        </Styled.ContentTexts> */}
      </Card>
    </Styled.Container>
  </RouteAccess>
));

export { Login };
