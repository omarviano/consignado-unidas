/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Formik } from 'components/Formik';
import { ReactComponent as EyeHide } from 'assets/icons/eye-hide.svg';
import { ReactComponent as Eye } from 'assets/icons/eye.svg';

import { useAuth } from 'hooks/auth';
import { LoginCredentials } from 'hooks/auth/props';
import { schema } from './schema';
import { useModalLogin } from '../ModalLogin/context';

import * as Styled from './styles';

const Form: FC = memo(() => {
  const {
    signIn,
    modalActive,
    resetModalActive,
    isAuthenticating,
    statusCode,
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { toggleModal } = useModalLogin();

  const initialValues: LoginCredentials = {
    cpf: '',
    password: '',
  };

  const handleClickShowPassword = useCallback(
    () => setShowPassword(prev => !prev),
    [],
  );

  const eyeIconVisibilityOrVisibilityOff = useMemo(
    () => (showPassword ? <Eye /> : <EyeHide />),
    [showPassword],
  );

  const inputPasswordType = useMemo(
    () => (showPassword ? 'text' : 'password'),
    [showPassword],
  );

  const handleSubmit = useCallback((values: LoginCredentials) => {
    signIn(values);
    resetModalActive();
  }, []);

  useEffect(() => {
    if (modalActive && statusCode !== 500) return toggleModal();
    return () => {
      <> </>;
    };
  }, [modalActive]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Styled.InputEmail
        type="text"
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
        type={inputPasswordType}
        InputProps={{
          endAdornment: (
            <Styled.InputAdornment position="end">
              <Styled.IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {eyeIconVisibilityOrVisibilityOff}
              </Styled.IconButton>
            </Styled.InputAdornment>
          ),
        }}
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
