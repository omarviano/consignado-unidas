import React, { useState } from 'react';
import { Checkbox } from '@mui/material';
import { Warning } from '@mui/icons-material';

import useModal from 'hooks/modal';

import { ModalMessage } from 'components/ModalMessage';
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
          Você deseja informar os dados complementares e os dados bancários para
          futuros empréstimos?
        </Styled.BankDetailsConfirmationTitle>
        <Styled.BankDetailsConfirmationText>
          Caso você não queira preeencher os dados, não se preocupe, poderá
          cadsatrar em um outro momento ok? Lembrando que para esta operação, só
          é possível utilizar conta corrente.
        </Styled.BankDetailsConfirmationText>

        <Styled.IAgreeTermsContainer>
          <Checkbox
            onChange={e => setAgree(e.target.checked)}
            style={{ marginLeft: -8 }}
          />

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

      <ModalMessage
        open={modalMessage}
        onClose={toggleModalMessage}
        icon={<Warning color="warning" />}
        text="Para prosseguir, você precisa estar de acordo com os termos e condições da política de privacidade."
        width="600px"
      />
    </Styled.BankDetailsConfirmationContainer>
  );
};

export { BankDataConfirmation };
