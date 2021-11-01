import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { ExitToApp, CheckCircle, Error, Close } from '@material-ui/icons';
import { AxiosError } from 'axios';

import { RouteAccess } from 'components/RouteAccess';
import { Button } from 'components/Buttons/Button';

import { Modal } from '@material-ui/core';
import useModal from 'hooks/modal';
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
    <RouteAccess typesOfAccess="guest">
      <Styled.Header>
        <Link to="/">
          Login
          <ExitToApp />
        </Link>
      </Styled.Header>

      <Styled.Container>
        <Styled.Title>
          Agora falta pouco!
          <br />
          Clique no botão abaixo para confirmar sua conta.
        </Styled.Title>

        <Button
          type="button"
          variant="contained"
          onClick={confirmationAccount}
          disabled={confirmingAccount}
        >
          {confirmingAccount ? 'Confirmando...' : 'Confirmar Conta'}
        </Button>
      </Styled.Container>

      <Modal open={modalSuccesOpen}>
        <Styled.ModalContent>
          <CheckCircle className="success-icon" />

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

      <Modal open={modalErrorOpen} onClose={toggleModalError}>
        <Styled.ModalContent>
          <Styled.CloseButton onClick={toggleModalError}>
            <Close fontSize="small" color="primary" />
          </Styled.CloseButton>
          <Error className="error-icon" />
          <Styled.ModalTitle>{errorMessage}</Styled.ModalTitle>
        </Styled.ModalContent>
      </Modal>
    </RouteAccess>
  );
};

export { AccountConfirmation };
