import React, { useState } from 'react';
import { Badge, Card, Modal } from '@material-ui/core';
import { MailOutlined, Check } from '@material-ui/icons';

import useModal from 'hooks/modal';

import { Formik } from 'components/Formik';
import { Button } from 'components/Buttons/Button';
import { Input } from 'components/Inputs/Input';

import { ForgotPasswordServices } from './services/forgot-password.services';

import * as Styled from './styles';

import { schema } from './schema';

interface FormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [sendingEmail, setSendingEmail] = useState(false);
  const { open: emailModalOpen, toggle: toggleEmailModal } = useModal();

  const sendEmail = async (emailToSend: string, toggleModal = true) => {
    try {
      setSendingEmail(true);

      await ForgotPasswordServices.resetPassword(emailToSend);

      if (toggleModal) toggleEmailModal();
    } catch (error) {
      console.log('error', error);
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

  return (
    <Styled.Container>
      <Card className="card">
        <Styled.Title>Acesse sua conta</Styled.Title>

        <Styled.SubTitle>Informe o email para recuperação </Styled.SubTitle>

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

          <Styled.EmailModalText>
            A recuperação de senha foi enviada para o seu email
            <b>{email}</b>
            verifique também sua caixa de spam.
          </Styled.EmailModalText>

          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={resendEmail}
            disabled={sendingEmail}
          >
            {sendingEmail ? 'Enviando e-mail...' : 'Enviar novamente'}
          </Button>
        </Styled.ModalContent>
      </Modal>
    </Styled.Container>
  );
};

export { ForgotPassword };
