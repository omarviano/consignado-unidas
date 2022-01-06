import React, { useState } from 'react';
import { Badge, Card } from '@mui/material';
import { MailOutlined, Check, Cancel, ArrowBack } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';

import Logo from 'assets/images/logo.png';

import useModal from 'hooks/modal';

import { Formik } from 'components/Formik';
import { Button } from 'components/Buttons/Button';
import { Input } from 'components/Inputs/Input';
import { Modal } from 'components/Modal';
import { ModalMessage } from 'components/ModalMessage';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from 'hooks/appInsights';

import { ForgotPasswordServices } from './services/forgot-password.services';

import * as Styled from './styles';

import { schema } from './schema';

interface FormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [sendingEmail, setSendingEmail] = useState(false);
  const { open: emailModalOpen, toggle: toggleEmailModal } = useModal();
  const { open: modalErrorOpen, toggle: toggleModalError } = useModal();
  const history = useHistory();

  const sendEmail = async (emailToSend: string, toggleModal = true) => {
    try {
      setSendingEmail(true);

      await ForgotPasswordServices.forgotPassword(emailToSend);

      if (toggleModal) toggleEmailModal();
    } catch (error) {
      const { response } = error as AxiosError;

      setErrorMessage(response?.data?.message || 'ERRO');
      toggleModalError();
    } finally {
      setSendingEmail(false);
    }
  };

  const resendEmail = () => {
    if (email) sendEmail(email, false);
  };

  const handleSubmit = ({ email }: FormData) => {
    setEmail(email);
    sendEmail(email);
  };

  const handleGoBack = () => {
    history.push('/');
  };

  return (
    <Styled.Container>
      <Styled.Logo src={Logo} alt="Unidas" />

      <Card className="card">
        <Styled.ButtonGoBack onClick={() => handleGoBack()}>
          <ArrowBack />
        </Styled.ButtonGoBack>

        <Styled.Title>Esqueceu sua senha? </Styled.Title>

        <Styled.SubTitle>Informe o email para recuperação</Styled.SubTitle>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <Input
            name="email"
            type="text"
            label="E-mail"
            placeholder="meuemail@meuemail.com"
            variant="outlined"
          />

          <Button
            type="submit"
            size="small"
            variant="contained"
            color="primary"
            disabled={sendingEmail}
          >
            {sendingEmail ? 'Enviando e-mail...' : 'Recuperar senha'}
          </Button>
        </Formik>
      </Card>

      <Modal open={emailModalOpen} onClose={toggleEmailModal}>
        <Styled.ModalContent>
          <Badge badgeContent={<Check />} color="primary" className="badge">
            <MailOutlined color="action" fontSize="inherit" />
          </Badge>

          <Styled.EmailModalTitle>Verifique o seu email</Styled.EmailModalTitle>

          <Styled.ModalText>
            A recuperação de senha foi enviada para o seu email
            <b>{email}</b>
            verifique também sua caixa de spam.
          </Styled.ModalText>

          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={resendEmail}
            disabled={sendingEmail}
            className="resend"
          >
            {sendingEmail ? 'Enviando e-mail...' : 'Enviar novamente'}
          </Button>
        </Styled.ModalContent>
      </Modal>

      <ModalMessage
        open={modalErrorOpen}
        onClose={toggleModalError}
        icon={<Cancel color="error" />}
        text={errorMessage}
      />
    </Styled.Container>
  );
};

export default withAITracking(reactPlugin, ForgotPassword, 'ForgotPassword');
