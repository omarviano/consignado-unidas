import { FC, memo, useCallback, useMemo, useState } from 'react';

import { Formik } from 'components/Formik';
import { ReactComponent as EyeHide } from 'assets/icons/eye-hide.svg';
import { ReactComponent as Eye } from 'assets/icons/eye.svg';

import { useAuth } from 'hooks/auth';
import { LoginCredentials } from 'hooks/auth/props';

import * as Styled from './styles';

import { schema } from './schema';

const Form: FC = memo(() => {
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

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

      <Styled.ButtonEnter variant="contained" color="primary" type="submit">
        Entrar
      </Styled.ButtonEnter>
    </Formik>
  );
});

export { Form };
