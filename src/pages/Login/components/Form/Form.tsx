import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { Formik } from 'components/Formik';
import { ReactComponent as EyeHide } from 'assets/icons/eye-hide.svg';
import { ReactComponent as Eye } from 'assets/icons/eye.svg';

import { useAuth } from 'hooks/auth';
import { LoginCredentials } from 'hooks/auth/props';
import { useHistory } from 'react-router-dom';
import { RoutingPath } from 'utils/routing';
import { schema } from './schema';
import { useModalLogin } from '../ModalLogin/context';

import * as Styled from './styles';

const Form: FC = memo(() => {
  const history = useHistory();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    signIn,
    modalActive,
    resetModalActive,
    isAuthenticating,
    statusCode,
    isAuthenticated,
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

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) return undefined;

    const token = await executeRecaptcha('login');

    return token;
  }, [executeRecaptcha]);

  const handleSubmit = useCallback(
    async (values: LoginCredentials) => {
      const recaptchaToken = await handleReCaptchaVerify();

      if (!recaptchaToken) return;

      signIn(values, recaptchaToken);
      resetModalActive();
    },
    [handleReCaptchaVerify, resetModalActive, signIn],
  );

  useEffect(() => {
    if (modalActive && statusCode !== 500) return toggleModal();
    return () => {
      <> </>;
    };
  }, [modalActive, toggleModal, statusCode]);

  useEffect(() => {
    if (isAuthenticated) history.push(RoutingPath.LOGGEDAREA);
  }, [history, isAuthenticated]);

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
        label="CPF"
        placeholder="CPF"
        mask="999.999.999-99"
      />

      <Styled.InputPassword
        variant="outlined"
        name="password"
        label="Senha"
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
