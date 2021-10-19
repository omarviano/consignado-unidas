import React from 'react';

import { Formik } from 'components/Formik';
import { Input } from 'components/Inputs/Input';
import { ContinueButton } from '../ContinueButton';

import * as Styled from './styles';

import { BankDataFormProps } from './props';

const BankDataForm: React.FC<BankDataFormProps> = ({ onSubmit }) => (
  <Formik initialValues={{}} onSubmit={onSubmit}>
    <Styled.BankDataContainer>
      <Styled.Hello>Olá João da Silva Ribeiro!</Styled.Hello>
      <Styled.Email>joaodasilvaribeiro@gmail.com</Styled.Email>

      <Styled.BankDetailsConfirmationTitle>
        Você deseja informar os dados bancários para futuros empréstimos?
      </Styled.BankDetailsConfirmationTitle>
      <Styled.BankDetailsConfirmationText>
        Caso você não queira preeencher os dados, não se preocupe, poderá
        cadsatrar em um outro momento ok? Lembrando que para esta operação,{' '}
        <b>só é possível utilizar conta corrente</b>.
      </Styled.BankDetailsConfirmationText>

      <Styled.BankDataInputs>
        <Input
          name="bankCode"
          type="text"
          label="Banco"
          placeholder="Banco"
          variant="outlined"
        />

        <Input
          name="agency"
          type="text"
          label="Agência"
          placeholder="N° da sua agência"
          variant="outlined"
        />

        <Input
          name="accountNumber"
          type="text"
          label="N° da Conta Corrente"
          placeholder="XXXXXX"
          variant="outlined"
        />
      </Styled.BankDataInputs>
    </Styled.BankDataContainer>

    <ContinueButton
      type="submit"
      size="small"
      variant="contained"
      color="primary"
    />
  </Formik>
);

export { BankDataForm };
