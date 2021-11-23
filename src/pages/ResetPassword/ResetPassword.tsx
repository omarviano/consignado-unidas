import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { Card } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

import Logo from 'assets/images/logo.png';

import useModal from 'hooks/modal';

import { Formik } from 'components/Formik';
import { Button } from 'components/Buttons/Button';
import { Input } from 'components/Inputs/Input';
import { Modal } from 'components/Modal';
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

  const handleSubmit = async ({ password }: FormData) => {
    if (!password || !token) return;

    try {
      setResettingPassword(true);

      await ResetPasswordServices.resetPassword(password, token);
      toggleModalSuccess();
    } catch (error) {
      const { response } = error as AxiosError;
      setErrorMessage(response?.data?.message);
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
          initialValues={{ password: '' }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <Input
            name="password"
            type="password"
            label="Nova senha"
            placeholder="Nova senha"
            variant="outlined"
          />

          <Input
            name="passwordConfirmation"
            type="password"
            label="Confirmação nova senha"
            placeholder="Confirmação nova senha"
            variant="outlined"
          />

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

      <Modal open={modalSuccessOpen} onClose={redirectToLogin}>
        <Styled.ModalContent>
          <CheckCircle
            color="action"
            fontSize="inherit"
            className="success-icon"
          />

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
    </Styled.Container>
  );
};

export { ResetPassword };
