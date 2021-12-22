import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Logo from 'assets/images/logo.png';

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
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}
      >
        <RouteAccess typesOfAccess="guest">
          <Styled.Container>
            <Styled.Logo src={Logo} alt="Unidas" />

            <Card>
              <Styled.TextAccessAccount>
                Acesse sua conta
              </Styled.TextAccessAccount>
              <Form />
              <Styled.ContentTexts>
                <Styled.LinkContainer color="primary" variant="h3">
                  <Link to="/cadastro">Cadastre-se</Link>
                </Styled.LinkContainer>

                <Styled.LinkContainer color="primary" variant="h3">
                  <Link to="/recuperacao-senha">Esqueci minha senha</Link>
                </Styled.LinkContainer>
              </Styled.ContentTexts>
            </Card>
            <ModalLogin />
          </Styled.Container>
        </RouteAccess>
      </GoogleReCaptchaProvider>
    ),
    ModalLoginProvider,
  ),
);

export { Login };
