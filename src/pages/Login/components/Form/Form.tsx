import { FC, memo } from 'react';

import { Formik } from 'components/Formik';

import { useAuth } from 'hooks/auth';
import { LoginCredentials } from 'hooks/auth/props';

import * as Styled from './styles';

import { schema } from './schema';

const Form: FC = memo(() => {
  const { signIn, isAuthenticating } = useAuth();

  const initialValues: LoginCredentials = {
    cpf: '',
    password: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={signIn}
      validationSchema={schema}
    >
      <Styled.InputEmail
        variant="outlined"
        name="cpf"
        label="Cpf"
        placeholder="Seu Cpf"
        mask="999.999.999-99"
      />

      <Styled.InputPassword
        variant="outlined"
        name="password"
        label="Sua Senha"
        placeholder="Senha"
        type="password"
      />

      <Styled.ButtonEnter
        variant="contained"
        color="primary"
        type="submit"
        disabled={isAuthenticating}
      >
        Entrar
      </Styled.ButtonEnter>
    </Formik>
  );
});

export { Form };
