import React, { FC } from 'react';

import { Formik } from 'components/Formik';
import * as Styled from './styles';

const Login: FC = () => (
  <Styled.Container>
    <Styled.Card>
      <Styled.TextAccessAccount>Acesse sua conta</Styled.TextAccessAccount>
      <Formik initialValues={{}} onSubmit={() => console.log('teste')}>
        <Styled.InputEmail
          variant="outlined"
          name="email"
          label="E-mail"
          placeholder="Seu Email"
        />

        <Styled.InputPassword
          variant="outlined"
          name="password"
          label="Sua Senha"
          placeholder="Senha"
          type="password"
        />

        <Styled.ButtonEnter variant="contained" color="primary">
          Entrar
        </Styled.ButtonEnter>
      </Formik>
      {/* //TODO vai entrar na proxima estoria
      <Styled.ContentTexts>
        <Styled.TextSignUp color="primary" variant="h3">
          Cadastre-se
        </Styled.TextSignUp>
        <Styled.TextSignUp color="primary" variant="h3">
          Esqueci minha senha
        </Styled.TextSignUp>
      </Styled.ContentTexts> */}
    </Styled.Card>
  </Styled.Container>
);

export { Login };
