import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Modal } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';

import useModal from 'hooks/modal';

import { Formik } from 'components/Formik';
import { Button } from 'components/Buttons/Button';
import { Input } from 'components/Inputs/Input';

import { ResetPasswordServices } from './services/reset-password.services';

import * as Styled from './styles';
import { schema } from './schema';

interface FormData {
  password: string;
}

const ResetPassword: React.FC = () => {
  const history = useHistory();
  const [resettingPassword, setResettingPassword] = useState(false);
  const { open: modalSuccessOpen, toggle: toggleModalSuccess } = useModal();

  const handleSubmit = ({ password }: FormData) => {
    console.log('password', password);
    toggleModalSuccess();
  };

  const redirectToLogin = () => {
    history.push('/');
  };

  return (
    <Styled.Container>
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

      <Modal open={modalSuccessOpen} onClose={toggleModalSuccess}>
        <Styled.ModalContent>
          <CheckCircle color="action" fontSize="inherit" />

          <Styled.EmailModalTitle>
            Senha redefinida com sucesso
          </Styled.EmailModalTitle>

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
    </Styled.Container>
  );
};

export { ResetPassword };
