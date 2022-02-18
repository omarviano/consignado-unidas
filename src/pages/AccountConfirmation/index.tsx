import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Error } from '@mui/icons-material';

import { ReactComponent as ConfirmIcon } from 'assets/icons/confirm.svg';

import useModal from 'hooks/useModal';

import { Button } from 'components/Buttons/Button';
import { Modal } from 'components/Modal';
import { ModalMessage } from 'components/ModalMessage';
import { Layout } from 'components/Layout';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from 'hooks/appInsights';

import * as Styled from './styles';
import { AccountConfirmationServices } from './services/account-confirmation.services';

const AccountConfirmation: React.FC = () => {
  const history = useHistory();
  const { search } = useLocation();
  const token = new URLSearchParams(search).get('token');

  const [confirmingAccount, setConfirmingAccount] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const { open: modalSuccesOpen, toggle: toggleModalSucces } = useModal();
  const { open: modalErrorOpen, toggle: toggleModalError } = useModal();

  const confirmationAccount = async () => {
    if (!token) return;

    try {
      setConfirmingAccount(true);
      await AccountConfirmationServices.confirmation(token);

      toggleModalSucces();
    } catch (error) {
      const { response } = error as AxiosError;

      setErrorMessage(response?.data?.message || 'ERRO');
      toggleModalError();
    } finally {
      setConfirmingAccount(false);
    }
  };

  const goToLogin = () => {
    history.push('/');
  };

  useEffect(() => {
    if (!token) history.push('/');
  }, [token, history]);

  return (
    <Layout>
      <Styled.Container>
        <Styled.Title data-testid="title">
          Agora falta pouco!
          <br />
          Clique no botão abaixo para confirmar sua conta.
        </Styled.Title>

        <Button
          type="button"
          variant="contained"
          onClick={confirmationAccount}
          disabled={confirmingAccount}
          data-testid="confirmationButton"
        >
          {confirmingAccount ? 'Confirmando...' : 'Confirmar Conta'}
        </Button>
      </Styled.Container>

      <Modal open={modalSuccesOpen}>
        <Styled.ModalContent data-testid="modal-success">
          <ConfirmIcon />

          <Styled.ModalTitle>Conta confirmada com sucesso!</Styled.ModalTitle>

          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={goToLogin}
          >
            Ir para login
          </Button>
        </Styled.ModalContent>
      </Modal>

      <ModalMessage
        open={modalErrorOpen}
        onClose={toggleModalError}
        icon={<Error color="error" />}
        text={<span data-testid="error-message">{errorMessage}</span>}
      />
    </Layout>
  );
};

export default withAITracking(
  reactPlugin,
  AccountConfirmation,
  'AccountConfirmation',
);
