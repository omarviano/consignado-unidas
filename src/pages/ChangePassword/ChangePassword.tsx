import React, { useState, useCallback, useMemo } from 'react';
import { getToken } from 'hooks/auth/storage';
import { CheckCircle, Warning } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';

import { ReactComponent as EyeHide } from 'assets/icons/eye-hide.svg';
import { ReactComponent as Eye } from 'assets/icons/eye.svg';

import useModal from 'hooks/modal';
import { RoutingPath } from 'utils/routing';

import { RouteAccess } from 'components/RouteAccess';
import { Layout } from 'components/Layout';
import { Formik } from 'components/Formik';
import { Input } from 'components/Inputs/Input';
import { SubmitButton } from 'components/Buttons/SubmitButton';
import { ModalMessage } from 'components/ModalMessage';

import { ChangePasswordServices } from './services/change-password.services';

import { schema } from './schema';
import * as Styled from './styles';

const ChangePassword: React.FC = () => {
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const { open: modalSuccessOpen, toggle: toggleModalSuccess } = useModal();
  const { open: modalErrorOpen, toggle: toggleModalError } = useModal();
  const [changingPassword, setChangingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

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

  const goToHome = () => {
    toggleModalSuccess();
    history.push(RoutingPath.LOGGEDAREA);
  };

  const onSubmit = async data => {
    try {
      setChangingPassword(true);
      const { password } = data;
      await ChangePasswordServices.changePassword(password);
      toggleModalSuccess();
    } catch (error) {
      const { response } = error as AxiosError;

      setErrorMessage(response?.data?.message || 'ERRO');
      toggleModalError();
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <RouteAccess typesOfAccess="auth">
      <Layout
        containerStyles={{
          maxWidth: '1276px',
        }}
      >
        <Styled.Container>
          <Styled.Box>
            <Styled.Title>Alterar minha senha</Styled.Title>
            <Styled.Text>
              Olá {getToken()?.user.name}! O seu email cadastrado é o{' '}
              <b>{getToken()?.user.email}</b>
            </Styled.Text>
            <Formik
              initialValues={{}}
              validationSchema={schema}
              onSubmit={onSubmit}
            >
              <Input
                name="password"
                label="Nova senha"
                placeholder="Nova senha"
                variant="outlined"
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

              <Input
                name="passwordConfirmation"
                label="Confirmar senha"
                placeholder="Confirmar senha"
                variant="outlined"
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

              <SubmitButton
                type="submit"
                variant="contained"
                disabled={changingPassword}
              >
                {changingPassword ? 'Confirmando...' : 'Confirmar'}
              </SubmitButton>
            </Formik>
          </Styled.Box>
        </Styled.Container>

        <ModalMessage
          open={modalSuccessOpen}
          onClose={goToHome}
          icon={<CheckCircle color="success" />}
          text="Senha redefinida com sucesso"
        />

        <ModalMessage
          open={modalErrorOpen}
          onClose={toggleModalError}
          icon={<Warning color="warning" />}
          text={errorMessage}
        />
      </Layout>
    </RouteAccess>
  );
};

export { ChangePassword };
