import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { Card } from '@mui/material';
import { Cancel } from '@mui/icons-material';

import { ReactComponent as ConfirmIcon } from 'assets/icons/confirm.svg';
import Logo from 'assets/images/logo.png';

import useModal from 'hooks/useModal';

import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from 'hooks/appInsights';
import { Formik } from 'components/Formik';
import { Button } from 'components/Buttons/Button';
import version from 'utils/getVersion';
import { Input } from 'components/Inputs/Input';
import { Modal } from 'components/Modal';
import { PasswordRules } from 'components/PasswordRules';
import { ModalMessage } from 'components/ModalMessage';

import { ResetPasswordServices } from './services/reset-password.services';

import * as Styled from './styles';
import { schema } from './schema';

interface FormData {
  password: string;
}

const ResetPassword: React.FC = () => {
  const history = useHistory();

  const { search } = useLocation();
  const token = new URLSearchParams(search).get('token');

  const [resettingPassword, setResettingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const { open: modalSuccessOpen, toggle: toggleModalSuccess } = useModal();
  const { open: modalErrorOpen, toggle: toggleModalError } = useModal();
  const { open: modalTokenOpen, toggle: toggleModalToken } = useModal();

  const handleSubmit = async ({ password }: FormData) => {
    if (!token) {
      toggleModalToken();
      return;
    }

    try {
      setResettingPassword(true);

      await ResetPasswordServices.resetPassword(password, token);
      toggleModalSuccess();
    } catch (error) {
      const { response } = error as AxiosError;
      setErrorMessage(response?.data?.message || 'Erro ao resetar senha');
      toggleModalError();
    } finally {
      setResettingPassword(false);
    }
  };

  const redirectToLogin = () => {
    toggleModalSuccess();
    history.push('/');
  };

  return (
    <Styled.Container>
      <Styled.Logo src={Logo} alt="Unidas" />

      <Card className="card">
        <Styled.Title>Confirmar nova senha</Styled.Title>

        <Formik
          initialValues={{ password: '', passwordConfirmation: '' }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <Input
            name="password"
            type="password"
            label="Nova senha"
            placeholder="Nova senha"
            variant="outlined"
            inputProps={{ 'data-testid': 'password' }}
            FormHelperTextProps={{
              id: 'password-error',
            }}
          />

          <Input
            name="passwordConfirmation"
            type="password"
            label="Confirmação nova senha"
            placeholder="Confirmação nova senha"
            variant="outlined"
            inputProps={{ 'data-testid': 'passwordConfirmation' }}
            FormHelperTextProps={{
              id: 'passwordConfirmation-error',
            }}
          />

          <PasswordRules containerStyles={{ marginTop: 14 }} />

          <Button
            type="submit"
            size="small"
            variant="contained"
            color="primary"
            disabled={resettingPassword}
          >
            {resettingPassword ? 'Confirmando nova senha...' : 'Confimar senha'}
          </Button>
        </Formik>
      </Card>

      <Styled.VersionText>Versão {version}</Styled.VersionText>

      <Modal open={modalSuccessOpen} onClose={redirectToLogin}>
        <Styled.ModalContent data-testid="password-redefined">
          <ConfirmIcon />

          <Styled.ModalTitle>Senha redefinida com sucesso</Styled.ModalTitle>

          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={redirectToLogin}
          >
            Entrar na minha conta
          </Button>
        </Styled.ModalContent>
      </Modal>

      <ModalMessage
        open={modalErrorOpen}
        onClose={toggleModalError}
        icon={<Cancel color="error" fontSize="inherit" />}
        text={errorMessage}
      />

      <ModalMessage
        open={modalTokenOpen}
        onClose={toggleModalToken}
        icon={<Cancel color="error" fontSize="inherit" />}
        text="Não encontramos seu token. Click no link que você recebeu no e-mail e tente novamente"
      />
    </Styled.Container>
  );
};

export default withAITracking(reactPlugin, ResetPassword, 'ResetPassword');
