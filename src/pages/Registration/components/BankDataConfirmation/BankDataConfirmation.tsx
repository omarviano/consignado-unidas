import React from 'react';
import { Checkbox } from '@material-ui/core';

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
}) => (
  <Formik initialValues={{}} onSubmit={onSubmit}>
    <Styled.BankDetailsConfirmationContainer>
      <Styled.Hello>Olá {username}!</Styled.Hello>
      <Styled.Email>{email}</Styled.Email>

      <Styled.BankDetailsConfirmationTitle>
        Você deseja informar os dados bancários para futuros empréstimos?
      </Styled.BankDetailsConfirmationTitle>
      <Styled.BankDetailsConfirmationText>
        Caso você não queira preeencher os dados, não se preocupe, poderá
        cadsatrar em um outro momento ok? Lembrando que para esta operação, só é
        possível utilizar conta corrente.
      </Styled.BankDetailsConfirmationText>

      <Styled.IAgreeTermsContainer>
        <Checkbox />

        <Styled.TermsText>
          Estou de acordo com os{' '}
          <Styled.TermsLink>termos e condições</Styled.TermsLink> da{' '}
          <Styled.TermsLink>política de privacidade</Styled.TermsLink>.
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
          onClick={onClickNoButton}
          disabled={submitting}
        >
          {submitting ? 'Cadastrando...' : 'Agora não'}
        </Button>
      </Styled.IAgreeTermsContainerButtons>
    </Styled.BankDetailsConfirmationContainer>
  </Formik>
);

export { BankDataConfirmation };
