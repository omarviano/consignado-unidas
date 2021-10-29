import React, { useState } from 'react';
import { Checkbox, Modal } from '@mui/material';
import { Warning, Close } from '@mui/icons-material';

import useModal from 'hooks/modal';

import { Formik } from 'components/Formik';
import { Button } from 'components/Buttons/Button';

import * as Styled from './styles';

import { BankDataConfirmationProps } from './props';

const BankDataConfirmation: React.FC<BankDataConfirmationProps> = ({
  submitting,
  onSubmit,
  onClickNoButton,
  username,
  email,
}) => {
  const [agree, setAgree] = useState(false);
  const { open: modalMessage, toggle: toggleModalMessage } = useModal();

  const handleSubmit = data => {
    if (!agree) {
      toggleModalMessage();
      return;
    }

    onSubmit(data);
  };

  return (
    <Styled.BankDetailsConfirmationContainer>
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        <Styled.Hello>Olá {username}!</Styled.Hello>
        <Styled.Email>{email}</Styled.Email>

        <Styled.BankDetailsConfirmationTitle>
          Você deseja informar os dados bancários para futuros empréstimos?
        </Styled.BankDetailsConfirmationTitle>
        <Styled.BankDetailsConfirmationText>
          Caso você não queira preeencher os dados, não se preocupe, poderá
          cadastrar em um outro momento ok? Lembrando que para esta operação, só
          é possível utilizar conta corrente.
        </Styled.BankDetailsConfirmationText>

        <Styled.IAgreeTermsContainer>
          <Checkbox onChange={e => setAgree(e.target.checked)} />

          <Styled.TermsText>
            Estou de acordo com os{' '}
            <Styled.TermsLink type="button">
              termos e condições
            </Styled.TermsLink>{' '}
            da{' '}
            <Styled.TermsLink type="button">
              política de privacidade
            </Styled.TermsLink>
            .
          </Styled.TermsText>
        </Styled.IAgreeTermsContainer>

        <Styled.IAgreeTermsContainerButtons>
          <Button type="submit" variant="contained" color="primary">
            Sim
          </Button>

          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={() => (agree ? onClickNoButton() : toggleModalMessage())}
            disabled={submitting}
          >
            {submitting ? 'Cadastrando...' : 'Agora não'}
          </Button>
        </Styled.IAgreeTermsContainerButtons>
      </Formik>

      <Modal open={modalMessage} onClose={toggleModalMessage}>
        <Styled.ModalContent>
          <Styled.CloseButton onClick={toggleModalMessage}>
            <Close fontSize="medium" color="primary" />
          </Styled.CloseButton>

          <Warning fontSize="large" className="warning-icon" />

          <Styled.ModalText>
            Para prosseguir, você precisa estar de acordo com os termos e
            condições da política de privacidade.
          </Styled.ModalText>
        </Styled.ModalContent>
      </Modal>
    </Styled.BankDetailsConfirmationContainer>
  );
};

export { BankDataConfirmation };
